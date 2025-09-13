"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

// Simple Reveal animation (same logic as vehicles/home pages)
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
  return <div ref={ref} className={`transition-all duration-700 ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}>{children}</div>
}

const serviceHighlights = [
  "Private Chauffeur Service",
  "Comfortable & Well-Maintained Vehicles",
  "No Compulsory Shopping Stops",
  "Unlimited Kilometers Per Day",
  "Customer Satisfaction Guaranteed",
  "Experienced Local Guides",
  "Your Safety is Our Top Concern",
]

export default function DriversPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  // Form state
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
    requirements: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // Handle select change
  const handleSelect = (value: string) => {
    setForm({ ...form, vehicle: value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/send-form-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setForm({
          name: '', email: '', whatsapp: '', vehicle: '', arrival: '', departure: '', adults: '', children: '', infants: '', requirements: ''
        });
      } else {
        setError(result.error || 'Failed to send.');
      }
    } catch (err) {
      setError('Failed to send.');
    }
    setLoading(false);
  };
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section - Styled like package[id] with static image and centered content */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[420px] lg:h-[500px]">
          <Image
            src="/professional-sri-lankan-driver-with-luxury-vehicle.png"
            alt="Professional Chauffeur Guide"
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
            <div className="container mx-auto px-4 lg:px-24 flex flex-col items-center">
              <Reveal>
                <div className="max-w-3xl text-center text-white mx-auto">
                  <div className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/10 transition-colors mb-5">
                    👨‍✈️ Professional Chauffeur Guides
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                    Our Trusted <span className="text-yellow-300">Driver Guides</span>
                  </h1>
                  <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Travel with friendly, English-speaking professionals who know Sri Lanka's roads, culture and hidden gems—ensuring your trip is safe, flexible and unforgettable.
                  </p>
                  {/* Buttons removed as requested */}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Booking Form Section - emerald color moved to form card */}
      <section className="py-16 relative overflow-hidden">
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal className="bg-secondary bg-opacity-95 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10 shadow-xl">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name *</Label>
                    <Input id="name" type="text" required className="bg-white/80 focus-visible:ring-primary" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input id="email" type="email" required className="bg-white/80 focus-visible:ring-primary" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-white">WhatsApp Number</Label>
                  <Input id="whatsapp" type="tel" className="bg-white/80 focus-visible:ring-primary" value={form.whatsapp} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle" className="text-white">Vehicle Type</Label>
                  <Select value={form.vehicle} onValueChange={handleSelect}>
                    <SelectTrigger className="bg-white/80 focus:ring-primary">
                      <SelectValue placeholder="Select Vehicle Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Mini Car & Driver','Sedan Car & Driver','Luxury Car & Driver','SUV & Driver','Van & Driver','Luxury Van & Driver','Mini Coach & Driver','Luxury Coach & Driver'].map(v => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="arrival" className="text-white">Arrival Date *</Label>
                    <Input id="arrival" type="date" required className="bg-white/80 focus-visible:ring-primary" value={form.arrival} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure" className="text-white">Departure Date</Label>
                    <Input id="departure" type="date" className="bg-white/80 focus-visible:ring-primary" value={form.departure} onChange={handleChange} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[['adults','Adults (13+)'],['children','Children (6–12)'],['infants','Infants (0–5)']].map(([id,label]) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id} className="text-white">{label}</Label>
                      <Input id={id} type="number" min={0} className="bg-white/80 focus-visible:ring-primary" value={form[id as keyof typeof form]} onChange={handleChange} />
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="text-white">Describe your planned route, interests, or any special requirements... *</Label>
                  <Textarea id="requirements" rows={6} required className="bg-white/80 focus-visible:ring-primary" value={form.requirements} onChange={handleChange} />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-6 rounded-full shadow-lg hover:shadow-2xl transition" disabled={loading}>{loading ? 'Sending...' : 'Submit Booking Request'}</Button>
                  {success && <p className="text-center text-green-300 mt-3">Booking request sent successfully!</p>}
                  {error && <p className="text-center text-red-300 mt-3">{error}</p>}
                  <p className="text-center text-xs text-white/70 mt-3">No advance payment • Fast response • Secure & private</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
