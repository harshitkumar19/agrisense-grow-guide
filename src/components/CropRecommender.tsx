import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const CropRecommender = () => {
  const [result, setResult] = useState<string>("None");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string>("");
  
  const seasons = language === "en" 
    ? ["Rabi (Winter)", "Kharif (Summer)", "Zaid (Spring)"]
    : ["रबी (सर्दी)", "खरीफ (गर्मी)", "जायद (वसंत)"];
  const districts = [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Azamgarh",
    "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly",
    "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot",
    "Deoria", "Etah", "Etawah", "Ayodhya", "Farrukhabad", "Fatehpur", "Firozabad",
    "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur",
    "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj",
    "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri",
    "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau",
    "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh",
    "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar",
    "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra",
    "Sultanpur", "Unnao", "Varanasi"
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data, error } = await supabase.functions.invoke('recommend-crop', {
        body: {
          cropYear: formData.get('Crop_Year'),
          season: formData.get('Season'),
          district: formData.get('District'),
          fertilizer: formData.get('Fertilizer'),
          pesticide: formData.get('Pesticide'),
          area: formData.get('Area'),
        }
      });

      if (error) throw error;

      // Parse the AI recommendation
      const recommendationText = data.recommendation;
      const cropMatch = recommendationText.match(/CROP:\s*(.+)/i);
      const cropName = cropMatch ? cropMatch[1].trim() : "Unable to determine";
      
      setResult(cropName);
      setRecommendation(recommendationText);
      
      toast.success(`Recommended: ${cropName}`, {
        description: "AI-powered recommendation based on your parameters"
      });
    } catch (error: any) {
      console.error('Error getting recommendation:', error);
      toast.error('Failed to get recommendation', {
        description: error.message || 'Please try again'
      });
    } finally {
      setLoading(false);
    }
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
                  <Input 
                    type="number" 
                    id="Crop_Year" 
                    name="Crop_Year" 
                    placeholder="e.g. 2024" 
                    min="1997" 
                    max={new Date().getFullYear()}
                    required 
                  />
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
                  <Label htmlFor="District">District (Uttar Pradesh)</Label>
                  <Select name="District" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="Area">Area (Acres)</Label>
                  <Input type="number" id="Area" name="Area" min="0.1" step="0.1" required />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? "Analyzing..." : "Recommend Crop"}
              </Button>
            </form>
          </Card>
          
          {/* Result Section */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 shadow-[var(--shadow-card)]">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Recommended Crop:</h3>
              <div className="text-5xl font-bold text-primary mb-4">
                {loading ? "..." : result}
              </div>
            </div>
            {recommendation && result !== "None" && (
              <div className="text-left space-y-3 text-sm">
                <div className="p-4 bg-background/50 rounded-lg">
                  <pre className="whitespace-pre-wrap font-sans text-foreground/80">
                    {recommendation}
                  </pre>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  AI-powered recommendation using machine learning analysis
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CropRecommender;
