import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getSingleProperty } from '../_actions/getSingleProperties';
import PropertyDetails from '../_components/PropertyDetails';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: PageProps) {
  // console.log("params ",params);
  
   if(!params){
    return 'params not found'
   }
   const { id } = await params; 
   const property = await getSingleProperty(id)
   
   

   
     if (!property) {
    return (
      <div className="py-12 text-center space-y-4">
        <p className="text-lg font-medium">Property not found.</p>
        <Button  variant="outline">
          <Link href="/properties">Back to Properties</Link>
        </Button>
      </div>
    );
  }
   
  return <PropertyDetails property={property}/>
 
}