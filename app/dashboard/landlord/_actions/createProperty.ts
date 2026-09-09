'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export type PropertyState = {
  error?: string;
  success?: boolean;
};

export async function createPropertyAction(
  prevState: PropertyState,
  formData: FormData
): Promise<PropertyState> {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    return { error: 'Authentication required. Please log in again.' };
  }

  const parseCommaArray = (rawText: string) =>
    rawText
      ? rawText
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const payload = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    type: formData.get('type') as string,
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

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `accessToken=${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { error: result.message || 'Failed to create property listing.' };
    }
    console.log("Result ",result.success);
    
     if(result.success){
        revalidateTag("my-properties", {
            expire : 0
        })
    }
  } catch (err) {
    console.error('Error creating property:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  redirect('/dashboard/landlord');
}