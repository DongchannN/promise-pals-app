
import { cn } from "@/lib/utils";
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
  onFail?: (id: number) => void;
  onVerify?: (id: number, verified: boolean) => void;
  onClick?: (promise: Promise) => void;
  viewMode: "child" | "parent";
}

const PromiseCard = ({ promise, onComplete, onFail, onVerify, onClick, viewMode }: PromiseCardProps) => {
  const { title, performer, creator, rewardAmount, deadline, status, type, category } = promise;
  const isChildMode = viewMode === "child";

  const cardClasses = cn(
    "rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border-2",
    status === "active" && "border-blue-400 bg-blue-50",
    status === "pending" && "border-yellow-400 bg-yellow-50",
    status === "completed" && "border-green-400 bg-green-50",
    status === "failed" && "border-red-400 bg-red-50",
    isChildMode && "p-6"
  );

  const titleClasses = cn(
    "font-bold tracking-tight",
    isChildMode ? "text-2xl" : "text-xl"
  );

  const buttonClasses = cn(
    isChildMode ? "py-4 px-6 text-lg" : "py-2 px-4 text-sm"
  );
    

  return (
    <Card 
      className={cardClasses}
      onClick={() => onClick?.(promise)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className={titleClasses}>
              {promise.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{promise.description}</p>
          </div>
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
        <div className={`p-3 rounded-lg border`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">{isChildMode ? (promise.type === "reward" ? "선물" : "아쉬워요") : (promise.type === "reward" ? "보상" : "패널티")}</span>
            </div>
            <div className="text-right">
              <span className={`text-xl font-bold`}>
                ₩{promise.rewardAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>
              {`${Math.ceil((promise.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}일 남음`}
            </span>
          </div>
          <div className="text-muted-foreground">
            {format(promise.deadline, "M/d HH:mm", { locale: ko })}
          </div>
        </div>
        
        {promise.status === "active" && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className={buttonClasses}
              onClick={(e) => {
                e.stopPropagation();
                onComplete?.(promise.id);
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", isChildMode && "h-6 w-6")} />
              {isChildMode ? "다 했어요!" : "완료 체크"}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className={buttonClasses}
              onClick={(e) => {
                e.stopPropagation();
                onFail?.(promise.id);
              }}
            >
              <X className={cn("mr-2 h-4 w-4", isChildMode && "h-6 w-6")} />
              {isChildMode ? "못 했어요!" : "실패 체크"}
            </Button>
          </div>
        )}
        
        {promise.status === "pending" && (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className={buttonClasses}
              onClick={(e) => {
                e.stopPropagation();
                onVerify?.(promise.id, true);
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", isChildMode && "h-6 w-6")} />
              {isChildMode ? "좋아!" : "승인"}
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className={buttonClasses}
              onClick={(e) => {
                e.stopPropagation();
                onVerify?.(promise.id, false);
              }}
            >
              <X className={cn("mr-2 h-4 w-4", isChildMode && "h-6 w-6")} />
              {isChildMode ? "싫어!" : "거절"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromiseCard;
