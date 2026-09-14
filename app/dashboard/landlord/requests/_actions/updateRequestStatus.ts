'use server'
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function updateRequestStatusAction(requestId: string, status: 'APPROVED' | 'REJECTED') {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) return { success: false, message: 'Unauthorized access' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Cookie : `accessToken=${token}`
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (result.success) {
      revalidateTag('my-request',{
        expire : 0
      })
    }
    return result;
  } catch (error) {
    console.error('Update status error:', error);
    return { success: false, message: 'Failed to update request status.' };
  }
}