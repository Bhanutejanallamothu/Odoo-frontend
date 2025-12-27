
import { Equipment } from '@/lib/types';

const API_URL = '/api/equipment';

export async function getAllEquipment(): Promise<Equipment[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch equipment');
  }
  return response.json();
}

export async function getEquipmentById(id: string): Promise<Equipment> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch equipment');
  }
  return response.json();
}

export async function createEquipment(equipment: Omit<Equipment, 'id'>): Promise<Equipment> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment),
  });
  if (!response.ok) {
    throw new Error('Failed to create equipment');
  }
  return response.json();
}

export async function updateEquipment(id: string, equipment: Partial<Omit<Equipment, 'id'>>): Promise<Equipment> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(equipment),
  });
  if (!response.ok) {
    throw new Error('Failed to update equipment');
  }
  return response.json();
}

export async function deleteEquipment(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete equipment');
    }
}
