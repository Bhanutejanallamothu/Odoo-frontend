'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { users } from '@/lib/mock-data';
import * as React from 'react';
import { User } from '@/lib/types';

export default function LoginForm() {
  const router = useRouter();

  const roleDisplayUsers: User[] = [
    users.find((u) => u.role === 'employee')!,
    users.find((u) => u.role === 'technician')!,
    users.find((u) => u.role === 'manager')!,
    users.find((u) => u.role === 'admin')!,
  ].filter(Boolean); // Filter out any undefined users if a role is not found

  const [selectedUser, setSelectedUser] = React.useState<User | undefined>(
    roleDisplayUsers[0] 
  );
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
    }
  }, []);

  const handleUserChange = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
    if (typeof window !== 'undefined' && user) {
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedUser?.role === 'employee') {
      router.push('/my-requests');
    } else {
      router.push('/dashboard');
    }
  };
  
  const getRoleDisplayName = (role: string) => {
      switch (role) {
          case 'admin': return 'Administrator';
          case 'manager': return 'Maintenance Manager';
          case 'technician': return 'Technician';
          case 'employee': return 'User';
          default: return 'User';
      }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
      <Card className="mx-auto w-full max-w-sm bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl">Login</CardTitle>
          <CardDescription>
            Select a user role to log in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2 text-left">
              <Label htmlFor="user-select">Select a User Role</Label>
              <Select onValueChange={handleUserChange} defaultValue={selectedUser?.id}>
                <SelectTrigger id="user-select">
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {roleDisplayUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {getRoleDisplayName(user.role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="grid gap-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={selectedUser?.email || ''}
                readOnly
                className="bg-muted/50"
              />
            </div>
            <div className="grid gap-2 text-left">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
