
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Heart, Won } from "lucide-react";

const mockFamilyMembers = [
  {
    id: 1,
    name: "김수진",
    role: "엄마",
    avatar: "수",
    promiseCount: 12,
    completionRate: 85,
    balance: 45000, // 보유 금액으로 변경
    badges: ["신뢰왕", "약속지킴이"]
  },
  {
    id: 2,
    name: "김민준",
    role: "아들",
    avatar: "민",
    promiseCount: 8,
    completionRate: 90,
    balance: 12000, // 보유 금액으로 변경
    badges: ["집안일왕", "숙제킹"]
  }
];

const FamilyMembers = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockFamilyMembers.map((member) => (
        <Card key={member.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="family-warm text-lg font-bold">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">약속 이행률</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full family-success transition-all duration-500"
                    style={{ width: `${member.completionRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{member.completionRate}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">보유 금액</span>
              <div className="flex items-center space-x-1">
                <Won className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-700">₩{member.balance.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">총 약속 수</span>
              <span className="font-medium">{member.promiseCount}개</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {member.badges.map((badge, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  <Trophy className="w-3 h-3 mr-1" />
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FamilyMembers;
