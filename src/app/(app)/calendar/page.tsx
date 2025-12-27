import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MaintenanceCalendar } from '@/components/app/maintenance-calendar';
import { maintenanceRequests, teams } from '@/lib/mock-data';
import { MaintenanceRequest, Team } from '@/lib/types';

export default function CalendarPage() {
  const preventiveRequests = maintenanceRequests.filter(
    (req) => req.requestType === 'Preventive'
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Maintenance Calendar
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Preventive Maintenance Schedule</CardTitle>
          <CardDescription>
            Monthly view of all scheduled preventive maintenance tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MaintenanceCalendar requests={preventiveRequests as MaintenanceRequest[]} teams={teams as Team[]} />
        </CardContent>
      </Card>
    </div>
  );
}
