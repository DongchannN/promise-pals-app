import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Calendar, Plus, Minus, Wallet, CheckCircle } from "lucide-react";

interface StatsSectionProps {
  myBalance: number;
}

const StatsSection = ({ myBalance }: StatsSectionProps) => {
  const stats = {
    totalPromises: 20,
    completedPromises: 17,
    activePromises: 3,
    thisWeek: {
      promises: 5,
      completed: 4
    }
  };

  return (
    <div className="space-y-6">
      {/* 개인 잔액 및 충전/인출 버튼 */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="h-6 w-6 text-green-600" />
              <CardTitle className="text-xl text-green-800">내 잔액</CardTitle>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-1" />
                충전하기
              </Button>
              <Button size="sm" variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50">
                <Minus className="w-4 h-4 mr-1" />
                인출하기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-700">
            ₩{myBalance.toLocaleString()}
          </div>
          <p className="text-sm text-green-600 mt-1">
            사용 가능한 금액
          </p>
        </CardContent>
      </Card>

      {/* 기존 통계 정보 - 단순화 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 약속</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPromises}</div>
            <p className="text-xs text-muted-foreground">
              현재 진행 중 {stats.activePromises}개
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료된 약속</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedPromises}</div>
            <p className="text-xs text-muted-foreground">
              총 {stats.totalPromises}개 중
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 주</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek.completed}/{stats.thisWeek.promises}</div>
            <p className="text-xs text-muted-foreground">
              완료/전체 약속
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatsSection;
