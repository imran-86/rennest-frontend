'use client';

import { useState } from 'react';
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
import { Eye, CheckCircle2, XCircle, ClipboardList, MapPin } from 'lucide-react';
import { RentalRequest } from '../../_types/type';
import RequestDetailsModal from './RequestDetailsModal';
import UpdateStatusDialog from './UpdateStatusDialog';



export default function LandlordRequestsClient({ requests = [] }: { requests: RentalRequest[] }) {
  const [selectedRequest, setSelectedRequest] = useState<RentalRequest | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  
  const [statusDialogInfo, setStatusDialogInfo] = useState<{
    requestId: string;
    targetStatus: 'APPROVED' | 'REJECTED';
  } | null>(null);

  // Sorting: PENDING requests on TOP, then ordered by newest createdAt
  const sortedRequests = [...requests].sort((a, b) => {
    if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
    if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Rental Requests</h1>
        <p className="text-muted-foreground mt-1">
          Review pending applications, approve qualified tenants, or reject requests.
        </p>
      </div>

      <Card className="shadow-sm border-border/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-primary" />
            Incoming Applications ({sortedRequests.length})
          </CardTitle>
          <CardDescription>
            Pending applications are prioritized at the top of the queue.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          {sortedRequests.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <ClipboardList className="h-12 w-12 text-muted-foreground/40 mx-auto" />
              <p className="text-base font-medium">No rental requests received yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Move-in Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRequests.map((req) => (
                  <TableRow key={req.id}>
                    {/* Tenant Info */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{req.tenant?.name || 'Tenant'}</span>
                        <span className="text-xs text-muted-foreground">{req.tenant?.email}</span>
                      </div>
                    </TableCell>

                    {/* Property Info */}
                    <TableCell>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-sm truncate max-w-[200px]">
                          {req.property?.title || 'Property'}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3" /> {req.property?.location}
                        </span>
                      </div>
                    </TableCell>

                    {/* Move-in Date */}
                    <TableCell className="text-sm font-medium">
                      {new Date(req.moveInDate).toLocaleDateString()}
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          req.status === 'PENDING'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-200 text-xs'
                            : req.status === 'APPROVED'
                            ? 'bg-blue-500/10 text-blue-600 border-blue-200 text-xs'
                            : 'bg-rose-500/10 text-rose-600 border-rose-200 text-xs'
                        }
                      >
                        {req.status}
                      </Badge>
                    </TableCell>

                    {/* Action Controls */}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Eye Icon -> View Details Modal */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setSelectedRequest(req);
                            setDetailsModalOpen(true);
                          }}
                         
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        {/* Status Change Buttons (Only Enabled for PENDING) */}
                        {req.status === 'PENDING' ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 border-emerald-200 gap-1 text-xs"
                             onClick={() =>
                                setStatusDialogInfo({
                                  requestId: req.id,
                                  targetStatus: 'APPROVED',
                                })
                              }
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                            </Button>

                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 gap-1 text-xs"
                             onClick={() =>
                                setStatusDialogInfo({
                                  requestId: req.id,
                                  targetStatus: 'REJECTED',
                                })
                              }
                            >
                              <XCircle className="h-3.5 w-3.5" /> Reject
                            </Button>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground px-2">Completed</span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Details View Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          request={selectedRequest}
          isOpen={detailsModalOpen}
          onClose={() => {
            setDetailsModalOpen(false);
            setSelectedRequest(null);
          }}
        />
      )}

      {/* Status Update Confirmation Dialog */}
      {statusDialogInfo && (
        <UpdateStatusDialog
          requestId={statusDialogInfo.requestId}
          targetStatus={statusDialogInfo.targetStatus}
          isOpen={Boolean(statusDialogInfo)}
          onClose={() => setStatusDialogInfo(null)}
        />
      )}
    </div>
  );
}