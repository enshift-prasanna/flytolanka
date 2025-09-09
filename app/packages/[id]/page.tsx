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

// Lightweight reveal animation component (no textual content changes)
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
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
  const [packageData, setPackageData] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const pkg = await fetchPackage(params.id);
      setPackageData(pkg);
      if (pkg && pkg.categoryId) {
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
    return <div className="container mx-auto px-4 lg:px-24 py-16 text-center">Loading package details...</div>;
  }
  if (!packageData || packageData.error) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[460px] lg:h-[520px]">
          <Image
            src={packageData.image || "/placeholder.svg"}
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
                  <div className="hidden lg:grid grid-cols-4 gap-6 max-w-4xl">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                      <Clock className="h-6 w-6 text-emerald-300" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Duration</p>
                        <p className="font-semibold">{packageData.days} Days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                      <Users className="h-6 w-6 text-emerald-300" />
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/70">Group Size</p>
                        <p className="font-semibold">Max {packageData.maxPeople}</p>
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
                        <p className="font-semibold">{category?.name}</p>
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
              <Clock className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">{packageData.days} Days</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Users className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">Max {packageData.maxPeople}</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">5</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <span className="text-xs font-semibold tracking-wide bg-emerald-100 text-emerald-700 px-2 py-1 rounded">{category?.name?.split(' ')[0]}</span>
              <span className="text-sm font-medium">Category</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>


      {/* Content Section */}
      <section className="py-20 relative overflow-hidden" id="overview">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
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
                  <CardContent className="prose prose-emerald max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: packageData.detailedDescription }} className="space-y-4" />
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
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" placeholder="Your full name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input id="whatsapp" placeholder="+94 77 123 4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Vehicle Type</Label>
                      <Select>
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
                      <Input id="arrival" type="date" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="departure">Departure Date</Label>
                      <Input id="departure" type="date" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adults">Number of Adults (13+)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Adults" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="children">Number of Children (6 to 12)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Children" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="infants">Number of Infants (0 to 5)</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Infants" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="requirements">
                        Describe your planned route, places you wish to visit, interests, or any special requirements... *
                      </Label>
                      <Textarea
                        id="requirements"
                        placeholder="Please describe your travel plans, interests, and any special requirements..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">Send Inquiry</Button>

                    <div className="text-center text-sm text-gray-600">
                      <p>Questions? Call us at</p>
                      <p className="font-medium text-emerald-600">+94 77 123 4567</p>
                    </div>
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
