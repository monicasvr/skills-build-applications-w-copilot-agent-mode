import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  totalPoints: number;
  team?: {
    _id: string;
    name: string;
  };
  joinedAt: string;
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const result = await fetchFromApi<User[]>('/users');
      
      if (result.error) {
        setError(result.error);
        setUsers([]);
      } else if (result.data) {
        // Handle both array and paginated responses
        const usersData = Array.isArray(result.data) ? result.data : result.data.data || [];
        setUsers(usersData);
        setError(null);
      }
      setLoading(false);
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-4">Users</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading users: {error}
        </div>
      )}

      {users.length === 0 ? (
        <div className="alert alert-info">No users found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Team</th>
                <th>Points</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-primary">{user.role}</span>
                  </td>
                  <td>{user.team?.name || 'No Team'}</td>
                  <td className="fw-bold">{user.totalPoints}</td>
                  <td>{new Date(user.joinedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
