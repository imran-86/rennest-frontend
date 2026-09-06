'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Building2,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  DollarSign,
  Users,
  Eye,
  TrendingUp,
  MapPin,
  Calendar,
} from 'lucide-react';

export default function LandlordDashboardPage() {
  // Mock data for UI rendering
  const stats = [
    {
      title: 'Total Properties',
      value: '8',
      change: '+2 this month',
      icon: Building2,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Pending Requests',
      value: '5',
      change: 'Requires action',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Active Leases',
      value: '12',
      change: '92% occupancy rate',
      icon: CheckCircle2,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Monthly Revenue',
      value: '$14,250',
      change: '+12.5% from last month',
      icon: DollarSign,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-500/10',
    },
  ];

  const recentRequests = [
    {
      id: 'req-1',
      tenantName: 'Sarah Jenkins',
      tenantEmail: 'sarah.j@example.com',
      tenantAvatar: '',
      propertyTitle: 'Modern Luxury Apartment',
      propertyLocation: 'Downtown, Cityville',
      requestedDate: '2026-09-04',
      status: 'PENDING',
      amount: '$1,800/mo',
    },
    {
      id: 'req-2',
      tenantName: 'Michael Chen',
      tenantEmail: 'm.chen@example.com',
      tenantAvatar: '',
      propertyTitle: 'Cozy Studio near University',
      propertyLocation: 'Academic District',
      requestedDate: '2026-09-03',
      status: 'PENDING',
      amount: '$950/mo',
    },
    {
      id: 'req-3',
      tenantName: 'Emma Watson',
      tenantEmail: 'emma.w@example.com',
      tenantAvatar: '',
      propertyTitle: 'Spacious Suburban Villa',
      propertyLocation: 'Green Hills',
      requestedDate: '2026-09-01',
      status: 'APPROVED',
      amount: '$3,200/mo',
    },
  ];

  const topProperties = [
    {
      id: 'prop-1',
      title: 'Modern Luxury Apartment',
      location: '123 Main St, Downtown',
      price: '$1,800',
      status: 'AVAILABLE',
      views: 342,
      requestsCount: 4,
    },
    {
      id: 'prop-2',
      title: 'Spacious Suburban Villa',
      location: '456 Oak Ave, Green Hills',
      price: '$3,200',
      status: 'RENTED',
      views: 512,
      requestsCount: 7,
    },
    {
      id: 'prop-3',
      title: 'Cozy Studio near University',
      location: '789 College Rd, Campus Side',
      price: '$950',
      status: 'AVAILABLE',
      views: 289,
      requestsCount: 2,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Header & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landlord Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your rental listings, incoming tenant applications, and rental earnings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="gap-2 shadow-sm">
            <Link href="/dashboard/landlord/properties/new">
              <Plus className="h-4 w-4" />
              <span>Post New Property</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="shadow-sm border-border/60">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Pending Requests Table (4 Cols) */}
        <Card className="lg:col-span-4 shadow-sm border-border/60 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold">
                Incoming Rental Requests
              </CardTitle>
              <CardDescription>
                Tenants waiting for your approval
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link href="/dashboard/landlord/requests">
                View All <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRequests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={req.tenantAvatar} />
                          <AvatarFallback className="text-xs bg-primary/10 text-primary font-semibold">
                            {req.tenantName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium leading-none">
                            {req.tenantName}
                          </span>
                          <span className="text-xs text-muted-foreground mt-0.5">
                            {req.tenantEmail}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none truncate max-w-[140px]">
                          {req.propertyTitle}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {req.propertyLocation}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {req.status === 'PENDING' ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 text-xs"
                        >
                          Pending
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 text-xs"
                        >
                          Approved
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/dashboard/landlord/requests">Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Performing Property Listings (3 Cols) */}
        <Card className="lg:col-span-3 shadow-sm border-border/60 flex flex-col justify-between">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg font-semibold">
                My Top Properties
              </CardTitle>
              <CardDescription>Performance & listing statuses</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link href="/dashboard/landlord/properties">
                Manage <ArrowUpRight className="h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card hover:bg-accent/40 transition-colors"
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <p className="text-sm font-medium truncate leading-tight">
                    {prop.title}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {prop.location}
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {prop.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {prop.requestsCount} requests
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-sm font-bold">{prop.price}/mo</span>
                  <Badge
                    variant="secondary"
                    className={
                      prop.status === 'AVAILABLE'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                    }
                  >
                    {prop.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}