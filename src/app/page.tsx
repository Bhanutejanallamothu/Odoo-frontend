
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FolderGit2, Wrench, Users, ClipboardList, BarChart2, Calendar } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center">
          <FolderGit2 className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold font-headline">GearGuard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="ghost">
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">
              Get Started
            </Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
               <Image
                src="https://picsum.photos/seed/1/600/400"
                alt="Hero"
                width={600}
                height={400}
                data-ai-hint="maintenance app"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Streamline Your Maintenance Operations
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    GearGuard is a powerful, intuitive CMMS that helps you manage assets, track work orders, and optimize your entire maintenance workflow.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                   <Button asChild size="lg">
                     <Link href="/dashboard">
                        View Demo
                     </Link>
                   </Button>
                   <Button asChild variant="outline" size="lg">
                     <Link href="/register">
                       Sign Up
                     </Link>
                   </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Succeed</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From asset management to predictive analytics, GearGuard provides the tools to take control of your maintenance.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              <Card className="bg-card/50">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Wrench className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Asset Management</h3>
                  </div>
                  <p className="text-muted-foreground">Keep a detailed registry of all your equipment, track warranty information, and manage asset lifecycle.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Work Order Tracking</h3>
                  </div>
                  <p className="text-muted-foreground">Create, assign, and monitor maintenance requests from a centralized, easy-to-use kanban board.</p>
                </CardContent>
              </Card>
               <Card className="bg-card/50">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Preventive Maintenance</h3>
                  </div>
                  <p className="text-muted-foreground">Schedule routine maintenance to prevent costly breakdowns and extend equipment lifespan.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Team Collaboration</h3>
                  </div>
                  <p className="text-muted-foreground">Organize your technicians into teams, assign work, and improve communication across your organization.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50">
                <CardContent className="p-6 grid gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">Reporting & Analytics</h3>
                  </div>
                  <p className="text-muted-foreground">Gain insights with powerful dashboards showing request trends, team performance, and asset status.</p>
                </CardContent>
              </Card>
               <Card className="bg-card/50">
                <CardContent className="p-6 grid gap-4">
                   <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                      <Image src="https://picsum.photos/seed/2/24/24" alt="Mobile Access" width={24} height={24} className="rounded-full" data-ai-hint="mobile phone"/>
                    </div>
                    <h3 className="text-xl font-bold">Mobile Access</h3>
                  </div>
                  <p className="text-muted-foreground">Access GearGuard on the go. Our responsive design works flawlessly on tablets and mobile devices.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 GearGuard. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
