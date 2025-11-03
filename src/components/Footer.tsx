const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-2xl">🌾</span>
          <span className="text-xl font-bold text-foreground">Agrisense</span>
        </div>
        <p className="text-muted-foreground text-sm">
          Empowering farmers with data-driven insights
        </p>
        <p className="text-muted-foreground text-xs mt-4">
          © 2024 Agrisense. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
