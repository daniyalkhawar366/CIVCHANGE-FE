import React, { useEffect, useState } from 'react';
import { getAllUsers, AdminUser } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PAGE_SIZE = 10;

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page, search]);

  async function fetchUsers() {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllUsers(page, search);
      setUsers(res.users);
      setTotal(res.total);
      console.log('Fetched users:', res.users);
    } catch (err: any) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {user?.role !== 'admin' && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          Warning: You are not an admin. User management may not be available.
        </div>
      )}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border rounded px-3 py-2 w-64"
          value={search}
          onChange={e => { setPage(1); setSearch(e.target.value); }}
        />
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No users found. (If you expect users, check backend API and admin permissions.)</div>
        ) : (
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="text-indigo-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >Prev</button>
        <span className="px-3 py-1">Page {page}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => p + 1)}
          disabled={page * PAGE_SIZE >= total}
        >Next</button>
      </div>
    </div>
  );
};

export default AdminUserManagement; 