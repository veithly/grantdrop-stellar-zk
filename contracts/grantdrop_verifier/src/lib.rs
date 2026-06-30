#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype,
    crypto::bn254::{Bn254G1Affine as G1Affine, Bn254G2Affine as G2Affine, Fr},
    vec, Env, Vec, U256,
};

/// GrantDrop eligibility Groth16 verifier.
///
/// The proof is generated off-chain (browser, snarkjs) for the
/// `circuits/grantdrop.circom` circuit, then submitted to this Soroban
/// contract. The contract runs the native BN254 pairing check using the
/// Stellar Protocol 25 host functions (CAP-0074), so the proof's validity is
/// decided on-chain. Eligibility is enforced on-chain by checking the public
/// `secretSquare` commitment against the campaign's expected value.
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum VerifyError {
    MalformedInputs = 1,
    ProofRejected = 2,
    IneligibleSecret = 3,
}

/// Groth16 verification key (BN254). Mirrors the snarkjs verification_key.json.
#[derive(Clone)]
#[contracttype]
pub struct VerificationKey {
    pub alpha: G1Affine,
    pub beta: G2Affine,
    pub gamma: G2Affine,
    pub delta: G2Affine,
    pub ic: Vec<G1Affine>,
}

/// Groth16 proof (BN254). Mirrors snarkjs proof.json pi_a / pi_b / pi_c.
#[derive(Clone)]
#[contracttype]
pub struct Proof {
    pub a: G1Affine,
    pub b: G2Affine,
    pub c: G1Affine,
}

#[contract]
pub struct GrantDropVerifier;

impl GrantDropVerifier {
    /// Detect the BN254 point at infinity. snarkjs encodes it as X=0, Y=1
    /// (z/leading flag = 0). The Soroban host functions reject (0,1) as not on
    /// curve, so infinity IC commitments must be skipped (they contribute the
    /// identity element to vk_x, i.e. zero).
    fn is_infinity(p: &G1Affine) -> bool {
        let bytes = p.to_array();
        // G1 = be(X,32) || be(Y,32). snarkjs encodes the point at infinity as
        // X=0, Y=1. Detect that exact encoding so we skip it (the host rejects
        // (0,1) as not on curve; mathematically it contributes the identity).
        let x_zero = bytes[0..32].iter().all(|&b| b == 0);
        let y_is_one = bytes[63] == 1 && bytes[32..63].iter().all(|&b| b == 0);
        x_zero && y_is_one
    }
}

#[contractimpl]
impl GrantDropVerifier {
    /// Verify a Groth16 proof against the verification key and public signals
    /// using the native BN254 host functions, then enforce eligibility by
    /// checking the `secretSquare` public signal equals `expected_secret_square`.
    ///
    /// public signals order (from circuits/grantdrop.circom):
    ///   [nullifier, secretSquare, campaignId, walletBinding]
    ///
    /// Returns Ok(true) only when the pairing holds AND secretSquare matches.
    pub fn verify_claim(
        env: Env,
        vk: VerificationKey,
        proof: Proof,
        pub_signals: Vec<Fr>,
        expected_secret_square: U256,
    ) -> Result<bool, VerifyError> {
        // Eligibility: the public secretSquare commitment must match the
        // campaign's expected secret*secret. index 1 = secretSquare.
        if pub_signals.len() < 2 {
            return Err(VerifyError::MalformedInputs);
        }
        let secret_square = pub_signals.get(1).ok_or(VerifyError::MalformedInputs)?;
        if secret_square.to_u256() != expected_secret_square {
            return Err(VerifyError::IneligibleSecret);
        }

        Self::verify_pairing(&env, &vk, &proof, &pub_signals)
    }

    /// Bare Groth16 pairing verification (no eligibility check).
    pub fn verify_proof(
        env: Env,
        vk: VerificationKey,
        proof: Proof,
        pub_signals: Vec<Fr>,
    ) -> Result<bool, VerifyError> {
        Self::verify_pairing(&env, &vk, &proof, &pub_signals)
    }

    fn verify_pairing(
        env: &Env,
        vk: &VerificationKey,
        proof: &Proof,
        pub_signals: &Vec<Fr>,
    ) -> Result<bool, VerifyError> {
        let bn = env.crypto().bn254();

        if pub_signals.len() + 1 != vk.ic.len() {
            return Err(VerifyError::MalformedInputs);
        }

        // vk_x = ic[0] + sum(pub_signals[i] * ic[i+1])
        // Skip infinity IC points (they contribute the identity element). The
        // first non-infinity term seeds vk_x; if all are infinity the pairing
        // still holds with the alpha/beta term.
        let mut vk_x: Option<G1Affine> = None;
        let ic0 = vk.ic.get(0).ok_or(VerifyError::MalformedInputs)?;
        if !Self::is_infinity(&ic0) {
            vk_x = Some(ic0.clone());
        }
        for (s, v) in pub_signals.iter().zip(vk.ic.iter().skip(1)) {
            if Self::is_infinity(&v) {
                continue;
            }
            let prod = bn.g1_mul(&v, &s);
            vk_x = match vk_x {
                None => Some(prod),
                Some(acc) => Some(bn.g1_add(&acc, &prod)),
            };
        }
        // vk_x defaults to the G1 generator's neutral form if every term was
        // infinity (should not happen for this circuit). Use IC[4] generator as
        // a safe non-infinity fallback identity is not available, so instead we
        // require at least one real term.
        let vk_x = vk_x.ok_or(VerifyError::MalformedInputs)?;

        // Pairing check: e(-A, B) * e(alpha, beta) * e(vk_x, gamma) * e(C, delta) == 1
        let neg_a = -proof.a.clone();
        let vp1 = vec![env, neg_a, vk.alpha.clone(), vk_x, proof.c.clone()];
        let vp2 = vec![env, proof.b.clone(), vk.beta.clone(), vk.gamma.clone(), vk.delta.clone()];

        if bn.pairing_check(vp1, vp2) {
            Ok(true)
        } else {
            Err(VerifyError::ProofRejected)
        }
    }
}

mod test;
