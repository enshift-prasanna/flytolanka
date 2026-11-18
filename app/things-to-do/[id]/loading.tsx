import { Skeleton } from "@/components/ui/skeleton";

export default function ActivityDetailLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-primary/95 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="max-w-4xl space-y-4">
            <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
            <Skeleton className="h-10 lg:h-14 w-4/5 bg-white/25" />
            <Skeleton className="h-5 w-full max-w-2xl bg-white/15" />
            <div className="flex items-center gap-4 pt-2">
              <Skeleton className="h-5 w-32 bg-white/20" />
              <Skeleton className="h-5 w-24 bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            {/* Article Content */}
            <div className="lg:col-span-2 space-y-6 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <Skeleton className="h-72 w-full rounded-xl mb-6" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-4 space-y-3">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>

            {/* Sidebar / Form Skeleton */}
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
                  <Skeleton className="h-20 w-full bg-white/20 rounded-lg" />
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
