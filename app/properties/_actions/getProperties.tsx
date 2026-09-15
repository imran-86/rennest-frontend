'use server'
import { cookies } from "next/headers";

export const getProperties = async ({query } : { query?: { [key: string]: string | string[] | undefined } }) => {
     console.log("query params ",query); 
     
    const params = new URLSearchParams()
   
    

    if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });
  }
     console.log("Params ",params);

   
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties?${params.toString()}`, {
        method : "GET",    
       
            cache : "no-cache",
            next : {
                revalidate : 60 * 60 * 24,
                tags : ["my-properties"]
            }
        });
    
        const result = await res.json();
        console.log("result ",result);
        
    
        return result
}