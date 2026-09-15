'use client';

import { useActionState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { ActionState, submitRentalRequestAction } from '../../_actions/submitRentalRequest';
import { redirect } from 'next/navigation';


interface RentalRequestModalProps {
  propertyId: string;
  propertyTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RentalRequestModal({
  propertyId,
  propertyTitle,
  isOpen,
  onClose,
}: RentalRequestModalProps) {
  const submitWithPropertyId = submitRentalRequestAction.bind(null, propertyId);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    submitWithPropertyId,
    null
  );

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message || 'Rental request submitted successfully!');
      onClose();
    } else if (state.message) {
      
      toast.error(state.message);
      if(state.message==='You must be logged in to submit a rental request.'){
        redirect('/auth/login')
      }
    }
  }, [state, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Rent</DialogTitle>
          <DialogDescription className="truncate">
            Property: <span className="font-semibold">{propertyTitle}</span>
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="moveInDate">Planned Move-in Date</Label>
            <Input id="moveInDate" name="moveInDate" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="moveOutDate">Planned Move-out Date (Optional)</Label>
            <Input id="moveOutDate" name="moveOutDate" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message to Landlord</Label>
            <Textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Introduce yourself or ask questions about lease terms..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}