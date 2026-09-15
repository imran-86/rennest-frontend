'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, MapPin, Bed, Bath, Maximize2, Sparkles, Building2, Send } from 'lucide-react';
import { Property } from '@/app/lib/type';
import RentalRequestModal from '../[id]/_components/RentalRequestModal';


export default function PropertyDetails({ property }: { property: Property }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAvailable = property.status === 'AVAILABLE';

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" >
          <Link href="/properties">
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
      {property.images && property.images.length > 0 ? (
        property.images.length === 1 ? (
          // Single large image
          <div className="relative rounded-xl overflow-hidden border border-border/60 h-72 md:h-96">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : property.images.length === 2 ? (
          // Two images side by side
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden border border-border/60 h-72 md:h-80"
              >
                <Image
                  src={imgUrl}
                  alt={`${property.title} - ${idx + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Featured (left) */}
            <div className="relative rounded-xl overflow-hidden border border-border/60 h-72 md:h-96 md:col-span-2">
              <Image
                src={property.images[0]}
                alt={`${property.title} - main`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            {/* Other images (right, 2x2 grid) */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {property.images.slice(1, 5).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden border border-border/60 h-36 md:h-[11.5rem]"
                >
                  <Image
                    src={imgUrl}
                    alt={`${property.title} - ${idx + 2}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="h-64 rounded-xl bg-muted border border-border/60 flex items-center justify-center text-muted-foreground">
          <Building2 className="h-10 w-10" />
        </div>
      )}

      {/* Property Details Grid */}
      <Card className="shadow-sm border-border/60">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/40">
            <div>
              <span className="text-3xl font-bold text-primary">
                ৳{Number(property.price).toLocaleString()}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono">{property.type}</Badge>
                <Badge
                  variant="outline"
                  className={
                    isAvailable
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
                      : 'bg-slate-500/10 text-slate-600 border-slate-200'
                  }
                >
                  {property.status}
                </Badge>
              </div>

              {/* Request to Rent Button */}
              <Button
                disabled={!isAvailable}
                onClick={() => setIsModalOpen(true)}
                className="gap-2 shadow-sm"
              >
                <Send className="h-4 w-4" />
                {isAvailable ? 'Request to Rent' : 'Property Rented'}
              </Button>
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

      {/* Rental Request Modal */}
      <RentalRequestModal
        propertyId={property.id}
        propertyTitle={property.title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}