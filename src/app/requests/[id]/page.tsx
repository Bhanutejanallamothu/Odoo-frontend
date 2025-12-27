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
  maintenanceRequests,
  equipment,
  users,
  teams,
} from '@/lib/mock-data';
import {
  MaintenanceRequest,
  MaintenanceRequestPriority,
  MaintenanceRequestStatus,
  MaintenanceRequestType,
} from '@/lib/types';
import { ArrowLeft, Save } from 'lucide-react';

export default function MaintenanceRequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { id } = params;

  const [request, setRequest] = React.useState<MaintenanceRequest | null>(null);

  React.useEffect(() => {
    if (id) {
      const foundRequest = maintenanceRequests.find((r) => r.id === id);
      if (foundRequest) {
        setRequest(foundRequest);
      } else {
        toast({
          variant: 'destructive',
          title: 'Not Found',
          description: 'Maintenance request not found.',
        });
        router.push('/dashboard');
      }
    }
  }, [id, router, toast]);

  const handleInputChange = (
    field: keyof MaintenanceRequest,
    value: string | number
  ) => {
    if (request) {
      setRequest({ ...request, [field]: value });
    }
  };

  const handleSelectChange = (
    field: keyof MaintenanceRequest,
    value: any
  ) => {
    if (request) {
      const updatedValue = value === 'unassigned' ? '' : value;
      setRequest({ ...request, [field]: updatedValue });
    }
  };
  
  const handleEquipmentChange = (equipmentId: string) => {
      const selectedEquipment = equipment.find(e => e.id === equipmentId);
      if (request && selectedEquipment) {
          setRequest({
              ...request,
              equipmentId,
              teamId: selectedEquipment.maintenanceTeamId,
              assignedTechnicianId: '' // Reset technician when equipment/team changes
          });
      }
  }

  const handleSave = () => {
    // In a real app, you'd save this to your backend.
    // For this mock, we just show a toast.
    toast({
      title: 'Request Saved',
      description: `Changes to "${request?.subject}" have been saved.`,
    });
    router.push('/dashboard');
  };

  if (!request) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  const techniciansForTeam = users.filter(
    (u) => u.role === 'technician' && u.teamId === request.teamId
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          {request.subject}
        </h1>
        <div className="flex-grow" />
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Maintenance Request</CardTitle>
          <CardDescription>
            Update the details of this request below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={request.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="equipment">Equipment</Label>
              <Select
                value={request.equipmentId}
                onValueChange={handleEquipmentChange}
              >
                <SelectTrigger id="equipment">
                  <SelectValue placeholder="Select equipment..." />
                </SelectTrigger>
                <SelectContent>
                  {equipment.map((e) => (
                    <SelectItem key={e.id} value={e.id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

             <div className="grid gap-2">
              <Label htmlFor="requester">Requester</Label>
              <Input
                id="requester"
                value={users.find(u => u.id === request.requesterId)?.name || 'N/A'}
                readOnly
                className="bg-muted/50"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={request.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Add any relevant notes..."
              />
            </div>
          </div>

          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={request.status}
                    onValueChange={(v: MaintenanceRequestStatus) => handleSelectChange('status', v)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Repaired">Repaired</SelectItem>
                      <SelectItem value="Scrap">Scrap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={request.priority}
                    onValueChange={(v: MaintenanceRequestPriority) => handleSelectChange('priority', v)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                  <Label htmlFor="request-type">Type</Label>
                  <Select
                    value={request.requestType}
                    onValueChange={(v: MaintenanceRequestType) => handleSelectChange('requestType', v)}
                  >
                    <SelectTrigger id="request-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corrective">Corrective</SelectItem>
                      <SelectItem value="Preventive">Preventive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input
                        id="due-date"
                        type="date"
                        value={request.dueDate.split('T')[0]}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="team">Assigned Team</Label>
              <Select
                value={request.teamId}
                onValueChange={(v) => {
                  handleSelectChange('teamId', v);
                  handleSelectChange('assignedTechnicianId', ''); // Reset tech on team change
                }}
              >
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select team..." />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="technician">Assigned Technician</Label>
              <Select
                value={request.assignedTechnicianId || 'unassigned'}
                onValueChange={(v) => handleSelectChange('assignedTechnicianId', v)}
                disabled={!request.teamId}
              >
                <SelectTrigger id="technician">
                  <SelectValue placeholder="Assign a technician..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {techniciansForTeam.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
