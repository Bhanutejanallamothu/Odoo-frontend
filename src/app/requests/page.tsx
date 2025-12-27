"use client";
import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { PlusCircle, ListFilter } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

import { maintenanceRequests as initialRequests, teams, users, equipment } from '@/lib/mock-data';
import { MaintenanceRequest, MaintenanceRequestStatus } from '@/lib/types';
import RequestCard from './_components/request-card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const statusColumns: MaintenanceRequestStatus[] = ['New', 'In Progress', 'Repaired', 'Scrap'];


// This wrapper ensures DndContext only renders on the client.
function ClientOnlyDndContext({ children, ...props }: React.ComponentProps<typeof DndContext> & {children: React.ReactNode}) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return <DndContext {...props}>{children}</DndContext>;
}


export default function RequestsPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [requests, setRequests] = React.useState<MaintenanceRequest[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newRequest, setNewRequest] = React.useState<Partial<MaintenanceRequest>>({
    status: 'New',
    requestType: 'Corrective'
  });

  const equipmentIdParam = searchParams.get('equipmentId');

  const [teamFilter, setTeamFilter] = React.useState<string[]>([]);
  const [technicianFilter, setTechnicianFilter] = React.useState<string[]>([]);
  const [requestTypeFilter, setRequestTypeFilter] = React.useState<string[]>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const filteredRequests = React.useMemo(() => {
    let result = requests;
    if (equipmentIdParam) {
      result = result.filter(r => r.equipmentId === equipmentIdParam);
    }
    if (teamFilter.length > 0) {
      result = result.filter(r => teamFilter.includes(r.teamId));
    }
    if (technicianFilter.length > 0) {
      result = result.filter(r => technicianFilter.includes(r.assignedTechnicianId));
    }
    if (requestTypeFilter.length > 0) {
      result = result.filter(r => requestTypeFilter.includes(r.requestType));
    }
    return result;
  }, [requests, equipmentIdParam, teamFilter, technicianFilter, requestTypeFilter]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = requests.findIndex((r) => r.id === active.id);
      const newIndex = requests.findIndex((r) => r.id === over?.id);
      
      const overContainer = over?.data.current?.sortable?.containerId;
      const newStatus = statusColumns.find(s => s === overContainer) as MaintenanceRequestStatus;
      
      if(newStatus) {
        setRequests((requests) => {
          let newRequests = [...requests];
          const activeIndex = newRequests.findIndex(r => r.id === active.id);
          
          if(activeIndex !== -1) {
            newRequests[activeIndex] = { ...newRequests[activeIndex], status: newStatus };
          }
          
          // Re-sort or move if needed
          newRequests = arrayMove(newRequests, oldIndex, newIndex);

          return newRequests;
        });
      }
    }
  };

  const handleCreateRequest = async () => {
    if (!newRequest.subject || !newRequest.equipmentId || !newRequest.dueDate || !newRequest.teamId || !newRequest.assignedTechnicianId) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all required fields.',
      });
      return;
    }
    
    const newId = `req-${requests.length + 1}`;
    const requestToAdd: MaintenanceRequest = {
      ...newRequest,
      id: newId,
    } as MaintenanceRequest;

    setRequests(prev => [requestToAdd, ...prev]);
    setIsModalOpen(false);
    setNewRequest({ status: 'New', requestType: 'Corrective' });

    toast({
      title: 'Success',
      description: 'New maintenance request created.',
    });
  };

  const techniciansForFilter = users.filter(u => u.role === 'technician');

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
           <h1 className="text-3xl font-bold tracking-tight font-headline">
            Maintenance Requests
          </h1>
          {equipmentIdParam && (
             <p className="text-muted-foreground">
                Showing requests for: {equipment.find(e => e.id === equipmentIdParam)?.name}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><ListFilter className="mr-2 h-4 w-4" /> Filter</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filters</h4>
                  <p className="text-sm text-muted-foreground">
                    Filter requests by team, technician, or type.
                  </p>
                </div>
                <div className="grid gap-2">
                  <h5 className="text-sm font-medium">Team</h5>
                  {teams.map(team => (
                    <div key={team.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`team-${team.id}`}
                        checked={teamFilter.includes(team.id)}
                        onCheckedChange={(checked) => {
                          setTeamFilter(prev => checked ? [...prev, team.id] : prev.filter(t => t !== team.id))
                        }}
                      />
                      <Label htmlFor={`team-${team.id}`}>{team.name}</Label>
                    </div>
                  ))}
                </div>
                <div className="grid gap-2">
                  <h5 className="text-sm font-medium">Technician</h5>
                  {techniciansForFilter.map(tech => (
                    <div key={tech.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tech-${tech.id}`}
                        checked={technicianFilter.includes(tech.id)}
                        onCheckedChange={(checked) => {
                          setTechnicianFilter(prev => checked ? [...prev, tech.id] : prev.filter(t => t !== tech.id))
                        }}
                      />
                      <Label htmlFor={`tech-${tech.id}`}>{tech.name}</Label>
                    </div>
                  ))}
                </div>
                 <div className="grid gap-2">
                  <h5 className="text-sm font-medium">Request Type</h5>
                  {['Corrective', 'Preventive'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={requestTypeFilter.includes(type)}
                        onCheckedChange={(checked) => {
                          setRequestTypeFilter(prev => checked ? [...prev, type] : prev.filter(t => t !== type))
                        }}
                      />
                      <Label htmlFor={`type-${type}`}>{type}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Request
          </Button>
        </div>
      </div>
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
        <ClientOnlyDndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          {statusColumns.map((status) => (
            <Card key={status} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>{status}</CardTitle>
                <CardDescription>
                  {filteredRequests.filter((r) => r.status === status).length} requests
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 flex-1 overflow-y-auto">
                 <SortableContext items={filteredRequests.filter(r => r.status === status).map(r => r.id)} strategy={verticalListSortingStrategy}>
                    {filteredRequests
                      .filter((r) => r.status === status)
                      .map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          user={users.find(u => u.id === request.assignedTechnicianId)}
                          equipment={equipment.find(e => e.id === request.equipmentId)}
                        />
                      ))}
                 </SortableContext>
              </CardContent>
            </Card>
          ))}
        </ClientOnlyDndContext>
      </div>

       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Maintenance Request</DialogTitle>
            <DialogDescription>
              Fill in the details for the new maintenance request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                value={newRequest.subject || ''}
                onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="equipment" className="text-right">
                Equipment
              </Label>
              <Select
                value={newRequest.equipmentId}
                onValueChange={(value) => {
                    const selectedEquipment = equipment.find(e => e.id === value);
                    if (selectedEquipment) {
                      setNewRequest({ 
                          ...newRequest, 
                          equipmentId: value, 
                          teamId: selectedEquipment.maintenanceTeamId 
                      });
                    }
                }}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {equipment.map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="request-type" className="text-right">
                Type
              </Label>
              <Select
                value={newRequest.requestType}
                onValueChange={(value: 'Corrective' | 'Preventive') => setNewRequest({ ...newRequest, requestType: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Corrective">Corrective</SelectItem>
                  <SelectItem value="Preventive">Preventive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="due-date" className="text-right">
                Due Date
              </Label>
              <Input
                id="due-date"
                type="date"
                value={newRequest.dueDate ? newRequest.dueDate.split('T')[0] : ''}
                onChange={(e) => setNewRequest({ ...newRequest, dueDate: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="team" className="text-right">
                Team
              </Label>
              <Select
                value={newRequest.teamId}
                onValueChange={(value) => setNewRequest({ ...newRequest, teamId: value, assignedTechnicianId: undefined })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technician" className="text-right">
                Technician
              </Label>
              <Select
                value={newRequest.assignedTechnicianId}
                onValueChange={(value) => setNewRequest({ ...newRequest, assignedTechnicianId: value })}
                disabled={!newRequest.teamId}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {users.filter(u => u.teamId === newRequest.teamId && u.role === 'technician').map(u => (
                    <SelectItem key={u.id} value={u.id}>{u.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={newRequest.notes || ''}
                onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                className="col-span-3"
                placeholder="Add any relevant notes..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateRequest}>Create Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
