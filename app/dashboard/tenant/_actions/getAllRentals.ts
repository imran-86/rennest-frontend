'use server'
import { cookies } from "next/headers";

export const getAllRentals = async () => {
    const cookieStore = await cookies();
    
        const accessToken = cookieStore.get("accessToken")?.value || null;
    
        if(!accessToken){
            return {
                success : false,
                message : "User not logged in!"
            }
        }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rentals`, {
        method : "GET",    
        headers : {
                Cookie : `accessToken=${accessToken}`
            },
    
            cache : "force-cache",
            next : {
                revalidate : 60 * 60 * 24,
                tags : ["my-rentals"]
            }
        });
    
        const result = res.json();
    
    
        return result
}