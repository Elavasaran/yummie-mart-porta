import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginSignup from "@/components/LoginSignup";
import SearchBar from "@/components/SearchBar";
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";
import OrderTracking from "@/components/OrderTracking";
import Payments from "@/components/Payments";
import heroProducts from "@/assets/hero-products.jpg";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: "started" | "processing" | "completed" | "delivered";
  items: number;
}

const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.18;
    const newOrder: Order = {
      id: `ORD${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      total,
      status: "started",
      items: cartItems.length,
    };
    setOrders([newOrder, ...orders]);
    setCartItems([]);

    // Simulate order progression
    setTimeout(() => {
      setOrders((prev) =>
        prev.map((order) => (order.id === newOrder.id ? { ...order, status: "processing" } : order))
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onAuthClick={() => setIsAuthOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      {isAuthOpen && (
        <LoginSignup
          onClose={() => setIsAuthOpen(false)}
          onLogin={() => setIsAuthenticated(true)}
        />
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <img
            src={heroProducts}
            alt="Fresh organic products"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
          <div className="relative z-10 text-center space-y-4 px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Yummie Mart</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted B2B & B2C marketplace for quality food and organic products
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <section id="products" className="mb-8">
            <SearchBar onSearch={setSearchQuery} />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Column */}
            <div className="lg:col-span-2 space-y-8">
              <ProductList onAddToCart={handleAddToCart} searchQuery={searchQuery} />
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
                onCheckout={handleCheckout}
              />
              
              <div id="orders">
                <OrderTracking orders={orders} />
              </div>
              
              <Payments />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
