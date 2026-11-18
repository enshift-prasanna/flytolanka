import { Skeleton } from "@/components/ui/skeleton";

export default function PackageDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-primary/95 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="max-w-4xl space-y-4">
            <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
            <Skeleton className="h-10 lg:h-14 w-3/4 bg-white/25" />
            <Skeleton className="h-5 w-full max-w-2xl bg-white/15" />
            <Skeleton className="h-5 w-4/5 bg-white/15" />
            <div className="flex items-center gap-4 pt-2">
              <Skeleton className="h-7 w-28 rounded-full bg-white/20" />
              <Skeleton className="h-7 w-36 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Left: Package Overview & Tiers Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Pricing Card Skeleton */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                <Skeleton className="h-7 w-48 mb-2" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                </div>
              </div>

              {/* Detailed Description Skeleton */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                <Skeleton className="h-7 w-56" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <div className="pt-4 space-y-3">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                </div>
              </div>
            </div>

            {/* Right: Booking Form Card Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/90 rounded-2xl p-6 shadow-xl space-y-4">
                <Skeleton className="h-7 w-48 mx-auto bg-white/25 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                  <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                  <div className="grid grid-cols-2 gap-2">
                    <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                    <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                    <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                    <Skeleton className="h-9 w-full bg-white/20 rounded-lg" />
                  </div>
                  <Skeleton className="h-16 w-full bg-white/20 rounded-lg" />
                  <Skeleton className="h-12 w-full bg-yellow-400/80 rounded-full mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
