
export type Promise = {
  id: number;
  title: string;
  description: string;
  reward: string;
  penalty: string;
  status: "pending" | "kept" | "broken";
  rewardTo: string;
  penaltyTo: string;
};
