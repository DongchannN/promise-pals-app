import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Trophy, Heart, CheckCircle, Clock, User, Shield } from "lucide-react";

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  promiseCount?: number;
  activePromises?: number;
  isCurrentUser?: boolean;
  balance?: number;
  badges?: string[];
  userType: "child" | "parent";
}

interface FamilyMembersProps {
  familyMembers: FamilyMember[];
}

const FamilyMembers = ({ familyMembers, setViewMode }: FamilyMembersProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {familyMembers.map((member) => (
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
            {member.isCurrentUser && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-sm font-medium text-green-700">{member.userType === 'child' ? "내 용돈" : "내 잔액"}</span>
                <span className="font-bold text-green-700">₩{member.balance!.toLocaleString()}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">진행 중인 약속</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{member.activePromises}개</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">총 약속 수</span>
              <span className="font-medium">{member.promiseCount}개</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {member.badges?.map((badge, idx) => (
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
