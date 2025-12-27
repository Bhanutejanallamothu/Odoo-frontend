import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teams, users, equipment } from '@/lib/mock-data';
import { Users, Wrench, PlusCircle } from 'lucide-react';

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Maintenance Teams
        </h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => {
          const teamMembers = users.filter((u) => team.memberIds.includes(u.id));
          const assignedEquipmentCount = equipment.filter(e => e.maintenanceTeamId === team.id).length;

          return (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {team.name}
                  <Link href={`/teams/${team.id}`} passHref>
                    <Button variant="secondary" size="sm">View Details</Button>
                  </Link>
                </CardTitle>
                <CardDescription>{team.type}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Members</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2 overflow-hidden">
                      {teamMembers.slice(0, 5).map((member) => (
                        <Avatar key={member.id} className="inline-block border-2 border-card">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                     {teamMembers.length > 5 && (
                      <span className="text-sm text-muted-foreground">+{teamMembers.length - 5} more</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{teamMembers.length} Members</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4" />
                        <span>{assignedEquipmentCount} Assets</span>
                    </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
