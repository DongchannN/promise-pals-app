
export interface Promise {
  id: number;
  title: string;
  description: string;
  performer: string; // 실행자 (보상/패널티 받는 사람과 동일)
  creator: string; // 등록자 (약속을 만든 사람)
  rewardAmount: number;
  deadline: Date;
  status: "pending" | "active" | "completed" | "failed" | "disputed";
  type: "reward" | "penalty";
  category: string;
}
