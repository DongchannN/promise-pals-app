import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import PromiseCard from "@/components/PromiseCard";
import PromiseForm from "@/components/PromiseForm";
import FamilyMembers from "@/components/FamilyMembers";
import StatsSection from "@/components/StatsSection";
import { Promise } from "@/types/Promise";
import mockFamilyMembers from "../components/FamilyMembers";

// Mock data for demo with proper typing
const mockPromises: Promise[] = [
  {
    id: 1,
    title: "민준이 숙제 매일 하기",
    description: "학교 숙제를 매일 저녁 8시까지 완료하기",
    performer: "김민준", // 실행자 (보상도 받는 사람)
    creator: "김수진", // 등록자
    rewardAmount: 10000,
    deadline: new Date(2025, 6, 7, 18, 0),
    status: "active",
    type: "reward",
    category: "공부"
  },
  {
    id: 2,
    title: "일주일 동안 설거지 도와주기",
    description: "매일 저녁 식사 후 설거지를 도와주기",
    performer: "김민준",
    creator: "김수진",
    rewardAmount: 5000,
    deadline: new Date(2025, 6, 10, 20, 0),
    status: "active",
    type: "reward",
    category: "집안일"
  },
  {
    id: 3,
    title: "방 정리하기",
    description: "매일 아침 침실과 책상 정리정돈하기",
    performer: "김민준",
    creator: "김수진",
    rewardAmount: 3000,
    deadline: new Date(2025, 6, 5, 20, 0),
    status: "pending",
    type: "reward",
    category: "집안일"
  },
  {
    id: 4,
    title: "민준이와 놀이공원 가기",
    description: "이번 주말에 민준이와 함께 에버랜드에 가서 하루 종일 놀기",
    performer: "김수진",
    creator: "김민준",
    rewardAmount: 10000,
    deadline: new Date(2025, 6, 7, 18, 0),
    status: "active",
    type: "penalty",
    category: "활동"
  }
];

const Index = () => {
  const [promises, setPromises] = useState<Promise[]>(mockPromises);
  const [familyMembers, setFamilyMembers] = useState<any[]>([
    { id: 1, name: "김수진", role: "엄마", balance: 45000, isCurrentUser: true },
    { id: 2, name: "김민준", role: "아들", balance: 12000, isCurrentUser: false }
  ]);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  // Assume logged-in user is 김수진
  const currentUserName = "김수진";
  const myBalance = familyMembers.find(m => m.name === currentUserName)?.balance || 0;

  const handleCreatePromise = (promiseData: any) => {
    const newPromise: Promise = {
      ...promiseData,
      deadline: promiseData.deadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    };
    
    setPromises(prev => [...prev, newPromise]);
    setShowForm(false);
    
    toast({
      title: "약속이 생성되었어요! 🎉",
      description: `${newPromise.performer}님에게 승인 요청을 보냈습니다.`,
    });
  };

  const handleCompletePromise = (id: number) => {
    const promise = promises.find(p => p.id === id);
    setPromises(prev => 
      prev.map(promise => 
        promise.id === id 
          ? { ...promise, status: "completed" as const }
          : promise
      )
    );
    if (promise) {
      setFamilyMembers(prev => prev.map(member => {
        if (promise.type === "reward") {
          // 보상: 등록자 balance 감소, 실행자 balance 증가
          if (member.name === promise.creator) {
            return { ...member, balance: member.balance - promise.rewardAmount };
          }
          if (member.name === promise.performer) {
            return { ...member, balance: member.balance + promise.rewardAmount };
          }
        } else {
          // 패널티: 실행자 balance 감소
          if (member.name === promise.performer) {
            return { ...member, balance: member.balance - promise.rewardAmount };
          }
        }
        return member;
      }));
      toast({
        title: "약속 완료! 🌟",
        description: `₩${promise.rewardAmount.toLocaleString()} ${promise.type === 'reward' ? '보상이 지급' : '패널티가 차감'}되었습니다.`,
      });
    }
  };

  const handleVerifyPromise = (id: number, verified: boolean) => {
    setPromises(prev => 
      prev.map(promise => 
        promise.id === id 
          ? { ...promise, status: verified ? "active" as const : "failed" as const }
          : promise
      )
    );
    
    toast({
      title: verified ? "약속이 승인되었어요! ✅" : "약속이 거절되었어요",
      description: verified 
        ? "이제 약속을 이행해보세요!" 
        : "다시 한번 상의해보세요.",
    });
  };

  const activePromises = promises.filter(p => p.status === "active");
  const pendingPromises = promises.filter(p => p.status === "pending");
  const completedPromises = promises.filter(p => p.status === "completed" || p.status === "failed");

  // Add stats to each family member
  const getMemberStats = (memberName: string) => {
    const activePromises = promises.filter(
      p => p.performer === memberName && p.status === "active"
    ).length;
    const promiseCount = promises.filter(
      p => p.performer === memberName
    ).length;
    return { activePromises, promiseCount };
  };

  const familyMembersWithStats = familyMembers.map(member => ({
    ...member,
    ...getMemberStats(member.name),
  }));

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header onCreatePromise={() => setShowForm(false)} />
        <div className="container mx-auto px-4 py-8">
          <PromiseForm 
            onSubmit={handleCreatePromise}
            onCancel={() => setShowForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onCreatePromise={() => setShowForm(true)} />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Section */}
        <StatsSection myBalance={myBalance} />
        
        {/* Main Content */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="active" className="data-[state=active]:family-success">
              진행 중 ({activePromises.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:family-warning">
              승인 대기 ({pendingPromises.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:family-warm">
              완료된 약속 ({completedPromises.length})
            </TabsTrigger>
            <TabsTrigger value="family" className="data-[state=active]:family-love">
              가족 현황
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activePromises.length > 0 ? (
                activePromises.map((promise) => (
                  <PromiseCard
                    key={promise.id}
                    promise={promise}
                    onComplete={handleCompletePromise}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">진행 중인 약속이 없어요</p>
                  <p className="text-sm text-muted-foreground">새로운 약속을 만들어보세요! 💖</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pendingPromises.length > 0 ? (
                pendingPromises.map((promise) => (
                  <PromiseCard
                    key={promise.id}
                    promise={promise}
                    onVerify={handleVerifyPromise}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">승인 대기 중인 약속이 없어요</p>
                  <p className="text-sm text-muted-foreground">모든 약속이 처리되었습니다! ✨</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedPromises.length > 0 ? (
                completedPromises.map((promise) => (
                  <PromiseCard key={promise.id} promise={promise} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">완료된 약속이 없어요</p>
                  <p className="text-sm text-muted-foreground">첫 번째 약속을 만들어보세요! 🚀</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <FamilyMembers familyMembers={familyMembersWithStats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
