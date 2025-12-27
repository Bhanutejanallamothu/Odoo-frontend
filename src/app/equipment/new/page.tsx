
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
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
import { Equipment, User, Team, WorkCenter } from '@/lib/types';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { createEquipment } from '@/lib/api/equipment';
import { getUsers } from '@/lib/api/users';
import { getTeams } from '@/lib/api/teams';
import { getWorkCenters } from '@/lib/api/work-centers';
import { Skeleton } from '@/components/ui/skeleton';

type NewEquipment = Omit<Equipment, 'id' | 'health' | 'status' | 'isScrapped'>;

export default function NewEquipmentPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [equipment, setEquipment] = React.useState<Partial<NewEquipment>>({
      name: '',
      serialNumber: '',
      department: 'R&D',
      location: 'Main Building'
  });
  const [users, setUsers] = React.useState<User[]>([]);
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [workCenters, setWorkCenters] = React.useState<WorkCenter[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [usedBy, setUsedBy] = React.useState('employee');

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersData, teamsData, wcData] = await Promise.all([
          getUsers(),
          getTeams(),
          getWorkCenters(),
        ]);
        setUsers(usersData);
        setTeams(teamsData);
        setWorkCenters(wcData);
      } catch (error) {
        console.error('Failed to fetch data for new equipment form', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load necessary data.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleInputChange = (
    field: keyof NewEquipment,
    value: string | number
  ) => {
      setEquipment({ ...equipment, [field]: value });
  };

  const handleSave = async () => {
    if (!equipment.category || !equipment.maintenanceTeamId || !equipment.assignedDate) {
        toast({
            variant: 'destructive',
            title: 'Missing Fields',
            description: 'Please fill out Category, Maintenance Team, and Assigned Date.'
        })
        return;
    }

    const equipmentToSave: Omit<Equipment, 'id'> = {
        ...equipment,
        name: equipment.name || 'Unnamed Equipment',
        serialNumber: equipment.serialNumber || `SN-${Date.now()}`,
        department: equipment.department || 'General',
        maintenanceTeamId: equipment.maintenanceTeamId,
        assignedDate: equipment.assignedDate,
        purchaseDate: equipment.purchaseDate || new Date().toISOString(),
        warrantyExpiry: equipment.warrantyExpiry || new Date().toISOString(),
        location: equipment.location || 'Unassigned',
        isScrapped: false,
        status: 'Operational',
        category: equipment.category,
        health: 100,
    }
    
    try {
        await createEquipment(equipmentToSave);
        toast({
          title: 'Equipment Created',
          description: `"${equipment.name}" has been successfully created.`,
        });
        router.push('/equipment');
    } catch (error) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: 'Save Failed',
            description: 'Could not create the new equipment.'
        })
    }
  };

  if (loading) {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-7 w-64" />
                </div>
            </div>
            <Skeleton className="h-96 w-full" />
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-24">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight font-headline text-muted-foreground">
            <Link href="/equipment" className="hover:text-primary">
              Equipment
            </Link>
            <span className="text-primary mx-2">&gt;</span>
            <span className="text-primary">New Equipment</span>
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Equipment</CardTitle>
          <CardDescription>
            Fill in the details for the new piece of equipment.
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
                  placeholder="e.g. Dell XPS 15"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Equipment Category *</Label>
                <Select
                  value={equipment.category}
                  onValueChange={(v) => handleInputChange('category', v)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* This should ideally fetch from an API too */}
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
                <Input
                  id="company"
                  value="My Company (San Francisco)"
                  readOnly
                  className="bg-muted/50"
                />
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
                <Label htmlFor="maintenance-team">Maintenance Team *</Label>
                <Select
                  value={equipment.maintenanceTeamId}
                  onValueChange={(v) =>
                    handleInputChange('maintenanceTeamId', v)
                  }
                >
                  <SelectTrigger id="maintenance-team">
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="assigned-date">Assigned Date *</Label>
                <Input
                  id="assigned-date"
                  type="date"
                  value={(equipment.assignedDate || '').split('T')[0]}
                  onChange={(e) =>
                    handleInputChange('assignedDate', e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a description"
                  className="min-h-[100px]"
                  value={equipment.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="technician">Technician</Label>
                <Select
                  value={equipment.assignedTechnicianId}
                  onValueChange={(v) =>
                    handleInputChange('assignedTechnicianId', v)
                  }
                   disabled={!equipment.maintenanceTeamId}
                >
                  <SelectTrigger id="technician">
                    <SelectValue placeholder="Select a technician" />
                  </SelectTrigger>
                  <SelectContent>
                    {users
                      .filter(
                        (u) =>
                          u.role === 'technician' &&
                          u.teamId === equipment.maintenanceTeamId
                      )
                      .map((tech) => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {usedBy === 'employee' && (
                <div className="grid gap-2">
                  <Label htmlFor="employee">Employee</Label>
                  <Select
                    value={equipment.assignedEmployeeId}
                    onValueChange={(v) =>
                      handleInputChange('assignedEmployeeId', v)
                    }
                  >
                    <SelectTrigger id="employee">
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {users
                        .filter((u) => u.role === 'employee')
                        .map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
               <div className="grid gap-2">
                <Label htmlFor="serial-number">Serial Number</Label>
                <Input
                  id="serial-number"
                  value={equipment.serialNumber}
                  onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                />
              </div>


              <div className="grid gap-2">
                <Label htmlFor="used-in-location">Used in Location</Label>
                <Input
                  id="used-in-location"
                  value={equipment.location}
                  onChange={(e) =>
                    handleInputChange('location', e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="work-center">Work Center</Label>
                <Select>
                  <SelectTrigger id="work-center">
                    <SelectValue placeholder="Select a work center" />
                  </SelectTrigger>
                  <SelectContent>
                    {workCenters.map((wc) => (
                      <SelectItem key={wc.id} value={wc.id}>
                        {wc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl justify-end">
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
            </Button>
        </div>
      </div>
    </div>
  );
}

    