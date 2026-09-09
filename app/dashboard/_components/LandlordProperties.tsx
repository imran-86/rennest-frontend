'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Building2, MapPin, Bed, Bath, Maximize2, Eye, Edit, Trash2 } from 'lucide-react';


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

export default function LandlordPropertiesClient({ properties = [] }: { properties: Property[] }) {
  

  // Sorting: AVAILABLE properties first
  const sortedProperties = [...properties].sort((a, b) => {
    if (a.status === 'AVAILABLE' && b.status !== 'AVAILABLE') return -1;
    if (a.status !== 'AVAILABLE' && b.status === 'AVAILABLE') return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground mt-1">
            Manage your property listings, availability states, and details.
          </p>
        </div>
        <Button asChild className="gap-2 shadow-sm">
          <Link href="/dashboard/landlord/properties/new">
            <Plus className="h-4 w-4" />
            <span>Post New Property</span>
          </Link>
        </Button>
      </div>

      <Card className="shadow-sm border-border/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            All Listings ({sortedProperties.length})
          </CardTitle>
          <CardDescription>
            Showing available properties at the top, followed by rented units.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-0">
          {sortedProperties.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Building2 className="h-12 w-12 text-muted-foreground/40 mx-auto" />
              <p className="text-base font-medium">No properties listed yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rent / Month</TableHead>
                  <TableHead>Specs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-sm truncate max-w-[240px]">
                          {property.title}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="h-3 w-3 shrink-0" /> {property.location}, {property.city}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-xs font-mono">
                        {property.type}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-semibold">
                      ৳{Number(property.price).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Bed className="h-3.5 w-3.5" /> {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="h-3.5 w-3.5" /> {property.bathrooms}
                        </span>
                        {property.areaSqft && (
                          <span className="flex items-center gap-1">
                            <Maximize2 className="h-3.5 w-3.5" /> {property.areaSqft} sqft
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          property.status === 'AVAILABLE'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200 text-xs'
                            : 'bg-slate-500/10 text-slate-600 border-slate-200 text-xs'
                        }
                      >
                        {property.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          asChild
                        >
                          <Link href={`/dashboard/landlord/properties/${property.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

   
    </div>
  );
}