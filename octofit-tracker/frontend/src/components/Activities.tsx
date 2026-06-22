import { useState, useEffect } from 'react';
import { fetchFromApi } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Activity {
  _id: string;
  user: User;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
  notes: string;
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivities = async () => {
      setLoading(true);
      const result = await fetchFromApi<Activity[]>('/activities');
      
      if (result.error) {
        setError(result.error);
        setActivities([]);
      } else if (result.data) {
        // Handle both array and paginated responses
        const activitiesData = Array.isArray(result.data) ? result.data : result.data.data || [];
        setActivities(activitiesData);
        setError(null);
      }
      setLoading(false);
    };

    loadActivities();
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

  const activityTypeColors: Record<string, string> = {
    'Running': 'danger',
    'Cycling': 'info',
    'Swimming': 'primary',
    'Yoga': 'success',
    'Weight Training': 'warning',
  };

  return (
    <div className="container">
      <h1 className="mb-4">Activities</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          Error loading activities: {error}
        </div>
      )}

      {activities.length === 0 ? (
        <div className="alert alert-info">No activities found</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Calories Burned</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>{activity.user?.name || 'Unknown'}</td>
                  <td>
                    <span className={`badge bg-${activityTypeColors[activity.type] || 'secondary'}`}>
                      {activity.type}
                    </span>
                  </td>
                  <td>{activity.durationMinutes}</td>
                  <td className="fw-bold">{activity.caloriesBurned}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                  <td className="text-muted small">{activity.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
