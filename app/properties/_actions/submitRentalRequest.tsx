'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type ActionState = {
  success?: boolean;
  message?: string;
} | null;

export async function submitRentalRequestAction(
  propertyId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return {
        success: false,
        message: 'You must be logged in to submit a rental request.',
      };
    }

    const moveInDateRaw = formData.get('moveInDate') as string;
    const moveOutDateRaw = formData.get('moveOutDate') as string;
    const message = formData.get('message') as string;

    if (!moveInDateRaw) {
      return {
        success: false,
        message: 'Please select a valid move-in date.',
      };
    }

    const payload = {
      propertyId,
      moveInDate: new Date(moveInDateRaw).toISOString(),
      moveOutDate: moveOutDateRaw ? new Date(moveOutDateRaw).toISOString() : null,
      message,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rentals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to submit rental request.',
      };
    }

    revalidatePath('/dashboard/tenant/requests');
    revalidatePath('/dashboard/landlord/requests');

    return {
      success: true,
      message: 'Rental request submitted successfully!',
    };
  } catch (error) {
    console.error('Error submitting rental request:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
}