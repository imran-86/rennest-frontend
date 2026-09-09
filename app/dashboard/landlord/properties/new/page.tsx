'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';
import { PostCardProperties } from '@/app/dashboard/_components/PostCardProperties';


export default function PostNewPropertyPage() {
 

  return (
    <div>
    <div className="max-w-3xl  space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/landlord">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Post New Rental Property</h1>
          <p className="text-sm text-muted-foreground">
            Fill in details to showcase your property to prospective tenants.
          </p>
        </div>
      </div>
       
    </div>
    <div className='max-w-3xl mx-auto mt-6'>
      <PostCardProperties></PostCardProperties>
      </div>
      </div>
  );
}