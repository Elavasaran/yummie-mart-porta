import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface SellerSignupProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SellerSignup = ({ onClose, onSuccess }: SellerSignupProps) => {
  const [step, setStep] = useState(1);
  const [loginData, setLoginData] = useState({
    phone: "",
    otp: "",
    otpSent: false,
  });
  
  const [signupData, setSignupData] = useState({
    sellerName: "",
    companyName: "",
    gstNumber: "",
    msmeNumber: "",
    fssaiNumber: "",
    email: "",
    phone: "",
    address: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
  });

  const [documents, setDocuments] = useState({
    gstCertificate: null as File | null,
    msmeCertificate: null as File | null,
    fssaiCertificate: null as File | null,
    cancelledCheque: null as File | null,
    addressProof: null as File | null,
  });

  const handleSendOtp = (method: "sms" | "whatsapp") => {
    if (loginData.phone.length === 10) {
      setLoginData({ ...loginData, otpSent: true });
      toast.success(`OTP sent via ${method === "sms" ? "SMS" : "WhatsApp"}!`);
    } else {
      toast.error("Please enter a valid 10-digit phone number");
    }
  };

  const handleVerifyOtp = () => {
    if (loginData.otp.length === 6) {
      onSuccess();
      toast.success("Login successful!");
    } else {
      toast.error("Please enter a valid 6-digit OTP");
    }
  };

  const handleFileChange = (field: keyof typeof documents, file: File | null) => {
    setDocuments({ ...documents, [field]: file });
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!signupData.sellerName || !signupData.companyName || !signupData.gstNumber || !signupData.email || !signupData.phone) {
        toast.error("Please fill all required fields");
        return;
      }
    } else if (step === 2) {
      if (!signupData.accountNumber || !signupData.ifsc || !signupData.bankName) {
        toast.error("Please fill all bank details");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSignup = () => {
    if (!documents.gstCertificate || !documents.cancelledCheque) {
      toast.error("Please upload required documents");
      return;
    }
    onSuccess();
    toast.success("Registration successful! Your account is under review.");
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader>
          <CardTitle>Seller Portal</CardTitle>
          <CardDescription>Login or register as a seller</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-phone">Phone Number</Label>
                <Input
                  id="login-phone"
                  placeholder="Enter 10-digit phone number"
                  value={loginData.phone}
                  onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                  maxLength={10}
                  disabled={loginData.otpSent}
                />
              </div>

              {loginData.otpSent && (
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={loginData.otp}
                    onChange={(e) => setLoginData({ ...loginData, otp: e.target.value })}
                    maxLength={6}
                  />
                </div>
              )}

              <div className="flex gap-2">
                {!loginData.otpSent ? (
                  <>
                    <Button onClick={() => handleSendOtp("sms")} className="flex-1">
                      Send SMS OTP
                    </Button>
                    <Button onClick={() => handleSendOtp("whatsapp")} variant="outline" className="flex-1">
                      WhatsApp OTP
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleVerifyOtp} className="flex-1">
                    Verify & Login
                  </Button>
                )}
              </div>
              <Button variant="outline" onClick={onClose} className="w-full">
                Cancel
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Seller Name *</Label>
                      <Input
                        value={signupData.sellerName}
                        onChange={(e) => setSignupData({ ...signupData, sellerName: e.target.value })}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company/Shop Name *</Label>
                      <Input
                        value={signupData.companyName}
                        onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                        placeholder="Business name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GST Number *</Label>
                      <Input
                        value={signupData.gstNumber}
                        onChange={(e) => setSignupData({ ...signupData, gstNumber: e.target.value })}
                        placeholder="GST registration number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>MSME Number</Label>
                      <Input
                        value={signupData.msmeNumber}
                        onChange={(e) => setSignupData({ ...signupData, msmeNumber: e.target.value })}
                        placeholder="Optional"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>FSSAI Number</Label>
                      <Input
                        value={signupData.fssaiNumber}
                        onChange={(e) => setSignupData({ ...signupData, fssaiNumber: e.target.value })}
                        placeholder="For food sellers"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                        placeholder="10-digit number"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address *</Label>
                    <Input
                      value={signupData.address}
                      onChange={(e) => setSignupData({ ...signupData, address: e.target.value })}
                      placeholder="Complete business address"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Bank Account Details</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Account Number *</Label>
                      <Input
                        value={signupData.accountNumber}
                        onChange={(e) => setSignupData({ ...signupData, accountNumber: e.target.value })}
                        placeholder="Bank account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>IFSC Code *</Label>
                      <Input
                        value={signupData.ifsc}
                        onChange={(e) => setSignupData({ ...signupData, ifsc: e.target.value })}
                        placeholder="Bank IFSC code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Name *</Label>
                      <Input
                        value={signupData.bankName}
                        onChange={(e) => setSignupData({ ...signupData, bankName: e.target.value })}
                        placeholder="Name of your bank"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Document Upload</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>GST Certificate *</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange("gstCertificate", e.target.files?.[0] || null)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>MSME Certificate</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange("msmeCertificate", e.target.files?.[0] || null)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>FSSAI Certificate</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange("fssaiCertificate", e.target.files?.[0] || null)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Cancelled Cheque *</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange("cancelledCheque", e.target.files?.[0] || null)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Address Proof</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange("addressProof", e.target.files?.[0] || null)}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={handleNextStep} className="flex-1">
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleSignup} className="flex-1">
                    Submit Registration
                  </Button>
                )}
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

export default SellerSignup;
