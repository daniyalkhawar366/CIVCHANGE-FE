import React from 'react';
import { FileText, Upload, Download } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="w-8 h-8 text-blue-500" />, 
    title: 'Export as PDF',
    description: 'Export your Canva design as a PDF file.'
  },
  {
    icon: <Upload className="w-8 h-8 text-blue-500" />, 
    title: 'Upload PDF',
    description: 'Upload your PDF here for instant conversion.'
  },
  {
    icon: <Download className="w-8 h-8 text-blue-500" />, 
    title: 'Download PSD',
    description: 'Get your layered PSD file for Photoshop.'
  },
];

const HowItWorks: React.FC = () => (
  <section id="how-it-works" className="section-padding">
    <div className="container-max">
      <div className="text-center mb-16">
        <p className="text-sm font-light text-gray-500 mb-4">HOW IT WORKS</p>
        <h2 className="text-4xl font-light text-gray-900 mb-4">Convert in 3 simple steps</h2>
        <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
          Seamlessly move your Canva designs to Photoshop in seconds
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        {steps.map((step, idx) => (
          <div key={step.title} className="glass-card p-8 flex flex-col items-center text-center">
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">{step.title}</h3>
            <p className="text-gray-600 font-light">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;