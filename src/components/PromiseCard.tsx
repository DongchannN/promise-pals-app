import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Star, Check, X, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Promise } from "@/types/Promise";

interface PromiseCardProps {
  promise: Promise;
  onComplete?: (id: number) => void;
  onVerify?: (id: number, verified: boolean) => void;
}

const PromiseCard = ({ promise, onComplete, onVerify }: PromiseCardProps) => {
  const getStatusBadge = () => {
    switch (promise.status) {
      case "pending":
        return <Badge variant="outline" className="family-warning">승인 대기</Badge>;
      case "active":
        return <Badge className="family-success">진행 중</Badge>;
      case "completed":
        return <Badge className="family-success">완료</Badge>;
      case "failed":
        return <Badge variant="destructive">실패</Badge>;
      case "disputed":
        return <Badge variant="outline" className="family-warning">검토 중</Badge>;
      default:
        return null;
    }
  };

  const getTypeIcon = () => {
    return promise.type === "reward" ? (
      <Star className="w-4 h-4 text-yellow-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-red-500" />
    );
  };

  const isExpired = new Date() > promise.deadline;
  const daysLeft = Math.ceil((promise.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 flex items-center space-x-2">
              {getTypeIcon()}
              <span>{promise.title}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-3">{promise.description}</p>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs family-warm">
                {promise.performer.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">실행: {promise.performer}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs family-love">
                {promise.beneficiary.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">
              {promise.type === "reward" ? "보상" : "페널티"}: {promise.beneficiary}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">{promise.rewardAmount.toLocaleString()}P</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4" />
            <span className={isExpired ? "text-red-500" : "text-muted-foreground"}>
              {isExpired ? "마감됨" : `${daysLeft}일 남음`}
            </span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          마감: {format(promise.deadline, "yyyy년 M월 d일 HH:mm", { locale: ko })}
        </div>

        {promise.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>진행률</span>
              <span>{promise.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full family-success transition-all duration-500"
                style={{ width: `${promise.progress}%` }}
              />
            </div>
          </div>
        )}
        
        {promise.status === "active" && !isExpired && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onComplete?.(promise.id)}
            >
              <Check className="w-4 h-4 mr-1" />
              완료 체크
            </Button>
          </div>
        )}
        
        {promise.status === "pending" && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onVerify?.(promise.id, true)}
            >
              <Check className="w-4 h-4 mr-1" />
              승인
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => onVerify?.(promise.id, false)}
            >
              <X className="w-4 h-4 mr-1" />
              거절
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromiseCard;
