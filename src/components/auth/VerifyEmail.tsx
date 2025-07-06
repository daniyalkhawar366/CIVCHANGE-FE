import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { verifyEmail, resendVerification } from '../../services/api';
import toast from 'react-hot-toast';

const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code) {
      toast.error('Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      await verifyEmail({ code });
      toast.success('Email verified successfully!');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setResendLoading(true);
    try {
      await resendVerification({ email });
      toast.success('Verification code sent to your email');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to resend verification code');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      {/* Back to Home Button */}
      <div className="absolute top-8 left-8 animate-slide-up">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 animate-slide-up">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 animate-slide-up animation-delay-100">
          We sent a verification code to your email address
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slide-up animation-delay-200">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="animate-slide-up animation-delay-300">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  placeholder="Enter the 6-digit code"
                />
              </div>
            </div>

            <div className="animate-slide-up animation-delay-400">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
            </div>
          </form>

          <div className="mt-6 animate-slide-up animation-delay-500">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Need a new code?</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="space-y-4">
                <div className="animate-slide-up animation-delay-600">
                  <label htmlFor="resend-email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="resend-email"
                      name="resend-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="animate-slide-up animation-delay-700">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {resendLoading ? 'Sending...' : 'Resend Code'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center animate-slide-up animation-delay-800">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail; 