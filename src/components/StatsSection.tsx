
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, Award, Calendar, Plus, Minus, Wallet } from "lucide-react";

const StatsSection = () => {
  const stats = {
    totalPromises: 20,
    completedPromises: 17,
    activePromises: 3,
    completionRate: 85,
    myBalance: 45000, // 개인 보유 금액
    thisWeek: {
      promises: 5,
      completed: 4
    }
  };

  // 개인별 잔액 데이터
  const familyBalances = [
    { name: "김수진", role: "엄마", balance: 45000 },
    { name: "김민준", role: "아들", balance: 12000 }
  ];

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
            ₩{stats.myBalance.toLocaleString()}
          </div>
          <p className="text-sm text-green-600 mt-1">
            사용 가능한 금액
          </p>
        </CardContent>
      </Card>

      {/* 가족 구성원별 잔액 */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">가족 구성원 잔액</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {familyBalances.map((member, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ₩{member.balance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 기존 통계 정보 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">이행률</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <Progress value={stats.completionRate} className="mt-2" />
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
