import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Convert your designs in under 30 seconds with our optimized processing engine.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📋",
      title: "Perfect Layer Preservation",
      description: "Maintain all text layers, images, and effects exactly as they appear in Canva.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🛡️",
      title: "Secure & Private",
      description: "Your files are automatically deleted after conversion. We never store your designs.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "⏰",
      title: "24/7 Availability",
      description: "Convert files anytime, anywhere. Our service is always ready when you are.",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="text-sm font-light text-gray-500 mb-4">FEATURES</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Everything you need for seamless conversion
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make your design workflow effortless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Feature Highlight */}
        <div className="mt-16 glass-card p-8 md:p-12 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Advanced Layer Intelligence
          </h3>
          <p className="text-lg font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered system intelligently analyzes your Canva design structure and 
            recreates it in Photoshop with optimal layer organization, ensuring your 
            design remains fully editable and professional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features; 