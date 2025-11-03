const Navigation = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-bold text-foreground">Agrisense</span>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <button onClick={() => scrollToSection('recommender')} className="text-foreground hover:text-primary transition-colors">
              Recommender
            </button>
            <button onClick={() => scrollToSection('weather')} className="text-foreground hover:text-primary transition-colors">
              Weather
            </button>
            <button onClick={() => scrollToSection('prices')} className="text-foreground hover:text-primary transition-colors">
              Crop Prices
            </button>
            <button onClick={() => scrollToSection('schemes')} className="text-foreground hover:text-primary transition-colors">
              Schemes
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
