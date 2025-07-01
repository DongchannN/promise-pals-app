
export interface Promise {
  id: number;
  title: string;
  description: string;
  performer: string;
  beneficiary: string;
  rewardAmount: number;
  deadline: Date;
  status: "pending" | "active" | "completed" | "failed" | "disputed";
  type: "reward" | "penalty";
  category: string;
  progress?: number;
}
