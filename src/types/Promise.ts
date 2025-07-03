export type Promise = {
  id: number;
  title: string;
  description: string;
  performer: string;
  creator: string;
  rewardAmount: number;
  deadline: string | Date;
  status: "pending" | "active" | "completed" | "failed";
  type: "reward" | "penalty";
  category: string;
};
