import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import EquipmentTable from './_components/equipment-table';
import { equipment, teams, users } from '@/lib/mock-data';

export default function EquipmentPage() {
  
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline">
        Equipment
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Asset Management</CardTitle>
          <CardDescription>
            Search, filter, and manage all company assets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EquipmentTable
            equipment={equipment}
            users={users}
          />
        </CardContent>
      </Card>
    </div>
  );
}
