import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Package, Truck, CheckCheck } from "lucide-react";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "started" | "processing" | "completed" | "delivered";
  items: number;
}

interface OrderTrackingProps {
  orders: Order[];
}

const OrderTracking = ({ orders }: OrderTrackingProps) => {
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "started":
        return <Circle className="h-5 w-5" />;
      case "processing":
        return <Package className="h-5 w-5" />;
      case "completed":
        return <CheckCircle2 className="h-5 w-5" />;
      case "delivered":
        return <CheckCheck className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "started":
        return "secondary";
      case "processing":
        return "default";
      case "completed":
        return "default";
      case "delivered":
        return "default";
      default:
        return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">₹{order.total.toFixed(2)}</p>
                    <Badge variant={getStatusColor(order.status)} className="mt-1">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pl-2">
                  <div className="flex items-center gap-2">
                    <div className={order.status === "started" || order.status === "processing" || order.status === "completed" || order.status === "delivered" ? "text-primary" : "text-muted-foreground"}>
                      <Circle className="h-4 w-4" />
                    </div>
                    <span className="text-xs">Started</span>
                  </div>
                  
                  <div className={`h-0.5 flex-1 mx-2 ${order.status === "processing" || order.status === "completed" || order.status === "delivered" ? "bg-primary" : "bg-border"}`} />
                  
                  <div className="flex items-center gap-2">
                    <div className={order.status === "processing" || order.status === "completed" || order.status === "delivered" ? "text-primary" : "text-muted-foreground"}>
                      <Package className="h-4 w-4" />
                    </div>
                    <span className="text-xs">Processing</span>
                  </div>
                  
                  <div className={`h-0.5 flex-1 mx-2 ${order.status === "completed" || order.status === "delivered" ? "bg-primary" : "bg-border"}`} />
                  
                  <div className="flex items-center gap-2">
                    <div className={order.status === "completed" || order.status === "delivered" ? "text-primary" : "text-muted-foreground"}>
                      <Truck className="h-4 w-4" />
                    </div>
                    <span className="text-xs">Shipped</span>
                  </div>
                  
                  <div className={`h-0.5 flex-1 mx-2 ${order.status === "delivered" ? "bg-primary" : "bg-border"}`} />
                  
                  <div className="flex items-center gap-2">
                    <div className={order.status === "delivered" ? "text-primary" : "text-muted-foreground"}>
                      <CheckCheck className="h-4 w-4" />
                    </div>
                    <span className="text-xs">Delivered</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTracking;
