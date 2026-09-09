import { Building2, Clock, DollarSign, TrendingUp } from "lucide-react";
import { getAllProperties } from "../landlord/_actions/getAllProperties";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getAllRequest } from "../landlord/_actions/getAllRequest";

interface RentalRequest {
  _id?: string;
  id?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED' | string;
  rentAmount?: number;
  price?: number;
  property?: {
    title?: string;
    location?: string;
  };
  tenant?: {
    name?: string;
    email?: string;
  };
}

export async function LandlordDashboard() {
  const [propertiesRes,requestsRes] = await Promise.all([
   getAllProperties(),
   getAllRequest()
  ]);

  const rawProperties = propertiesRes?.data;
const properties = Array.isArray(rawProperties)
  ? rawProperties
  : Array.isArray(rawProperties?.properties)
  ? rawProperties.properties
  : [];
  console.log("Properties Length  ",properties.length);
  
const rawRequests = requestsRes?.data;
const requests: RentalRequest[] = Array.isArray(rawRequests)
  ? rawRequests
  : Array.isArray(rawRequests?.requests)  
  ? rawRequests.requests
  : [];

const pendingRequests = requests.filter((r) => r.status === 'PENDING');

  if (properties.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        You haven&apos;t created any posts yet.
      </p>
    );
  }
const stats = [
    {
      title: 'Total Properties',
      value: (properties?.length ?? 0).toString(),
      change: 'Active listings',
      icon: Building2,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Pending Requests',
     value: (pendingRequests?.length ?? 0).toString(),
      change: 'Action required',
      icon: Clock,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Monthly Revenue',
      value: properties.length.toString(),
      change: 'Total active rent',
      icon: DollarSign,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-500/10',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
  );
}