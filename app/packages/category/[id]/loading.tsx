import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section Placeholder */}
      <section className="relative overflow-hidden bg-primary/95 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="max-w-4xl">
            <Skeleton className="h-8 w-24 rounded-full mb-6 bg-white/20" />
            <Skeleton className="h-10 lg:h-12 w-2/3 mb-4 bg-white/20" />
            <Skeleton className="h-5 w-full max-w-2xl mb-2 bg-white/15" />
            <Skeleton className="h-5 w-1/2 bg-white/15" />
          </div>
        </div>
      </section>

      {/* Packages Skeleton Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto lg:px-24 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-sm p-0 flex flex-col"
              >
                <Skeleton className="h-48 w-full rounded-t-2xl rounded-b-none" />
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <div className="flex items-center gap-2 pt-1">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-9 w-28 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
