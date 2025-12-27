'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  equipment as allEquipment,
  users,
  teams,
  workCenters,
} from '@/lib/mock-data';
import {
  Equipment,
} from '@/lib/types';
import { ArrowLeft, Save, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function EquipmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const [equipment, setEquipment] = React.useState<Equipment | null>(null);
  const [usedBy, setUsedBy] = React.useState('employee');

  React.useEffect(() => {
    if (id) {
      const foundEquipment = allEquipment.find((e) => e.id === id);
      if (foundEquipment) {
        setEquipment(foundEquipment);
        if (foundEquipment.assignedEmployeeId) {
            setUsedBy('employee');
        } else {
            setUsedBy('department'); // Or location, based on your logic
        }

      } else {
        toast({
          variant: 'destructive',
          title: 'Not Found',
          description: 'Equipment not found.',
        });
        router.push('/equipment');
      }
    }
  }, [id, router, toast]);

  const handleInputChange = (
    field: keyof Equipment,
    value: string | number
  ) => {
    if (equipment) {
      setEquipment({ ...equipment, [field]: value });
    }
  };
  
  const handleSave = () => {
    if (!equipment) return;
    toast({
      title: 'Equipment Saved',
      description: `Changes to "${equipment.name}" have been saved.`,
    });
    // Here you would typically call an API to save the data
    // For this mock, we just show a toast
    router.push('/equipment');
  };

  if (!equipment) {
    return <div>Loading...</div>; // Or a skeleton loader
  }
  
  const technician = users.find(u => u.id === equipment.assignedTechnicianId);
  const employee = users.find(u => u.id === equipment.assignedEmployeeId);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
         <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-headline text-muted-foreground">
                <Link href="/equipment" className="hover:text-primary">Equipment</Link>
                <span className="text-primary mx-2">&gt;</span>
                <span className="text-primary">{equipment.name}</span>
            </h1>
        </div>
        <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" asChild>
                <Link href={`/requests?equipmentId=${equipment.id}`}>
                    <Wrench className="mr-2 h-4 w-4" /> Maintenance
                </Link>
            </Button>
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Equipment</CardTitle>
          <CardDescription>
            Update the details for this piece of equipment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Section */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={equipment.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Equipment Category</Label>
                <Select value={equipment.category} onValueChange={(v) => handleInputChange('category', v)}>
                    <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Monitors">Monitors</SelectItem>
                        <SelectItem value="Computers">Computers</SelectItem>
                        <SelectItem value="Machinery">Machinery</SelectItem>
                        <SelectItem value="Robotics">Robotics</SelectItem>
                        <SelectItem value="Vehicle">Vehicle</SelectItem>
                        <SelectItem value="Facilities">Facilities</SelectItem>
                        <SelectItem value="IT Hardware">IT Hardware</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value="My Company (San Francisco)" readOnly className="bg-muted/50" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="used-by">Used By</Label>
                 <Select value={usedBy} onValueChange={setUsedBy}>
                    <SelectTrigger id="used-by">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="department">Department</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                    </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="maintenance-team">Maintenance Team</Label>
                <Select value={equipment.maintenanceTeamId} onValueChange={(v) => handleInputChange('maintenanceTeamId', v)}>
                    <SelectTrigger id="maintenance-team">
                        <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                    <SelectContent>
                        {teams.map(team => (
                            <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                  <Label htmlFor="assigned-date">Assigned Date</Label>
                  <Input
                      id="assigned-date"
                      type="date"
                      value={equipment.purchaseDate.split('T')[0]}
                      onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter a description" className="min-h-[100px]" />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="technician">Technician</Label>
                <Select value={equipment.assignedTechnicianId} onValueChange={(v) => handleInputChange('assignedTechnicianId', v)}>
                    <SelectTrigger id="technician">
                        <SelectValue placeholder="Select a technician" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.filter(u => u.role === 'technician' && u.teamId === equipment.maintenanceTeamId).map(tech => (
                            <SelectItem key={tech.id} value={tech.id}>{tech.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>

              {usedBy === 'employee' && (
                <div className="grid gap-2">
                  <Label htmlFor="employee">Employee</Label>
                   <Select value={equipment.assignedEmployeeId} onValueChange={(v) => handleInputChange('assignedEmployeeId', v)}>
                    <SelectTrigger id="employee">
                        <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.filter(u => u.role === 'employee').map(emp => (
                            <SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                </div>
              )}

              <div className="grid gap-2">
                  <Label htmlFor="scrap-date">Scrap Date</Label>
                  <Input
                      id="scrap-date"
                      type="date"
                  />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="used-in-location">Used in Location</Label>
                <Input id="used-in-location" value={equipment.location} onChange={(e) => handleInputChange('location', e.target.value)} />
              </div>
              
               <div className="grid gap-2">
                <Label htmlFor="work-center">Work Center</Label>
                <Select>
                    <SelectTrigger id="work-center">
                        <SelectValue placeholder="Select a work center" />
                    </SelectTrigger>
                    <SelectContent>
                        {workCenters.map(wc => (
                            <SelectItem key={wc.id} value={wc.id}>{wc.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
