
import { Team } from '@/lib/types';

const API_URL = '/api/teams';

export async function getTeams(): Promise<Team[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch teams');
  }
  return response.json();
}

export async function createTeam(team: Omit<Team, 'id'>): Promise<Team> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
    });
    if (!response.ok) {
        throw new Error('Failed to create team');
    }
    return response.json();
}

export async function updateTeam(id: string, team: Partial<Omit<Team, 'id'>>): Promise<Team> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(team),
    });
    if (!response.ok) {
        throw new Error('Failed to update team');
    }
    return response.json();
}

export async function deleteTeam(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete team');
    }
}
