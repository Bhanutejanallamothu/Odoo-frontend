import Link from 'next/link';
import {
  LayoutDashboard,
  Wrench,
  Users,
  ClipboardList,
  Calendar,
  Settings,
  MoreHorizontal,
  FolderGit2
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users } from '@/lib/mock-data';

export default function AppSidebar() {
  // Mock current user
  const currentUser = users.find((u) => u.email === 'technician@example.com') || users[0];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <FolderGit2 className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">GearGuard</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenuItem>
              <Link href="/dashboard" className="w-full">
                <SidebarMenuButton tooltip="Dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/requests" className="w-full">
                <SidebarMenuButton tooltip="Maintenance Requests">
                  <ClipboardList />
                  <span>Requests</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/equipment" className="w-full">
                <SidebarMenuButton tooltip="Equipment">
                  <Wrench />
                  <span>Equipment</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/teams" className="w-full">
                <SidebarMenuButton tooltip="Teams">
                  <Users />
                  <span>Teams</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/calendar" className="w-full">
                <SidebarMenuButton tooltip="Calendar">
                  <Calendar />
                  <span>Calendar</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser.email}
            </p>
          </div>
          <button><MoreHorizontal className="h-5 w-5" /></button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
