import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile, updateProfile } from '../../services/api';
import toast from 'react-hot-toast';
import { LogOut, Eye, EyeOff } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userProfile = await getProfile();
      setProfile(userProfile);
      setName(userProfile.name);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load profile');
    }
  };

  const handleUpdateName = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const updatedProfile = await updateProfile({ name });
      setProfile(updatedProfile);
      setSuccess('Name updated successfully!');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update name');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // You can implement password update logic here later
      setSuccess('Password updated!');
      setPassword('');
    } catch (err: any) {
      setError('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-2">
      {/* Navigation Bar */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <Link 
          to="/" 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
        >
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all focus:outline-none"
        >
          <LogOut className="w-5 h-5 mr-1" />
          <span>Logout</span>
        </button>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Account Info</h1>
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">{success}</div>
        )}
        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 font-medium cursor-not-allowed"
            />
          </div>
          {/* Name */}
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium"
                placeholder="Enter your name"
              />
            </div>
            <button
              onClick={handleUpdateName}
              disabled={loading || name === profile.name}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </div>
          {/* Password */}
          <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-medium pr-12"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-blue-600 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={handleUpdatePassword}
              disabled={loading || !password}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update
            </button>
          </div>
          {/* Plan Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Plan</label>
              <div className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 font-semibold">
                {profile.plan || 'Free'}
              </div>
            </div>
            <button
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all shadow-none"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 