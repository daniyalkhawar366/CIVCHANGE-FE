import React from 'react';

const AdminFeedback: React.FC = () => {
  return (
    <div>
      <div className="bg-white rounded shadow p-6">
        <h3 className="text-lg font-semibold mb-4">User Feedback</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td className="px-4 py-2">Jane Doe</td>
              <td className="px-4 py-2">Great service!</td>
              <td className="px-4 py-2">2024-06-01</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-green-600 hover:underline">Mark Resolved</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">John Smith</td>
              <td className="px-4 py-2">Found a bug in conversion.</td>
              <td className="px-4 py-2">2024-06-02</td>
              <td className="px-4 py-2 space-x-2">
                <button className="text-green-600 hover:underline">Mark Resolved</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminFeedback; 