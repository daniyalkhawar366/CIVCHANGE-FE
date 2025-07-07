import React from 'react';

const AdminAnalytics: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded shadow p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-lg font-semibold text-gray-900">1,234</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <p className="text-sm text-gray-500">Active Users</p>
          <p className="text-lg font-semibold text-gray-900">987</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <p className="text-sm text-gray-500">Conversions</p>
          <p className="text-lg font-semibold text-gray-900">5,678</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <p className="text-sm text-gray-500">Revenue</p>
          <p className="text-lg font-semibold text-gray-900">$12,345</p>
        </div>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-2">Charts</h3>
        <div className="h-48 flex items-center justify-center text-gray-400">[Charts Placeholder]</div>
      </div>
    </div>
  );
};

export default AdminAnalytics; 