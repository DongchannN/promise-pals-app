
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onCreatePromise: () => void;
}

const Header = ({ onCreatePromise }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full family-love">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">우리가족 약속</h1>
            <p className="text-sm text-muted-foreground">Family Promise</p>
          </div>
        </div>
        
        <Button 
          onClick={onCreatePromise}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          새 약속 만들기
        </Button>
      </div>
    </header>
  );
};

export default Header;
