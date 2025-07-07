import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How does the Canva to Photoshop conversion work?',
    answer: 'We use advanced AI to analyze your Canva PDF and recreate it as a fully layered, editable Photoshop PSD file.'
  },
  {
    question: 'Will my text and images remain editable?',
    answer: 'Yes! We preserve text layers, images, and most effects so you can continue editing in Photoshop.'
  },
  {
    question: 'Is there a file size limit?',
    answer: 'You can upload PDFs up to 50MB. For larger files, contact our support for custom solutions.'
  },
  {
    question: 'How long does the conversion take?',
    answer: 'Most conversions are completed in under 30 seconds, depending on file complexity.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. Your files are encrypted in transit and deleted automatically after conversion.'
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding animate-fade-in-up">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="text-sm font-light text-gray-500 mb-4">FAQ</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our Canva to Photoshop converter
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.question} className="glass-card">
              <button
                className="w-full text-left flex justify-between items-center px-6 py-4 focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className="text-lg font-light text-gray-900">{faq.question}</span>
                <span className="text-2xl text-gray-400">{openIndex === idx ? '-' : '+'}</span>
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-4 text-gray-600 font-light animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;