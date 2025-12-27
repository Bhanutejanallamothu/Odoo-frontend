
import { WorkCenter } from '@/lib/types';

const API_URL = '/api/work-centers';

export async function getWorkCenters(): Promise<WorkCenter[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch work centers');
  }
  return response.json();
}

export async function createWorkCenter(workCenter: Omit<WorkCenter, 'id'>): Promise<WorkCenter> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workCenter),
    });
    if (!response.ok) {
        throw new Error('Failed to create work center');
    }
    return response.json();
}

export async function updateWorkCenter(id: string, workCenter: Partial<Omit<WorkCenter, 'id'>>): Promise<WorkCenter> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workCenter),
    });
    if (!response.ok) {
        throw new Error('Failed to update work center');
    }
    return response.json();
}

export async function deleteWorkCenter(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete work center');
    }
}
