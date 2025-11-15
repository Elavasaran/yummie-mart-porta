import { CreditCard, Smartphone, FileText, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Payments = () => {
  const paymentMethods = [
    { id: 1, name: "Razorpay", icon: CreditCard, color: "text-secondary" },
    { id: 2, name: "Cashfree", icon: CreditCard, color: "text-primary" },
    { id: 3, name: "PhonePe", icon: Smartphone, color: "text-secondary" },
    { id: 4, name: "Bank Transfer", icon: Building, color: "text-primary" },
    { id: 5, name: "Cheque", icon: FileText, color: "text-muted-foreground" },
  ];

  const handlePayment = (method: string) => {
    toast.info(`${method} payment initiated (Demo)`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Button
                key={method.id}
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handlePayment(method.name)}
              >
                <Icon className={`h-8 w-8 ${method.color}`} />
                <span className="text-sm font-medium">{method.name}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default Payments;
