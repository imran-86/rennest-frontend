import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { ClipboardList, CreditCard, MapPin, Calendar } from 'lucide-react';
import { getAllRentals } from '../_actions/getAllRentals';

interface RentalRequest {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED' | string;
  moveInDate: string;
  moveOutDate: string | null;
  message: string;
  createdAt: string;
  isPaid: boolean;
  property: {
    id: string;
    title: string;
    price: number | string;
    location: string;
  };
}



export default async function TenantRequestsPage() {
 const res = await getAllRentals();
 console.log("response ",res);
 

   if (!res?.success) {

  return <div>No rentals found</div>;
  }

   const requests : RentalRequest[] = res?.data ?? [];   
   console.log("requests found ",requests);
   
   

  const getStatusBadge = (status: string, isPaid: boolean) => {
    switch (status) {
      case 'PENDING':
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">PENDING</Badge>;
      case 'APPROVED':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-200">APPROVED</Badge>;
      case 'REJECTED':
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-600 border-rose-200">REJECTED</Badge>;
     
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Rental Applications</h1>
        <p className="text-muted-foreground mt-1">
          Track landlord decisions and complete payment for approved applications.
        </p>
      </div>

      <Card className="shadow-sm border-border/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Submitted Requests ({requests.length})
          </CardTitle>
          <CardDescription>Status updates for your applications.</CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          {requests.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ClipboardList className="h-12 w-12 text-muted-foreground/40 mx-auto" />
              <p className="text-base font-medium">No rental requests submitted yet.</p>
              <Button  variant="outline">
                <Link href="/properties">Browse Listings</Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Move-in Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{req.property?.title || 'Property'}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" /> {req.property?.location}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="font-semibold">
                      ৳{Number(req.property?.price || 0).toLocaleString()}/mo
                    </TableCell>

                    <TableCell className="text-sm">
                      {new Date(req.moveInDate).toLocaleDateString()}
                    </TableCell>

                    <TableCell>{getStatusBadge(req.status, req.isPaid)}</TableCell>

                    <TableCell className="text-right">
                      {req.status === 'APPROVED' && !req.isPaid ? (
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 gap-1 text-xs" >
                          <Link href={`/dashboard/tenant/requests/${req.id}/pay`}>
                            <CreditCard className="h-3.5 w-3.5" /> Proceed to Payment
                          </Link>
                        </Button>
                      ) : req.status === 'ACTIVE' ? (
                        <Button size="sm" variant="outline" >
                          <Link href="/dashboard/tenant/reviews">Leave Review</Link>
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground px-2">No action required</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}