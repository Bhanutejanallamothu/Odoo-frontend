import Header from '@/components/app/header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8 flex-1">{children}</main>
    </div>
  );
}
