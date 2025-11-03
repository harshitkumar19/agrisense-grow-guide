import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CropRecommender = () => {
  const [result, setResult] = useState<string>("None");
  
  const seasons = ["Rabi", "Kharif", "Winter", "Whole Year", "Autumn", "Summer"];
  const states = [
    "Assam", "Karnataka", "Kerala", "Meghalaya", "West Bengal", "Puducherry",
    "Goa", "Andhra Pradesh", "Tamil Nadu", "Odisha", "Bihar", "Gujarat",
    "Madhya Pradesh", "Maharashtra", "Mizoram", "Punjab", "Uttar Pradesh",
    "Haryana", "Himachal Pradesh", "Tripura", "Nagaland", "Chhattisgarh",
    "Uttarakhand", "Jharkhand", "Delhi", "Manipur", "Jammu and Kashmir",
    "Telangana", "Arunachal Pradesh", "Sikkim"
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Simulate recommendation logic
    const crops = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Pulses", "Groundnut", "Soybean"];
    const recommendedCrop = crops[Math.floor(Math.random() * crops.length)];
    
    setResult(recommendedCrop);
    toast.success(`Recommended: ${recommendedCrop}`, {
      description: "Based on your input parameters"
    });
  };

  return (
    <section id="recommender" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Crop Recommendation System
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-6 shadow-[var(--shadow-card)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Crop_Year">Crop Year</Label>
                  <Input type="number" id="Crop_Year" name="Crop_Year" placeholder="e.g. 2024" min="1997" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Season">Season</Label>
                  <Select name="Season" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map(season => (
                        <SelectItem key={season} value={season}>{season}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="State">State</Label>
                  <Select name="State" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Annual_Rainfall">Annual Rainfall (mm)</Label>
                  <Input type="number" id="Annual_Rainfall" name="Annual_Rainfall" placeholder="e.g. 930" min="0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Fertilizer">Fertilizer (kg)</Label>
                  <Input type="number" id="Fertilizer" name="Fertilizer" placeholder="e.g. 30" min="0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Pesticide">Pesticide (kg)</Label>
                  <Input type="number" id="Pesticide" name="Pesticide" placeholder="e.g. 10" min="0" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Area">Area (hectares)</Label>
                  <Input type="number" id="Area" name="Area" placeholder="e.g. 1000" min="1000" />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Recommend Crop
              </Button>
            </form>
          </Card>
          
          {/* Result Section */}
          <Card className="p-6 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 shadow-[var(--shadow-card)]">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Recommended Crop:</h3>
              <div className="text-5xl font-bold text-primary mb-4">
                {result}
              </div>
              {result !== "None" && (
                <p className="text-muted-foreground">
                  This recommendation is based on your agricultural parameters
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CropRecommender;
