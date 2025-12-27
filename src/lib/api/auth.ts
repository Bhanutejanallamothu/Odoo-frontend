
import { User } from '@/lib/types';

const API_URL = '/api/auth';

export async function login(email: string, password: string): Promise<User | null> {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        // In a real app, you'd handle different error statuses differently.
        return null;
    }

    const users: User[] = await response.json();
    // This is a mock authentication. In a real app, the API would return a single user or an error.
    const user = users.find(u => u.email === email);
    return user || null;
}
