import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  ShoppingCart, 
  Wallet, 
  FileCheck, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SellerSidebarProps {
  onLogout: () => void;
}

const SellerSidebar = ({ onLogout }: SellerSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/seller" },
    { icon: Package, label: "Products", path: "/seller/products" },
    { icon: FileText, label: "Quotes", path: "/seller/quotes" },
    { icon: ShoppingCart, label: "Orders", path: "/seller/orders" },
    { icon: Wallet, label: "Payouts", path: "/seller/payouts" },
    { icon: FileCheck, label: "KYC", path: "/seller/kyc" },
    { icon: Settings, label: "Settings", path: "/seller/settings" },
  ];

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Seller Portal
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    collapsed && "justify-center px-2"
                  )}
                >
                  <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                  {!collapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={onLogout}
            className={cn(
              "w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SellerSidebar;
