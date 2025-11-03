import heroFarm from "@/assets/hero-farm.jpg";

const Hero = () => {
  const scrollToRecommender = () => {
    document.getElementById('recommender')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroFarm})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
          🌿 Agrisense Crop Recommender
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/95 mb-8 animate-fade-in-delay">
          Smart farming solutions powered by data. Get personalized crop recommendations, real-time prices, and government schemes.
        </p>
        <button 
          onClick={scrollToRecommender}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
