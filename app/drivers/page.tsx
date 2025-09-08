"use client"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

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
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.15),transparent_60%)]"></div>
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white mb-6">👨‍✈️ Professional Chauffeur Guides</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight text-balance">
              Our Trusted <span className="text-yellow-300">Driver Guides</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 text-pretty">Travel with friendly, English-speaking professionals who know Sri Lanka's roads, culture and hidden gems—ensuring your trip is safe, flexible and unforgettable.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-10 rounded-full shadow-lg hover:shadow-2xl transition">Book a Driver</Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold px-10 rounded-full backdrop-blur-sm">View Vehicles</Button>
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent via-white/10 to-white/20" />
      </section>

      {/* Booking Form Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute -top-24 -right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-5">📅 Quick Booking Form</div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Book Your Private Driver & Tour Guide</h2>
              <p className="text-gray-600">Fields marked with an * are required</p>
            </Reveal>
            <Reveal className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" type="text" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input id="whatsapp" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle Type</Label>
                  <Select>
                    <SelectTrigger>
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
                    <Label htmlFor="arrival">Arrival Date *</Label>
                    <Input id="arrival" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departure">Departure Date</Label>
                    <Input id="departure" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[['adults','Adults (13+)'],['children','Children (6–12)'],['infants','Infants (0–5)']].map(([id,label]) => (
                    <div key={id} className="space-y-2">
                      <Label htmlFor={id}>{label}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="0" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                            <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Describe your planned route, interests, or any special requirements... *</Label>
                  <Textarea id="requirements" rows={6} required />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-5 rounded-full shadow-lg hover:shadow-2xl transition">Submit Booking Request</Button>
                  <p className="text-center text-xs text-gray-500 mt-3">No advance payment • Fast response • Secure & private</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-700 rounded-full text-sm font-medium mb-5">💠 Why Travel With Us</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Fly To Lanka Tours</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">100% trusted travel service with professional tour guides & private drivers for round trips across Sri Lanka.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceHighlights.map(h => (
              <Reveal key={h} className="group">
                <div className="h-full bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold flex-shrink-0 group-hover:scale-110 transition">✓</div>
                  <p className="font-medium text-gray-800 leading-snug">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="relative container mx-auto px-6 text-center">
          <Reveal className="mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium mb-6">📞 Get In Touch</div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">We're here to help plan your perfect Sri Lankan journey. Reach out anytime for quick assistance.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {[['Call Or WhatsApp','+94765533874'],['Mail Us','info@flytolanka.com'],['Meet Us','Ihala Karagahamuna, Kadawata']].map(([title,value]) => (
              <Reveal key={title} className="group">
                <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/10 transition shadow-sm hover:shadow-md">
                  <h3 className="font-semibold text-white mb-2 text-lg">{title}</h3>
                  <p className="text-yellow-300 font-medium break-words">{value}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-12 py-5 rounded-full shadow-xl hover:shadow-2xl transition">Start Planning Now</Button>
            <p className="text-blue-200 mt-4 text-sm">No advance payment • 24/7 support • Best price guarantee</p>
          </Reveal>
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
