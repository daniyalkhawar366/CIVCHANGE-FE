import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminUserManagement from './AdminUserManagement';
import AdminAnalytics from './AdminAnalytics';
import AdminFeedback from './AdminFeedback';
import AdminSettings from './AdminSettings';

const SECTIONS = [
  { key: 'users', label: 'User Management' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'feedback', label: 'Feedback' },
  { key: 'settings', label: 'Settings' },
];

const Admin: React.FC = () => {
  const { user, logout } = useAuth();
  const [section, setSection] = useState('users');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 animate-fade-in relative">
      {/* Logout Icon Button */}
      <button
        onClick={handleLogout}
        className="fixed top-6 right-8 z-50 bg-white/80 hover:bg-red-600 text-gray-700 hover:text-white rounded-full shadow-lg p-3 transition-all duration-200 group"
        title="Logout"
        aria-label="Logout"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
        </svg>
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">Logout</span>
      </button>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col py-6 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-gray-600 text-sm mt-1">Welcome, {user?.name}!</p>
        </div>
        <nav className="flex-1 space-y-2">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              className={`w-full text-left px-4 py-2 rounded transition font-medium ${section === s.key ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => setSection(s.key)}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-8 border-t">
          <span className="block text-xs text-gray-400">{user?.email}</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 mt-2">Admin</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {section === 'users' && <AdminUserManagement />}
        {section === 'analytics' && <AdminAnalytics />}
        {section === 'feedback' && <AdminFeedback />}
        {section === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};

export default Admin; 