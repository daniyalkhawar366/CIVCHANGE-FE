import React from 'react';

const planData = [
  {
    name: 'Starter',
    price: '$10/mo',
    description: '20 conversions',
    features: [
      { label: '20 conversions', available: true },
      { label: 'Layer preservation', available: true },
    ],
    button: 'Choose Starter',
    recommended: false,
  },
  {
    name: 'Pro',
    price: '$29/mo',
    description: '50 conversions',
    features: [
      { label: '50 conversions', available: true },
      { label: 'Layer preservation', available: true },
    ],
    button: 'Choose Pro',
    recommended: true,
  },
  {
    name: 'Business',
    price: '$99/mo',
    description: '200 conversions',
    features: [
      { label: '200 conversions', available: true },
      { label: 'Layer preservation', available: true },
    ],
    button: 'Choose Business',
    recommended: false,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'Custom conversions and solutions for large teams',
    features: [
      { label: 'Custom conversions', available: true },
      { label: 'Layer preservation', available: true },
    ],
    button: 'Contact Sales',
    recommended: false,
  },
];

function getRedFeatures(planIdx: number) {
  return [];
}

const Pricing: React.FC = () => (
  <section id="pricing" className="section-padding bg-gradient-to-br from-slate-50 to-white animate-fade-in-up">
    <div className="container-max">
      <div className="text-center mb-16">
        <p className="text-sm font-light text-gray-500 mb-4">PRICING</p>
        <h2 className="text-4xl font-light text-gray-900 mb-4">Choose your plan</h2>
        <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
          Flexible plans for every designer and team
        </p>
      </div>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {planData.map((plan, idx) => {
            const green = plan.features.filter(f => f.available);
            const redLabels = getRedFeatures(idx);
            return (
              <div
                key={plan.name}
                className={`glass-card p-8 flex flex-col items-start text-left relative min-h-[340px] transition-all duration-300 ${plan.recommended ? 'border-2 border-blue-500 shadow-2xl scale-105 z-10' : ''} hover:border-2 hover:border-blue-500`}
                style={{height: '100%'}}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-4 py-1 rounded-full shadow-lg font-semibold">
                    Recommended
                  </div>
                )}
                <h3 className="text-2xl font-light text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-12">{plan.price}</div>
                <ul className="mb-2 space-y-2 w-full">
                  {green.map(f => (
                    <li key={f.label} className="flex items-center space-x-2">
                      <span className="text-green-500">✔</span>
                      <span className="text-gray-700 font-light">{f.label}</span>
                    </li>
                  ))}
                </ul>
                {redLabels.length > 0 && (
                  <ul className="mb-2 space-y-2 w-full">
                    {redLabels.map(label => (
                      <li key={label} className="flex items-center space-x-2">
                        <span className="text-red-400">✖</span>
                        <span className="text-red-400 font-light line-through">{label}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <button className={`w-full mt-auto px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  plan.recommended 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}>
                  {plan.button}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default Pricing;