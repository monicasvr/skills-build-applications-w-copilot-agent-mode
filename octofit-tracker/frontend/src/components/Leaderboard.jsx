import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api.js';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchFromApi('/leaderboard');
      if (res.error) {
        setError(res.error);
        setEntries([]);
      } else if (res.data) {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setEntries(data);
        setError(null);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  const medal = r => (r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : '📊');

  return (
    <div className="container">
      <h1 className="mb-4">Leaderboard</h1>
      {error && <div className="alert alert-danger">Error loading leaderboard: {error}</div>}
      {entries.length === 0 ? <div className="alert alert-info">No leaderboard entries found</div> : (
        <div className="row"><div className="col-md-8 mx-auto"><div className="table-responsive"><table className="table table-striped table-hover"><thead className="table-dark"><tr><th>Rank</th><th>Name</th><th>Type</th><th>Score</th></tr></thead><tbody>
          {entries.map(e => (
            <tr key={e._id} className={e.rank === 1 ? 'table-warning' : ''}>
              <td className="fw-bold"><span className="me-2">{medal(e.rank)}</span>#{e.rank}</td>
              <td className="fw-bold">{e.user?.name || e.team?.name || 'Unknown'}</td>
              <td><span className="badge bg-secondary">{e.user ? 'User' : 'Team'}</span></td>
              <td className="fw-bold text-success">{e.score} pts</td>
            </tr>
          ))}
        </tbody></table></div></div></div>
      )}
    </div>
  );
}
