
import { Suspense } from 'react';
import { PropertiesSkeleton } from './_components/PropertiesSkeleton';
import { AllProperties } from './_components/AllProperties';
import { FilterBar } from './_components/FilterBar';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-6 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          Explore Rental Properties
        </h1>
        <p className="text-muted-foreground">
          Find your perfect home from our verified landlord listings.
        </p>
      </div>

      <FilterBar searchParams={searchParams} />

      <Suspense fallback={<PropertiesSkeleton />}>
        <AllProperties searchParams={searchParams} />
      </Suspense>
    </div>
  );
}