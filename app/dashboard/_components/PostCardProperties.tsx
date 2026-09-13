'use client'
import { useActionState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, Building2, Image as ImageIcon, Sparkles, MapPin } from 'lucide-react';
import { createPropertyAction, PropertyState } from '../landlord/_actions/createProperty';



const initialState: PropertyState = {
  error: '',
  success: false,
};
export function PostCardProperties (){
     const [state, formAction, isPending] = useActionState(createPropertyAction, initialState);
    return (
        <Card className="shadow-md border-border/60">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Property Overview
          </CardTitle>
          <CardDescription>
            Provide accurate specs and highlights to increase listing engagement.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action={formAction} className="space-y-6">
            {state?.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Saimon NEW Property"
                required
              />
            </div>

            {/* Property Type & Monthly Rent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select name="type" defaultValue="HOUSE">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HOUSE">House</SelectItem>
                    <SelectItem value="APARTMENT">Apartment</SelectItem>
                    <SelectItem value="STUDIO">Studio</SelectItem>
                    <SelectItem value="CONDO">Condo</SelectItem>
                    <SelectItem value="VILLA">Villa</SelectItem>
                    <SelectItem value="PENTHOUSE">Penthouse</SelectItem>
                    <SelectItem value="DUPLEX">Duplex</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Monthly Price (৳)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  placeholder="60000"
                  required
                />
              </div>
            </div>

            {/* Location, Address, City */}
            <div className="space-y-4 pt-2 border-t border-border/40">
              <Label className="text-sm font-semibold flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> Location Details
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Area / Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. Bashundhara R/A"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="e.g. Dhaka"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="e.g. Road 12, Block D, Bashundhara R/A"
                  required
                />
              </div>
            </div>

            {/* Specs: Bedrooms, Bathrooms, Sqft */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-border/40">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  placeholder="4"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  placeholder="3"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="areaSqft">Area (Sqft)</Label>
                <Input
                  id="areaSqft"
                  name="areaSqft"
                  type="number"
                  min="1"
                  placeholder="2800"
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-2 pt-2 border-t border-border/40">
              <Label htmlFor="amenities" className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-primary" />
                Amenities
              </Label>
              <Input
                id="amenities"
                name="amenities"
                placeholder="Garden, Garage, Rooftop, Generator, CCTV"
              />
              <p className="text-[11px] text-muted-foreground">
                Separate multiple features with commas.
              </p>
            </div>

            {/* Image URLs */}
            <div className="space-y-2">
              <Label htmlFor="images" className="flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-primary" />
                Image URLs
              </Label>
              <Textarea
                id="images"
                name="images"
                rows={3}
                placeholder="https://example.com/images/house1-1.jpg, https://example.com/images/house1-2.jpg"
                required
              />
              <p className="text-[11px] text-muted-foreground">
                Paste direct image URLs separated by commas.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Independent house with a private garden, garage, and rooftop terrace. Ideal for families."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
              <Button variant="outline" type="button"  disabled={isPending}>
                <Link href="/dashboard/landlord">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Publishing Property...
                  </>
                ) : (
                  'Publish Property'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
}