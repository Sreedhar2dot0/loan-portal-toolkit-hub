
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, Bell, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

const Topbar: React.FC = () => {
  const isMobile = useIsMobile();
  const [environment, setEnvironment] = useState("UAT");

  const toggleSidebar = () => {
    // This would be implemented with a state management approach
    // For now it's just a placeholder
    console.log("Toggle sidebar");
  };

  return (
    <header className="border-b border-border py-3 px-4 bg-background flex items-center justify-between">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu size={20} />
        </Button>
      )}

      <div className="flex items-center space-x-4">
        {isMobile && (
          <div className="font-semibold text-lg">Loan Portal</div>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Badge className={environment === "UAT" ? "bg-amber-500" : "bg-green-500"}>
                {environment}
              </Badge>
              <span>Environment</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setEnvironment("UAT")}>
              <Badge className="bg-amber-500 mr-2">UAT</Badge> Test Environment
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEnvironment("PROD")}>
              <Badge className="bg-green-500 mr-2">PROD</Badge> Production Environment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <Bell size={20} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User size={20} />
              <span className="hidden md:inline">John Smith</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link to="/profile" className="w-full">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/settings" className="w-full">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;
