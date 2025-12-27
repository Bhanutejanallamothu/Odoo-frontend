
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
import { Team, User } from '@/lib/types';

type TeamsTableProps = {
  teams: Team[];
  users: User[];
  onRowClick: (team: Team) => void;
};

export default function TeamsTable({ teams, users, onRowClick }: TeamsTableProps) {
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
            <TableHead>Total Members</TableHead>
            <TableHead>Team Members</TableHead>
            <TableHead>Company</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id} onClick={() => onRowClick(team)} className="cursor-pointer">
              <TableCell className="font-medium">{team.name}</TableCell>
              <TableCell>{team.memberIds.length}</TableCell>
              <TableCell>{getTeamMemberNames(team.memberIds)}</TableCell>
              <TableCell>My Company (San Francisco)</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
