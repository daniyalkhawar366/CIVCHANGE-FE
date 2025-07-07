import React from 'react';

const AdminLogs: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search logs..."
          className="border rounded px-3 py-2 w-64"
        />
        <select className="border rounded px-3 py-2">
          <option value="">All Levels</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Timestamp</th>
              <th className="px-4 py-2 text-left">Level</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Placeholder rows */}
            <tr>
              <td className="px-4 py-2">2024-06-01 12:34:56</td>
              <td className="px-4 py-2">info</td>
              <td className="px-4 py-2">System started</td>
              <td className="px-4 py-2"><button className="text-indigo-600 hover:underline">View</button></td>
            </tr>
            <tr>
              <td className="px-4 py-2">2024-06-01 12:35:10</td>
              <td className="px-4 py-2">error</td>
              <td className="px-4 py-2">Failed login attempt</td>
              <td className="px-4 py-2"><button className="text-indigo-600 hover:underline">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Pagination placeholder */}
      <div className="flex justify-end mt-4 space-x-2">
        <button className="px-3 py-1 border rounded">Prev</button>
        <button className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
};

export default AdminLogs; 