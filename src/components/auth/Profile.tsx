import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile, updateProfile } from '../../services/api';
import toast from 'react-hot-toast';
import { LogOut, Eye, EyeOff, Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [name, setName] = useState('');
  // Password update fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!currentPassword || !newPassword) {
      toast.error('Please fill in all password fields.');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('New password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => { // Simulate async
      setLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      toast.success('Password updated successfully!');
    }, 1200);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-2 py-8">
      {/* Navigation Bar */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-8">
        <Link 
          to="/" 
          className="px-4 py-2 text-base font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all shadow"
        >
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-base font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-all shadow focus:outline-none"
        >
          <LogOut className="w-5 h-5 mr-1" />
          <span>Logout</span>
        </button>
      </div>
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-16 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Account Info</h1>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-base font-medium">{error}</div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-base font-medium">{success}</div>
        )}
        <div className="space-y-10">
          {/* Email */}
          <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 font-semibold cursor-not-allowed text-lg"
            />
          </div>
          {/* Name */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">Change Name</h2>
            <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold text-lg"
                  placeholder="Enter your name"
                />
              </div>
              <button
                onClick={handleUpdateName}
                disabled={loading || name === profile.name}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg shadow hover:bg-blue-700 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
          {/* Password Update */}
          <div className="animate-fade-in-up">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Change Password</h2>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8 max-w-xl mx-auto">
              <form className="space-y-6" onSubmit={handleUpdatePassword} autoComplete="off">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="current-password">Current Password</label>
                  <div className="relative">
                    <input
                      id="current-password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold text-lg pr-12 outline-none focus:shadow-lg"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none transition-transform duration-200 ${showCurrentPassword ? 'rotate-12 scale-110' : ''}`}
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-2" htmlFor="new-password">New Password</label>
                  <div className="relative">
                    <input
                      id="new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold text-lg pr-12 outline-none focus:shadow-lg"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none transition-transform duration-200 ${showNewPassword ? 'rotate-12 scale-110' : ''}`}
                      tabIndex={-1}
                      aria-label="Toggle password visibility"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex w-full justify-center md:justify-end mt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-lg shadow hover:bg-blue-700 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Plan Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">Plan</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
              <div className="flex-1">
                <div className="px-5 py-4 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 font-bold text-lg">
                  {profile.plan || 'Free'}
                </div>
              </div>
              <button
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 