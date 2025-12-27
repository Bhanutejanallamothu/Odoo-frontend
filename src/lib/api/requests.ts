
import { MaintenanceRequest } from '@/lib/types';

const API_URL = '/api/requests';

export async function getRequests(filters: Record<string, string> = {}): Promise<MaintenanceRequest[]> {
  const query = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}?${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch requests');
  }
  return response.json();
}

export async function getRequestById(id: string): Promise<MaintenanceRequest> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch request');
  }
  return response.json();
}

export async function createRequest(request: Omit<MaintenanceRequest, 'id'>): Promise<MaintenanceRequest> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error('Failed to create request');
  }
  return response.json();
}

export async function updateRequest(id: string, request: Partial<Omit<MaintenanceRequest, 'id'>>): Promise<MaintenanceRequest> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    throw new Error('Failed to update request');
  }
  return response.json();
}

export async function deleteRequest(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete request');
  }
}
