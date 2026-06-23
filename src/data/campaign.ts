import type { Campaign } from "@/types";

export const campaign: Campaign = {
  id: "zk-builder-microgrant",
  circuitCampaignId: "1701",
  title: "ZK Builder Microgrant",
  reward: "100 testnet XLM receipt",
  policyVersion: "grantdrop-eligibility-v1",
  oneClaimRule: "One accepted claim per private eligibility.",
};

export const demoSecrets = {
  valid: "20260621",
  invalid: "11111111",
};
