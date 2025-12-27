import AppSidebar from '@/components/app/app-sidebar';
import Header from '@/components/app/header';
import { SidebarInset } from '@/components/ui/sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 flex-1">
                {children}
            </main>
        </SidebarInset>
      </div>
  );
}
