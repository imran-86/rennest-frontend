import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Bed, Bath, Maximize2, Sparkles, Building2 } from 'lucide-react';
interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'AVAILABLE' | 'RENTED' | string;
  price: number | string;
  location: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft?: number;
  amenities: string[];
  images: string[];
  createdAt: string;
}
export default async function PropertyDetailsPage(property : Property) {
   

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/landlord/properties">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{property.title}</h1>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="h-3.5 w-3.5" /> {property.address}, {property.location}, {property.city}
          </p>
        </div>
      </div>

      {/* Top Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {property.images && property.images.length > 0 ? (
          property.images.map((imgUrl: string, idx: number) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden border border-border/60 ${
                idx === 0 ? 'md:col-span-2 h-72 md:h-80' : 'h-36 md:h-80'
              }`}
            >
              <Image src={imgUrl} alt={`${property.title} - image ${idx + 1}`} fill className="object-cover" />
            </div>
          ))
        ) : (
          <div className="col-span-3 h-64 rounded-xl bg-muted border border-border/60 flex items-center justify-center text-muted-foreground">
            <Building2 className="h-10 w-10" />
          </div>
        )}
      </div>

      {/* Property Details Grid */}
      <Card className="shadow-sm border-border/60">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div>
              <span className="text-3xl font-bold text-primary">৳{Number(property.price).toLocaleString()}</span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono">{property.type}</Badge>
              <Badge
                variant="outline"
                className={property.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-600'}
              >
                {property.status}
              </Badge>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-4 py-2 bg-muted/40 rounded-lg p-4 text-center">
            <div>
              <Bed className="h-5 w-5 mx-auto text-primary mb-1" />
              <span className="text-sm font-semibold">{property.bedrooms} Bedrooms</span>
            </div>
            <div>
              <Bath className="h-5 w-5 mx-auto text-primary mb-1" />
              <span className="text-sm font-semibold">{property.bathrooms} Bathrooms</span>
            </div>
            <div>
              <Maximize2 className="h-5 w-5 mx-auto text-primary mb-1" />
              <span className="text-sm font-semibold">{property.areaSqft || 'N/A'} Sqft</span>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((item: string, i: number) => (
                  <Badge key={i} variant="secondary">{item}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}