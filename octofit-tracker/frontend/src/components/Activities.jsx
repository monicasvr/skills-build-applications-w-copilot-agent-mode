import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api.js';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchFromApi('/activities');
      if (res.error) {
        setError(res.error);
        setActivities([]);
      } else if (res.data) {
        const activitiesData = Array.isArray(res.data) ? res.data : res.data.data || [];
        setActivities(activitiesData);
        setError(null);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  const colors = { Running: 'danger', Cycling: 'info', Swimming: 'primary', Yoga: 'success', 'Weight Training': 'warning' };

  return (
    <div className="container">
      <h1 className="mb-4">Activities</h1>
      {error && <div className="alert alert-danger">Error loading activities: {error}</div>}
      {activities.length === 0 ? <div className="alert alert-info">No activities found</div> : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark"><tr><th>User</th><th>Activity Type</th><th>Duration (min)</th><th>Calories Burned</th><th>Date</th><th>Notes</th></tr></thead>
            <tbody>
              {activities.map(a => (
                <tr key={a._id}>
                  <td>{a.user?.name || 'Unknown'}</td>
                  <td><span className={`badge bg-${colors[a.type] || 'secondary'}`}>{a.type}</span></td>
                  <td>{a.durationMinutes}</td>
                  <td className="fw-bold">{a.caloriesBurned}</td>
                  <td>{new Date(a.date).toLocaleDateString()}</td>
                  <td className="text-muted small">{a.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
