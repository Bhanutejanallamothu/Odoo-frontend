
import { User } from '@/lib/types';

const API_URL = '/api/users';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}
