
import { EquipmentCategory } from '@/lib/types';

const API_URL = '/api/equipment-categories';

export async function getEquipmentCategories(): Promise<EquipmentCategory[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch equipment categories');
  }
  return response.json();
}

export async function createEquipmentCategory(category: Omit<EquipmentCategory, 'id'>): Promise<EquipmentCategory> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    if (!response.ok) {
        throw new Error('Failed to create equipment category');
    }
    return response.json();
}

export async function updateEquipmentCategory(id: string, category: Partial<Omit<EquipmentCategory, 'id'>>): Promise<EquipmentCategory> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
    });
    if (!response.ok) {
        throw new Error('Failed to update equipment category');
    }
    return response.json();
}

export async function deleteEquipmentCategory(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete equipment category');
    }
}
