"use client";

import * as React from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Filter,
  PlusCircle,
  Wrench,
  Search,
  MoreHorizontal
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Equipment, Team } from '@/lib/types';
import { maintenanceRequests } from '@/lib/mock-data';

type EquipmentTableProps = {
  equipment: Equipment[];
  teams: Team[];
  departments: string[];
};

export default function EquipmentTable({
  equipment: allEquipment,
  teams,
  departments,
}: EquipmentTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [departmentFilters, setDepartmentFilters] = React.useState<string[]>([]);
  const [teamFilters, setTeamFilters] = React.useState<string[]>([]);

  const getTeamName = (teamId: string) => {
    return teams.find((t) => t.id === teamId)?.name || 'N/A';
  };
  
  const getOpenRequestCount = (equipmentId: string) => {
    return maintenanceRequests.filter(req => req.equipmentId === equipmentId && (req.status === 'New' || req.status === 'In Progress')).length;
  };

  const filteredEquipment = React.useMemo(() => {
    return allEquipment
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (item) =>
          departmentFilters.length === 0 ||
          departmentFilters.includes(item.department)
      )
      .filter(
        (item) =>
          teamFilters.length === 0 || teamFilters.includes(item.maintenanceTeamId)
      );
  }, [allEquipment, searchTerm, departmentFilters, teamFilters]);
  
  const toggleFilter = (filterList: string[], setFilterList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    const newFilterList = filterList.includes(value)
      ? filterList.filter((item) => item !== value)
      : [...filterList, value];
    setFilterList(newFilterList);
  };

  const statusVariant: { [key in Equipment['status']]: "default" | "secondary" | "destructive" } = {
    'Operational': 'default',
    'Under Maintenance': 'secondary',
    'Scrapped': 'destructive'
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filter <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Department</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {departments.map((dept) => (
                <DropdownMenuCheckboxItem
                  key={dept}
                  checked={departmentFilters.includes(dept)}
                  onCheckedChange={() => toggleFilter(departmentFilters, setDepartmentFilters, dept)}
                >
                  {dept}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuLabel>Filter by Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teams.map((team) => (
                <DropdownMenuCheckboxItem
                  key={team.id}
                  checked={teamFilters.includes(team.id)}
                  onCheckedChange={() => toggleFilter(teamFilters, setTeamFilters, team.id)}
                >
                  {team.name}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Equipment
        </Button>
      </div>
      <div className="rounded-md border bg-card/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Assigned Team</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="font-code">{item.serialNumber}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{getTeamName(item.maintenanceTeamId)}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/requests?equipmentId=${item.id}`}>
                            <Wrench className="mr-2 h-4 w-4" />
                            Maintenance
                            {getOpenRequestCount(item.id) > 0 && (
                                <Badge variant="destructive" className="ml-2">{getOpenRequestCount(item.id)}</Badge>
                            )}
                           </Link>
                        </Button>
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
