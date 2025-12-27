
'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { workCenters as initialWorkCenters } from '@/lib/mock-data';
import WorkCenterTable from './_components/work-center-table';
import { WorkCenter } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function WorkCentersPage() {
  const { toast } = useToast();
  const [workCenters, setWorkCenters] = React.useState<WorkCenter[]>(initialWorkCenters);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentWorkCenter, setCurrentWorkCenter] = React.useState<WorkCenter | null>(null);

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? workCenters.map((wc) => wc.id) : []);
  };

  const handleAddNew = () => {
    setCurrentWorkCenter(null);
    setIsModalOpen(true);
  };

  const handleEdit = (workCenter: WorkCenter) => {
    setCurrentWorkCenter(workCenter);
    setIsModalOpen(true);
  };

  const handleDelete = (workCenter: WorkCenter) => {
    setCurrentWorkCenter(workCenter);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (currentWorkCenter) {
      setWorkCenters(workCenters.filter(wc => wc.id !== currentWorkCenter.id));
      toast({
        title: 'Work Center Deleted',
        description: `"${currentWorkCenter.name}" has been successfully deleted.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setCurrentWorkCenter(null);
  };

  const handleSave = (formData: Omit<WorkCenter, 'id'>) => {
    if (currentWorkCenter) {
      // Edit existing
      setWorkCenters(workCenters.map(wc => wc.id === currentWorkCenter.id ? { ...currentWorkCenter, ...formData } : wc));
      toast({
        title: 'Work Center Updated',
        description: `"${formData.name}" has been successfully updated.`,
      });
    } else {
      // Add new
      const newWorkCenter: WorkCenter = {
        id: `wc-${Date.now()}`,
        ...formData
      };
      setWorkCenters([newWorkCenter, ...workCenters]);
      toast({
        title: 'Work Center Created',
        description: `"${formData.name}" has been successfully created.`,
      });
    }
    setIsModalOpen(false);
    setCurrentWorkCenter(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Work Centers
        </h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Work Center
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Work Center Management</CardTitle>
          <CardDescription>
            Search, filter, and manage all company work centers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkCenterTable
            workCenters={workCenters}
            selectedRows={selectedRows}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      <WorkCenterFormDialog
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        workCenter={currentWorkCenter}
      />
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the work center
              "{currentWorkCenter?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// Form Dialog Component
type WorkCenterFormDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: Omit<WorkCenter, 'id'>) => void;
  workCenter: WorkCenter | null;
};

function WorkCenterFormDialog({ isOpen, onOpenChange, onSave, workCenter }: WorkCenterFormDialogProps) {
  const [formData, setFormData] = React.useState<Omit<WorkCenter, 'id'>>({ name: '', description: '', department: '' });

  React.useEffect(() => {
    if (workCenter) {
      setFormData(workCenter);
    } else {
      setFormData({ name: '', description: '', department: '' });
    }
  }, [workCenter, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{workCenter ? 'Edit Work Center' : 'Create Work Center'}</DialogTitle>
            <DialogDescription>
              {workCenter ? 'Update the details of the work center.' : 'Fill in the details for the new work center.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Input id="department" value={formData.department} onChange={handleInputChange} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" value={formData.description} onChange={handleInputChange} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
