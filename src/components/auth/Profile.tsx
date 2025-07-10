import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getProfile, updateProfile, changePassword, createCheckoutSession, getAccountInfo, upgradeSubscription, cancelSubscription } from '../../services/api';
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
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState(false);
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
    fetchAccount();
  }, []);

  // Refresh account info after payment success
  useEffect(() => {
    if (window.location.search.includes('success=1')) {
      fetchAccount();
    }
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

  const fetchAccount = async () => {
    try {
      const data = await getAccountInfo();
      setAccount(data);
    } catch (err: any) {
      setError('Failed to load account info');
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
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      toast.success('Password updated successfully.');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Plan order for upgrade logic
  const planOrder = ['free', 'basic', 'pro', 'premium'];
  const planLabels: Record<string, string> = {
    free: 'Free',
    basic: 'Starter ($10)',
    pro: 'Pro ($29)',
    premium: 'Business ($99)'
  };

  const getHigherPlans = (current: string) => {
    const idx = planOrder.indexOf((current || 'free').toLowerCase());
    if ((current || 'free').toLowerCase() === 'free') {
      // If free, all paid plans are available
      return planOrder.slice(0);
    }
    return planOrder.slice(idx + 1);
  };

  const handleUpgradePlan = async (plan: 'basic' | 'pro' | 'premium') => {
    setUpgradeLoading(true);
    try {
      const { url } = await upgradeSubscription(plan);
      window.location.href = url;
    } catch (err: any) {
      if (err.response && err.response.status === 403 && err.response.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Failed to start upgrade. Please try again.');
      }
    } finally {
      setUpgradeLoading(false);
      setShowUpgradeModal(false);
    }
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      await cancelSubscription();
      toast.success('Subscription cancellation requested.');
      fetchAccount(); // Refresh account info after cancel
    } catch (err) {
      toast.error('Failed to cancel subscription.');
    } finally {
      setLoading(false);
    }
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
          {/* Account Subscription Info */}
          {account && (
            <div className="mb-8 p-6 rounded-xl bg-blue-50 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-800 mb-2">Subscription Details</h2>
              <div className="text-gray-800 text-lg mb-1">Current Plan: <span className="font-semibold">{account.plan || 'Free'}</span></div>
              <div className="text-gray-800 text-lg mb-1">Conversions Remaining: <span className="font-semibold">{account.conversionsLeft ?? '-'}</span></div>
              <div className="text-gray-600 text-sm mb-2">If you downgrade (cancel + repurchase), new conversions will be added to your existing balance.</div>
              <div className="text-gray-800 text-lg mb-1">Status: <span className="font-semibold">{account.subscriptionStatus || 'N/A'}</span></div>
              {account.subscriptionEndDate && (
                <div className="text-gray-800 text-lg mb-1">Subscription Ends: <span className="font-semibold">{new Date(account.subscriptionEndDate).toLocaleDateString()}</span></div>
              )}
              {account.pendingPlan && (
                <div className="text-gray-800 text-lg mb-1">Pending Plan Change: <span className="font-semibold">{account.pendingPlan}</span></div>
              )}
              {account.pendingPlan && account.pendingPlan !== account.plan && account.plan.toLowerCase() !== 'free' && (
                <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded">A downgrade is pending and will take effect next month.</div>
              )}
              <div className="flex gap-4 mt-4">
                <button
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-700 transition-all"
                  onClick={() => setShowUpgradeModal(true)}
                  disabled={upgradeLoading}
                >
                  {upgradeLoading ? 'Redirecting...' : 'Upgrade'}
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition-all"
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  style={{ display: (account.plan && account.plan.toLowerCase() === 'free') ? 'none' : undefined }}
                >
                  Cancel Subscription
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Choose a plan to upgrade</h3>
            <div className="space-y-4">
              {getHigherPlans(account?.plan).map((plan) => (
                <button
                  key={plan}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition ${plan === 'basic' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : plan === 'pro' ? 'bg-blue-200 text-blue-900 hover:bg-blue-300' : 'bg-purple-200 text-purple-900 hover:bg-purple-300'}`}
                  onClick={() => handleUpgradePlan(plan as 'basic' | 'pro' | 'premium')}
                  disabled={upgradeLoading}
                >
                  {planLabels[plan]}
                </button>
              ))}
              {getHigherPlans(account?.plan).length === 0 && (
                <div className="text-gray-500 text-center">No higher plans available to upgrade.</div>
              )}
            </div>
            <button
              className="mt-6 w-full px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
              onClick={() => setShowUpgradeModal(false)}
              disabled={upgradeLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile; 