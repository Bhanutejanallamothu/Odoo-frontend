import { User, Team, Equipment, MaintenanceRequest } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const users: User[] = [
  { id: 'user-1', name: 'Sarah Lee', email: 'sarah.lee@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-1')?.imageUrl!, role: 'admin', teamId: 'team-1' },
  { id: 'user-2', name: 'Mike Chen', email: 'mike.chen@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-2')?.imageUrl!, role: 'manager', teamId: 'team-2' },
  { id: 'user-3', name: 'David Rodriguez', email: 'david.rodriguez@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-3')?.imageUrl!, role: 'technician', teamId: 'team-1' },
  { id: 'user-4', name: 'Emily White', email: 'emily.white@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-4')?.imageUrl!, role: 'technician', teamId: 'team-2' },
  { id: 'user-5', name: 'Chris Green', email: 'chris.green@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-5')?.imageUrl!, role: 'technician', teamId: 'team-3' },
  { id: 'user-6', name: 'Jessica Brown', email: 'jessica.brown@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-6')?.imageUrl!, role: 'employee' },
  { id: 'user-7', name: 'Kevin Taylor', email: 'kevin.taylor@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-7')?.imageUrl!, role: 'technician', teamId: 'team-1' },
  { id: 'user-8', name: 'Olivia Martinez', email: 'olivia.martinez@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-8')?.imageUrl!, role: 'technician', teamId: 'team-2' },
  { id: 'user-9', name: 'Ben Carter', email: 'ben.carter@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-9')?.imageUrl!, role: 'employee' },
  { id: 'user-10', name: 'Laura Hill', email: 'laura.hill@example.com', avatarUrl: PlaceHolderImages.find(p => p.id === 'user-10')?.imageUrl!, role: 'technician', teamId: 'team-3' },
];

export const teams: Team[] = [
  { id: 'team-1', name: 'Alpha Mechanics', type: 'Mechanics', memberIds: ['user-1', 'user-3', 'user-7'] },
  { id: 'team-2', name: 'Bravo Electricians', type: 'Electricians', memberIds: ['user-2', 'user-4', 'user-8'] },
  { id: 'team-3', name: 'Charlie IT', type: 'IT', memberIds: ['user-5', 'user-10'] },
];

export const equipment: Equipment[] = [
  { id: 'equip-1', name: 'CNC Machine X-5', serialNumber: 'SN-X5-001', department: 'Manufacturing', maintenanceTeamId: 'team-1', location: 'Floor 1, Bay A', purchaseDate: '2022-01-15', warrantyExpiry: '2025-01-15', isScrapped: false, status: 'Operational', category: 'Machinery', health: 25 },
  { id: 'equip-2', name: 'Packaging Robot Arm', serialNumber: 'SN-RA-002', department: 'Logistics', maintenanceTeamId: 'team-2', location: 'Warehouse 3', purchaseDate: '2021-06-20', warrantyExpiry: '2024-06-20', isScrapped: false, status: 'Under Maintenance', category: 'Robotics', health: 45 },
  { id: 'equip-3', name: 'Conveyor Belt System', serialNumber: 'SN-CB-003', department: 'Manufacturing', maintenanceTeamId: 'team-1', location: 'Floor 1, Assembly Line', purchaseDate: '2020-11-01', warrantyExpiry: '2023-11-01', isScrapped: false, status: 'Operational', category: 'Machinery', health: 92 },
  { id: 'equip-4', name: 'Main Server Rack', serialNumber: 'SN-SR-004', department: 'IT', maintenanceTeamId: 'team-3', location: 'Data Center', purchaseDate: '2023-03-10', warrantyExpiry: '2026-03-10', isScrapped: false, status: 'Operational', category: 'IT Hardware', health: 98 },
  { id: 'equip-5', name: 'Forklift F-150', serialNumber: 'SN-FL-005', department: 'Logistics', maintenanceTeamId: 'team-1', location: 'Warehouse 1', purchaseDate: '2019-08-05', warrantyExpiry: '2022-08-05', isScrapped: true, status: 'Scrapped', category: 'Vehicle', health: 0 },
  { id: 'equip-6', name: 'HVAC Unit 2', serialNumber: 'SN-HVAC-006', department: 'Facilities', maintenanceTeamId: 'team-2', location: 'Rooftop', purchaseDate: '2022-09-01', warrantyExpiry: '2027-09-01', isScrapped: false, status: 'Operational', category: 'Facilities', health: 15 },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: 'req-1', subject: 'Grinding noise from main spindle', equipmentId: 'equip-1', assignedTechnicianId: 'user-3', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'New', requestType: 'Corrective', priority: 'High', teamId: 'team-1', notes: 'Operator reported unusual noise during operation.', requesterId: 'user-6' },
  { id: 'req-2', subject: 'Robot arm not gripping properly', equipmentId: 'equip-2', assignedTechnicianId: 'user-4', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', requestType: 'Corrective', priority: 'High', teamId: 'team-2', duration: 4, requesterId: 'user-9' },
  { id: 'req-3', subject: 'Quarterly lubrication and check-up', equipmentId: 'equip-3', assignedTechnicianId: 'user-7', dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'New', requestType: 'Preventive', priority: 'Medium', scheduledDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), teamId: 'team-1', requesterId: 'user-2' },
  { id: 'req-4', subject: 'Network switch unresponsive', equipmentId: 'equip-4', assignedTechnicianId: 'user-5', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', requestType: 'Corrective', priority: 'Medium', teamId: 'team-3', requesterId: 'user-6' },
  { id: 'req-5', subject: 'Final inspection before disposal', equipmentId: 'equip-5', assignedTechnicianId: 'user-3', dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), status: 'Scrap', requestType: 'Corrective', priority: 'Low', teamId: 'team-1', notes: 'Engine failed, beyond repair.', requesterId: 'user-2' },
  { id: 'req-6', subject: 'Filter replacement (Annual)', equipmentId: 'equip-6', assignedTechnicianId: 'user-8', dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'New', requestType: 'Preventive', priority: 'Low', scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), teamId: 'team-2', requesterId: 'user-2' },
  { id: 'req-7', subject: 'Hydraulic fluid leak', equipmentId: 'equip-1', assignedTechnicianId: 'user-7', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', requestType: 'Corrective', priority: 'High', teamId: 'team-1', requesterId: 'user-9' },
  { id: 'req-8', subject: 'Completed software update', equipmentId: 'equip-4', assignedTechnicianId: 'user-10', dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Repaired', requestType: 'Preventive', priority: 'Medium', teamId: 'team-3', duration: 2, notes: 'Firmware updated to v3.1.4', requesterId: 'user-2' },
];
