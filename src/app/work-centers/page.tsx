
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { workCenters } from '@/lib/mock-data';
import WorkCenterTable from './_components/work-center-table';

export default function WorkCentersPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Work Centers
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Work Center Management</CardTitle>
          <CardDescription>
            Search, filter, and manage all company work centers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkCenterTable workCenters={workCenters} />
        </CardContent>
      </Card>
    </div>
  );
}
