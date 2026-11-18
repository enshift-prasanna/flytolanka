import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
      <div className="container mx-auto px-4 lg:px-24">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <Skeleton className="h-9 w-72" />
            <Skeleton className="h-4 w-52" />
          </div>
          <Skeleton className="h-10 w-44 rounded-lg" />
        </div>

        {/* Bookings Card Skeletons */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
            >
              <div className="bg-slate-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-7 w-28 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <Skeleton className="h-4 w-36" />
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-7 w-2/3" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <Skeleton className="h-5 w-44" />
                      <Skeleton className="h-5 w-44" />
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-5 w-36" />
                    </div>
                  </div>
                  <div className="md:col-span-1 bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-10 w-full rounded-xl mt-2" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
