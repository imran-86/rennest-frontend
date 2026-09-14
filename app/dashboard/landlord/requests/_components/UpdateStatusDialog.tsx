'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateRequestStatusAction } from '../_actions/updateRequestStatus';

interface UpdateStatusDialogProps {
  requestId: string;
  targetStatus: 'APPROVED' | 'REJECTED';
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateStatusDialog({
  requestId,
  targetStatus,
  isOpen,
  onClose,
}: UpdateStatusDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const res = await updateRequestStatusAction(requestId, targetStatus);
    setLoading(false);

    if (res.success) {
      toast.success(`Request marked as ${targetStatus}`);
      onClose();
    } else {
      toast.error(res.message || 'Failed to update request');
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {targetStatus === 'APPROVED' ? 'Approve Rental Request?' : 'Reject Rental Request?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {targetStatus === 'APPROVED'
              ? 'Approving this request will allow the tenant to proceed with the rental payment.'
              : 'Rejecting this request will mark the application as declined.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleUpdate}
            className={
              targetStatus === 'APPROVED'
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-rose-600 hover:bg-rose-700'
            }
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm {targetStatus === 'APPROVED' ? 'Approval' : 'Rejection'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}