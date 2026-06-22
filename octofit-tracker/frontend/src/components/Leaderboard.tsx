import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

interface LeaderboardEntry {
  _id: string;
  user?: {
    _id: string;
    name: string;
  };
  team?: {
    _id: string;
    name: string;
  };
  rank: number;
  score: number;
}

function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const result = await fetchFromApi<LeaderboardEntry[]>('/leaderboard');
      
      if (result.error) {
        setError(result.error);
        setEntries([]);
      } else if (result.data) {
        // Handle both array and paginated responses
        const leaderboardData = Array.isArray(result.data) ? result.data : result.data.data || [];
        setEntries(leaderboardData);
        setError(null);
      }
      setLoading(false);
    };

    loadLeaderboard();
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

  const getMedalIcon = (rank: number): string => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '📊';
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Leaderboard</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading leaderboard: {error}
        </div>
      )}

      {entries.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found</div>
      ) : (
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry._id} className={entry.rank === 1 ? 'table-warning' : ''}>
                      <td className="fw-bold">
                        <span className="me-2">{getMedalIcon(entry.rank)}</span>
                        #{entry.rank}
                      </td>
                      <td className="fw-bold">
                        {entry.user?.name || entry.team?.name || 'Unknown'}
                      </td>
                      <td>
                        <span className="badge bg-secondary">
                          {entry.user ? 'User' : 'Team'}
                        </span>
                      </td>
                      <td className="fw-bold text-success">{entry.score} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
