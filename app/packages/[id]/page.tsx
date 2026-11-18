"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Users, Star, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { optimizeImage } from "@/lib/utils";
import { calculatePackagePrice } from "@/lib/pricing";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

// Lightweight reveal animation component (no textual content changes)
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

// ...existing code...

// ...existing code...

async function fetchPackage(id: string) {
  const res = await fetch(`/api/package/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const { user, isSignedIn } = useUser();
  const [packageData, setPackageData] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Booking form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    vehicle: '',
    arrival: '',
    departure: '',
    adults: '',
    children: '',
    infants: '',
    requirements: '',
    phone: '',
    contactMethod: '',
    pickupLocation: '',
    dropoffLocation: '',
    specialNotes: ''
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Check if current package is a Honeymoon tour
  const isHoneymoon = Boolean(
    category?.slug === "honeymoon-tours" ||
    category?.name?.toLowerCase().includes("honeymoon") ||
    packageData?.categoryId === "68babf3c85d85b76f41bcfe5"
  );

  // Auto-fill customer details if signed in via Clerk
  useEffect(() => {
    if (isSignedIn && user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: prev.email || user.primaryEmailAddress?.emailAddress || '',
      }));
    }
  }, [isSignedIn, user]);

  // For Honeymoon tours, count is fixed to 2 Adults with no children/infants
  const effectiveAdults = isHoneymoon ? 2 : (parseInt(form.adults || '0', 10) || 0);
  const effectiveChildren = isHoneymoon ? 0 : (parseInt(form.children || '0', 10) || 0);
  const effectiveInfants = isHoneymoon ? 0 : (parseInt(form.infants || '0', 10) || 0);

  // Fallback couple price from packageData.price if pricingTiers not configured
  const fallbackHoneymoonPrice = isHoneymoon && packageData?.price
    ? parseFloat(String(packageData.price).replace(/,/g, '').replace(/[^0-9.]/g, '')) || 0
    : 0;

  // Calculate live dynamic price based on adults, children, and infants
  let estimatedPricing = calculatePackagePrice(
    packageData?.pricingTiers,
    effectiveAdults,
    effectiveChildren,
    effectiveInfants
  );

  // If Honeymoon and no tiered pricing was found, use the package display price
  if (isHoneymoon && (!estimatedPricing.hasPricing || estimatedPricing.grandTotal === 0) && fallbackHoneymoonPrice > 0) {
    estimatedPricing = {
      adultTotal: fallbackHoneymoonPrice,
      kidTotal: 0,
      infantTotal: 0,
      grandTotal: fallbackHoneymoonPrice,
      hasPricing: true,
    };
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSelect = (id: string, value: string) => {
    setForm({ ...form, [id]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSuccess(false);

    const isDayTour = packageData?.categoryId === "68babf3c85d85b76f41bcfe6";
    const pricingPayload = estimatedPricing.hasPricing ? {
      totalPrice: estimatedPricing.grandTotal,
      adultTotal: estimatedPricing.adultTotal,
      kidTotal: estimatedPricing.kidTotal,
      infantTotal: estimatedPricing.infantTotal,
      'Estimated Total Price': `$${estimatedPricing.grandTotal} USD`,
      ...(isHoneymoon ? { 'Tour Type': 'Honeymoon (Couple - 2 Adults)' } : {}),
    } : {};

    const adultDisplay = isHoneymoon ? '2 (Couple)' : (form.adults || '0');
    const childDisplay = isHoneymoon ? '0 (Not applicable)' : (form.children || '0');
    const infantDisplay = isHoneymoon ? '0 (Not applicable)' : (form.infants || '0');

    const emailData = isDayTour ? {
      package: packageData.title,
      packageId: packageData.id,
      'Name': form.name,
      'Email': form.email,
      'Phone / WhatsApp': form.phone,
      'Preferred Contact Method': form.contactMethod || 'Not specified',
      'Pick Up Location': form.pickupLocation || 'Not specified',
      'Drop Off Location': form.dropoffLocation || 'Not specified',
      'Number of Adults': adultDisplay,
      'Number of Children (Age)': childDisplay,
      'Number of Infants': infantDisplay,
      'Special Notes': form.specialNotes || 'None',
      ...pricingPayload,
    } : {
      package: packageData.title,
      packageId: packageData.id,
      'Name': form.name,
      'Email': form.email,
      'WhatsApp Number': form.whatsapp,
      'Vehicle Type': form.vehicle || 'Not specified',
      'Arrival Date': form.arrival,
      'Departure Date': form.departure || 'Not specified',
      'Number of Adults (13+)': adultDisplay,
      'Number of Children (6 to 12)': childDisplay,
      'Number of Infants (0 to 5)': infantDisplay,
      'Special Requirements': form.requirements,
      ...pricingPayload,
    };

    try {
      const res = await fetch('/api/send-form-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setForm({
          name: '',
          email: '',
          whatsapp: '',
          vehicle: '',
          arrival: '',
          departure: '',
          adults: '',
          children: '',
          infants: '',
          requirements: '',
          phone: '',
          contactMethod: '',
          pickupLocation: '',
          dropoffLocation: '',
          specialNotes: ''
        });
      } else {
        setError(result.error || 'Failed to send.');
      }
    } catch (err) {
      setError('Failed to send.');
    }
    setSending(false);
  };

  useEffect(() => {
    async function fetchData() {
      const pkg = await fetchPackage(params.id);
      setPackageData(pkg);
      if (pkg?.category) {
        setCategory(pkg.category);
      } else if (pkg?.categoryId) {
        const res = await fetch(`/api/category/${pkg.categoryId}`);
        if (res.ok) {
          const cat = await res.json();
          setCategory(cat);
        } else {
          setCategory(null);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                  <Skeleton className="h-7 w-48 mb-2" />
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                    <Skeleton className="h-20 rounded-xl" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
                  <Skeleton className="h-7 w-56" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/6" />
                </div>
              </div>

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
  if (!packageData || packageData.error) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[460px] lg:h-[520px]">
          <Image
            src={optimizeImage(packageData.image, 1600)}
            alt={packageData.title}
            fill
            className="object-cover"
            priority
          />
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.12),transparent_55%)]" />
          {/* Content */}
          <div className="absolute inset-0 flex items-end pb-12 lg:items-center lg:pb-0">
            <div className="container mx-auto px-4 lg:px-24">
              <Reveal>
                <div className="max-w-4xl text-white">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <Link href="/packages" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/10 transition-colors">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Link>
                    {/* <Badge className="bg-emerald-600/90 backdrop-blur-sm px-3 py-1 rounded-full shadow shadow-emerald-900/30">{category?.name}</Badge> */}
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                    {packageData.title}
                  </h1>
                  <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                    {packageData.shortDescription}
                  </p>
                  <div className="hidden lg:grid grid-cols-5 gap-6 max-w-5xl">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                      <Clock className="h-6 w-6 text-secondary" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Duration</p>
                        <p className="font-semibold">{packageData.days} Days</p>
                      </div>
                    </div>
                    {packageData.price && (
                      <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                        <Star className="h-6 w-6 text-secondary fill-current" />
                        <div>
                          <p className="text-xs uppercase tracking-wide text-white/70">Price</p>
                          <p className="font-semibold">{packageData.price}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                      <Users className="h-6 w-6 text-secondary" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Group Size</p>
                        <p className="font-semibold">Any</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                      <Star className="h-6 w-6 text-yellow-400 fill-current" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Rating</p>
                        <p className="font-semibold">5</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                      {/* Badge removed */}
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Category</p>
                        <p className="font-semibold whitespace-nowrap">{category?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        {/* Floating stats bar (mobile) */}
        <div className="lg:hidden -mt-10 relative z-10 px-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">{packageData.days} Days</span>
            </div>
            {packageData.price && (
              <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
                <Star className="h-5 w-5 text-secondary fill-current" />
                <span className="text-sm font-medium">{packageData.price}</span>
              </div>
            )}
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Users className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">Any</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3 col-span-2">
              <span className="text-xs font-semibold tracking-wide bg-secondary/10 text-secondary px-2 py-1 rounded">{category?.name?.split(' ')[0]}</span>
              <span className="text-sm font-medium">Category: {category?.name}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>


      {/* Content Section */}
      <section className="py-20 relative overflow-hidden" id="overview">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Package Description */}
              <Reveal>
                <Card className="group border-gray-200/70 shadow-sm hover:shadow-xl transition-shadow rounded-2xl overflow-hidden">
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl">Package Details</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-gray max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: packageData.detailedDescription }} />
                  </CardContent>
                </Card>
              </Reveal>

              {category && (
                <Reveal className="delay-100" >
                  <Card id="info" className="group border-gray-200/70 shadow-sm hover:shadow-xl transition-shadow rounded-2xl">
                    <CardHeader className="pb-2">
                      <CardTitle>Important Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-gray-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: category.defaultText }}
                      />
                    </CardContent>
                  </Card>
                </Reveal>
              )}
            </div>

            <div className="lg:col-span-1">
              <Reveal className="lg:sticky lg:top-8">
                <Card id="inquiry" className="shadow-md hover:shadow-xl transition-shadow border-gray-200/70 rounded-2xl backdrop-blur-sm bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle>Book Your Private Driver & Tour Guide</CardTitle>
                    <p className="text-sm text-gray-600">Fields marked with an * are required</p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      {packageData?.categoryId === "68babf3c85d85b76f41bcfe6" ? (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input id="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input id="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone / WhatsApp *</Label>
                            <Input id="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="+94 76 553 3874" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                            <Select value={form.contactMethod} onValueChange={v => handleSelect('contactMethod', v)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                <SelectItem value="phone">Phone Call</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="pickupLocation">Pick Up Location</Label>
                            <Input id="pickupLocation" value={form.pickupLocation} onChange={handleChange} placeholder="Starting point (e.g., hotel name)" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dropoffLocation">Drop Off Location</Label>
                            <Input id="dropoffLocation" value={form.dropoffLocation} onChange={handleChange} placeholder="Ending point (e.g., hotel name)" />
                          </div>
                          {isHoneymoon ? (
                            <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1">
                              <div className="flex items-center gap-2 text-rose-900 font-semibold text-sm">
                                <span className="text-base">💍</span>
                                <span>Exclusively for 2 Adults (Couple)</span>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="adults">Number of Adults</Label>
                                <Input id="adults" type="number" min="0" value={form.adults} onChange={handleChange} placeholder="0" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="children">Number of Children (Age)</Label>
                                <Input id="children" type="text" value={form.children} onChange={handleChange} placeholder="e.g. 2 (5, 8 yrs)" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="infants">Number of Infants</Label>
                                <Input id="infants" type="number" min="0" value={form.infants} onChange={handleChange} placeholder="0" />
                              </div>
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="specialNotes">Special Notes</Label>
                            <Textarea
                              id="specialNotes"
                              value={form.specialNotes}
                              onChange={handleChange}
                              placeholder="Any special requests or instructions..."
                              rows={4}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input id="name" required value={form.name} onChange={handleChange} placeholder="Your full name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input id="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp Number</Label>
                            <Input id="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+94 76 553 3874" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="vehicle">Vehicle Type</Label>
                            <Select value={form.vehicle} onValueChange={v => handleSelect('vehicle', v)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mini-car">Mini Car & Driver</SelectItem>
                                <SelectItem value="sedan-car">Sedan Car & Driver</SelectItem>
                                <SelectItem value="luxury-car">Luxury Car & Driver</SelectItem>
                                <SelectItem value="suv">SUV & Driver</SelectItem>
                                <SelectItem value="van">Van & Driver</SelectItem>
                                <SelectItem value="luxury-van">Luxury Van & Driver</SelectItem>
                                <SelectItem value="mini-coach">Mini Coach & Driver</SelectItem>
                                <SelectItem value="luxury-coach">Luxury Coach & Driver</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="arrival">Arrival Date *</Label>
                            <Input id="arrival" type="date" required value={form.arrival} onChange={handleChange} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="departure">Departure Date</Label>
                            <Input id="departure" type="date" value={form.departure} onChange={handleChange} />
                          </div>
                          {isHoneymoon ? (
                            <div className="p-3.5 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1">
                              <div className="flex items-center gap-2 text-rose-900 font-semibold text-sm">
                                <span>Exclusively for 2 Adults (Couple)</span>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="adults">Number of Adults (13+)</Label>
                                <Input id="adults" type="number" min="0" value={form.adults} onChange={handleChange} placeholder="0" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="children">Number of Children (6 to 12)</Label>
                                <Input id="children" type="number" min="0" value={form.children} onChange={handleChange} placeholder="0" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="infants">Number of Infants (0 to 5)</Label>
                                <Input id="infants" type="number" min="0" value={form.infants} onChange={handleChange} placeholder="0" />
                              </div>
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor="requirements">
                              Describe your planned route, places you wish to visit, interests, or any special requirements... *
                            </Label>
                            <Textarea
                              id="requirements"
                              required
                              value={form.requirements}
                              onChange={handleChange}
                              placeholder="Please describe your travel plans, interests, and any special requirements..."
                              rows={4}
                            />
                          </div>
                        </>
                      )}
                      {/* Live Calculated Price Breakdown */}
                      {estimatedPricing.hasPricing && (
                        <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 text-center space-y-1">
                          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                            {isHoneymoon ? "Estimated Price per Couple (2 Adults)" : "Estimated Package Price"}
                          </span>
                          <div className="text-3xl font-extrabold text-emerald-700">
                            ${estimatedPricing.grandTotal} USD
                          </div>
                          {isHoneymoon ? (
                            <div className="text-xs text-emerald-700 pt-1">
                              <span className="bg-white px-2.5 py-0.5 rounded border border-emerald-200">
                                Couple Package Rate (2 Adults)
                              </span>
                            </div>
                          ) : (
                            <div className="text-xs text-emerald-700 pt-1 flex flex-wrap items-center justify-center gap-2">
                              {estimatedPricing.adultTotal > 0 && (
                                <span className="bg-white px-2 py-0.5 rounded border border-emerald-200">
                                  {form.adults} {Number(form.adults) === 1 ? 'Adult' : 'Adults'}: ${estimatedPricing.adultTotal}
                                </span>
                              )}
                              {estimatedPricing.kidTotal > 0 && (
                                <span className="bg-white px-2 py-0.5 rounded border border-emerald-200">
                                  {form.children} {Number(form.children) === 1 ? 'Child' : 'Children'}: ${estimatedPricing.kidTotal}
                                </span>
                              )}
                              {estimatedPricing.infantTotal > 0 && (
                                <span className="bg-white px-2 py-0.5 rounded border border-emerald-200">
                                  {form.infants} {Number(form.infants) === 1 ? 'Infant' : 'Infants'}: ${estimatedPricing.infantTotal}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <Button className="w-full bg-secondary hover:bg-secondary/80" size="lg" type="submit" disabled={sending}>{sending ? "Sending..." : "Send Inquiry"}</Button>
                      {success && <p className="text-center text-green-600 mt-3">Booking request sent successfully!</p>}
                      {error && <p className="text-center text-red-600 mt-3">{error}</p>}
                      <div className="text-center text-sm text-gray-600">
                        <p>Questions? Call us at</p>
                        <p className="font-medium text-secondary">+94 76 553 3874</p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
