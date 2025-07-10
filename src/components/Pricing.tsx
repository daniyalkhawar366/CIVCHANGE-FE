import React from 'react';
import { createCheckoutSession, getAccountInfo } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

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

const planToApiName: Record<string, 'basic' | 'pro' | 'premium'> = {
  Starter: 'basic',
  Pro: 'pro',
  Business: 'premium',
};

const Pricing: React.FC = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [accountLoading, setAccountLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setAccountLoading(true);
      getAccountInfo().then(data => {
        setAccount(data);
      }).finally(() => setAccountLoading(false));
    }
  }, [isAuthenticated]);

  // Debug logs
  console.log('Pricing: isAuthenticated:', isAuthenticated, 'user:', user, 'loading:', loading);

  // Plan order for upgrade logic
  const planOrder = ['basic', 'pro', 'premium'];
  const getHigherPlans = (current: string) => {
    const idx = planOrder.indexOf((current || 'basic').toLowerCase());
    return planOrder.slice(idx + 1);
  };

  const handleChoosePlan = async (planName: string, event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) event.preventDefault();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setLoadingPlan(planName);
    try {
      // Check subscription status
      const account = await getAccountInfo();
      if (account.subscriptionStatus === 'active') {
        // Only allow upgrade to higher plans
        const currentIdx = planOrder.indexOf((account.plan || 'basic').toLowerCase());
        const targetIdx = planOrder.indexOf(planToApiName[planName]);
        if (targetIdx > currentIdx) {
          // Try upgrade
          try {
            const { url } = await import('../services/api').then(m => m.upgradeSubscription(planToApiName[planName]));
            window.location.href = url;
          } catch (err: any) {
            if (err.response && err.response.status === 403 && err.response.data?.message) {
              toast.error(err.response.data.message);
            } else {
              toast.error('Failed to start upgrade. Please try again.');
            }
          }
        } else {
          toast.error('To downgrade, please cancel your current subscription first.');
        }
        setLoadingPlan(null);
        return;
      }
      // No active subscription, allow purchase
      const apiPlan = planToApiName[planName];
      if (!apiPlan) return;
      const token = localStorage.getItem('authToken');
      const response = await fetch('https://civchange-be-production.up.railway.app/api/payments/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: apiPlan }),
      });
      if (!response.ok) throw new Error('Failed to create checkout session');
      const data = await response.json();
      if (!data.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;
    } catch (err) {
      toast.error('Failed to start checkout. Please try again.');
      console.error('Checkout error:', err);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="section-padding animate-fade-in-up">
      <div className="container-max">
        <div className="text-center mb-16">
          <p className="text-sm font-light text-gray-500 mb-4">PRICING</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">Choose your plan</h2>
          <p className="text-lg font-light text-gray-600 max-w-2xl mx-auto">
            Flexible plans for every designer and team
          </p>
        </div>
        <div className="w-full">
          {/* Show current plan and conversions if available */}
          {isAuthenticated && !accountLoading && account && (
            <div className="mb-8 p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="text-gray-800 text-lg">Current Plan: <span className="font-semibold">{account.plan || 'Free'}</span></div>
              <div className="text-gray-800 text-lg">Conversions Left: <span className="font-semibold">{account.conversionsLeft ?? '-'}</span></div>
            </div>
          )}
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
                  <button
                    type="button"
                    className={`w-full mt-auto px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                      plan.recommended 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                    onClick={(e) => handleChoosePlan(plan.name, e)}
                    disabled={loadingPlan === plan.name || !planToApiName[plan.name]}
                  >
                    {loadingPlan === plan.name ? 'Redirecting...' : plan.button}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;