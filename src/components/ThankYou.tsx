import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function getQueryParam(search: string, key: string) {
  const params = new URLSearchParams(search);
  return params.get(key);
}

const planNames: Record<string, string> = {
  basic: 'Starter',
  pro: 'Pro',
  premium: 'Business',
};

const Balloon = ({ delay, color }: { delay: number; color: string }) => (
  <div
    className={`absolute bottom-0 left-1/2 w-12 h-16 rounded-full opacity-80 animate-bounce-balloon`}
    style={{
      background: color,
      animationDelay: `${delay}ms`,
      left: `calc(50% + ${delay / 10 - 40}px)`
    }}
  />
);

const ThankYou: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const success = getQueryParam(location.search, 'success');
  const plan = getQueryParam(location.search, 'plan');

  useEffect(() => {
    if (success !== '1') {
      navigate('/', { replace: true });
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-purple-300 to-pink-200 relative overflow-hidden">
      {/* Balloons Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <Balloon delay={0} color="#60a5fa" />
        <Balloon delay={300} color="#f472b6" />
        <Balloon delay={600} color="#facc15" />
        <Balloon delay={900} color="#34d399" />
        <Balloon delay={1200} color="#a78bfa" />
      </div>
      <div className="relative z-10 flex flex-col items-center p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md max-w-lg w-full animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 text-center drop-shadow-lg">
          Thank You for Subscribing!
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium mb-6 text-center">
          {plan ? `You have successfully subscribed to the ${planNames[plan] || plan} plan.` : 'Your subscription was successful.'}
        </p>
        <div className="mb-8">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow-lg animate-pop">
            🎉 Welcome to CIVCHANGE! 🎉
          </span>
        </div>
        <button
          className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
      {/* Balloon keyframes */}
      <style>{`
        @keyframes bounce-balloon {
          0% { transform: translateY(0); opacity: 0.8; }
          30% { opacity: 1; }
          50% { transform: translateY(-300px) scale(1.1); opacity: 0.9; }
          70% { opacity: 1; }
          100% { transform: translateY(-600px) scale(1.2); opacity: 0; }
        }
        .animate-bounce-balloon {
          animation: bounce-balloon 3s cubic-bezier(.4,0,.2,1) infinite;
        }
        .animate-pop {
          animation: pop-in 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes pop-in {
          0% { transform: scale(0.7); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ThankYou; 