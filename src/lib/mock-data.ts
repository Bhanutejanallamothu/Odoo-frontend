import { User, Team, Equipment, MaintenanceRequest, WorkCenter } from './types';
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
  { id: 'user-11', name: 'Tejas Modi', email: 'tejas.modi@example.com', avatarUrl: 'https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2Nzg2MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080', role: 'employee' },
  { id: 'user-12', name: 'Bhavani P', email: 'bhavani.p@example.com', avatarUrl: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2Njc0ODM3OHww&ixlib=rb-4.1.0&q=80&w=1080', role: 'employee' },
  { id: 'user-13', name: 'Mitesh Adim', email: 'mitesh.adim@example.com', avatarUrl: 'https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2Nzg2MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080', role: 'technician', teamId: 'team-1' },
  { id: 'user-14', name: 'Marc Demo', email: 'marc.demo@example.com', avatarUrl: 'https://images.unsplash.com/photo-1594672830234-ba4cfe1202dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY2Nzg2MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080', role: 'technician', teamId: 'team-3' },
];

export const teams: Team[] = [
  { id: 'team-1', name: 'Alpha Mechanics', type: 'Mechanics', memberIds: ['user-1', 'user-3', 'user-7', 'user-13'] },
  { id: 'team-2', name: 'Bravo Electricians', type: 'Electricians', memberIds: ['user-2', 'user-4', 'user-8'] },
  { id: 'team-3', name: 'Charlie IT', type: 'IT', memberIds: ['user-5', 'user-10', 'user-14'] },
];

export const equipment: Equipment[] = [
  { id: 'equip-1', name: 'Samsung Monitor 15"', serialNumber: 'MT/125/22388387', department: 'Admin', maintenanceTeamId: 'team-1', assignedEmployeeId: 'user-11', assignedTechnicianId: 'user-13', location: 'Office A', purchaseDate: '2023-05-20', warrantyExpiry: '2025-05-20', isScrapped: false, status: 'Operational', category: 'Monitors', health: 95, assignedDate: '2025-12-24', description: 'Standard office monitor' },
  { id: 'equip-2', name: 'Acer Laptop', serialNumber: 'MT/122/11112222', department: 'Technician', maintenanceTeamId: 'team-3', assignedEmployeeId: 'user-12', assignedTechnicianId: 'user-14', location: 'Office B', purchaseDate: '2022-11-10', warrantyExpiry: '2024-11-10', isScrapped: false, status: 'Under Maintenance', category: 'Computers', health: 75, assignedDate: '2025-12-24', description: 'Laptop for field technicians' },
  { id: 'equip-3', name: 'CNC Machine X-5', serialNumber: 'SN-X5-001', department: 'Manufacturing', maintenanceTeamId: 'team-1', location: 'Floor 1, Bay A', purchaseDate: '2022-01-15', warrantyExpiry: '2025-01-15', isScrapped: false, status: 'Operational', category: 'Machinery', health: 25, assignedDate: '2025-12-24', description: '5-axis CNC milling machine' },
  { id: 'equip-4', name: 'Packaging Robot Arm', serialNumber: 'SN-RA-002', department: 'Logistics', maintenanceTeamId: 'team-2', location: 'Warehouse 3', purchaseDate: '2021-06-20', warrantyExpiry: '2024-06-20', isScrapped: false, status: 'Under Maintenance', category: 'Robotics', health: 45, assignedDate: '2025-12-24', description: 'Robotic arm for palletizing.' },
  { id: 'equip-5', name: 'Conveyor Belt System', serialNumber: 'SN-CB-003', department: 'Manufacturing', maintenanceTeamId: 'team-1', location: 'Floor 1, Assembly Line', purchaseDate: '2020-11-01', warrantyExpiry: '2023-11-01', isScrapped: false, status: 'Operational', category: 'Machinery', health: 92, assignedDate: '2025-12-24', description: 'Main conveyor for the assembly line' },
  { id: 'equip-6', name: 'Main Server Rack', serialNumber: 'SN-SR-004', department: 'IT', maintenanceTeamId: 'team-3', location: 'Data Center', purchaseDate: '2023-03-10', warrantyExpiry: '2026-03-10', isScrapped: false, status: 'Operational', category: 'IT Hardware', health: 98, assignedDate: '2025-12-24', description: 'Primary server rack' },
  { id: 'equip-7', name: 'Forklift F-150', serialNumber: 'SN-FL-005', department: 'Logistics', maintenanceTeamId: 'team-1', location: 'Warehouse 1', purchaseDate: '2019-08-05', warrantyExpiry: '2022-08-05', isScrapped: true, status: 'Scrapped', category: 'Vehicle', health: 0, assignedDate: '2025-12-24', description: 'Retired forklift' },
  { id: 'equip-8', name: 'HVAC Unit 2', serialNumber: 'SN-HVAC-006', department: 'Facilities', maintenanceTeamId: 'team-2', location: 'Rooftop', purchaseDate: '2022-09-01', warrantyExpiry: '2027-09-01', isScrapped: false, status: 'Operational', category: 'Facilities', health: 15, assignedDate: '2025-12-24', description: 'HVAC for the main office building' },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: 'req-1', subject: 'Grinding noise from main spindle', equipmentId: 'equip-3', assignedTechnicianId: 'user-3', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'New', requestType: 'Corrective', priority: 'High', teamId: 'team-1', notes: 'Operator reported unusual noise during operation.', requesterId: 'user-6' },
  { id: 'req-2', subject: 'Robot arm not gripping properly', equipmentId: 'equip-4', assignedTechnicianId: 'user-4', dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', requestType: 'Corrective', priority: 'High', teamId: 'team-2', duration: 4, requesterId: 'user-9' },
  { id: 'req-3', subject: 'Quarterly lubrication and check-up', equipmentId: 'equip-5', assignedTechnicianId: 'user-7', dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), status: 'New', requestType: 'Preventive', priority: 'Medium', scheduledDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), teamId: 'team-1', requesterId: 'user-2' },
  { id: 'req-4', subject: 'Network switch unresponsive', equipmentId: 'equip-6', assignedTechnicianId: 'user-5', dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', requestType: 'Corrective', priority: 'Medium', teamId: 'team-3', requesterId: 'user-6' },
  { id: 'req-5', subject: 'Final inspection before disposal', equipmentId: 'equip-7', assignedTechnicianId: 'user-3', dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), status: 'Scrap', requestType: 'Corrective', priority: 'Low', teamId: 'team-1', notes: 'Engine failed, beyond repair.', requesterId: 'user-2' },
  { id: 'req-6', subject: 'Filter replacement (Annual)', equipmentId: 'equip-8', assignedTechnicianId: 'user-8', dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), status: 'New', requestType: 'Preventive', priority: 'Low', scheduledDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), teamId: 'team-2', requesterId: 'user-2' },
  { id: 'req-7', subject: 'Hydraulic fluid leak', equipmentId: 'equip-3', assignedTechnicianId: 'user-7', dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'In Progress', requestType: 'Corrective', priority: 'High', teamId: 'team-1', requesterId: 'user-9' },
  { id: 'req-8', subject: 'Completed software update', equipmentId: 'equip-6', assignedTechnicianId: 'user-10', dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Repaired', requestType: 'Preventive', priority: 'Medium', teamId: 'team-3', duration: 2, notes: 'Firmware updated to v3.1.4', requesterId: 'user-2' },
];

export const workCenters: WorkCenter[] = [
    { 
        id: 'wc-1', 
        name: 'Assembly1', 
        description: 'Main product assembly area', 
        department: 'Manufacturing',
        tag: 'Primary',
        alternativeWorkCenterIds: ['wc-2'],
        costPerHour: 150,
        capacity: 90,
        oeeTarget: 85
    },
    { 
        id: 'wc-2', 
        name: 'Drill1', 
        description: 'Precision drilling station', 
        department: 'Manufacturing',
        tag: 'Secondary',
        alternativeWorkCenterIds: ['wc-1'],
        costPerHour: 120,
        capacity: 95,
        oeeTarget: 90
    },
    { 
        id: 'wc-3', 
        name: 'Packaging Station A', 
        description: 'Final product packaging and boxing', 
        department: 'Logistics',
        costPerHour: 80,
        capacity: 100,
        oeeTarget: 95
    },
];
