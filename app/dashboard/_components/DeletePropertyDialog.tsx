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
import { deletePropertyAction } from '../landlord/_actions/deleteProperty';
import { toast } from 'sonner';

interface DeletePropertyDialogProps {
  propertyId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function DeletePropertyDialog({ propertyId, isOpen, onClose }: DeletePropertyDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deletePropertyAction(propertyId);
    setLoading(false);
    onClose();
    toast.success("Deleted this property successfully")
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this property?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This property listing will be permanently removed from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}