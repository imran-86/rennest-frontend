'use server'
import { Property } from "@/app/lib/type";



export const getSingleProperty = async (id : string) : Promise<Property | undefined> => {
    
    
     try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      {
        method: 'GET'
      }
    );

    const result = (await res.json()).data.property as Property;

    return result ;
  } catch (error) {
    console.error('getSingleProperties error:', error);
    // return {
    //   success: false,
    //   message: 'Network error. Please try again later.',
    // };
  }
}