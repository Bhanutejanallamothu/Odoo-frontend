"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  LayoutDashboard,
  Wrench,
  Users,
  ClipboardList,
  Calendar,
  FolderGit2,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { NavItem } from '@/lib/types';
import ThemeToggle from '@/components/ui/cinematic-theme-switcher';

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/requests', label: 'Requests', icon: ClipboardList },
  { href: '/equipment', label: 'Equipment', icon: Wrench },
  { href: '/teams', label: 'Teams', icon: Users },
  { href: '/calendar', label: 'Calendar', icon: Calendar },
];

export default function Header() {
  const currentUser = users.find(u => u.email === 'technician@example.com') || users[0];
  const pathname = usePathname();

  // Hide header on login and register pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-white/5 px-4 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <FolderGit2 className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">GearGuard</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-4 ml-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname.startsWith(item.href) ? "text-primary" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
         <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <FolderGit2 className="h-6 w-6" />
                  <span className="sr-only">GearGuard</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "hover:text-foreground",
                       pathname.startsWith(item.href) ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

        <ThemeToggle />
        <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={currentUser.avatarUrl}
                  alt={currentUser.name}
                />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {currentUser.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
