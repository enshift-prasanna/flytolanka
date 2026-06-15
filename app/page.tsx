"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

// Reusable reveal animation wrapper
function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [vehicles, setVehicles] = useState<any[]>([]);

  // Booking Form State
  const [form, setForm] = useState({
    name: "",
    country: "",
    email: "",
    phone: "",
    contactMethod: "",
    arrival: "",
    departure: "",
    adults: "",
    children: "",
    infants: "",
    specialNotes: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSelect = (id: string, value: string) => {
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const payload = {
        "Name": form.name,
        "Email": form.email,
        "Phone / WhatsApp": form.phone,
        "Country": form.country || "N/A",
        "Preferred Contact Method": form.contactMethod || "N/A",
        "Arrival Date": form.arrival,
        "Departure Date": form.departure || "N/A",
        "Number of Adults": form.adults || "0",
        "Number of Children (Age)": form.children || "0",
        "Number of Infants": form.infants || "0",
        "Special Notes": form.specialNotes || "None",
      };
      const res = await fetch("/api/send-form-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setForm({
          name: "",
          country: "",
          email: "",
          phone: "",
          contactMethod: "",
          arrival: "",
          departure: "",
          adults: "",
          children: "",
          infants: "",
          specialNotes: "",
        });
      } else {
        setError(result.error || "Failed to send.");
      }
    } catch (err) {
      setError("Failed to send.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  useEffect(() => {
    fetch("/api/vehicle")
      .then((res) => res.json())
      .then((data) => setVehicles(Array.isArray(data) ? data : []))
      .catch(() => setVehicles([]));
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 [scrollbar-width:thin] [scrollbar-color:hsl(var(--primary))_#e0f2fe]">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-4 lg:py-12 overflow-hidden"
      >
        {/* Animated subtle beams */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png')] bg-cover bg-center opacity-10"></div>
        {/* Smooth transition to next section */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/5 to-white/20 pointer-events-none"></div>
        {/* Floating mini nav
        <nav className="hidden md:flex gap-4 absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 text-sm font-medium border border-white/20 shadow-lg">
          <a href="#services" className="text-white/80 hover:text-yellow-300 transition">Services</a>
          <a href="#fleet" className="text-white/80 hover:text-yellow-300 transition">Fleet</a>
          <a href="#awards" className="text-white/80 hover:text-yellow-300 transition">Awards</a>
          <a href="#tours" className="text-white/80 hover:text-yellow-300 transition">Tours</a>
          <a href="#contact" className="text-white/80 hover:text-yellow-300 transition">Contact</a>
        </nav> */}
        <div className="relative container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <Reveal className="relative delay-150 lg:col-span-5">
              <div className="bg-secondary bg-opacity-95 border border-white/20 rounded-2xl p-6 lg:p-8 shadow-xl text-white">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-xl font-bold text-yellow-300 text-center tracking-tight">
                    Book your Sri Lanka Tour
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="name" className="text-white text-xs font-semibold">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="bg-white/95 text-black placeholder:text-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="country" className="text-white text-xs font-semibold">Country</Label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Your country"
                        className="bg-white/95 text-black placeholder:text-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-white text-xs font-semibold">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="Your email address"
                        className="bg-white/95 text-black placeholder:text-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-white text-xs font-semibold">Phone / WhatsApp *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="Phone or WhatsApp number"
                        className="bg-white/95 text-black placeholder:text-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="contactMethod" className="text-white text-xs font-semibold">Preferred Contact Method</Label>
                    <Select value={form.contactMethod} onValueChange={(value) => handleSelect('contactMethod', value)}>
                      <SelectTrigger className="bg-white/95 text-black border-0 focus:ring-2 focus:ring-yellow-400 h-9 text-sm">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="arrival" className="text-white text-xs font-semibold">Arrival Date *</Label>
                      <Input
                        id="arrival"
                        type="date"
                        required
                        className="bg-white/95 text-black border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.arrival}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="departure" className="text-white text-xs font-semibold">Departure Date</Label>
                      <Input
                        id="departure"
                        type="date"
                        className="bg-white/95 text-black border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.departure}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="adults" className="text-white text-[10px] sm:text-xs font-semibold block truncate">Adults</Label>
                      <Input
                        id="adults"
                        type="number"
                        min="1"
                        placeholder="1"
                        className="bg-white/95 text-black border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.adults}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="children" className="text-white text-[10px] sm:text-xs font-semibold block truncate">Children (Age)</Label>
                      <Input
                        id="children"
                        type="text"
                        placeholder="e.g. 5, 8"
                        className="bg-white/95 text-black placeholder:text-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.children}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="infants" className="text-white text-[10px] sm:text-xs font-semibold block truncate">Infants</Label>
                      <Input
                        id="infants"
                        type="number"
                        min="0"
                        className="bg-white/95 text-black border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 h-9 text-sm"
                        value={form.infants}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="specialNotes" className="text-white text-xs font-semibold">Special Notes</Label>
                    <Textarea
                      id="specialNotes"
                      rows={2}
                      placeholder="Any specific requests or requirements..."
                      className="bg-white/95 text-black placeholder:text-gray-400 border-0 focus-visible:ring-2 focus-visible:ring-yellow-400 min-h-[60px] text-sm py-1.5"
                      value={form.specialNotes}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-5 rounded-full shadow-lg hover:shadow-2xl transition duration-300"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Book your Sri Lanka Tour'}
                    </Button>
                    {success && <p className="text-center text-green-300 mt-2 text-sm">Request sent successfully!</p>}
                    {error && <p className="text-center text-red-300 mt-2 text-sm">{error}</p>}
                  </div>
                </form>
              </div>
            </Reveal>
            <Reveal className="space-y-8 text-white lg:col-span-7 mt-12 lg:mt-0">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-medium backdrop-blur-sm border border-yellow-400/30 shadow-sm">
                  ⭐ #1 Rated Sri Lanka Tour Service
                </div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-yellow-200 mb-2">
                  Sri Lanka Tour Packages
                  <br />| Sri Lanka Holidays
                </h1>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow">
                    Sri Lanka Private Driver
                  </span>
                  <br className="hidden sm:block" />
                  <span className="text-yellow-300"> - Tour Guide</span>
                </h1>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                {[
                  [
                    "English-Speaking, Professional & Friendly Tour Guides",
                    "to make your journey smooth and enjoyable.",
                  ],
                  [
                    "100% Private Tours",
                    "with Comfortable & Clean Vehicles for your convenience.",
                  ],
                  [
                    "Unlimited Mileage/Kilometers",
                    "during your tour across Sri Lanka.",
                  ],
                  [
                    "Same Guide & Vehicle for the entire trip",
                    "– ensuring trust, comfort, and personal attention.",
                  ],
                  [
                    "No Advance Payment Required",
                    "– Pay directly when you meet us in Sri Lanka.",
                  ],
                  [
                    "Flexible Accommodation Options",
                    "– choose your own hotels, or let us arrange the best stays for you.",
                  ],
                  [
                    "All Travel Expenses Covered",
                    "(fuel, driver's food & stay, parking, highway charges, etc. included).",
                  ],
                  [
                    "Customized Itineraries",
                    "tailored to your preferences – culture, nature, wildlife, beaches, or adventure.",
                  ],
                  [
                    "24/7 Support",
                    "throughout your trip for a worry-free travel experience.",
                  ],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mt-1">
                      ✓
                    </div>
                    <div className="group-hover:text-yellow-200 transition-colors">
                      <span className="font-semibold">{title}</span> {desc}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  aria-label="Book your private driver now"
                  size="lg"
                  className="group bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => (window.location.href = "/drivers")}
                >
                  <span className="flex items-center gap-2">
                    Book Your Driver Now{" "}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 relative scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-white to-slate-100/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-slate-100/10 to-slate-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-slate-100/10 to-slate-200/10 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-4 lg:px-24">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              🎯 What We Offer
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover Sri Lanka with our comprehensive tour packages designed
              to create unforgettable memories
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Reveal className="h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">🏛️</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    Customizable Tour Packages
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Cultural Tours:
                        </strong>{" "}
                        Ancient temples & UNESCO sites
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Adventure Tours:
                        </strong>{" "}
                        Hiking, rafting & wildlife safaris
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">Relaxation:</strong>{" "}
                        Pristine beaches & hill stations
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="delay-75 h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">🐘</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-secondary group-hover:text-secondary/80 transition-colors leading-tight">
                    Wildlife & Nature
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Wildlife Safaris:
                        </strong>{" "}
                        Elephants, leopards & exotic birds
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Photography Tours:
                        </strong>{" "}
                        Capture stunning landscapes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="delay-100 h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">🏰</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    City & Heritage Tours
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">City Tours:</strong>{" "}
                        Colombo, Kandy & Galle with expert guides
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">Heritage:</strong>{" "}
                        Rich history, culture & traditions
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="delay-150 h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">🚗</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    Transportation Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Airport Transfers:
                        </strong>{" "}
                        Comfortable & reliable service
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Private Vehicles:
                        </strong>{" "}
                        Professional drivers for your journey
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">🏨</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    Accommodation
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Hotels & Resorts:
                        </strong>{" "}
                        Handpicked for your budget
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">Homestays:</strong>{" "}
                        Authentic local experiences
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="delay-75 h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">🌿</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-secondary group-hover:text-secondary/80 transition-colors leading-tight">
                    Eco-Tourism & Village Tours
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Sustainable Tourism:
                        </strong>{" "}
                        Visit local communities
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Village Activities:
                        </strong>{" "}
                        Traditional cultural experiences
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="delay-100 h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">💕</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    Honeymoon Packages
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Romantic Getaways:
                        </strong>{" "}
                        Special arrangements for couples
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-pink-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Memorable Trips:
                        </strong>{" "}
                        Create lasting memories together
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal className="delay-150 h-full">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white h-full flex flex-col">
                <CardHeader className="text-center pb-4 flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-xl text-white">📞</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-primary group-hover:text-primary/80 transition-colors leading-tight">
                    Travel Assistance
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between text-sm text-gray-600">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">24/7 Support:</strong>{" "}
                        Hassle-free travel experience
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 mt-1"></span>
                      <p className="text-sm">
                        <strong className="text-gray-800">
                          Visa & Insurance:
                        </strong>{" "}
                        Complete travel assistance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Book With Us Section */}
      <section id="fleet" className="py-20 bg-white relative scroll-mt-24">
        <div className="relative container mx-auto px-4 lg:px-24">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4 border border-yellow-200">
              🚗 Fleet Selection
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Book Your Perfect Vehicle in Sri Lanka
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Choose from our premium fleet of well-maintained vehicles with
              professional drivers
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {vehicles.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">
                No vehicles available at the moment.
              </div>
            ) : (
              vehicles.map((vehicle, i) => (
                <Reveal key={vehicle.id || i}>
                  <Card className="relative bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden p-0 h-64 flex">
                    {vehicle.image ? (
                      <Image
                        src={vehicle.image}
                        alt={vehicle.title || "Vehicle"}
                        fill
                        sizes="100vw"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center text-lg font-semibold px-4 py-3">
                      {vehicle.title || vehicle.name}
                    </div>
                  </Card>
                </Reveal>
              ))
            )}
          </div>
          <Reveal className="text-center">
            <Button
              aria-label="View other vehicles"
              size="lg"
              className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => (window.location.href = "/vehicles")}
            >
              <span className="flex items-center gap-2">
                View Other Vehicles{" "}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
            </Button>
            <p className="text-black mt-4 text-sm">
              ✨ No advance payment required • 24/7 support • Best rates
              guaranteed
            </p>
          </Reveal>
        </div>
      </section>

      {/* TripAdvisor Awards Section */}
      <section
        id="awards"
        className="py-20 bg-gradient-to-r from-secondary via-primary/90 to-secondary relative overflow-hidden scroll-mt-24"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 to-orange-400/10"></div>
          <div className="absolute top-10 left-4 w-40 h-40 bg-white/5 rounded-full blur-2xl sm:top-20 sm:left-20 sm:w-64 sm:h-64 sm:blur-3xl"></div>
          <div className="absolute bottom-10 right-4 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl sm:bottom-20 sm:right-20 sm:w-80 sm:h-80 sm:blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-2 sm:px-4 lg:px-24">
          <Reveal className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/20 text-white rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 backdrop-blur-sm border border-white/30">
              🏆 Award Winning Service
            </div>
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6"></div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Excellence Awards
            </h2>
            <p className="text-base sm:text-xl text-white/70 max-w-xl sm:max-w-2xl mx-auto">
              Award-winning service recognized year after year
            </p>
          </Reveal>
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-12 mb-8 sm:mb-12">
            {[
              {
                year: 2023,
                img: "https://res.cloudinary.com/dgyxftryr/image/upload/v1757408258/Adventure-Beach-Escape-_E2_80_93-15-Days-1_aaoekm.png",
                title: "Travellers' Choice",
                desc: "Top 10% of attractions worldwide",
              },
              {
                year: 2024,
                img: "https://res.cloudinary.com/dgyxftryr/image/upload/v1757408329/1_c3m2k6.png",
                title: "Tripadvisor Travellers' Choice Awards",
                desc: "Exceptional service recognition",
              },
              {
                year: 2025,
                img: "https://res.cloudinary.com/dgyxftryr/image/upload/v1757408352/2_eqkacz.png",
                title: "Tripadvisor Travelers' Choice Awards",
                desc: "Continued excellence",
              },
            ].map((award, i) => (
              <Reveal
                key={award.year}
                className={`w-full lg:w-1/3 ${
                  i === 1 ? "delay-100" : i === 2 ? "delay-150" : ""
                }`}
              >
                <div
                  className={`group h-full bg-white/10 border-white/20 p-5 sm:p-10 hover:bg-white/20 hover:scale-102 backdrop-blur-lg text-white rounded-2xl text-center border transition-all duration-300 hover:shadow-2xl relative`}
                >
                  {i === 2 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      LATEST AWARD
                    </div>
                  )}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <img
                      src={award.img}
                      alt={`Award ${award.year}`}
                      className="w-28 h-28 sm:w-40 sm:h-40 rounded-xl shadow-lg"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="font-bold text-base sm:text-lg mb-1 sm:mb-2">
                    {award.title}
                  </div>
                  <div className="text-xl sm:text-3xl font-bold text-yellow-300 mb-1">
                    {award.year}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-2">
                    {award.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <a
              className="bg-white rounded-lg px-4 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center"
              href="https://www.tripadvisor.com/Attraction_Review-g293962-d23803919-Reviews-Fly_To_Lanka_Tours-Colombo_Western_Province.html"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read our reviews on TripAdvisor"
            >
              <img
                src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg"
                alt="TripAdvisor Reviews"
                className="h-6 sm:h-8"
              />
            </a>
            <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex text-yellow-400 text-xl sm:text-2xl">
                ⭐⭐⭐⭐⭐
              </div>
              <span className="text-white font-semibold text-sm sm:text-base">
                5/5 from reviews
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Private Tours Section */}
      <section
        id="tours"
        className="py-20 bg-gradient-to-br from-gray-50 to-slate-100 scroll-mt-24"
      >
        <div className="container mx-auto px-4 lg:px-24">
          <div className="mx-auto">
            <Reveal className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                🗺️ Our Experience
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Private Tours
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the authentic beauty of Sri Lanka with our personalized
                travel experiences
              </p>
            </Reveal>
            <div className="bg-transparent rounded-2xl p-4 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <Reveal>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                      Personalized Travel & Sightseeing in Sri Lanka
                    </h3>
                    <p className="text-lg text-gray-700 mb-6">
                      Our travel and tourism services are designed to give you a
                      private, safe, and customized experience. Whether you're
                      exploring cities, cultural sites, or nature escapes, we
                      ensure your journey is comfortable, flexible, and
                      memorable.
                    </p>
                    <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-6 rounded-xl">
                      <p className="text-gray-700 italic">
                        "Discover Sri Lanka your way – with personalized
                        itineraries, expert guidance, and unforgettable
                        experiences tailored just for you."
                      </p>
                    </div>
                  </div>
                </Reveal>
                <Reveal className="delay-100">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl rounded-2xl"></div>
                    <Image
                      src="https://res.cloudinary.com/dgyxftryr/image/upload/v1757409607/driving-in-sri-lanka-driving-permit-information_j07etj.webp"
                      alt="Driving in Sri Lanka"
                      width={500}
                      height={180}
                      className="relative rounded-xl shadow-lg w-full h-auto"
                    />
                  </div>
                </Reveal>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Reveal>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                    <h4 className="text-lg font-bold text-primary mb-6 flex items-center">
                      <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm mr-3">
                        ✓
                      </span>
                      Premium Features
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Fully Air-Conditioned & Comfortable Vehicles",
                        "Experienced & Licensed Drivers / Chauffeur Guides",
                        "Customized Itineraries to Suit Your Preferences",
                        "Clean & Well-Maintained Cars, Vans, and Buses",
                        "Bottled Water, Umbrellas",
                        "Child Seats & Booster Seats on Request",
                      ].map((item) => (
                        <li key={item} className="flex items-start space-x-3">
                          <span className="text-primary text-lg">✦</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal className="delay-75">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                    <h4 className="text-lg font-bold text-green-900 mb-6 flex items-center">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
                        +
                      </span>
                      Additional Services
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "First Aid Kit & Travel Essentials Provided",
                        "Charging Facilities Available",
                      ].map((item) => (
                        <li key={item} className="flex items-start space-x-3">
                          <span className="text-green-500 text-lg">✦</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="bg-transparent rounded-2xl p-4 lg:p-12">
              <div className="space-y-8 text-gray-700">
                <Reveal>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Sri Lanka Private Driver Tour Guide With Fly To Lanka
                      Tours– The Best Way to Explore the Island
                    </h3>
                    <p className="text-lg leading-relaxed">
                      Are you planning your dream holiday to Sri Lanka? One of
                      the best ways to explore this beautiful island is by
                      hiring a Sri Lanka private driver tour guide. With a local
                      expert behind the wheel, you can travel stress-free,
                      discover hidden gems, and enjoy a tailor-made experience
                      that goes beyond standard tour packages.
                    </p>
                  </div>
                </Reveal>
                <Reveal className="bg-gradient-to-r from-secondary via-primary/90 to-secondary text-white p-8 rounded-xl">
                  <div>
                    <h4 className="text-2xl font-bold mb-6">
                      Why Choose Fly To Lanka Tours?
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">
                            Comfort and Convenience
                          </h5>
                          <p className="text-blue-100">
                            Traveling in Sri Lanka can be challenging if you are
                            unfamiliar with the roads, traffic, and local
                            transportation. A private driver ensures a
                            comfortable journey in an air-conditioned vehicle
                            while you sit back and relax.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">
                            Local Expertise
                          </h5>
                          <p className="text-blue-100">
                            A licensed private driver tour guide in Sri Lanka
                            knows the culture, history, and traditions. They can
                            recommend the best attractions, local restaurants,
                            and authentic experiences.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">
                            Personalized Itinerary
                          </h5>
                          <p className="text-blue-100">
                            Unlike fixed group tours, a private driver tour
                            guide in Sri Lanka allows you to create a flexible
                            itinerary. Whether you want to explore ancient
                            cities, wildlife safaris, or golden beaches, your
                            journey is customized to your preferences.
                          </p>
                        </div>
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">
                            Safety and Reliability
                          </h5>
                          <p className="text-blue-100">
                            Navigating busy roads can be stressful. A
                            professional driver ensures safety and provides
                            reliable service throughout your tour.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">
                      Top Places to Visit with a Private Driver in Sri Lanka
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                          <span className="text-blue-600 font-bold">📍</span>
                          <div>
                            <strong className="text-blue-900">
                              Colombo City Tour
                            </strong>{" "}
                            – Experience the modern capital with shopping,
                            temples, and colonial history.
                          </div>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                          <span className="text-green-600 font-bold">📍</span>
                          <div>
                            <strong className="text-green-900">Kandy</strong> –
                            Home to the famous Temple of the Tooth and scenic
                            hill country views.
                          </div>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                          <span className="text-purple-600 font-bold">📍</span>
                          <div>
                            <strong className="text-purple-900">
                              Nuwara Eliya
                            </strong>{" "}
                            – Discover tea plantations and waterfalls in the
                            "Little England" of Sri Lanka.
                          </div>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                          <span className="text-orange-600 font-bold">📍</span>
                          <div>
                            <strong className="text-orange-900">
                              Sigiriya Rock Fortress
                            </strong>{" "}
                            – Climb the iconic Lion Rock, a UNESCO World
                            Heritage Site.
                          </div>
                        </li>
                      </ul>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg">
                          <span className="text-teal-600 font-bold">📍</span>
                          <div>
                            <strong className="text-teal-900">Ella</strong> – A
                            relaxing hill town surrounded by tea fields and
                            hiking trails.
                          </div>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                          <span className="text-yellow-600 font-bold">📍</span>
                          <div>
                            <strong className="text-yellow-900">
                              Yala National Park
                            </strong>{" "}
                            – Spot leopards, elephants, and wildlife on a safari
                            adventure.
                          </div>
                        </li>
                        <li className="flex items-start space-x-3 p-3 bg-cyan-50 rounded-lg">
                          <span className="text-cyan-600 font-bold">📍</span>
                          <div>
                            <strong className="text-cyan-900">
                              Galle Fort
                            </strong>{" "}
                            – Explore the Dutch colonial fort and enjoy the
                            southern beaches.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      Benefits of Hiring a Private Driver Tour Guide in Sri
                      Lanka With Fly To Lanka Tours
                    </h4>
                    <ul className="space-y-2">
                      {[
                        "Door-to-door transport from hotels or the airport",
                        "Insider knowledge of hidden spots tourists often miss",
                        "Hassle-free travel with no need to worry about maps or public transport",
                        "Flexibility to travel at your own pace",
                      ].map((item) => (
                        <li key={item} className="flex items-start space-x-2">
                          <span className="text-green-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      How to Book a Sri Lanka Private Driver Tour Guide With Fly
                      To Lanka Tours
                    </h4>
                    <p className="mb-4">
                      Booking a Sri Lanka private driver tour guide is easy.
                      Many reputable travel agencies and independent guides
                      offer professional services. Look for:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Licensed and experienced drivers",
                        "Comfortable vehicles (cars, vans, or minibuses)",
                        "Positive reviews from past travelers",
                        "Transparent pricing without hidden charges",
                      ].map((item) => (
                        <li key={item} className="flex items-start space-x-2">
                          <span className="text-blue-500">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Reveal className="bg-gradient-to-r from-secondary via-primary/90 to-secondary text-white p-8 rounded-xl text-center">
                  <div>
                    <h4 className="text-2xl text-yellow-300 font-bold mb-4">
                      Final Thoughts
                    </h4>
                    <p className="text-lg text-emerald-100">
                      Fly To Lanka Tours is the perfect choice for travelers who
                      want comfort, safety, and a personalized travel
                      experience. Whether you are on a short trip or a long
                      holiday, having a local driver guide will make your
                      journey unforgettable.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
