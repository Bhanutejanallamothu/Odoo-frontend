
'use client';

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Team, User } from '@/lib/types';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TeamsTableProps = {
  teams: Team[];
  users: User[];
  onEdit: (team: Team) => void;
  onDelete: (team: Team) => void;
};

export default function TeamsTable({ teams, users, onEdit, onDelete }: TeamsTableProps) {
  const getTeamMemberNames = (memberIds: string[]) => {
    return memberIds
      .map((id) => users.find((u) => u.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="rounded-md border bg-card/50">
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
    </div>
  );
}
