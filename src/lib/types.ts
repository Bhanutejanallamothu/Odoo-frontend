import type { LucideIcon } from 'lucide-react';

export type UserRole = 'admin' | 'manager' | 'technician' | 'employee';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  teamId?: string;
};

export type EquipmentStatus = 'Operational' | 'Under Maintenance' | 'Scrapped';

export type Equipment = {
  id: string;
  name:string;
  serialNumber: string;
  department: string;
  assignedEmployeeId?: string;
  maintenanceTeamId: string;
  purchaseDate: string; // ISO 8601
  warrantyExpiry: string; // ISO 8601
  location: string;
  isScrapped: boolean;
  status: EquipmentStatus;
  category: string;
  health: number; // Percentage from 0 to 100
};

export type TeamType = 'Mechanics' | 'Electricians' | 'IT';

export type Team = {
  id:string;
  name: string;
  type: TeamType;
  memberIds: string[];
};

export type MaintenanceRequestStatus = 'New' | 'In Progress' | 'Repaired' | 'Scrap';
export type MaintenanceRequestPriority = 'High' | 'Medium' | 'Low';
export type MaintenanceRequestType = 'Corrective' | 'Preventive';

export type MaintenanceRequest = {
  id: string;
  subject: string;
  equipmentId: string;
  assignedTechnicianId: string;
  dueDate: string; // ISO 8601
  status: MaintenanceRequestStatus;
  requestType: MaintenanceRequestType;
  priority: MaintenanceRequestPriority;
  scheduledDate?: string; // ISO 8601
  duration?: number; // hours
  notes?: string;
  teamId: string;
  requesterId?: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  requiredRoles: UserRole[];
};
