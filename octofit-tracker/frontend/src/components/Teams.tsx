import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Team {
  _id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: string;
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTeams = async () => {
      setLoading(true);
      const result = await fetchFromApi<Team[]>('/teams');
      
      if (result.error) {
        setError(result.error);
        setTeams([]);
      } else if (result.data) {
        // Handle both array and paginated responses
        const teamsData = Array.isArray(result.data) ? result.data : result.data.data || [];
        setTeams(teamsData);
        setError(null);
      }
      setLoading(false);
    };

    loadTeams();
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
      <h1 className="mb-4">Teams</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading teams: {error}
        </div>
      )}

      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found</div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text text-muted">{team.description}</p>
                  
                  <div className="mt-3">
                    <h6 className="mb-2">Members ({team.members?.length || 0})</h6>
                    {team.members && team.members.length > 0 ? (
                      <ul className="list-unstyled">
                        {team.members.map((member) => (
                          <li key={member._id} className="small">
                            <span className="badge bg-info me-2">{member.role}</span>
                            {member.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted small">No members</p>
                    )}
                  </div>
                  
                  <small className="text-muted">
                    Created: {new Date(team.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
