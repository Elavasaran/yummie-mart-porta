import { ShoppingCart, Store, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import productVegetables from "@/assets/product-vegetables.jpg";
import productFruits from "@/assets/product-fruits.jpg";
import productGrains from "@/assets/product-grains.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  seller: string;
  image: string;
  eligibility: string[];
  certifications: string[];
}

interface ProductListProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

const ProductList = ({ onAddToCart, searchQuery }: ProductListProps) => {
  const products: Product[] = [
    {
      id: 1,
      name: "Fresh Organic Vegetables Mix",
      price: 299,
      seller: "Green Farms Co.",
      image: productVegetables,
      eligibility: ["Retail", "Bulk"],
      certifications: ["GST", "FSSAI"],
    },
    {
      id: 2,
      name: "Premium Fresh Fruits Basket",
      price: 450,
      seller: "Fruit Paradise",
      image: productFruits,
      eligibility: ["Retail"],
      certifications: ["GST", "MSME", "FSSAI"],
    },
    {
      id: 3,
      name: "Organic Grains & Pulses Pack",
      price: 599,
      seller: "Organic Traders",
      image: productGrains,
      eligibility: ["Bulk"],
      certifications: ["GST", "FSSAI"],
    },
    {
      id: 4,
      name: "Farm Fresh Vegetables",
      price: 249,
      seller: "Local Farms",
      image: productVegetables,
      eligibility: ["Retail", "Bulk"],
      certifications: ["GST"],
    },
    {
      id: 5,
      name: "Seasonal Fruits Collection",
      price: 399,
      seller: "Fresh Harvest",
      image: productFruits,
      eligibility: ["Retail"],
      certifications: ["GST", "FSSAI"],
    },
    {
      id: 6,
      name: "Premium Rice & Grains",
      price: 699,
      seller: "Quality Foods",
      image: productGrains,
      eligibility: ["Bulk"],
      certifications: ["GST", "MSME", "FSSAI"],
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.seller.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Available Products</h2>
        <p className="text-muted-foreground">{filteredProducts.length} products found</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Store className="h-4 w-4" />
                <span>{product.seller}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    {cert}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                {product.eligibility.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                <span className="text-xs text-muted-foreground">per unit</span>
              </div>
              <Button onClick={() => handleAddToCart(product)} size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
