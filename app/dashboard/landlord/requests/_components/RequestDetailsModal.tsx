'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Mail, Building2, MapPin, MessageSquare, CreditCard } from 'lucide-react';
import { RentalRequest } from '../../_types/type';


interface RequestDetailsModalProps {
  request: RentalRequest;
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestDetailsModal({ request, isOpen, onClose }: RequestDetailsModalProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not Specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Rental Request Details</span>
            <Badge
              variant="outline"
              className={
                request.status === 'PENDING'
                  ? 'bg-amber-500/10 text-amber-600 border-amber-200'
                  : request.status === 'APPROVED'
                  ? 'bg-blue-500/10 text-blue-600 border-blue-200'
                  : 'bg-rose-500/10 text-rose-600 border-rose-200'
              }
              
            >
              {request.status}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Request ID: <span className="font-mono text-xs">{request.id}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          {/* Tenant Information */}
          <div className="p-3 bg-muted/50 rounded-lg space-y-1.5 border border-border/40">
            <h4 className="font-semibold text-xs text-muted-foreground uppercase flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-primary" /> Tenant Profile
            </h4>
            <p className="font-medium text-base">{request.tenant?.name || 'Unknown Tenant'}</p>
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Mail className="h-3 w-3" /> {request.tenant?.email || 'N/A'}
            </p>
          </div>

          {/* Property Details */}
          <div className="p-3 bg-muted/50 rounded-lg space-y-1.5 border border-border/40">
            <h4 className="font-semibold text-xs text-muted-foreground uppercase flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-primary" /> Target Property
            </h4>
            <p className="font-medium text-base">{request.property?.title || 'Unknown Property'}</p>
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <MapPin className="h-3 w-3" /> {request.property?.location}, {request.property?.city}
            </p>
          </div>

          {/* Schedule & Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 border rounded-lg space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Move-in Date
              </span>
              <p className="font-semibold">{formatDate(request.moveInDate)}</p>
            </div>
            <div className="p-3 border rounded-lg space-y-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Move-out Date
              </span>
              <p className="font-semibold">{formatDate(request.moveOutDate)}</p>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-1">
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" /> Tenant Note
            </span>
            <p className="p-3 bg-background border rounded-lg text-muted-foreground leading-relaxed italic">
              "{request.message || 'No additional note provided.'}"
            </p>
          </div>

          {/* Payment Status */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/20">
            <span className="text-xs font-medium flex items-center gap-1.5">
              <CreditCard className="h-4 w-4 text-primary" /> Payment Status
            </span>
            <Badge variant={request.isPaid ? 'default' : 'secondary'}>
              {request.isPaid ? 'PAID' : 'UNPAID'}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}