import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api.js';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchFromApi('/teams');
      if (res.error) {
        setError(res.error);
        setTeams([]);
      } else if (res.data) {
        const teamsData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setTeams(teamsData);
        setError(null);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  return (
    <div className="container">
      <h1 className="mb-4">Teams</h1>
      {error && <div className="alert alert-danger">Error loading teams: {error}</div>}
      {teams.length === 0 ? <div className="alert alert-info">No teams found</div> : (
        <div className="row">
          {teams.map(team => (
            <div key={team._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text text-muted">{team.description}</p>
                  <div className="mt-3">
                    <h6 className="mb-2">Members ({team.members?.length || 0})</h6>
                    {team.members && team.members.length > 0 ? (
                      <ul className="list-unstyled">
                        {team.members.map(m => (
                          <li key={m._id} className="small"><span className="badge bg-info me-2">{m.role}</span>{m.name}</li>
                        ))}
                      </ul>
                    ) : <p className="text-muted small">No members</p>}
                  </div>
                  <small className="text-muted">Created: {new Date(team.createdAt).toLocaleDateString()}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
