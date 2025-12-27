"use client";

import * as React from 'react';
import {
  Search,
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Equipment, User } from '@/lib/types';

type EquipmentTableProps = {
  equipment: Equipment[];
  users: User[];
};

export default function EquipmentTable({
  equipment: allEquipment,
  users,
}: EquipmentTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return 'N/A';
    return users.find((u) => u.id === employeeId)?.name || 'N/A';
  };
  
  const getTechnicianName = (technicianId?: string) => {
      if (!technicianId) return 'N/A';
      return users.find(u => u.id === technicianId)?.name || 'N/A'
  }

  const filteredEquipment = React.useMemo(() => {
    return allEquipment.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allEquipment, searchTerm]);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> New Equipment
        </Button>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>
      <div className="rounded-md border bg-card/50">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment Name</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Equipment Category</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.length > 0 ? (
              filteredEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{getEmployeeName(item.assignedEmployeeId)}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell className="font-code">{item.serialNumber}</TableCell>
                  <TableCell>{getTechnicianName(item.assignedTechnicianId)}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>My Company (San Francisco)</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
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
                            <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                               <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
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
