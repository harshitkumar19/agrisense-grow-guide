import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, IndianRupee, Sprout } from "lucide-react";

const GovernmentSchemes = () => {
  const schemes = [
    {
      id: 1,
      title: "PM-KISAN",
      description: "Income support of ₹6,000 per year to all farmer families. Direct benefit transfer to bank accounts.",
      icon: IndianRupee,
      benefits: "₹6,000/year",
      link: "https://pmkisan.gov.in/"
    },
    {
      id: 2,
      title: "Soil Health Card Scheme",
      description: "Free soil testing and nutrient-based recommendations to improve soil health and crop productivity.",
      icon: Sprout,
      benefits: "Free Testing",
      link: "https://soilhealth.dac.gov.in/"
    },
    {
      id: 3,
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme providing financial support to farmers in case of crop failure.",
      icon: FileText,
      benefits: "Crop Insurance",
      link: "https://pmfby.gov.in/"
    },
    {
      id: 4,
      title: "Kisan Credit Card",
      description: "Provides adequate and timely credit support for agriculture and allied activities.",
      icon: IndianRupee,
      benefits: "Easy Credit",
      link: "https://www.india.gov.in/"
    }
  ];

  return (
    <section id="schemes" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
          Government Schemes for Farmers
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Explore various government schemes designed to support and empower farmers across India
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {schemes.map((scheme) => {
            const Icon = scheme.icon;
            return (
              <Card key={scheme.id} className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start space-x-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Icon className="w-8 h-8 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">{scheme.title}</h3>
                    <p className="text-muted-foreground mb-3">{scheme.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {scheme.benefits}
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary" asChild>
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                          Learn More <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </div>
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

export default GovernmentSchemes;
