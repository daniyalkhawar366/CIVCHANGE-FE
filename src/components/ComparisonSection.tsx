import React from 'react';
import { ArrowRight, Layers, Type, Image } from 'lucide-react';

const ComparisonSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            See The Difference
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare your original Canva design with the converted PSD file opened in Photoshop
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Before - Canva Design */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 ml-2">Canva Design</span>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center mb-4 mx-auto">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your Canva Design</h3>
                  <p className="text-gray-600">Beautiful but locked in Canva</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              PDF Export
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center lg:justify-start">
            <div className="bg-gradient-to-r from-teal-500 to-purple-600 text-white p-4 rounded-full shadow-lg">
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>

          {/* After - PSD File */}
          <div className="relative lg:ml-8">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                <span className="text-sm text-gray-600 ml-2">Photoshop PSD</span>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-slate-100 rounded-lg p-8 aspect-video">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>Layers Panel</span>
                  </div>
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Type className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-gray-600">Text Layer - Headline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image className="w-3 h-3 text-teal-500" />
                      <span className="text-xs text-gray-600">Image Layer - Background</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-400 rounded-sm"></div>
                      <span className="text-xs text-gray-600">Shape Layer - Button</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Fully Editable
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Type className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Preserved Text Layers</h3>
            <p className="text-gray-600 text-sm">All text remains editable with original fonts and formatting</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Layer Structure</h3>
            <p className="text-gray-600 text-sm">Organized layers and folders for easy editing</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">High-Quality Images</h3>
            <p className="text-gray-600 text-sm">Images preserved at original resolution</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;