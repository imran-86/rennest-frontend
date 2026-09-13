'use server'
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
export type ActionState = {
  success?: boolean;
  message?: string;
} | null;

export async function updatePropertyAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    console.log("Id ",id);
    
    
    

    if (!token) return { success: false, message: 'Unauthorized' };

    const parseCommaArray = (rawText: string) =>
      rawText ? rawText.split(',').map((item) => item.trim()).filter(Boolean) : [];

    const payload = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as string,
      status: formData.get('status') as string,
      price: Number(formData.get('price')),
      location: formData.get('location') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      areaSqft: Number(formData.get('areaSqft')),
      amenities: parseCommaArray(formData.get('amenities') as string),
      images: parseCommaArray(formData.get('images') as string),
    };
   console.log("payload ",payload);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landloard/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if(result.success){
        revalidateTag("my-properties", {
            expire : 0
        })
    }
    return result;
  } catch (error) {
    console.error('Update property error:', error);
    return { success: false, message: 'Failed to update property.' };
  }
}