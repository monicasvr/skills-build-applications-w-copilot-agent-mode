import { test, expect } from '@playwright/test';

const API_BASE = 'http://localhost:8000';

test.describe('Backend API endpoints', () => {
  test('GET /api/activities returns non-empty array', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/activities`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const data = Array.isArray(body) ? body : body.data;
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('GET /api/leaderboard returns entries with score and rank', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/leaderboard`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const data = Array.isArray(body) ? body : body.data;
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('score');
    expect(data[0]).toHaveProperty('rank');
  });

  test('GET /api/teams returns teams with members array', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/teams`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const data = Array.isArray(body) ? body : body.data;
    expect(data.length).toBeGreaterThan(0);
    expect(Array.isArray(data[0].members)).toBeTruthy();
  });

  test('GET /api/users returns users with email and role', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/users`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const data = Array.isArray(body) ? body : body.data;
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('email');
    expect(data[0]).toHaveProperty('role');
  });

  test('GET /api/workouts returns workouts with title', async ({ request }) => {
    const res = await request.get(`${API_BASE}/api/workouts`);
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const data = Array.isArray(body) ? body : body.data;
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('title');
  });
});
