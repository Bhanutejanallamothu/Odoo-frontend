
'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { teams, users } from '@/lib/mock-data';
import { Team } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TeamsPage() {
  const getTeamMemberNames = (memberIds: string[]) => {
    return memberIds.map(id => users.find(u => u.id === id)?.name).filter(Boolean).join(', ');
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Maintenance Teams
        </h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Teams</CardTitle>
          <CardDescription>
            Create and manage your maintenance teams.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                <TableHead>Team Members</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{getTeamMemberNames(team.memberIds)}</TableCell>
                  <TableCell>My Company (San Francisco)</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
