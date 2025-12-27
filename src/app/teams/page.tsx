'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Team, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import TeamsTable from './_components/teams-table';
import TeamForm from './_components/team-form';
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
import { Skeleton } from '@/components/ui/skeleton';
import { getTeams, createTeam, updateTeam, deleteTeam } from '@/lib/api/teams';
import { getUsers } from '@/lib/api/users';

export default function TeamsPage() {
  const { toast } = useToast();
  const [teams, setTeams] = React.useState<Team[]>([]);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [currentTeam, setCurrentTeam] = React.useState<Team | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [teamsData, usersData] = await Promise.all([
          getTeams(),
          getUsers(),
        ]);
        setTeams(teamsData);
        setUsers(usersData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load teams data.',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const handleAddNew = () => {
    setCurrentTeam(null);
    setIsModalOpen(true);
  };

  const handleEdit = (team: Team) => {
    setCurrentTeam(team);
    setIsModalOpen(true);
  };

  const handleDelete = (team: Team) => {
    setCurrentTeam(team);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!currentTeam) return;
    try {
      await deleteTeam(currentTeam.id);
      setTeams(teams.filter((t) => t.id !== currentTeam.id));
      toast({
        title: 'Team Deleted',
        description: `"${currentTeam.name}" has been successfully deleted.`,
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        variant: 'destructive',
        title: 'Delete failed',
        description: `Could not delete team "${currentTeam.name}".`,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setCurrentTeam(null);
    }
  };

  const handleSave = async (
    formData: Omit<Team, 'id' | 'type' | 'memberIds'> & {
      memberNames: string;
    }
  ) => {
    const memberIds = users
      .filter((u) =>
        formData.memberNames
          .split(',')
          .map((s) => s.trim())
          .includes(u.name)
      )
      .map((u) => u.id);

    const isEditing = !!currentTeam;

    const teamData = {
      name: formData.name,
      memberIds: memberIds,
      type: 'Mechanics' // default type
    };

    try {
      if (isEditing) {
        const savedTeam = await updateTeam(currentTeam.id, teamData);
        setTeams(teams.map((t) => (t.id === currentTeam.id ? savedTeam : t)));
        toast({
          title: 'Team Updated',
          description: `"${formData.name}" has been successfully updated.`,
        });
      } else {
        const savedTeam = await createTeam(teamData);
        setTeams([savedTeam, ...teams]);
        toast({
          title: 'Team Created',
          description: `"${formData.name}" has been successfully created.`,
        });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        variant: 'destructive',
        title: 'Save failed',
        description: `Could not save team "${formData.name}".`,
      });
    } finally {
      setIsModalOpen(false);
      setCurrentTeam(null);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Maintenance Teams
        </h1>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Teams</CardTitle>
          <CardDescription>
            Create and manage your maintenance teams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <TeamsTable
              teams={teams}
              users={users}
              onRowClick={handleEdit}
            />
          )}
        </CardContent>
      </Card>

      <TeamForm
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSave={handleSave}
        team={currentTeam}
        users={users}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              team "{currentTeam?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
