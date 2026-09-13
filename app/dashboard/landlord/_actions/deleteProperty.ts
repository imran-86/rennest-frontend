'use server'
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function deletePropertyAction(id: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) return { success: false, message: 'Unauthorized' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landloard/properties/${id}`, {
      method: 'DELETE',
      headers: {
        Cookie: `accessToken=${token}`,
      },
    });

    const result = await res.json();
    if(result.success){
           revalidateTag("my-properties", {
               expire : 0
           })
       }
    return result;
  } catch (error) {
    console.error('Delete property error:', error);
    return { success: false, message: 'Failed to delete property.' };
  }
}