'use-client'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Bed, Bath, Maximize2, Search, Building2, Filter } from 'lucide-react';
import { getProperties } from "../_actions/getProperties";
import { Property } from '@/app/dashboard/landlord/_types/type';

export async function AllProperties({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}){
  const query = await searchParams;
//   console.log("query ",query);
  
  const result = await getProperties({ query });
//   console.log("Properties ",result?.data);
  
  
  const properties = result?.data?? [];

  if (!result.success || !properties.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No properties found.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-3">
            <Building2 className="h-12 w-12 text-muted-foreground/40 mx-auto" />
            <p className="text-lg font-medium">No properties found.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search criteria.</p>
          </div>
        ) : (
          properties.map((property : Property) => (
            <Card key={property.id} className="overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="relative h-48 w-full bg-muted">
                  {property.images && property.images.length > 0 ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                      <Building2 className="h-10 w-10" />
                    </div>
                  )}
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground backdrop-blur-sm">
                    {property.type}
                  </Badge>
                </div>

                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg font-semibold truncate">{property.title}</CardTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {property.location}, {property.city}
                  </p>
                </CardHeader>

                <CardContent className="px-4 py-2">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Bed className="h-4 w-4" /> {property.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="h-4 w-4" /> {property.bathrooms} Baths
                    </span>
                    {property.areaSqft && (
                      <span className="flex items-center gap-1">
                        <Maximize2 className="h-4 w-4" /> {property.areaSqft} sqft
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-4 pt-2 border-t border-border/40 flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-primary">৳{Number(property.price).toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground"> /mo</span>
                </div>
                <Button size="sm">
                  <Link href={`/properties/${property.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
  )
}