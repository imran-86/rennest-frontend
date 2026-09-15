'use client';

import { use } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

export function FilterBar({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = use(searchParams);

  return (
    <Card className="p-4 border-border/60 shadow-sm bg-card">
      <form className="flex flex-col gap-3 md:flex-row md:items-end md:flex-wrap">
        {/* City */}
        <div className="flex-1 min-w-[180px] space-y-1.5">
          <Label htmlFor="city" className="text-xs font-semibold">
            City
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="city"
              name="city"
              placeholder="e.g. Dhaka"
              defaultValue={params?.city as string}
              className="pl-9"
            />
          </div>
        </div>

        {/* Location */}
        <div className="flex-1 min-w-[180px] space-y-1.5">
          <Label htmlFor="location" className="text-xs font-semibold">
            Location
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              name="location"
              placeholder="e.g. Uttara, Dhanmondi"
              defaultValue={params?.location as string}
              className="pl-9"
            />
          </div>
        </div>

        
        <div className="w-full md:w-[180px] space-y-1.5">
          <Label htmlFor="type" className="text-xs font-semibold">
            Property Type
          </Label>
          <Select name="type" defaultValue={(params?.type as string)}>
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="HOUSE">House</SelectItem>
              <SelectItem value="APARTMENT">Apartment</SelectItem>
              <SelectItem value="STUDIO">Studio</SelectItem>
              <SelectItem value="VILLA">Villa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Button — natural width on desktop */}
        <Button type="submit" className="w-full gap-2 md:w-auto">
          <Filter className="h-4 w-4" />
          Apply Filters
        </Button>
      </form>
    </Card>
  );
}