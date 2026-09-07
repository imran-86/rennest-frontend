import { Suspense } from "react"
import { MyPostsSkeleton } from "../_components/MyPropertiesSkeleton"
import { LandlordDashboard } from "../_components/LandlordDashboard"

const LandlordDashboardPage = () =>{
  return(
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Landlord Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your rental listings, incoming tenant applications, and rental earnings.
          </p>
        </div>
        {/* <Button asChild className="gap-2 shadow-sm">
          <Link href="/dashboard/landlord/properties/new">
            <Plus className="h-4 w-4" />
            <span>Post New Property</span>
          </Link>
        </Button> */}
      </div>
         <Suspense fallback={<MyPostsSkeleton />}>
        <LandlordDashboard />
      </Suspense>
      </div>
  )
}
export default LandlordDashboardPage