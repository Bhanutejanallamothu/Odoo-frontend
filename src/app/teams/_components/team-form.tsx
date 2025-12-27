
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
import { Trash2, PlusCircle } from 'lucide-react';

type TeamFormData = {
  name: string;
  members: string[];
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
  const [formData, setFormData] = React.useState<TeamFormData>({ name: '', members: [''], company: '' });

  React.useEffect(() => {
    if (team) {
      const memberNames = team.memberIds.map(id => users.find(u => u.id === id)?.name).filter((name): name is string => !!name);
      setFormData({
        name: team.name,
        members: memberNames.length > 0 ? memberNames : [''],
        company: 'My Company (San Francisco)',
      });
    } else {
      setFormData({ name: '', members: [''], company: 'My Company (San Francisco)' });
    }
  }, [team, users, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };
  
  const addMemberInput = () => {
    setFormData(prev => ({ ...prev, members: [...prev.members, ''] }));
  };

  const removeMemberInput = (index: number) => {
    const newMembers = formData.members.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, members: newMembers }));
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

            <div className="grid grid-cols-4 items-start gap-4">
               <Label htmlFor="memberNames" className="text-right pt-2">
                Members
              </Label>
              <div className="col-span-3 space-y-2">
                {formData.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={member}
                      onChange={(e) => handleMemberChange(index, e.target.value)}
                      placeholder="Member Name"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeMemberInput(index)} disabled={formData.members.length <= 1 && member === ''}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addMemberInput} className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Member
                </Button>
              </div>
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
                <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
