import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api.js';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchFromApi('/users');
      if (res.error) {
        setError(res.error);
        setUsers([]);
      } else if (res.data) {
        const usersData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setUsers(usersData);
        setError(null);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="container">
      <h1 className="mb-4">Users</h1>
      {error && <div className="alert alert-danger">Error loading users: {error}</div>}
      {users.length === 0 ? <div className="alert alert-info">No users found</div> : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark"><tr><th>Name</th><th>Email</th><th>Role</th><th>Team</th><th>Points</th><th>Joined</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className="badge bg-primary">{u.role}</span></td>
                  <td>{u.team?.name || 'No Team'}</td>
                  <td className="fw-bold">{u.totalPoints}</td>
                  <td>{new Date(u.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
