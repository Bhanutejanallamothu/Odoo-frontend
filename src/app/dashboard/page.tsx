'use client';
import * as React from 'react';
import {
  ServerCrash,
  Users,
  Construction,
  Search,
  PlusCircle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  maintenanceRequests,
  equipment as allEquipment,
  users,
} from '@/lib/mock-data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const openRequests = maintenanceRequests.filter(
    (r) => r.status === 'New' || r.status === 'In Progress'
  );
  const overdueRequests = openRequests.filter(
    (r) => new Date(r.dueDate) < new Date()
  );

  const criticalEquipmentCount = allEquipment.filter(
    (e) => e.health < 30 && e.status !== 'Scrapped'
  ).length;

  const technicians = users.filter((u) => u.role === 'technician');
  const assignedTechnicians = new Set(
    openRequests.map((r) => r.assignedTechnicianId)
  );
  const technicianLoad =
    technicians.length > 0
      ? Math.round((assignedTechnicians.size / technicians.length) * 100)
      : 0;
      
  const handleRowClick = (requestId: string) => {
    router.push(`/requests/${requestId}`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Dashboard
        </h1>
      </div>

      <div className="flex justify-between items-center gap-4">
         <Button asChild>
          <Link href="/requests/new">
            <PlusCircle className="mr-2 h-4 w-4" /> New
          </Link>
        </Button>
        <div className="flex-1 max-w-sm mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-red-500 bg-red-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">
              Critical Equipment
            </CardTitle>
            <ServerCrash className="h-4 w-4 text-red-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">
              {criticalEquipmentCount} Units
            </div>
            <p className="text-xs text-red-700/80">(Health &lt; 30%)</p>
          </CardContent>
        </Card>
        <Card className="border-blue-500 bg-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">
              Technician Load
            </CardTitle>
            <Users className="h-4 w-4 text-blue-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              {technicianLoad}% Utilized
            </div>
            <p className="text-xs text-blue-700/80">Assign Carefully</p>
          </CardContent>
        </Card>
        <Card className="border-green-500 bg-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">
              Open Requests
            </CardTitle>
            <Construction className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">
              {openRequests.length} Pending
            </div>
            <p className="text-xs text-green-700/80">
              {overdueRequests.length} Overdue
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-card shadow-soft rounded-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0">
                <TableHead>Subject</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {maintenanceRequests.slice(0, 5).map(request => {
                    const employee = users.find(u => u.id === request.requesterId);
                    const technician = users.find(u => u.id === request.assignedTechnicianId);
                    const equip = allEquipment.find(e => e.id === request.equipmentId);
                    
                    const statusVariant: { [key: string]: 'outline' | 'secondary' | 'default' | 'destructive'} = {
                        'New': 'outline',
                        'In Progress': 'secondary',
                        'Repaired': 'default',
                        'Scrap': 'destructive'
                    };

                    return (
                      <TableRow 
                        key={request.id} 
                        className="border-t border-dashed cursor-pointer"
                        onClick={() => handleRowClick(request.id)}
                      >
                        <TableCell>{request.subject}</TableCell>
                        <TableCell>{employee?.name || 'N/A'}</TableCell>
                        <TableCell>{technician?.name || 'Unassigned'}</TableCell>
                        <TableCell>{equip?.category || 'N/A'}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[request.status]}>{request.status}</Badge>
                        </TableCell>
                        <TableCell>GearGuard Inc.</TableCell>
                      </TableRow>
                    );
                })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
