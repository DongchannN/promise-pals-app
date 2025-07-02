
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon, Heart, Star, AlertCircle, DollarSign, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PromiseFormProps {
  onSubmit: (promiseData: any) => void;
  onCancel: () => void;
}

const mockFamilyMembers = [
  { id: 1, name: "김수진", role: "엄마", balance: 45000, isCurrentUser: true },
  { id: 2, name: "김민준", role: "아들", balance: 12000, isCurrentUser: false }
];

const PromiseForm = ({ onSubmit, onCancel }: PromiseFormProps) => {
  const currentUser = mockFamilyMembers.find(member => member.isCurrentUser);
  const otherMembers = mockFamilyMembers.filter(member => !member.isCurrentUser);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    performer: "",
    creator: currentUser?.name || "", // 자동으로 현재 사용자로 설정
    type: "reward" as "reward" | "penalty",
    amount: "",
    deadline: undefined as Date | undefined,
    category: ""
  });

  const currentUserBalance = currentUser?.balance || 0;
  const isInsufficientBalance = formData.amount && parseInt(formData.amount) > currentUserBalance;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.performer || !formData.amount || !formData.deadline) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (formData.performer === formData.creator) {
      alert("실행자와 등록자는 다른 사람이어야 합니다.");
      return;
    }

    if (isInsufficientBalance) {
      alert("잔액이 부족합니다. 충전 후 다시 시도해주세요.");
      return;
    }
    
    onSubmit({
      ...formData,
      rewardAmount: parseInt(formData.amount),
      id: Date.now(),
      status: "pending"
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-pink-500" />
          <span>새로운 약속 만들기</span>
        </CardTitle>
        <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">
              내 잔액: <strong>₩{currentUserBalance.toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">약속 제목 *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="예: 민준이 숙제 매일 하기"
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">약속 내용</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="약속에 대한 자세한 설명을 입력해주세요."
              className="min-h-20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>약속을 실행할 사람 *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, performer: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  {otherMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name} ({member.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>등록자 (자동 설정)</Label>
              <Input 
                value={formData.creator} 
                disabled 
                className="bg-gray-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>약속 유형</Label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm">패널티</span>
                </div>
                <Switch
                  checked={formData.type === "reward"}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, type: checked ? "reward" : "penalty" }))
                  }
                />
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">보상</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="amount">
                {formData.type === "reward" ? "보상" : "패널티"} 금액 *
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₩
                </div>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="10,000"
                  min="0"
                  step="1000"
                  className={cn(
                    "pl-8",
                    isInsufficientBalance && "border-red-500 focus:border-red-500"
                  )}
                />
              </div>
              {isInsufficientBalance && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    잔액이 부족합니다. 현재 잔액: ₩{currentUserBalance.toLocaleString()}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>마감 기한 *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? (
                    format(formData.deadline, "yyyy년 M월 d일", { locale: ko })
                  ) : (
                    "날짜를 선택해주세요"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
                  onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>카테고리</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="선택해주세요 (선택사항)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="housework">집안일</SelectItem>
                <SelectItem value="study">공부/숙제</SelectItem>
                <SelectItem value="activity">놀이/활동</SelectItem>
                <SelectItem value="health">건강/운동</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1" disabled={isInsufficientBalance}>
              약속 만들기
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PromiseForm;
