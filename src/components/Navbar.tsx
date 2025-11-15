import { ShoppingCart, User, Menu, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
  onAuthClick: () => void;
  isAuthenticated: boolean;
}

const Navbar = ({ cartCount, onAuthClick, isAuthenticated }: NavbarProps) => {
  const location = useLocation();
  const isSellerPage = location.pathname === "/seller";

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent cursor-pointer hover:opacity-90 transition-opacity">
                Yummie Mart
              </h1>
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/">
                <Button
                  variant={!isSellerPage ? "default" : "ghost"}
                  size="sm"
                >
                  Customer
                </Button>
              </Link>
              <Link to="/seller">
                <Button
                  variant={isSellerPage ? "default" : "ghost"}
                  size="sm"
                >
                  <Store className="h-4 w-4 mr-2" />
                  Seller
                </Button>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {!isSellerPage && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => document.getElementById('cart')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            )}
            
            <Button
              variant={isAuthenticated ? "ghost" : "default"}
              size="icon"
              onClick={onAuthClick}
            >
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
