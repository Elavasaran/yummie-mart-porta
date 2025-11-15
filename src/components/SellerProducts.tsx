import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import productVegetables from "@/assets/product-vegetables.jpg";
import productFruits from "@/assets/product-fruits.jpg";
import productGrains from "@/assets/product-grains.jpg";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

const SellerProducts = () => {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Fresh Organic Vegetables",
      price: 299,
      stock: 45,
      image: productVegetables,
      description: "Farm fresh organic vegetables",
    },
    {
      id: 2,
      name: "Premium Fruits Basket",
      price: 450,
      stock: 30,
      image: productFruits,
      description: "Seasonal fresh fruits",
    },
    {
      id: 3,
      name: "Organic Grains Pack",
      price: 599,
      stock: 60,
      image: productGrains,
      description: "Premium quality grains",
    },
  ]);

  const handleDelete = (id: number) => {
    toast.success("Product deleted successfully");
  };

  const handleAddProduct = () => {
    toast.success("Product added successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-2">Manage your product catalog</p>
        </div>
        <div className="flex gap-2">
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Bulk Upload CSV
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Product description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <Input id="image" type="file" accept="image/*" />
              </div>
              <Button onClick={handleAddProduct} className="w-full">Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <div className="aspect-square relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">₹{product.price}</span>
                <Badge variant={product.stock > 20 ? "default" : "destructive"}>
                  Stock: {product.stock}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(product.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SellerProducts;
