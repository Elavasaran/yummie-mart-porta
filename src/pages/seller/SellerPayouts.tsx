import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Clock, CheckCircle, TrendingUp } from "lucide-react";

interface Payout {
  id: string;
  orderId: string;
  amount: number;
  status: "pending" | "processing" | "paid";
  date: string;
  invoiceVerified: boolean;
}

const SellerPayouts = () => {
  const payouts: Payout[] = [
    {
      id: "PAY-001",
      orderId: "ORD-001",
      amount: 749,
      status: "paid",
      date: "2024-01-10",
      invoiceVerified: true,
    },
    {
      id: "PAY-002",
      orderId: "ORD-002",
      amount: 599,
      status: "processing",
      date: "2024-01-12",
      invoiceVerified: true,
    },
    {
      id: "PAY-003",
      orderId: "ORD-003",
      amount: 898,
      status: "pending",
      date: "2024-01-14",
      invoiceVerified: false,
    },
  ];

  const totalEarnings = payouts.reduce((sum, p) => sum + p.amount, 0);
  const pendingPayouts = payouts.filter(p => p.status === "pending").reduce((sum, p) => sum + p.amount, 0);
  const paidPayouts = payouts.filter(p => p.status === "paid").reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "paid": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Payouts</h1>
        <p className="text-muted-foreground mt-2">Track your earnings and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Earnings
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalEarnings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Paid
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">₹{paidPayouts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">₹{pendingPayouts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bank Account
            </CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">SBI ****4567</div>
            <div className="text-xs text-muted-foreground">IFSC: SBIN0001234</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{payout.id}</span>
                    <Badge className={getStatusColor(payout.status)}>
                      {payout.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Order: {payout.orderId} • {payout.date}
                  </div>
                  <div className="text-xs">
                    Invoice: {payout.invoiceVerified ? (
                      <span className="text-green-500">✓ Verified</span>
                    ) : (
                      <span className="text-yellow-500">⚠ Pending Verification</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">₹{payout.amount}</div>
                  {payout.status === "pending" && (
                    <div className="text-xs text-muted-foreground">Awaiting invoice</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bank Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Account Number</div>
              <div className="font-medium">1234567890</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">IFSC Code</div>
              <div className="font-medium">SBIN0001234</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Bank Name</div>
              <div className="font-medium">State Bank of India</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Account Holder</div>
              <div className="font-medium">Green Farms Co.</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerPayouts;
