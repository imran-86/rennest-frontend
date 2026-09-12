import { getSingleProperties } from "../../_actions/getSingleProperty";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import PropertyDetailsPage from "@/app/dashboard/_components/SinglePropertyDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  // console.log("params ",params);
  
   if(!params){
    return 'params not found'
   }
   const { id } = await params; 
   const property = await getSingleProperties(id)
   
   

   
     if (!property) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-lg font-medium">Property not found.</p>
        <Button  variant="outline">
          <Link href="/dashboard/landlord/all-properties">Back to Properties</Link>
        </Button>
      </div>
    );
  }
   
  return <PropertyDetailsPage property={property}/>
 
}