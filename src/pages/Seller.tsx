import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SellerSidebar from "@/components/seller/SellerSidebar";
import SellerSignup from "@/components/seller/SellerSignup";
import SellerDashboard from "@/components/SellerDashboard";
import SellerProducts from "@/components/SellerProducts";
import SellerOrders from "@/components/SellerOrders";
import SellerQuotes from "@/pages/seller/SellerQuotes";
import SellerPayouts from "@/pages/seller/SellerPayouts";
import SellerKYC from "@/pages/seller/SellerKYC";
import SellerSettings from "@/pages/seller/SellerSettings";

const Seller = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <SellerSignup 
        onClose={() => window.location.href = "/"} 
        onSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <SellerSidebar onLogout={handleLogout} />
      
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<SellerDashboard />} />
            <Route path="/products" element={<SellerProducts />} />
            <Route path="/quotes" element={<SellerQuotes />} />
            <Route path="/orders" element={<SellerOrders />} />
            <Route path="/payouts" element={<SellerPayouts />} />
            <Route path="/kyc" element={<SellerKYC />} />
            <Route path="/settings" element={<SellerSettings />} />
            <Route path="*" element={<Navigate to="/seller" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Seller;
