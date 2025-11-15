import { Search, Filter, MapPin, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for products or sellers..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <Select>
          <SelectTrigger>
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="chennai">Chennai</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <Award className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Certification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Certified</SelectItem>
            <SelectItem value="gst">GST Verified</SelectItem>
            <SelectItem value="msme">MSME Certified</SelectItem>
            <SelectItem value="fssai">FSSAI Licensed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="vegetables">Vegetables</SelectItem>
            <SelectItem value="fruits">Fruits</SelectItem>
            <SelectItem value="grains">Grains & Pulses</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="delivery">Fastest Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
          Organic
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
          Farm Fresh
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
          Bulk Orders
        </Badge>
        <Badge variant="secondary" className="cursor-pointer hover:bg-accent">
          Same Day Delivery
        </Badge>
      </div>
    </div>
  );
};

export default SearchBar;
