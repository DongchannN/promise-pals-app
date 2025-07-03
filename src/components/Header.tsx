
import { Heart, Plus, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface HeaderProps {
  onCreatePromise: () => void;
  viewMode: "child" | "parent";
  setViewMode: (mode: "child" | "parent") => void;
}

const Header = ({ onCreatePromise, viewMode, setViewMode }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full family-love">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">우리가족 약속</h1>
              <p className="text-sm text-muted-foreground">Family Promise</p>
            </div>
          </div>
          <ToggleGroup 
            type="single" 
            value={viewMode} 
            onValueChange={(value: "child" | "parent") => setViewMode(value)}
            className="hidden md:flex"
          >
            <ToggleGroupItem value="child" aria-label="Toggle child mode">
              <User className="h-4 w-4 mr-2" />
              어린이
            </ToggleGroupItem>
            <ToggleGroupItem value="parent" aria-label="Toggle parent mode">
              <Shield className="h-4 w-4 mr-2" />
              보호자
            </ToggleGroupItem>
          </ToggleGroup>
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
