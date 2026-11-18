"use client";

import { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, DollarSign, MessageCircle, ArrowLeft, Clock, ShieldCheck, MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MyBookingsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/user/bookings")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setBookings(data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else if (isLoaded && !isSignedIn) {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-2">
              <Skeleton className="h-9 w-72" />
              <Skeleton className="h-4 w-52" />
            </div>
            <Skeleton className="h-10 w-44 rounded-lg" />
          </div>

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

  if (!isSignedIn) {
    return (
      <div className="container mx-auto px-4 lg:px-24 py-16 text-center max-w-xl">
        <Card className="p-8 shadow-lg">
          <CardHeader>
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Sign in to view your bookings</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Sign in with the email you used when booking. Any past inquiries made with your email address will automatically appear here!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <SignInButton mode="modal">
              <Button size="lg" className="w-full bg-secondary hover:bg-secondary/80">
                Sign In / Register
              </Button>
            </SignInButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12">
      <div className="container mx-auto px-4 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              My Tour Bookings & Inquiries
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Signed in as <span className="font-semibold text-gray-800">{user?.primaryEmailAddress?.emailAddress}</span>
            </p>
          </div>
          <Link href="/packages">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
              Explore More Packages
            </Button>
          </Link>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <Card className="p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Calendar className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm">
              You haven't made any inquiries or bookings yet. Once you send a trip inquiry on our website, it will show up right here.
            </p>
            <Link href="/packages">
              <Button className="bg-secondary hover:bg-secondary/80">
                Browse Tour Packages
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusColor =
                booking.status === "CONFIRMED"
                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                  : booking.status === "CANCELLED"
                  ? "bg-red-100 text-red-800 border-red-200"
                  : "bg-amber-100 text-amber-800 border-amber-200";

              return (
                <Card key={booking.id} className="shadow-md hover:shadow-lg transition-shadow border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold bg-white px-3 py-1 rounded border text-primary">
                        {booking.bookingRef || `FTL-${booking.id.slice(-6).toUpperCase()}`}
                      </span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor}`}>
                        {booking.status === "PENDING" ? "● Under Review" : `● ${booking.status}`}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-start">
                      {/* Left: Package info */}
                      <div className="md:col-span-2 space-y-3">
                        <h2 className="text-xl font-bold text-gray-900">
                          {booking.packageName}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 pt-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span><strong>Arrival:</strong> {booking.arrivalDate || "Not set"}</span>
                          </div>
                          {booking.departureDate && (
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-secondary" />
                              <span><strong>Departure:</strong> {booking.departureDate}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>
                              <strong>Travelers:</strong> {booking.adults} Adults
                              {booking.children > 0 ? `, ${booking.children} Kids` : ""}
                              {booking.infants > 0 ? `, ${booking.infants} Infants` : ""}
                            </span>
                          </div>
                          {booking.customerPhone && (
                            <div className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4 text-green-600" />
                              <span><strong>WhatsApp:</strong> {booking.customerPhone}</span>
                            </div>
                          )}
                        </div>

                        {booking.specialNotes && (
                          <div className="bg-slate-50 p-3 rounded-lg text-xs text-gray-600 border mt-2">
                            <strong>Special Notes:</strong> {booking.specialNotes}
                          </div>
                        )}
                      </div>

                      {/* Right: Price box & WhatsApp Contact */}
                      <div className="bg-slate-50/80 p-5 rounded-xl border flex flex-col justify-between space-y-4">
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Estimated Price</span>
                          <div className="text-2xl font-bold text-primary mt-1">
                            {booking.totalPrice ? `$${booking.totalPrice} USD` : "Custom Quote"}
                          </div>
                          {booking.totalPrice && (
                            <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                              {booking.adultTotal > 0 && <div>Adults: ${booking.adultTotal}</div>}
                              {booking.kidTotal > 0 && <div>Kids: ${booking.kidTotal}</div>}
                              {booking.infantTotal > 0 && <div>Infants: ${booking.infantTotal}</div>}
                            </div>
                          )}
                        </div>

                        <a
                          href={`https://wa.me/94765533874?text=${encodeURIComponent(
                            `Hi Fly To Lanka, I am inquiring about my booking reference ${booking.bookingRef} for ${booking.packageName}.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-4 rounded-lg font-medium text-sm transition-colors shadow-sm"
                        >
                          <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
