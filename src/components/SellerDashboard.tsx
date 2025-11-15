import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";

const SellerDashboard = () => {
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Pending Orders",
      value: "12",
      icon: ShoppingCart,
      color: "text-orange-500",
    },
    {
      title: "Total Sales",
      value: "₹45,890",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Growth",
      value: "+23%",
      icon: TrendingUp,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New order received</p>
                <p className="text-sm text-muted-foreground">Order #1234 - Fresh Vegetables</p>
              </div>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Product updated</p>
                <p className="text-sm text-muted-foreground">Organic Grains Pack</p>
              </div>
              <span className="text-sm text-muted-foreground">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Order completed</p>
                <p className="text-sm text-muted-foreground">Order #1230 - Fruits Basket</p>
              </div>
              <span className="text-sm text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerDashboard;
