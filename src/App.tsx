import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Converter from './components/Converter';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Navigation />
      <Hero />
      <div className="animate-fade-in-up"><HowItWorks /></div>
      <div className="animate-fade-in-up" id="converter"><Converter /></div>
      <div className="animate-fade-in-up"><Pricing /></div>
      <div className="animate-fade-in-up"><FAQ /></div>
      <div className="animate-fade-in-up"><Testimonials /></div>
      <Footer />
    </div>
  );
}

export default App;