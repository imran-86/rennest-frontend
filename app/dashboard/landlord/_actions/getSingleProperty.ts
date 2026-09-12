'use server'
import { cookies } from "next/headers";
import { Property } from "../_types/type";

export const getSingleProperties = async (id : string) : Promise<Property | undefined> => {
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        // if(!accessToken){
        //     return {
        //         success : false,
        //         message : "User not logged in!"
        //     }
        // }
    
     try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`,
      {
        method: 'GET',
        headers: { Cookie: `accessToken=${accessToken}` },
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