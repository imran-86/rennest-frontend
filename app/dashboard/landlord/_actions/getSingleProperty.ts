'use server'
import { cookies } from "next/headers";

export const getSingleProperties = async (id : string) => {
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        if(!accessToken){
            return {
                success : false,
                message : "User not logged in!"
            }
        }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties/${id}`, {
        method : "GET",    
        headers : {
                Cookie : `accessToken=${accessToken}`
            },
        });
    
        const result = res.json();
    
    
        return result
}