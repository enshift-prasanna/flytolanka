import { Skeleton } from "@/components/ui/skeleton";

export default function VehiclesLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-primary/95 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-24 text-center max-w-3xl">
          <Skeleton className="h-10 lg:h-12 w-4/5 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-5 w-full mx-auto mb-2 bg-white/15" />
          <Skeleton className="h-5 w-2/3 mx-auto bg-white/15" />
        </div>
      </section>

      {/* Vehicle Grid Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="relative bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden h-64 flex flex-col justify-end"
              >
                <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
                <div className="relative z-10 p-4">
                  <Skeleton className="h-6 w-3/4 mx-auto bg-black/40 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
