import React from 'react';

const Hero: React.FC = () => {
  const handleGetStarted = () => {
    const el = document.getElementById('converter');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden animate-fade-in-up">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight">
            <span className="text-gradient">Canva</span> to{' '}
            <span className="text-gradient">Photoshop</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
            Transform your Canva designs into Photoshop files
          </p>

          {/* CTA Button Only */}
          <div className="flex items-center justify-center">
            <button className="neumorphism-button flex items-center space-x-2" onClick={handleGetStarted}>
              <span>Get Started Free</span>
              <span>→</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Convert unlimited files</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Preserve all layers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 right-10 w-20 h-20 glass-card rounded-full flex items-center justify-center">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg"></div>
      </div>

      <div className="absolute bottom-1/4 left-10 w-16 h-16 glass-card rounded-full flex items-center justify-center">
        <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg"></div>
      </div>
    </section>
  );
};

export default Hero;