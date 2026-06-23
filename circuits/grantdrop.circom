template GrantDropEligibility() {
  signal private input secret;
  signal input campaignId;
  signal input walletBinding;
  signal input nullifier;
  signal output validMarker;

  secret === 20260621;
  campaignId === 1701;
  nullifier === secret * 7919 + campaignId * 13 + walletBinding;
  validMarker <== 1;
}

component main = GrantDropEligibility();
