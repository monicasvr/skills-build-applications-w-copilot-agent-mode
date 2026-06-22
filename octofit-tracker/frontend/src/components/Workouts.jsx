import React, { useState, useEffect } from 'react';
import { fetchFromApi } from '../api.js';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetchFromApi('/workouts');
      if (res.error) {
        setError(res.error);
        setWorkouts([]);
      } else if (res.data) {
        const data = Array.isArray(res.data) ? res.data : res.data.data || [];
        setWorkouts(data);
        setError(null);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="container"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;

  const difficultyColor = { Beginner: 'success', Intermediate: 'warning', Advanced: 'danger', Expert: 'dark' };
  const icons = { Cardio: '🏃', Strength: '💪', Flexibility: '🧘', Endurance: '🚴', HIIT: '⚡' };

  return (
    <div className="container">
      <h1 className="mb-4">Available Workouts</h1>
      {error && <div className="alert alert-danger">Error loading workouts: {error}</div>}
      {workouts.length === 0 ? <div className="alert alert-info">No workouts available</div> : (
        <div className="row">
          {workouts.map(w => (
            <div key={w._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body">
                  <h5 className="card-title"><span className="me-2">{icons[w.category] || '🏋️'}</span>{w.title}</h5>
                  <p className="card-text text-muted">{w.description}</p>
                  <div className="d-flex gap-2 mb-3">
                    <span className={`badge bg-${difficultyColor[w.difficulty] || 'secondary'}`}>{w.difficulty}</span>
                    <span className="badge bg-info">{w.category}</span>
                  </div>
                  <small className="text-muted d-block">⏱️ Duration: {w.durationMinutes} minutes</small>
                </div>
                <div className="card-footer bg-light"><button className="btn btn-primary btn-sm w-100">Start Workout</button></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
