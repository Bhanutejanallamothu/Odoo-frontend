'use client';
import * as React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Construction,
  Wrench,
  Search,
  PlusCircle,
  ServerCrash,
  Users,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
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
} from '@/lib/mock-data';
import RequestsByStatusChart from '@/components/app/requests-by-status-chart';
import RequestsByTeamChart from '@/components/app/requests-by-team-chart';
import Link from 'next/link';

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const openRequests = maintenanceRequests.filter(
    (r) => r.status === 'New' || r.status === 'In Progress'
  ).length;
  const overdueRequests = maintenanceRequests.filter(
    (r) =>
      (r.status === 'New' || r.status === 'In Progress') &&
      new Date(r.dueDate) < new Date()
  ).length;

  const filteredRecentRequests = React.useMemo(() => {
    return [...maintenanceRequests]
      .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
      .filter(req => {
        const equipmentName = allEquipment.find(e => e.id === req.equipmentId)?.name || '';
        return (
          (req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          equipmentName.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      })
      .slice(0, 5);
  }, [searchTerm]);

  const statusColors: { [key: string]: string } = {
    New: 'bg-gray-500',
    'In Progress': 'bg-blue-500',
    Repaired: 'bg-green-500',
    Scrap: 'bg-red-500',
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
            <Link href="/requests">
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
            <div className="text-2xl font-bold text-red-700">5 Units</div>
            <p className="text-xs text-red-700/80">
              (Health &lt; 30%)
            </p>
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
            <div className="text-2xl font-bold text-blue-700">85% Utilized</div>
            <p className="text-xs text-blue-700/80">
              Assign Carefully
            </p>
          </CardContent>
        </Card>
        <Card className="border-green-500 bg-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Open Requests</CardTitle>
            <Construction className="h-4 w-4 text-green-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">12 Pending</div>
            <p className="text-xs text-green-700/80">
              3 Overdue
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Requests per Team</CardTitle>
            <CardDescription>
              Distribution of maintenance requests across different teams.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <RequestsByTeamChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Requests by Status</CardTitle>
            <CardDescription>
              Current status breakdown of all maintenance requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RequestsByStatusChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            A log of the most recent maintenance requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecentRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-0"
                    >
                      <span className={`h-2 w-2 rounded-full mr-2 ${statusColors[req.status]}`}></span>
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {allEquipment.find((e) => e.id === req.equipmentId)?.name}
                  </TableCell>
                  <TableCell>
                    {new Date(req.dueDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
