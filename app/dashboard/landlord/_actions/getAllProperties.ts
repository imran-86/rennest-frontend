'use server'
import { cookies } from "next/headers";

export const getAllProperties = async () => {
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        if(!accessToken){
            return {
                success : false,
                message : "User not logged in!"
            }
        }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/properties`, {
            headers : {
                Cookie : `accessToken=${accessToken}`
            },
    
            cache : "force-cache",
            next : {
                revalidate : 60 * 60 * 24,
                tags : ["my-properties"]
            }
        });
    
        const result = res.json();
    
    
        return result
}