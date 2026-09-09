'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  ClipboardList,
  Users,
  CreditCard,
  LogOut,
  Building2,
  ShieldCheck,
  UserCheck,
  MessageSquare,
} from 'lucide-react';
// import { logoutAction } from '@/app/actions/authActions';

interface UserData {
  id?: string;
  name?: string;
  email?: string;
  role?: 'TENANT' | 'LANDLORD' | 'ADMIN' | string;
  avatarUrl?: string;
}

interface DashboardSidebarProps {
  user?: UserData;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const role = user?.role?.toUpperCase() || 'TENANT';

  // Navigation Items per Role
  const tenantNav = [
    {
      title: 'Dashboard',
      href: '/dashboard/tenant',
      icon: LayoutDashboard,
    },
    {
      title: 'Browse Rentals',
      href: '/properties',
      icon: Home,
    },
    {
      title: 'My Requests',
      href: '/dashboard/tenant/requests',
      icon: ClipboardList,
    },
    {
      title: 'Payments',
      href: '/dashboard/tenant/payments',
      icon: CreditCard,
    },
    {
      title: 'My Reviews',
      href: '/dashboard/tenant/reviews',
      icon: MessageSquare,
    },
  ];

  const landlordNav = [
    {
      title: 'Overview',
      href: '/dashboard/landlord',
      icon: LayoutDashboard,
    },
    {
      title: 'My Properties',
      href: '/dashboard/landlord/all-properties',
      icon: Home,
    },
    {
      title: 'Post New Property',
      href: '/dashboard/landlord/properties/new',
      icon: PlusCircle,
    },
    {
      title: 'Incoming Requests',
      href: '/dashboard/landlord/requests',
      icon: ClipboardList,
    },
  ];

  const adminNav = [
    {
      title: 'System Overview',
      href: '/dashboard/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'User Management',
      href: '/dashboard/admin/users',
      icon: Users,
    },
    {
      title: 'All Listings',
      href: '/dashboard/admin/properties',
      icon: Home,
    },
    {
      title: 'All Requests',
      href: '/dashboard/admin/requests',
      icon: ClipboardList,
    },
  ];

  const navItems =
    role === 'ADMIN'
      ? adminNav
      : role === 'LANDLORD'
      ? landlordNav
      : tenantNav;

  const roleBadgeColor =
    role === 'ADMIN'
      ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200'
      : role === 'LANDLORD'
      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200'
      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200';

  const roleIcon =
    role === 'ADMIN' ? (
      <ShieldCheck className="h-3 w-3 mr-1" />
    ) : role === 'LANDLORD' ? (
      <Building2 className="h-3 w-3 mr-1" />
    ) : (
      <UserCheck className="h-3 w-3 mr-1" />
    );

  const getInitials = (name?: string) => {
    if (!name) return 'RN';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Sidebar className="border-r border-border/60">
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate leading-tight">
              {user?.name || 'User Name'}
            </span>
            <span className="text-xs text-muted-foreground truncate leading-tight">
              {user?.email || 'user@rentnest.com'}
            </span>
            <div className="mt-1">
              <Badge variant="outline" className={`text-[10px] px-1.5 py-0 inline-flex items-center font-medium ${roleBadgeColor}`}>
                {roleIcon}
                {role}
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-1.5">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={
                        isActive
                          ? 'bg-primary/10 text-primary font-medium hover:bg-primary/15'
                          : 'text-muted-foreground hover:text-foreground'
                      }
                    >
                      <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors">
                        <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/40">
        <form>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Button>
        </form>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}