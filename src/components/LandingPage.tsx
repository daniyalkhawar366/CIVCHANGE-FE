import React from 'react';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Converter from './Converter';
import Pricing from './Pricing';
import FAQ from './FAQ';
import Testimonials from './Testimonials';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Hero />
      <div className="animate-fade-in-up"><HowItWorks /></div>
      <div className="animate-fade-in-up" id="converter"><Converter /></div>
      <div className="animate-fade-in-up" id="pricing"><Pricing /></div>
      <div className="animate-fade-in-up"><FAQ /></div>
      <div className="animate-fade-in-up"><Testimonials /></div>
    </div>
  );
};

export default LandingPage; 