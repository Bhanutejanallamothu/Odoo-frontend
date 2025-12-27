"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MaintenanceRequest, User, Equipment } from '@/lib/types';

type RequestCardProps = {
  request: MaintenanceRequest;
  user?: User;
  equipment?: Equipment;
};

export default function RequestCard({ request, user, equipment }: RequestCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: request.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColors: { [key: string]: string } = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };
  
  const isOverdue = new Date(request.dueDate) < new Date() && request.status !== 'Repaired' && request.status !== 'Scrap';

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none bg-card/50 hover:bg-card/80 transition-colors duration-200 cursor-grab active:cursor-grabbing">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-base leading-tight">{request.subject}</CardTitle>
        <CardDescription>{equipment?.name || 'Unknown Equipment'}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm">
          {user && (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">{user.name}</span>
            </div>
          )}
          <Badge variant={isOverdue ? 'destructive' : 'outline'}>
            Due: {new Date(request.dueDate).toLocaleDateString()}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
