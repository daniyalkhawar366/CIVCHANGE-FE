import React from 'react';

const FeaturedIn: React.FC = () => {
  const publications = [
    { name: 'TechCrunch', logo: 'TC' },
    { name: 'Design Week', logo: 'DW' },
    { name: 'Creative Bloq', logo: 'CB' },
    { name: 'Smashing Magazine', logo: 'SM' },
    { name: 'Behance', logo: 'BH' },
    { name: 'Dribbble', logo: 'DR' },
  ];

  return (
    <section className="section-padding bg-white/50">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="text-sm font-light text-gray-500 mb-4">FEATURED IN</p>
          <h2 className="text-2xl font-light text-gray-900">
            Trusted by leading design publications
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {publications.map((publication, index) => (
            <div
              key={publication.name}
              className="flex flex-col items-center space-y-3"
            >
              <div className="w-16 h-16 glass-card rounded-xl flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">
                  {publication.logo}
                </span>
              </div>
              <span className="text-xs font-light text-gray-500 text-center">
                {publication.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-light text-gray-500 max-w-2xl mx-auto">
            Join thousands of designers who trust our platform to convert their Canva designs 
            into professional Photoshop files with perfect layer preservation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn; 