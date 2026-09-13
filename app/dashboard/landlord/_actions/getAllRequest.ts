'use server'
import { cookies } from "next/headers";


export const getAllRequest = async () => {
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        if(!accessToken){
            return {
                success : false,
                message : "User not logged in!"
            }
        }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/landlord/requests`, {
            headers : {
                Cookie : `accessToken=${accessToken}`
            },
    
            cache : "force-cache",
            next : {
                revalidate : 60 * 60 * 24,
                tags : ["my-request"]
            }
        });
    
        const result = await res.json();

        console.log("Result of request",result);
        
    
    
        return result
}