import React, { useState, useEffect } from 'react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Designer at Adobe",
      company: "Adobe",
      avatar: "SC",
      content: "This tool saved me hours of work. I converted a complex Canva design with 20+ layers and everything came through perfectly in Photoshop.",
      result: "Converted 20+ layer design",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "Design Studio NYC",
      avatar: "MR",
      content: "The layer preservation is incredible. Text layers, images, and even effects transfer seamlessly. This is exactly what I needed.",
      result: "Perfect layer preservation",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Freelance Designer",
      company: "Self-employed",
      avatar: "ET",
      content: "As a freelancer, I need to work across different tools. This bridge between Canva and Photoshop is a game-changer for my workflow.",
      result: "Streamlined workflow",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Product Designer",
      company: "Tech Startup",
      avatar: "DK",
      content: "The conversion quality is outstanding. I was skeptical at first, but the results exceeded my expectations. Highly recommended!",
      result: "Exceeded expectations",
      rating: 5
    },
    {
      name: "Lisa Wang",
      role: "Art Director",
      company: "Creative Agency",
      avatar: "LW",
      content: "We use this for client projects daily. The speed and accuracy make it an essential part of our design toolkit.",
      result: "Daily use for clients",
      rating: 5
    },
    {
      name: "Alex Johnson",
      role: "UI/UX Designer",
      company: "Digital Agency",
      avatar: "AJ",
      content: "The font preservation feature is a lifesaver. All my custom fonts transfer perfectly, saving me hours of manual work.",
      result: "Perfect font preservation",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Brand Designer",
      company: "Marketing Firm",
      avatar: "MG",
      content: "I've tried many conversion tools, but this one stands out. The quality and speed are unmatched. My go-to solution now.",
      result: "Unmatched quality & speed",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-br from-slate-50 to-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="text-sm font-light text-gray-500 mb-4">TESTIMONIALS</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Loved by designers worldwide
          </h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            See what our users are saying about their conversion experience
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Display */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="glass-card p-8 md:p-12">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-700">
                            {testimonial.avatar}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                        
                        <blockquote className="text-lg font-light text-gray-700 mb-6 leading-relaxed">
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {testimonial.name}
                            </p>
                            <p className="text-sm font-light text-gray-500">
                              {testimonial.role} at {testimonial.company}
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 glass-card rounded-full">
                              <span className="text-blue-500">💬</span>
                              <span className="text-sm font-light text-gray-600">
                                {testimonial.result}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-light text-blue-600 mb-2">50,000+</div>
            <div className="text-sm font-light text-gray-500">Designs Converted</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-purple-600 mb-2">98%</div>
            <div className="text-sm font-light text-gray-500">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-green-600 mb-2">4.9/5</div>
            <div className="text-sm font-light text-gray-500">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;