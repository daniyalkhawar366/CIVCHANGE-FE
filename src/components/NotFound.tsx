import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md max-w-lg w-full animate-fade-in-up">
        <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-600 mb-4 text-center drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">Sorry, the page you are looking for does not exist or has been moved.</p>
        <button
          className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-600 to-pink-500 text-white rounded-xl font-bold text-lg shadow hover:from-blue-700 hover:to-pink-600 hover:scale-105 transition-all duration-200"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
      <style>{`
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

export default NotFound; 