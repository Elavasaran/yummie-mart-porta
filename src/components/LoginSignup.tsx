import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface LoginSignupProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginSignup = ({ onClose, onLogin }: LoginSignupProps) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    shopName: "",
    address: "",
    phone: "",
  });

  const handleSendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      toast.success("OTP sent successfully!");
    } else {
      toast.error("Please enter a valid 10-digit phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      onLogin();
      toast.success("Login successful!");
      onClose();
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  const handleSignup = () => {
    if (signupData.name && signupData.phone && signupData.shopName) {
      onLogin();
      toast.success("Registration successful!");
      onClose();
    } else {
      toast.error("Please fill all required fields");
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Yummie Mart</CardTitle>
          <CardDescription>Login or create a new account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  disabled={otpSent}
                />
              </div>
              
              {otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
              )}
              
              <div className="flex gap-2">
                {!otpSent ? (
                  <Button onClick={handleSendOtp} className="flex-1">
                    Send OTP
                  </Button>
                ) : (
                  <Button onClick={handleVerifyOtp} className="flex-1">
                    Verify & Login
                  </Button>
                )}
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shopName">Company/Shop Name *</Label>
                <Input
                  id="shopName"
                  placeholder="Enter company or shop name"
                  value={signupData.shopName}
                  onChange={(e) => setSignupData({...signupData, shopName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  placeholder="Enter your address"
                  value={signupData.address}
                  onChange={(e) => setSignupData({...signupData, address: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signupPhone">Phone Number *</Label>
                <Input
                  id="signupPhone"
                  placeholder="Enter 10-digit phone number"
                  value={signupData.phone}
                  onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                  maxLength={10}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Certificates (Optional)</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-1" />
                    GST
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-1" />
                    MSME
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-1" />
                    FSSAI
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSignup} className="flex-1">
                  Sign Up
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginSignup;
