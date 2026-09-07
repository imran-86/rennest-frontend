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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Home,
  Clock,
  CheckCircle2,
  CreditCard,
  ArrowUpRight,
  MapPin,
  Calendar,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

export default function TenantDashboardPage() {
  const stats = [
    {
      title: 'Active Rental',
      value: '1 Property',
      subtitle: 'Lease ends Dec 2026',
      icon: Home,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Pending Requests',
      value: '2 Requests',
      subtitle: 'Awaiting landlord response',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Total Spent',
      value: '$3,600',
      subtitle: 'Last payment on Aug 28',
      icon: CreditCard,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
  ];

  const rentalRequests = [
    {
      id: 'req-101',
      propertyTitle: 'Modern Luxury Apartment',
      location: 'Downtown, Cityville',
      monthlyRent: '$1,800',
      status: 'APPROVED',
      appliedDate: '2026-09-02',
    },
    {
      id: 'req-102',
      propertyTitle: 'Cozy Studio near University',
      location: 'Academic District',
      monthlyRent: '$950',
      status: 'PENDING',
      appliedDate: '2026-09-04',
    },
    {
      id: 'req-103',
      propertyTitle: 'Oceanview Condo',
      location: 'Bay Area',
      monthlyRent: '$2,200',
      status: 'REJECTED',
      appliedDate: '2026-08-20',
    },
    {
      id: 'req-104',
      propertyTitle: 'Sunset Hill Cottage',
      location: 'Westside',
      monthlyRent: '$1,500',
      status: 'ACTIVE',
      appliedDate: '2026-07-15',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
            Pending
          </Badge>
        );
      case 'APPROVED':
        return (
          <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">
            Approved (Pay Now)
          </Badge>
        );
      case 'ACTIVE':
        return (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
            Active
          </Badge>
        );
      case 'REJECTED':
        return (
          <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-200">
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tenant Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Track your rental applications, payments, and active stays.
          </p>
        </div>
        <Button asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
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
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rental Requests Section */}
      <Card className="shadow-sm border-border/60">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">My Rental Requests</CardTitle>
            <CardDescription>Status updates for properties you have applied for</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Rent</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentalRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{req.propertyTitle}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> {req.location}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{req.monthlyRent}/mo</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{req.appliedDate}</TableCell>
                  <TableCell>{getStatusBadge(req.status)}</TableCell>
                  <TableCell className="text-right">
                    {req.status === 'APPROVED' && (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white" asChild>
                        <Link href={`/dashboard/tenant/requests/${req.id}/pay`}>Pay Now</Link>
                      </Button>
                    )}
                    {req.status === 'ACTIVE' && (
                      <Button size="sm" variant="outline" className="gap-1" asChild>
                        <Link href="/dashboard/tenant/reviews">
                          <MessageSquare className="h-3.5 w-3.5" /> Leave Review
                        </Link>
                      </Button>
                    )}
                    {(req.status === 'PENDING' || req.status === 'REJECTED') && (
                      <Button size="sm" variant="ghost" disabled>
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}