'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt,{JwtPayload} from "jsonwebtoken"


export type RegisterState = {
  error?: string;
  success?: boolean;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const role = (formData.get('role') as string)?.toUpperCase() || 'TENANT' as string;
    // console.log({name,email,phone,password,confirmPassword
    // });
  if (!name || !email || !password || !confirmPassword) {
    return { error: 'Please fill in all required fields.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }


  if (!role) {
    return { error: 'Please select a role.' };
  }

  const payload = {
    name,
    email,
    phone: phone || undefined,
    password,
    role,
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // console.log("Data ",data);
    // console.log("Response ",response);
    
    

    if (!response.ok) {  
      return { error: data.message || 'Registration failed. Please try again.' };
    }

    // redirect('/auth/login');
  } catch (error) {
    
    console.error('Registration error:', error);
    return { error: 'Network error. Please try again later.' };
  }
  redirect('/auth/login');
}



export type LoginState = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken: string;
    id: string;
    name: string;
    email: string;
    role: string;
  };
};
export const  loginAction = async(prevState: LoginState, formData: FormData) => {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  console.log({email,password});

  const payload = {
    email,
    password
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,{
    method : 'POST',
    headers : {
     "Content-Type" : "application/json"
    },
    body : JSON.stringify(payload)
  })
  const result = await res.json();

  console.log("Result ",result);
  if(result.success){
    const cookieStore = await cookies();

    cookieStore.set("accessToken",result.data.accessToken,{
      httpOnly: true,
      maxAge : 60*60*24,
      sameSite : "lax"
    });
    cookieStore.set("refreshToken",result.data.refreshToken,{
      httpOnly : true,
      maxAge : 60 * 60 * 24 *7,
      sameSite : "lax"
    });

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

    // console.log("Decoded Token ", decodedToken);
    // console.log(decodedToken.role);

      if(decodedToken.role === "TENANT"){
            redirect("/dashboard/tenant");
        } else if (decodedToken.role === "ADMIN"){
            redirect("/dashboard/admin");
        } else if (decodedToken.role === "LANDLORD"){
            redirect("/dashboard/landlord");
        }

    
    

  }
  
  return result;
}