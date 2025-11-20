import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CropRecommenderProps {
  language: "en" | "hi";
}

const CropRecommender = ({ language }: CropRecommenderProps) => {
  const [result, setResult] = useState<string>("None");
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string>("");

  const translations = {
    en: {
      title: "Crop Recommendation System",
      cropYear: "Crop Year",
      season: "Season",
      district: "District (Uttar Pradesh)",
      fertilizer: "Fertilizer (kg)",
      pesticide: "Pesticide (kg)",
      area: "Area (Acres)",
      getRecommendation: "Get Recommendation",
      recommendedCrop: "Recommended Crop",
      result: "Result",
      loading: "Processing...",
    },
    hi: {
      title: "फसल सिफारिश प्रणाली",
      cropYear: "फसल वर्ष",
      season: "मौसम",
      district: "जिला (उत्तर प्रदेश)",
      fertilizer: "उर्वरक (किलो)",
      pesticide: "कीटनाशक (किलो)",
      area: "क्षेत्रफल (एकड़)",
      getRecommendation: "सिफारिश प्राप्त करें",
      recommendedCrop: "अनुशंसित फसल",
      result: "परिणाम",
      loading: "प्रसंस्करण...",
    }
  };

  const t = translations[language];
  
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
      
      toast.success(`${language === "en" ? "Recommended" : "अनुशंसित"}: ${cropName}`, {
        description: language === "en" 
          ? "Recommendation based on your parameters" 
          : "आपके मापदंडों के आधार पर सिफारिश"
      });
    } catch (error: any) {
      console.error('Error getting recommendation:', error);
      toast.error(
        language === "en" ? 'Failed to get recommendation' : 'सिफारिश प्राप्त करने में विफल',
        {
          description: error.message || (language === "en" ? 'Please try again' : 'कृपया पुनः प्रयास करें')
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="recommender" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          {t.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-6 shadow-[var(--shadow-card)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Crop_Year">{t.cropYear}</Label>
                  <Input 
                    type="number" 
                    id="Crop_Year" 
                    name="Crop_Year" 
                    placeholder="e.g. 2024" 
                    min="1997" 
                    max={new Date().getFullYear()}
                    required 
                    disabled={loading}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Season">{t.season}</Label>
                  <Select name="Season" required disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.season} />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map(season => (
                        <SelectItem key={season} value={season}>{season}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="District">{t.district}</Label>
                  <Select name="District" required disabled={loading}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.district} />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Fertilizer">{t.fertilizer}</Label>
                  <Input type="number" id="Fertilizer" name="Fertilizer" placeholder="e.g. 30" min="0" disabled={loading} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Pesticide">{t.pesticide}</Label>
                  <Input type="number" id="Pesticide" name="Pesticide" placeholder="e.g. 10" min="0" disabled={loading} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="Area">{t.area}</Label>
                  <Input type="number" id="Area" name="Area" min="0.1" step="0.1" required disabled={loading} />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? t.loading : t.getRecommendation}
              </Button>
            </form>
          </Card>
          
          {/* Result Section */}
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 shadow-[var(--shadow-card)]">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold mb-4 text-foreground">{t.recommendedCrop}:</h3>
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
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CropRecommender;
