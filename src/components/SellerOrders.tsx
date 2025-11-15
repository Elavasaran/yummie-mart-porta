import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, User, MapPin, Phone, Upload } from "lucide-react";
import { toast } from "sonner";
import InvoiceUpload from "@/components/seller/InvoiceUpload";

interface Order {
  id: string;
  customerName: string;
  products: string[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  address: string;
  phone: string;
  date: string;
}

const SellerOrders = () => {
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const orders: Order[] = [
    {
      id: "ORD-001",
      customerName: "Rajesh Kumar",
      products: ["Fresh Vegetables", "Fruits Basket"],
      total: 749,
      status: "pending",
      address: "123 Main St, Chennai, TN",
      phone: "+91 98765 43210",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      customerName: "Priya Sharma",
      products: ["Organic Grains"],
      total: 599,
      status: "processing",
      address: "456 Park Ave, Mumbai, MH",
      phone: "+91 98765 43211",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      customerName: "Amit Patel",
      products: ["Fresh Vegetables", "Organic Grains"],
      total: 898,
      status: "shipped",
      address: "789 Market Rd, Bangalore, KA",
      phone: "+91 98765 43212",
      date: "2024-01-13",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const handleOpenInvoiceUpload = (orderId: string) => {
    setSelectedOrder(orderId);
    setInvoiceDialogOpen(true);
  };

  const handleInvoiceUpload = (data: { invoiceNumber: string; amount: number; file: File }) => {
    console.log("Invoice uploaded:", data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Order Management</h1>
        <p className="text-muted-foreground mt-2">Track and manage customer orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{order.id}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.phone}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <span className="text-sm">{order.address}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Package className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      {order.products.map((product, index) => (
                        <p key={index} className="text-sm">{product}</p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">₹{order.total}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Order Date: {order.date}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {order.status === "pending" && (
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "processing")}
                    size="sm"
                  >
                    Accept Order
                  </Button>
                )}
                {order.status === "processing" && (
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "shipped")}
                    size="sm"
                  >
                    Mark as Shipped
                  </Button>
                )}
                {order.status === "shipped" && (
                  <Button
                    onClick={() => handleStatusUpdate(order.id, "delivered")}
                    size="sm"
                  >
                    Mark as Delivered
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  Contact Customer
                </Button>
                {order.status === "shipped" || order.status === "delivered" ? (
                  <Button 
                    size="sm"
                    onClick={() => handleOpenInvoiceUpload(order.id)}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Invoice
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOrder && (
        <InvoiceUpload
          orderId={selectedOrder}
          isOpen={invoiceDialogOpen}
          onClose={() => {
            setInvoiceDialogOpen(false);
            setSelectedOrder(null);
          }}
          onUpload={handleInvoiceUpload}
        />
      )}
    </div>
  );
};

export default SellerOrders;
