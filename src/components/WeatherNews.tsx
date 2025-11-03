import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

const WeatherNews = () => {
  const weatherUpdates = [
    {
      id: 1,
      title: "Monsoon Forecast Update",
      description: "IMD predicts normal monsoon rainfall this season. Good news for Kharif crops.",
      icon: CloudRain,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Temperature Rise Alert",
      description: "Northern states experiencing higher temperatures. Farmers advised to increase irrigation.",
      icon: Sun,
      date: "3 days ago"
    },
    {
      id: 3,
      title: "Wind Speed Warning",
      description: "Strong winds expected in coastal areas. Secure crops and equipment.",
      icon: Wind,
      date: "4 days ago"
    },
    {
      id: 4,
      title: "Favorable Conditions",
      description: "Perfect weather conditions for sowing reported in central regions.",
      icon: Cloud,
      date: "5 days ago"
    }
  ];

  return (
    <section id="weather" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Weather & Agricultural News
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {weatherUpdates.map((update) => {
            const Icon = update.icon;
            return (
              <Card key={update.id} className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{update.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{update.description}</p>
                    <p className="text-xs text-muted-foreground">{update.date}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WeatherNews;
