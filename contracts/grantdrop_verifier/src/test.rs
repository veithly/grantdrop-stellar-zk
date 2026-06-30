#![cfg(test)]
extern crate std;

use soroban_sdk::{
    crypto::bn254::{Bn254G1Affine as G1Affine, Bn254G2Affine as G2Affine, Fr},
    BytesN, Env, Vec, U256,
};

use crate::{GrantDropVerifier, GrantDropVerifierClient, Proof, VerificationKey};

// G1 from decimal big-endian field coords. Soroban BN254 G1 = be(X) || be(Y).
fn g1_from_coords(env: &Env, x: &str, y: &str) -> G1Affine {
    let mut buf = [0u8; 64];
    be_pad(x, &mut buf[0..32]);
    be_pad(y, &mut buf[32..64]);
    G1Affine::from_bytes(BytesN::from_array(env, &buf))
}

// G2 from snarkjs Fq2 pairs. Soroban BN254 G2 = be(X_c1)||be(X_c0)||be(Y_c1)||be(Y_c0).
fn g2_from_coords(env: &Env, c0_x: &str, c1_x: &str, c0_y: &str, c1_y: &str) -> G2Affine {
    let mut buf = [0u8; 128];
    be_pad(c1_x, &mut buf[0..32]);
    be_pad(c0_x, &mut buf[32..64]);
    be_pad(c1_y, &mut buf[64..96]);
    be_pad(c0_y, &mut buf[96..128]);
    G2Affine::from_bytes(BytesN::from_array(env, &buf))
}

fn fr_from_dec(env: &Env, s: &str) -> Fr {
    let mut buf = [0u8; 32];
    be_pad(s, &mut buf[..]);
    Fr::from_bytes(BytesN::from_array(env, &buf))
}

fn be_pad(dec: &str, out: &mut [u8]) {
    let bytes = decimal_to_bytes(dec);
    let mut padded: std::vec::Vec<u8> = bytes;
    if padded.len() > out.len() {
        padded = padded[padded.len() - out.len()..].to_vec();
    } else {
        let mut full = std::vec::Vec::with_capacity(out.len());
        full.resize(out.len() - padded.len(), 0u8);
        full.extend_from_slice(&padded);
        padded = full;
    }
    out.copy_from_slice(&padded);
}

fn decimal_to_bytes(dec: &str) -> std::vec::Vec<u8> {
    let mut v: std::vec::Vec<u8> = std::vec![0u8];
    for d in dec.bytes() {
        if !d.is_ascii_digit() {
            continue;
        }
        let n = (d - b'0') as u16;
        let mut carry = n;
        for b in v.iter_mut() {
            let acc = (*b as u16) * 10u16 + carry;
            *b = (acc & 0xff) as u8;
            carry = acc >> 8;
        }
        while carry > 0 {
            v.push((carry & 0xff) as u8);
            carry >>= 8;
        }
    }
    while v.len() > 1 && *v.last().unwrap() == 0 {
        v.pop();
    }
    v.reverse();
    v
}

// Values from public/proofs/verification_key.json (non-degenerate circuit).
fn build_vk(env: &Env) -> VerificationKey {
    let alpha = g1_from_coords(env, "1", "2");
    let beta = g2_from_coords(
        env,
        "10857046999023057135944570762232829481370756359578518086990519993285655852781",
        "11559732032986387107991004021392285783925812861821192530917403151452391805634",
        "8495653923123431417604973247489272438418190587263600148770280649306958101930",
        "4082367875863433681332203403145435568316851327593401208105741076214120093531",
    );
    let gamma = g2_from_coords(
        env,
        "10857046999023057135944570762232829481370756359578518086990519993285655852781",
        "11559732032986387107991004021392285783925812861821192530917403151452391805634",
        "8495653923123431417604973247489272438418190587263600148770280649306958101930",
        "4082367875863433681332203403145435568316851327593401208105741076214120093531",
    );
    let delta = g2_from_coords(
        env,
        "3364173942148885407151086718766070028298102150216470805642722731720671922098",
        "12080595528543059968565507074062514619485801725111296426902010508185119150172",
        "7969653720605381580077773160816143028211246944153125470337183676998090427844",
        "3596654362422945782871299935750630912561995691959518733667699795923028979807",
    );
    // IC: [0]=infinity, [1]=real, [2]=infinity, [3]=real, [4]=generator
    let ic = Vec::from_array(
        env,
        [
            g1_from_coords(env, "0", "1"),
            g1_from_coords(env, "1", "21888242871839275222246405745257275088696311157297823662689037894645226208581"),
            g1_from_coords(env, "0", "1"),
            g1_from_coords(env, "2672242651313367459976336264061690128665099451055893690004467838496751824703", "18247534626997477790812670345925575171672701304065784723769023620148097699216"),
            g1_from_coords(env, "1", "2"),
        ],
    );
    VerificationKey { alpha, beta, gamma, delta, ic }
}

// Values from build/proofs/proof.json.
fn build_valid_proof(env: &Env) -> Proof {
    let a = g1_from_coords(
        env,
        "9761382511361765907227742240405045745806373113915440178668079272848124879691",
        "11667119366267320113870088691505799721117947618839586458517940086241113013248",
    );
    let b = g2_from_coords(
        env,
        "8241839364284938092340808236313932234945693169328765925040250411172215291554",
        "6095881849204896528143387044380546700921348171629669363583654764872379135566",
        "2488684449197306029978193112923847418197536547446423222644189276974720885419",
        "14778193468357121180297407476419163607454005826224017740149352310516178882126",
    );
    let c = g1_from_coords(
        env,
        "6136640805715494406431289128292526607394349497279125733007213491825537468196",
        "14588249974613192271793197513919199057523936840333646193489463440516607671431",
    );
    Proof { a, b, c }
}

// public signals: [nullifier, secretSquare, campaignId, walletBinding]
fn public_signals(env: &Env) -> Vec<Fr> {
    Vec::from_array(
        env,
        [
            fr_from_dec(env, "160443892157"),
            fr_from_dec(env, "410492763305641"),
            fr_from_dec(env, "1701"),
            fr_from_dec(env, "12345"),
        ],
    )
}

fn expected_secret_square(env: &Env) -> U256 {
    // 20260621^2 = 410492763305641
    U256::from_u128(env, 410492763305641u128)
}

#[test]
fn valid_claim_passes_on_chain() {
    let env = Env::default();
    let client = GrantDropVerifierClient::new(&env, &env.register(GrantDropVerifier {}, ()));
    let vk = build_vk(&env);
    let proof = build_valid_proof(&env);
    let pub_signals = public_signals(&env);
    let result = client.verify_claim(&vk, &proof, &pub_signals, &expected_secret_square(&env));
    assert!(result);
}

#[test]
#[should_panic]
fn tampered_proof_is_rejected() {
    let env = Env::default();
    let client = GrantDropVerifierClient::new(&env, &env.register(GrantDropVerifier {}, ()));
    let vk = build_vk(&env);
    let mut proof = build_valid_proof(&env);
    proof.c = g1_from_coords(&env, "1", "2");
    let pub_signals = public_signals(&env);
    client.verify_claim(&vk, &proof, &pub_signals, &expected_secret_square(&env));
}

#[test]
#[should_panic]
fn wrong_secret_square_is_ineligible() {
    let env = Env::default();
    let client = GrantDropVerifierClient::new(&env, &env.register(GrantDropVerifier {}, ()));
    let vk = build_vk(&env);
    let proof = build_valid_proof(&env);
    // A wrong secret would produce secretSquare=99980001, not the expected value.
    let pub_signals = Vec::from_array(
        &env,
        [
            fr_from_dec(&env, "79216539"),
            fr_from_dec(&env, "99980001"),
            fr_from_dec(&env, "1701"),
            fr_from_dec(&env, "12345"),
        ],
    );
    client.verify_claim(&vk, &proof, &pub_signals, &expected_secret_square(&env));
}

#[test]
#[should_panic]
fn tampered_wallet_binding_is_rejected() {
    let env = Env::default();
    let client = GrantDropVerifierClient::new(&env, &env.register(GrantDropVerifier {}, ()));
    let vk = build_vk(&env);
    let proof = build_valid_proof(&env);
    // Swap walletBinding so public inputs no longer match the proof binding.
    let pub_signals = Vec::from_array(
        &env,
        [
            fr_from_dec(&env, "160443892157"),
            fr_from_dec(&env, "410492763305641"),
            fr_from_dec(&env, "1701"),
            fr_from_dec(&env, "99999"),
        ],
    );
    client.verify_claim(&vk, &proof, &pub_signals, &expected_secret_square(&env));
}



