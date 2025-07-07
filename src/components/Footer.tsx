import React from 'react';
import { Mail } from 'lucide-react';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand and tagline */}
        <div className="flex flex-col items-start">
          <h3 className="text-xl font-bold">
              C<span className="text-teal-400">IV</span>CHANGE
            </h3>
          <span className="text-xs text-gray-400 mt-1">Canva to Photoshop PSD Converter</span>
        </div>
        {/* Social icons */}
        <div className="flex space-x-6 justify-center">
          <a href="https://www.instagram.com/albytechco/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://x.com/Dani91160" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="X">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="/contact" className="text-gray-400 hover:text-white transition-colors" aria-label="Contact Us">
            <Mail className="w-6 h-6" />
          </a>
        </div>
        {/* Copyright */}
        <div className="text-xs text-gray-400 text-right">
          © 2025 C<span className="text-teal-400">IV</span>CHANGE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;