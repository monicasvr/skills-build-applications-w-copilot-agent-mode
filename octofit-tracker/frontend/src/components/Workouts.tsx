import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

interface Workout {
  _id: string;
  title: string;
  difficulty: string;
  durationMinutes: number;
  category: string;
  description: string;
}

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      const result = await fetchFromApi<Workout[]>('/workouts');
      
      if (result.error) {
        setError(result.error);
        setWorkouts([]);
      } else if (result.data) {
        // Handle both array and paginated responses
        const workoutsData = Array.isArray(result.data) ? result.data : result.data.data || [];
        setWorkouts(workoutsData);
        setError(null);
      }
      setLoading(false);
    };

    loadWorkouts();
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

  const difficultyBadgeColor: Record<string, string> = {
    'Beginner': 'success',
    'Intermediate': 'warning',
    'Advanced': 'danger',
    'Expert': 'dark',
  };

  const categoryIcons: Record<string, string> = {
    'Cardio': '🏃',
    'Strength': '💪',
    'Flexibility': '🧘',
    'Endurance': '🚴',
    'HIIT': '⚡',
  };

  return (
    <div className="container">
      <h1 className="mb-4">Available Workouts</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading workouts: {error}
        </div>
      )}

      {workouts.length === 0 ? (
        <div className="alert alert-info">No workouts available</div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body">
                  <h5 className="card-title">
                    <span className="me-2">
                      {categoryIcons[workout.category] || '🏋️'}
                    </span>
                    {workout.title}
                  </h5>
                  
                  <p className="card-text text-muted">{workout.description}</p>
                  
                  <div className="d-flex gap-2 mb-3">
                    <span className={`badge bg-${difficultyBadgeColor[workout.difficulty] || 'secondary'}`}>
                      {workout.difficulty}
                    </span>
                    <span className="badge bg-info">{workout.category}</span>
                  </div>
                  
                  <div className="workout-info">
                    <small className="text-muted d-block">
                      ⏱️ Duration: {workout.durationMinutes} minutes
                    </small>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-primary btn-sm w-100">
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
