import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CropRecommender from "@/components/CropRecommender";
import WeatherNews from "@/components/WeatherNews";
import CropPrices from "@/components/CropPrices";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CropRecommender />
      <WeatherNews />
      <CropPrices />
      <GovernmentSchemes />
      <Footer />
    </div>
  );
};

export default Index;
