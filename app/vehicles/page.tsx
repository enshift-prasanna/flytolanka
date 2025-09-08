"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

// Local Reveal animation (mirrors homepage style)
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`transition-all duration-700 ease-out will-change-transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}>{children}</div>
}

const vehicleTypes = [
  {
    name: "Mini Car & Driver",
    image: "/mini-car-vehicle.png",
  },
  {
    name: "Sedan Car & Driver",
    image: "/sedan-car-vehicle.png",
  },
  {
    name: "Luxury Car & Driver",
    image: "/luxury-car-vehicle.png",
  },
  {
    name: "SUV & Driver",
    image: "/suv-vehicle.png",
  },
  {
    name: "Van & Driver",
    image: "/van-vehicle.png",
  },
  {
    name: "Luxury Van & Driver",
    image: "/luxury-van-vehicle.png",
  },
  {
    name: "Mini Coach & Driver",
    image: "/mini-coach-bus.png",
  },
  {
    name: "Luxury Coach & Driver",
    image: "/luxury-coach-bus.png",
  },
]

const features = [
  {
    category: "🛋️ Comfort & Convenience",
    items: [
      "Fully air-conditioned interiors",
      "Comfortable reclining seats with ample legroom",
      "Adjustable headrests and armrests",
      "Spacious luggage storage capacity",
      "Curtains or tinted windows for privacy and sun protection",
    ],
  },
  {
    category: "🎶 Entertainment & Connectivity",
    items: [
      "High-quality sound system / FM radio",
      "USB charging ports for mobile devices",
      "Wi-Fi (on request in selected vehicles)",
      "Microphone and PA system (for group tours, coaches & vans)",
    ],
  },
  {
    category: "🛡️ Safety & Security",
    items: [
      "Comprehensive seat belts for all passengers",
      "First aid kit available onboard",
      "Fire extinguisher and emergency exit facilities",
      "GPS tracking for route safety",
      "Professional, licensed, and experienced drivers",
    ],
  },
  {
    category: "🧼 Cleanliness & Hygiene",
    items: [
      "Daily cleaned and sanitized interiors",
      "Bottled drinking water provided",
      "Neat and well-maintained upholstery",
      "Garbage bin for passenger convenience",
    ],
  },
  {
    category: "🚍 Vehicle Options",
    items: [
      "Cars (for private tours & transfers)",
      "Vans & Mini Coaches (ideal for families & small groups)",
      "Luxury Coaches & Buses (for large group tours)",
    ],
  },
]

export default function VehiclesPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[url('/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-6">🚗 Premium Fleet & Professional Drivers</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Hire Your <span className="text-yellow-300">Private Driver & Vehicle</span> in Sri Lanka
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 mb-8">Comfortable, safe and flexible transport for tours, transfers & multi-day journeys across the island.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 rounded-full shadow-lg hover:shadow-2xl transition">Get a Free Quote</Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-10 rounded-full backdrop-blur-sm">View Tour Packages</Button>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/10 to-white/20"></div>
      </section>

      {/* Vehicle Types Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose the Perfect Vehicle</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">All vehicles are well-maintained, insured and driven by professional English-speaking chauffeurs.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {vehicleTypes.map((vehicle, i) => (
              <Reveal key={vehicle.name} className={i % 2 === 0 ? "delay-75" : ""}>
                <Card className="group relative bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1">
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <CardHeader className="pb-0 px-0">
                    <div className="relative mx-6 mt-4 mb-6 h-40 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 overflow-hidden">
                      <Image src={vehicle.image} alt={vehicle.name} width={180} height={120} className="object-contain drop-shadow" />
                      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_60%)]" />
                    </div>
                    <CardTitle className="text-center text-lg font-semibold text-gray-900 px-6 leading-snug group-hover:text-blue-600 transition-colors min-h-[3rem] flex items-center justify-center">
                      {vehicle.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 mt-4">
                    <div className="flex items-center justify-center gap-1 text-yellow-500 text-sm mb-4" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, s) => <span key={s}>★</span>)}
                    </div>
                    {(i === 3 || i === 7) ? (
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-full font-medium shadow-sm hover:shadow-md transition">Book Now</Button>
                    ) : (
                      <Button variant="outline" className="w-full rounded-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition">Get Quote</Button>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">🚖 Vehicle Standards</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Vehicles Standard Features</h2>
            <p className="text-gray-600 max-w-4xl mx-auto">Every vehicle is prepared before each journey to ensure comfort, cleanliness and safety for you and your group.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map(f => (
              <Reveal key={f.category} className="h-full">
                <Card className="h-full border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-blue-700 flex items-start gap-2">
                      <span>{f.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6">
                    <ul className="space-y-2 text-sm text-gray-600">
                      {f.items.map(it => (
                        <li key={it} className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">✓</span><span>{it}</span></li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Options */}

      {/* Trusted Drivers */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="container mx-auto px-6 text-center relative">
          <Reveal>
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-600 rounded-full text-sm font-medium mb-6">👨‍✈️ Expert Chauffeur Guides</div>
          </Reveal>
          <Reveal className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">Our Trusted Driver Guides</h2>
            <p className="text-gray-600 text-lg">Friendly, English-speaking professionals who know Sri Lanka's roads, culture, history and hidden gems – ensuring your journey is safe, insightful and enjoyable.</p>
          </Reveal>
          <Reveal className="mt-10 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {["Licensed & Insured","5★ Rated Service","Flexible & Reliable"].map(b => (
              <div key={b} className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl px-6 py-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-3 text-lg font-semibold">✓</div>
                <p className="font-medium text-gray-800">{b}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-28 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png')] bg-cover bg-center" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-5 backdrop-blur-sm border border-white/30">📅 Quick Booking Form</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Book Your Private Driver & Tour Guide</h2>
              <p className="text-blue-100">Fields marked with an * are required</p>
            </Reveal>
            <Reveal className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10 shadow-xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name *</Label>
                    <Input id="name" required className="bg-white/80 focus-visible:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input id="email" type="email" required className="bg-white/80 focus-visible:ring-blue-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-white">WhatsApp Number</Label>
                  <Input id="whatsapp" className="bg-white/80 focus-visible:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="text-white">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger className="bg-white/80 focus:ring-blue-500">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map(v => (
                        <SelectItem key={v.name} value={v.name}>{v.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="arrival" className="text-white">Arrival Date *</Label>
                    <Input id="arrival" type="date" required className="bg-white/80 focus-visible:ring-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure" className="text-white">Departure Date</Label>
                    <Input id="departure" type="date" className="bg-white/80 focus-visible:ring-blue-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[['adults','Number of Adults (13+)'],['children','Number of Children (6–12)'],['infants','Number of Infants (0–5)']].map(([id,label]) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id} className="text-white">{label}</Label>
                      <Input id={id} type="number" min={0} className="bg-white/80 focus-visible:ring-blue-500" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-white">Describe your planned route, interests, or any special requirements... *</Label>
                  <Textarea id="requirements" rows={6} required className="bg-white/80 focus-visible:ring-blue-500" />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-6 rounded-full shadow-lg hover:shadow-2xl transition">Submit Booking Request</Button>
                  <p className="text-center text-xs text-blue-100 mt-3">No advance payment required • Fast response • Secure & private</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      {showScrollTop && (
        <button aria-label="Scroll to top" onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
          <span className="block group-hover:scale-110 transition-transform">↑</span>
        </button>
      )}
    </div>
  )
}
