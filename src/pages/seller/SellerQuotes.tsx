import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Package, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Quote {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  requestDate: string;
  status: "pending" | "submitted" | "approved" | "rejected";
  sellerQuote?: number;
  finalPrice?: number;
}

const SellerQuotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: "QT-001",
      customerName: "Rajesh Kumar",
      productName: "Fresh Organic Vegetables",
      quantity: 50,
      requestDate: "2024-01-15",
      status: "pending",
    },
    {
      id: "QT-002",
      customerName: "Priya Sharma",
      productName: "Premium Fruits Basket",
      quantity: 30,
      requestDate: "2024-01-14",
      status: "submitted",
      sellerQuote: 12000,
      finalPrice: 12240,
    },
    {
      id: "QT-003",
      customerName: "Amit Patel",
      productName: "Organic Grains Pack",
      quantity: 100,
      requestDate: "2024-01-13",
      status: "approved",
      sellerQuote: 59900,
      finalPrice: 61098,
    },
  ]);

  const [quotePrice, setQuotePrice] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleSubmitQuote = () => {
    if (!selectedQuote || !quotePrice) {
      toast.error("Please enter a quote price");
      return;
    }

    const price = parseFloat(quotePrice);
    const convenienceFee = price * 0.02;
    const finalPrice = price + convenienceFee;

    setQuotes(quotes.map(q => 
      q.id === selectedQuote.id 
        ? { ...q, status: "submitted", sellerQuote: price, finalPrice }
        : q
    ));

    toast.success("Quote submitted successfully!");
    setQuotePrice("");
    setSelectedQuote(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "submitted": return "bg-blue-500";
      case "approved": return "bg-green-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quote Management</h1>
          <p className="text-muted-foreground mt-2">Manage customer quote requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter(q => q.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Submitted Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter(q => q.status === "submitted").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Approved Quotes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {quotes.filter(q => q.status === "approved").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {quotes.map((quote) => (
          <Card key={quote.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{quote.id}</CardTitle>
                <Badge className={getStatusColor(quote.status)}>
                  {quote.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{quote.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{quote.productName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{quote.requestDate}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <span className="ml-2 font-semibold">{quote.quantity} units</span>
                  </div>
                  {quote.sellerQuote && (
                    <>
                      <div>
                        <span className="text-sm text-muted-foreground">Your Quote:</span>
                        <span className="ml-2 font-semibold">₹{quote.sellerQuote}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Final Price (+ 2% fee):</span>
                        <span className="ml-2 font-semibold text-primary">₹{quote.finalPrice}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {quote.status === "pending" && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedQuote(quote)}>
                      Submit Quote
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Quote for {quote.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Quote Price (₹)</Label>
                        <Input
                          type="number"
                          value={quotePrice}
                          onChange={(e) => setQuotePrice(e.target.value)}
                          placeholder="Enter your quote price"
                        />
                      </div>
                      {quotePrice && (
                        <div className="p-4 bg-muted rounded-lg space-y-2">
                          <div className="flex justify-between">
                            <span>Your Quote:</span>
                            <span className="font-semibold">₹{quotePrice}</span>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Convenience Fee (2%):</span>
                            <span>₹{(parseFloat(quotePrice) * 0.02).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span>Final Price:</span>
                            <span className="text-primary">₹{(parseFloat(quotePrice) * 1.02).toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                      <Button onClick={handleSubmitQuote} className="w-full">
                        Submit Quote
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellerQuotes;
