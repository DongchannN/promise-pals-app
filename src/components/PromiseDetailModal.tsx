
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Clock, Star, Check, X, AlertCircle, DollarSign, CheckCircle, XCircle, Calendar, User, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Promise } from "@/types/Promise";
import { useState } from "react";

interface PromiseDetailModalProps {
  promise: Promise | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (id: number) => void;
  onVerify?: (id: number, verified: boolean) => void;
}

const PromiseDetailModal = ({ promise, isOpen, onClose, onComplete, onVerify }: PromiseDetailModalProps) => {
  const [feedback, setFeedback] = useState("");

  if (!promise) return null;

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
        icon: <Star className="w-5 h-5 text-yellow-500" />,
        label: "보상",
        amountColor: "text-green-600",
        bgColor: "bg-green-50 border-green-200"
      };
    } else {
      return {
        icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        label: "패널티",
        amountColor: "text-red-600",
        bgColor: "bg-red-50 border-red-200"
      };
    }
  };

  const typeDisplay = getTypeDisplay();
  const isExpired = new Date() > promise.deadline;
  const daysLeft = Math.ceil((promise.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getProgressPercentage = () => {
    if (promise.status === "completed") return 100;
    if (promise.status === "failed") return 0;
    if (promise.status === "active") return 50; // 진행 중일 때는 50%로 표시
    return 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {typeDisplay.icon}
            <span>{promise.title}</span>
            {getStatusBadge()}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 약속 정보 */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-gray-50">
              <h4 className="font-medium mb-2">약속 내용</h4>
              <p className="text-sm text-muted-foreground">{promise.description}</p>
            </div>

            {/* 금액 정보 - 보상/패널티 구분 */}
            <div className={`p-4 rounded-lg border ${typeDisplay.bgColor}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{typeDisplay.label} 금액</span>
                </div>
                <span className={`text-2xl font-bold ${typeDisplay.amountColor}`}>
                  ₩{promise.rewardAmount.toLocaleString()}
                </span>
              </div>
              {promise.type === "penalty" && (
                <p className="text-sm text-red-600 mt-2">
                  * 약속을 지키지 못하면 차감됩니다
                </p>
              )}
            </div>

            {/* 참여자 정보 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-sm">실행자</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-sm bg-blue-100 text-blue-700">
                      {promise.performer.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{promise.performer}</span>
                </div>
              </div>
              
              <div className="p-3 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-sm">등록자</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-sm bg-purple-100 text-purple-700">
                      {promise.creator.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{promise.creator}</span>
                </div>
              </div>
            </div>

            {/* 진행도 표시 */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">진행도</span>
                <span className="text-sm text-muted-foreground">{getProgressPercentage()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    promise.status === "completed" ? "bg-green-500" : 
                    promise.status === "failed" ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            {/* 마감일 정보 */}
            <div className="p-3 rounded-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-sm">마감일</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {format(promise.deadline, "yyyy년 M월 d일 HH:mm", { locale: ko })}
                  </div>
                  <div className={`text-xs ${isExpired ? "text-red-500" : "text-muted-foreground"}`}>
                    {isExpired ? "마감됨" : `${daysLeft}일 남음`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 피드백 섹션 */}
          <div className="space-y-3">
            <h4 className="font-medium">피드백 작성</h4>
            <Textarea
              placeholder="약속에 대한 피드백을 작성해주세요..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-20"
            />
          </div>

          {/* 액션 버튼 */}
          <div className="flex space-x-2">
            {promise.status === "active" && !isExpired && (
              <Button 
                className="flex-1"
                onClick={() => onComplete?.(promise.id)}
              >
                <Check className="w-4 h-4 mr-1" />
                완료 체크
              </Button>
            )}
            
            {promise.status === "pending" && (
              <>
                <Button 
                  className="flex-1"
                  onClick={() => onVerify?.(promise.id, true)}
                >
                  <Check className="w-4 h-4 mr-1" />
                  승인
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => onVerify?.(promise.id, false)}
                >
                  <X className="w-4 h-4 mr-1" />
                  거절
                </Button>
              </>
            )}
            
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromiseDetailModal;
