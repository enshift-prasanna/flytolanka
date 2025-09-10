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



const features = [
  {
    category: "🛋️ Comfort & Convenience",
    items: [
      "Fully air-conditioned interiors",
      "Comfortable reclining seats",
      "Adjustable headrests and armrests",
      "Spacious luggage storage capacity",
      "Curtains or tinted windows for privacy and sun protection",
    ],
  },
  {
    category: "🎶 Entertainment & Connectivity",
    items: [
      "High-quality sound system / FM radio (on request in selected vehicles)",
      "USB charging ports for mobile devices",
      "Wi-Fi (on request in selected vehicles)",
      "Microphone and PA system (on request in selected vehicles)",
    ],
  },
  {
    category: "🛡️ Safety & Security",
    items: [
      "Comprehensive seat belts for all passengers",
      "First aid kit available onboard (on request)",
      "Professional, licensed, and experienced drivers",
    ],
  },
  {
    category: "🧼 Cleanliness & Hygiene",
    items: [
      "Daily cleaned and sanitized interiors",
      "Bottled drinking water provided",
      "Neat and well-maintained upholstery",
      "Garbage bin for passenger convenience (on request in buses & coaches)",
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
  const [vehicles, setVehicles] = useState<Array<{ id: string; title: string; image?: string }>>([])
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const res = await fetch('/api/vehicle')
        if (!res.ok) throw new Error('Failed to fetch vehicles')
        const data = await res.json()
        setVehicles(data)
      } catch (err) {
        setVehicles([])
      }
    }
    fetchVehicles()
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section - styled like package[id] */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[460px] lg:h-[520px]">
          <Image
            src="/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png"
            alt="Vehicles Hero"
            fill
            className="object-cover"
            priority
          />
          {/* Layered overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.12),transparent_55%)]" />
          {/* Centered Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-3xl w-full text-center mx-auto px-4">
              <Reveal>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-6">🚗 Premium Fleet & Professional Drivers</div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  Hire Your <span className="text-yellow-300">Private Driver & Vehicle</span> in Sri Lanka
                </h1>
                <p className="text-lg lg:text-xl text-white/90 mb-8">Comfortable, safe and flexible transport for tours, transfers & multi-day journeys across the island.</p>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Vehicle Types Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {vehicles.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-10">No vehicles found.</div>
            ) : (
              vehicles.map((vehicle, i) => (
                <Card key={vehicle.id} className="relative bg-white border border-gray-100 rounded-2xl shadow-md overflow-hidden p-0 h-64 flex">
                  {vehicle.image ? (
                    <Image src={vehicle.image} alt={vehicle.title} fill sizes="100vw" className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center text-lg font-semibold px-4 py-3">{vehicle.title}</div>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Vehicle Features */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-slate-100 relative overflow-hidden">
        <div className="absolute -top-20 -right-10 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200/20 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-4 lg:px-24">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">🚖 Vehicle Standards</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Vehicles Standard Features</h2>
            <p className="text-gray-600 max-w-4xl mx-auto">Every vehicle is prepared before each journey to ensure comfort, cleanliness and safety for you and your group.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map(f => (
              <Reveal key={f.category} className="h-full">
                  <Card className="h-full border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg lg:text-xl font-semibold text-primary flex items-start gap-2">
                        <span>{f.category}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <ul className="space-y-2 text-base lg:text-lg text-gray-700">
                        {f.items.map(it => (
                          <li key={it} className="flex items-start gap-2"><span className="text-secondary mt-0.5">✓</span><span>{it}</span></li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
  <section className="py-28 bg-secondary relative overflow-hidden">
        {/* Removed background image. Changed background to green. */}
        <div className="relative container mx-auto px-4 lg:px-24">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-5 backdrop-blur-sm border border-white/30">📅 Quick Booking Form</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Book Your Private Driver & Tour Guide</h2>
              <p className="text-white/70">Fields marked with an * are required</p>
            </Reveal>
            <Reveal className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10 shadow-xl">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name *</Label>
                    <Input id="name" required className="bg-white/80 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input id="email" type="email" required className="bg-white/80 focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-white">WhatsApp Number</Label>
                  <Input id="whatsapp" className="bg-white/80 focus-visible:ring-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="text-white">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger className="bg-white/80 focus:ring-primary">
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map(v => (
                        <SelectItem key={v.id} value={v.title}>{v.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="arrival" className="text-white">Arrival Date *</Label>
                    <Input id="arrival" type="date" required className="bg-white/80 focus-visible:ring-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure" className="text-white">Departure Date</Label>
                    <Input id="departure" type="date" className="bg-white/80 focus-visible:ring-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[['adults','Number of Adults (13+)'],['children','Number of Children (6–12)'],['infants','Number of Infants (0–5)']].map(([id,label]) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id} className="text-white">{label}</Label>
                      <Input id={id} type="number" min={0} className="bg-white/80 focus-visible:ring-primary" />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-white">Describe your planned route, interests, or any special requirements... *</Label>
                  <Textarea id="requirements" rows={6} required className="bg-white/80 focus-visible:ring-primary" />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-6 rounded-full shadow-lg hover:shadow-2xl transition">Submit Booking Request</Button>
                  <p className="text-center text-xs text-white/70 mt-3">No advance payment required • Fast response • Secure & private</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
