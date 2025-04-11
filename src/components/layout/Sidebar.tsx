
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Key,
  FileText,
  Download,
  Settings,
  Layers,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "API Keys", path: "/api-keys", icon: <Key size={20} /> },
    { name: "Documentation", path: "/documentation", icon: <FileText size={20} /> },
    { name: "Collections", path: "/collections", icon: <Download size={20} /> },
    { name: "Environments", path: "/environments", icon: <Layers size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "Support", path: "/support", icon: <HelpCircle size={20} /> },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-sidebar flex flex-col border-r border-sidebar-border",
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-loan-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">LP</span>
          </div>
          <span className="text-sidebar-foreground font-semibold text-lg">Loan Portal</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sidebar-foreground h-10",
                  isActive(item.path) 
                    ? "bg-sidebar-accent hover:bg-sidebar-accent" 
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-sidebar-foreground h-10 hover:bg-sidebar-accent/50">
          <LogOut size={20} className="mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
