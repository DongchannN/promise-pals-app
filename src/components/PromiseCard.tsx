
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Star, Check, X, AlertCircle, DollarSign, CheckCircle, XCircle, TrendingUp, TrendingDown } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Promise } from "@/types/Promise";

interface PromiseCardProps {
  promise: Promise;
  onComplete?: (id: number) => void;
  onVerify?: (id: number, verified: boolean) => void;
  onClick?: (promise: Promise) => void;
}

const PromiseCard = ({ promise, onComplete, onVerify, onClick }: PromiseCardProps) => {
  const getStatusBadge = () => {
    switch (promise.status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">승인 대기</Badge>;
      case "active":
        return <Badge className="bg-blue-50 text-blue-700 border-blue-300">진행 중</Badge>;
      case "completed":
        return <Badge className="bg-green-50 text-green-700 border-green-300">완료</Badge>;
      case "failed":
        return <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-300">실패</Badge>;
      case "disputed":
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">검토 중</Badge>;
      default:
        return null;
    }
  };

  const getTypeDisplay = () => {
    if (promise.type === "reward") {
      return {
        icon: <Star className="w-4 h-4 text-yellow-500" />,
        label: "보상",
        amountColor: "text-green-600",
        bgColor: "bg-green-50 border-green-200",
        trendIcon: <TrendingUp className="w-4 h-4 text-green-500" />
      };
    } else {
      return {
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
        label: "패널티",
        amountColor: "text-red-600",
        bgColor: "bg-red-50 border-red-200",
        trendIcon: <TrendingDown className="w-4 h-4 text-red-500" />
      };
    }
  };

  const getStatusIcon = () => {
    switch (promise.status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "active":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const typeDisplay = getTypeDisplay();
  const isExpired = new Date() > promise.deadline;
  const daysLeft = Math.ceil((promise.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
      onClick={() => onClick?.(promise)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 flex items-center space-x-2">
              {typeDisplay.icon}
              <span>{promise.title}</span>
              {getStatusIcon()}
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{promise.description}</p>
          </div>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                {promise.performer.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">실행자: {promise.performer}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                {promise.creator.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-muted-foreground">등록자: {promise.creator}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 보상/패널티 금액 - 구분 강화 */}
        <div className={`p-3 rounded-lg border ${typeDisplay.bgColor}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {typeDisplay.trendIcon}
              <span className="font-medium text-sm">{typeDisplay.label}</span>
            </div>
            <div className="text-right">
              <span className={`text-xl font-bold ${typeDisplay.amountColor}`}>
                ₩{promise.rewardAmount.toLocaleString()}
              </span>
              {promise.type === "penalty" && (
                <div className="text-xs text-red-500 mt-1">차감 예정</div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className={isExpired ? "text-red-500" : "text-muted-foreground"}>
              {isExpired ? "마감됨" : `${daysLeft}일 남음`}
            </span>
          </div>
          <div className="text-muted-foreground">
            {format(promise.deadline, "M/d HH:mm", { locale: ko })}
          </div>
        </div>
        
        {promise.status === "active" && !isExpired && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.(promise.id);
              }}
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
              onClick={(e) => {
                e.stopPropagation();
                onVerify?.(promise.id, true);
              }}
            >
              <Check className="w-4 h-4 mr-1" />
              승인
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onVerify?.(promise.id, false);
              }}
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
