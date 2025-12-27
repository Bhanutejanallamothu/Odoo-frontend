
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Team, User } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';

type TeamFormData = {
  name: string;
  memberNames: string;
  company: string;
};

type TeamFormProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (data: any) => void;
  onDelete?: () => void;
  team: Team | null;
  users: User[];
};

export default function TeamForm({ isOpen, onOpenChange, onSave, onDelete, team, users }: TeamFormProps) {
  const [formData, setFormData] = React.useState<TeamFormData>({ name: '', memberNames: '', company: '' });

  React.useEffect(() => {
    if (team) {
      const memberNames = team.memberIds.map(id => users.find(u => u.id === id)?.name).filter(Boolean).join(', ');
      setFormData({
        name: team.name,
        memberNames: memberNames,
        company: 'My Company (San Francisco)',
      });
    } else {
      setFormData({ name: '', memberNames: '', company: 'My Company (San Francisco)' });
    }
  }, [team, users, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{team ? 'Edit Team' : 'Create Team'}</DialogTitle>
            <DialogDescription>
              {team ? 'Update the details of the team.' : 'Fill in the details for the new team.'}
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
              <Label htmlFor="memberNames" className="text-right">
                Members
              </Label>
              <Textarea
                id="memberNames"
                value={formData.memberNames}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Enter member names, separated by commas"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input id="company" value={formData.company} onChange={handleInputChange} className="col-span-3" required />
            </div>
          </div>
          <DialogFooter className="justify-between">
            {team && onDelete ? (
              <Button type="button" variant="destructive" onClick={onDelete} className="mr-auto">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            ) : <div />}
            <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
