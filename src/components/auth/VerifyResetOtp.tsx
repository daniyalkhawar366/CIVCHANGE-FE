import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { verifyResetOtp, forgotPassword } from '../../services/api';
import toast from 'react-hot-toast';

const VerifyResetOtp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const emailParam = params.get('email') || '';
  const [email] = useState(emailParam);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code) {
      toast.error('Please enter the OTP sent to your email.');
      return;
    }
    setLoading(true);
    try {
      await verifyResetOtp({ email, code });
      toast.success('OTP verified. Please enter your new password.');
      navigate(`/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error('Invalid or expired OTP. Please try again or request a new one.');
      } else {
        toast.error('Failed to verify OTP.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await forgotPassword({ email });
      toast.success('OTP resent to your email.');
    } catch (err) {
      toast.error('Failed to resend OTP.');
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg text-gray-700">No email provided. <Link to="/forgot-password" className="text-indigo-600">Go back</Link></p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
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
          Enter OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 animate-slide-up animation-delay-100">
          Enter the OTP sent to <span className="font-semibold">{email}</span>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slide-up animation-delay-200">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="animate-slide-up animation-delay-300">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                  placeholder="Enter the OTP"
                />
              </div>
            </div>
            <div className="flex items-center justify-between animate-slide-up animation-delay-400">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-indigo-600 hover:text-indigo-500 text-sm font-medium focus:outline-none"
              >
                {resending ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
            <div className="animate-slide-up animation-delay-500">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center animate-slide-up animation-delay-600">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Back to Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetOtp; 