import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

const CropPrices = () => {
  const priceData = [
    { crop: "Rice", price: "₹2,850", change: "+5.2%", trend: "up", market: "Delhi" },
    { crop: "Wheat", price: "₹2,125", change: "+2.8%", trend: "up", market: "Punjab" },
    { crop: "Cotton", price: "₹6,450", change: "-1.5%", trend: "down", market: "Gujarat" },
    { crop: "Sugarcane", price: "₹3,100", change: "+3.4%", trend: "up", market: "UP" },
    { crop: "Maize", price: "₹1,890", change: "+1.2%", trend: "up", market: "Karnataka" },
    { crop: "Pulses", price: "₹5,200", change: "-0.8%", trend: "down", market: "MP" },
    { crop: "Groundnut", price: "₹5,800", change: "+4.1%", trend: "up", market: "Rajasthan" },
    { crop: "Soybean", price: "₹4,350", change: "+2.5%", trend: "up", market: "Maharashtra" },
  ];

  return (
    <section id="prices" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Live Crop Market Prices
        </h2>
        
        <Card className="overflow-hidden shadow-[var(--shadow-card)]">
          <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
            <p className="text-sm text-muted-foreground">Last updated: Today at 10:30 AM IST</p>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Crop</TableHead>
                <TableHead className="font-semibold">Price (per quintal)</TableHead>
                <TableHead className="font-semibold">Change</TableHead>
                <TableHead className="font-semibold">Market</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceData.map((item) => (
                <TableRow key={item.crop} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{item.crop}</TableCell>
                  <TableCell className="font-semibold text-primary">{item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {item.change}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.market}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
};

export default CropPrices;
