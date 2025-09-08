'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

// Reusable reveal animation wrapper
function Reveal({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 [scrollbar-width:thin] [scrollbar-color:#3b82f6_#e0f2fe]">
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 lg:py-32 overflow-hidden">
        {/* Animated subtle beams */}
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-pulse-slow absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.12),transparent_60%)]" />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png')] bg-cover bg-center opacity-10"></div>
        {/* Smooth transition to next section */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-white/5 to-white/20 pointer-events-none"></div>
        {/* Floating mini nav */}
        <nav className="hidden md:flex gap-4 absolute top-6 right-6 z-20 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 text-sm font-medium border border-white/20 shadow-lg">
          <a href="#services" className="text-white/80 hover:text-yellow-300 transition">Services</a>
          <a href="#fleet" className="text-white/80 hover:text-yellow-300 transition">Fleet</a>
          <a href="#awards" className="text-white/80 hover:text-yellow-300 transition">Awards</a>
          <a href="#tours" className="text-white/80 hover:text-yellow-300 transition">Tours</a>
          <a href="#contact" className="text-white/80 hover:text-yellow-300 transition">Contact</a>
        </nav>
        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal className="space-y-8 text-white">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-medium backdrop-blur-sm border border-yellow-400/30 shadow-sm">
                  ⭐ #1 Rated Sri Lanka Tour Service
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-balance leading-tight">
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow">Sri Lanka Private Driver</span>
                  <br className="hidden sm:block" />
                  <span className="text-yellow-300"> Tour Guide</span>
                </h1>
              </div>

              <div className="space-y-6 text-lg leading-relaxed">
                { [
                  ['English-Speaking, Professional & Friendly Tour Guides', 'to make your journey smooth and enjoyable.'],
                  ['100% Private Tours', 'with Comfortable & Clean Vehicles for your convenience.'],
                  ['Unlimited Mileage/Kilometers', 'during your tour across Sri Lanka.'],
                  ['Same Guide & Vehicle for the entire trip', '– ensuring trust, comfort, and personal attention.'],
                  ['No Advance Payment Required', '– Pay directly when you meet us in Sri Lanka.'],
                  ['Flexible Accommodation Options', '– choose your own hotels, or let us arrange the best stays for you.'],
                  ['All Travel Expenses Covered', "(fuel, driver's food & stay, parking, highway charges, etc. included)."],
                  ['Customized Itineraries', 'tailored to your preferences – culture, nature, wildlife, beaches, or adventure.'],
                  ['24/7 Support', 'throughout your trip for a worry-free travel experience.'],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mt-1">✓</div>
                    <div className="group-hover:text-yellow-200 transition-colors">
                      <span className="font-semibold">{title}</span> {desc}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button aria-label="Book your private driver now" size="lg" className="group bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <span className="flex items-center gap-2">Book Your Driver Now <span className="transition-transform group-hover:translate-x-1">→</span></span>
                </Button>
                <Button aria-label="Get a free quote" size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold text-lg px-8 py-4 rounded-full backdrop-blur-sm">
                  Get Free Quote
                </Button>
              </div>
            </Reveal>
            <Reveal className="relative lg:mt-0 mt-12 delay-150">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 blur-xl rounded-2xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
                <Image
                  src="/person-standing-by-ocean-in-sri-lanka.png"
                  alt="Traveler enjoying breathtaking Sri Lankan coastline"
                  width={600}
                  height={400}
                  priority
                  className="rounded-xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                🌟 5 Star Rated
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="py-20 relative scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/10 to-indigo-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100/10 to-blue-100/10 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">🎯 What We Offer</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Premium Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover Sri Lanka with our comprehensive tour packages designed to create unforgettable memories</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => null) /* placeholder to keep structure below explicit */}
            <Reveal className="[grid-area:1/1] lg:[grid-area:auto]">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">🏛️</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Customizable Tour Packages</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-blue-500 mt-1">•</span><p><strong>Cultural Tours:</strong> Explore ancient temples, historic landmarks, and UNESCO World Heritage Sites.</p></div>
                  <div className="flex items-start space-x-2"><span className="text-blue-500 mt-1">•</span><p><strong>Adventure Tours:</strong> Embark on thrilling activities like hiking, rafting, and wildlife safaris.</p></div>
                  <div className="flex items-start space-x-2"><span className="text-blue-500 mt-1">•</span><p><strong>Relaxation Packages:</strong> Unwind on pristine beaches and serene hill stations.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal className="delay-75">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">🐘</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Wildlife and Nature Excursions</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-green-500 mt-1">•</span><p><strong>Wildlife Safaris:</strong> Witness majestic elephants, leopards, and exotic bird species.</p></div>
                  <div className="flex items-start space-x-2"><span className="text-green-500 mt-1">•</span><p><strong>Nature Photography Tours:</strong> Capture the breathtaking landscapes and biodiversity of Sri Lanka.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal className="delay-100">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">🏰</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">City and Heritage Tours</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-orange-500 mt-1">•</span><p>Discover vibrant cities such as Colombo, Kandy, and Galle with expert guides.</p></div>
                  <div className="flex items-start space-x-2"><span className="text-orange-500 mt-1">•</span><p>Immerse yourself in Sri Lanka's rich history, culture, and local traditions.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal className="delay-150">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">🚗</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Transportation Services</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-purple-500 mt-1">•</span><p>Comfortable and reliable airport transfers.</p></div>
                  <div className="flex items-start space-x-2"><span className="text-purple-500 mt-1">•</span><p>Private vehicles with professional drivers for your entire journey.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal>
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">🏨</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Accommodation Arrangements</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-cyan-500 mt-1">•</span><p>Handpicked hotels, resorts, and homestays to suit your budget and preferences.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal className="delay-75">
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">🌿</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Eco-Tourism and Village Tours</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-teal-500 mt-1">•</span><p>Experience sustainable tourism by visiting local communities and participating in traditional village activities.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal className="delay-100">
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">💕</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Honeymoon Packages</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-pink-500 mt-1">•</span><p>Romantic getaways with special arrangements to make your trip truly memorable.</p></div>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal className="delay-150">
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"><span className="text-2xl">📞</span></div>
                  <CardTitle className="text-blue-600 group-hover:text-blue-700 transition-colors">Travel Assistance</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3 text-gray-700">
                  <div className="flex items-start space-x-2"><span className="text-indigo-500 mt-1">•</span><p>24/7 customer support for a hassle-free travel experience.</p></div>
                  <div className="flex items-start space-x-2"><span className="text-indigo-500 mt-1">•</span><p>Visa assistance, travel insurance, and more.</p></div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Book With Us Section */}
      <section id="fleet" className="py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-emerald-600/5 to-emerald-600/20 pointer-events-none"></div>
        <div className="relative container mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-yellow-400/30">🚗 Fleet Selection</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Book Your Perfect Vehicle in Sri Lanka</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">Choose from our premium fleet of well-maintained vehicles with professional drivers</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            { [
              ['Mini Car & Driver', 'Perfect for couples or solo travelers', '/mini-car-vehicle.png'],
              ['Sedan Car & Driver', 'Comfortable for small families', '/sedan-car-vehicle.png'],
              ['Luxury Car & Driver', 'Premium comfort and style', '/luxury-car-vehicle.png'],
              ['SUV & Driver', 'Spacious and versatile', '/suv-vehicle.png', 'POPULAR'],
              ['Van & Driver', 'Perfect for group travel', '/van-vehicle.png'],
              ['Luxury Van & Driver', 'Premium group transport', '/luxury-van-vehicle.png', 'LUXURY'],
              ['Mini Coach & Driver', 'Ideal for larger groups', '/mini-coach-bus.png'],
              ['Luxury Coach & Driver', 'Ultimate group luxury', '/luxury-coach-bus.png']
            ].map(([title, subtitle, img, badge], idx) => (
              <Reveal key={title as string} className={`delay-[${idx * 40}ms]`}>
                <Card className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 shadow-lg relative">
                  {badge && (
                    <div className={`absolute -top-3 -right-3 ${badge === 'LUXURY' ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-yellow-400'} text-black px-3 py-1 rounded-full text-xs font-bold`}>{badge}</div>
                  )}
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl rounded-lg"></div>
                      <Image src={img as string} alt={title as string} width={150} height={100} className="relative mx-auto rounded-lg shadow-lg group-hover:scale-105 transition-transform" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
                    <div className="flex items-center justify-center text-yellow-500 mb-4">⭐⭐⭐⭐⭐</div>
                    {(badge === 'POPULAR' || badge === 'LUXURY') && (
                      <Button size="sm" className={`${badge === 'POPULAR' ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'} text-white font-semibold rounded-full px-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}>Book Now</Button>
                    )}
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <Button aria-label="Book your private driver now" size="lg" className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center gap-2">Book Your Driver Now <span className="group-hover:translate-x-1 transition-transform">→</span></span>
            </Button>
            <p className="text-blue-100 mt-4 text-sm">✨ No advance payment required • 24/7 support • Best rates guaranteed</p>
          </Reveal>
        </div>
      </section>

      {/* TripAdvisor Awards Section */}
      <section id="awards" className="py-20 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 to-orange-400/10"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-white/30">🏆 Award Winning Service</div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Excellent Reviews On Tripadvisor</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">Recognized for outstanding service and customer satisfaction year after year</p>
          </Reveal>
          <div className="flex flex-col lg:flex-row justify-center items-center gap-12 mb-12">
            {[2023, 2024, 2025].map((year, i) => (
              <Reveal key={year} className={`flex-1 ${i === 1 ? 'delay-100' : i === 2 ? 'delay-150' : ''}`}>
                <div className={`group ${i === 1 ? 'bg-white/15 border-white/30 p-12 hover:bg-white/25 hover:scale-110' : 'bg-white/10 border-white/20 p-10 hover:bg-white/20 hover:scale-105'} backdrop-blur-lg text-white rounded-2xl text-center border transition-all duration-300 hover:shadow-2xl relative`}>
                  {i === 1 && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold">LATEST AWARD</div>}
                  <div className={`${i === 1 ? 'text-7xl' : 'text-6xl'} mb-4 group-hover:scale-110 transition-transform`}>🏆</div>
                  <div className="font-bold text-lg mb-2">{year === 2024 ? "Tripadvisor Travellers' Choice Awards" : year === 2025 ? "Tripadvisor Travelers' Choice Awards" : "Travellers' Choice"}</div>
                  <div className={`${i === 1 ? 'text-4xl' : 'text-3xl'} font-bold text-yellow-300 mb-1`}>{year}</div>
                  <div className="mt-2 text-sm text-emerald-100">{year === 2023 ? 'Top 10% of attractions worldwide' : year === 2024 ? 'Exceptional service recognition' : 'Continued excellence'}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center">
            <Button className="bg-white text-emerald-600 hover:bg-emerald-50 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">Read Our Excellent Reviews On Tripadvisor</Button>
            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="flex text-yellow-400 text-2xl">⭐⭐⭐⭐⭐</div>
              <span className="text-white font-semibold">4.9/5 from 2,500+ reviews</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our Private Tours Section */}
      <section id="tours" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-mt-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">🗺️ Our Experience</div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Private Tours</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover the authentic beauty of Sri Lanka with our personalized travel experiences</p>
            </Reveal>
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <Reveal>
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Personalized Travel & Sightseeing in Sri Lanka</h3>
                    <p className="text-lg text-gray-700 mb-6">Our travel and tourism services are designed to give you a private, safe, and customized experience. Whether you're exploring cities, cultural sites, or nature escapes, we ensure your journey is comfortable, flexible, and memorable.</p>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                      <p className="text-gray-700 italic">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal className="delay-100">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl rounded-2xl"></div>
                    <Image src="/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png" alt="Luxury car in Sri Lanka" width={500} height={300} className="relative rounded-xl shadow-lg w-full h-auto" />
                  </div>
                </Reveal>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Reveal>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl">
                    <h4 className="text-lg font-bold text-blue-900 mb-6 flex items-center"><span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">✓</span>Premium Features</h4>
                    <ul className="space-y-3">
                      {['Fully Air-Conditioned & Comfortable Vehicles','Experienced & Licensed Drivers / Chauffeur Guides','Customized Itineraries to Suit Your Preferences','Clean & Well-Maintained Cars, Vans, and Buses','Bottled Water, Umbrellas','Child Seats & Booster Seats on Request'].map(item => (
                        <li key={item} className="flex items-start space-x-3"><span className="text-blue-500 text-lg">✦</span><span className="text-gray-700">{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal className="delay-75">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl">
                    <h4 className="text-lg font-bold text-green-900 mb-6 flex items-center"><span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mr-3">+</span>Additional Services</h4>
                    <ul className="space-y-3">
                      {['First Aid Kit & Travel Essentials Provided','Charging Facilities Available'].map(item => (
                        <li key={item} className="flex items-start space-x-3"><span className="text-green-500 text-lg">✦</span><span className="text-gray-700">{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 lg:p-12">
              <div className="space-y-8 text-gray-700">
                <Reveal>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Sri Lanka Private Driver Tour Guide With Fly To Lanka Tours– The Best Way to Explore the Island</h3>
                    <p className="text-lg leading-relaxed">Are you planning your dream holiday to Sri Lanka? One of the best ways to explore this beautiful island is by hiring a Sri Lanka private driver tour guide. With a local expert behind the wheel, you can travel stress-free, discover hidden gems, and enjoy a tailor-made experience that goes beyond standard tour packages.</p>
                  </div>
                </Reveal>
                <Reveal className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl">
                  <div>
                    <h4 className="text-2xl font-bold mb-6">Why Choose Fly To Lanka Tours?</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">Comfort and Convenience</h5>
                          <p className="text-blue-100">Traveling in Sri Lanka can be challenging if you are unfamiliar with the roads, traffic, and local transportation. A private driver ensures a comfortable journey in an air-conditioned vehicle while you sit back and relax.</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">Local Expertise</h5>
                          <p className="text-blue-100">A licensed private driver tour guide in Sri Lanka knows the culture, history, and traditions. They can recommend the best attractions, local restaurants, and authentic experiences.</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">Personalized Itinerary</h5>
                          <p className="text-blue-100">Unlike fixed group tours, a private driver tour guide in Sri Lanka allows you to create a flexible itinerary. Whether you want to explore ancient cities, wildlife safaris, or golden beaches, your journey is customized to your preferences.</p>
                        </div>
                        <div>
                          <h5 className="font-bold text-yellow-300 text-lg mb-2">Safety and Reliability</h5>
                          <p className="text-blue-100">Navigating busy roads can be stressful. A professional driver ensures safety and provides reliable service throughout your tour.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Top Places to Visit with a Private Driver in Sri Lanka</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"><span className="text-blue-600 font-bold">📍</span><div><strong className="text-blue-900">Colombo City Tour</strong> – Experience the modern capital with shopping, temples, and colonial history.</div></li>
                        <li className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg"><span className="text-green-600 font-bold">📍</span><div><strong className="text-green-900">Kandy</strong> – Home to the famous Temple of the Tooth and scenic hill country views.</div></li>
                        <li className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg"><span className="text-purple-600 font-bold">📍</span><div><strong className="text-purple-900">Nuwara Eliya</strong> – Discover tea plantations and waterfalls in the "Little England" of Sri Lanka.</div></li>
                        <li className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg"><span className="text-orange-600 font-bold">📍</span><div><strong className="text-orange-900">Sigiriya Rock Fortress</strong> – Climb the iconic Lion Rock, a UNESCO World Heritage Site.</div></li>
                      </ul>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3 p-3 bg-teal-50 rounded-lg"><span className="text-teal-600 font-bold">📍</span><div><strong className="text-teal-900">Ella</strong> – A relaxing hill town surrounded by tea fields and hiking trails.</div></li>
                        <li className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg"><span className="text-yellow-600 font-bold">📍</span><div><strong className="text-yellow-900">Yala National Park</strong> – Spot leopards, elephants, and wildlife on a safari adventure.</div></li>
                        <li className="flex items-start space-x-3 p-3 bg-cyan-50 rounded-lg"><span className="text-cyan-600 font-bold">📍</span><div><strong className="text-cyan-900">Galle Fort</strong> – Explore the Dutch colonial fort and enjoy the southern beaches.</div></li>
                      </ul>
                    </div>
                  </div>
                </Reveal>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Benefits of Hiring a Private Driver Tour Guide in Sri Lanka With Fly To Lanka Tours</h4>
                    <ul className="space-y-2">
                      {['Door-to-door transport from hotels or the airport','Insider knowledge of hidden spots tourists often miss','Hassle-free travel with no need to worry about maps or public transport','Flexibility to travel at your own pace'].map(item => (
                        <li key={item} className="flex items-start space-x-2"><span className="text-green-500">•</span><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">How to Book a Sri Lanka Private Driver Tour Guide With Fly To Lanka Tours</h4>
                    <p className="mb-4">Booking a Sri Lanka private driver tour guide is easy. Many reputable travel agencies and independent guides offer professional services. Look for:</p>
                    <ul className="space-y-2">
                      {['Licensed and experienced drivers','Comfortable vehicles (cars, vans, or minibuses)','Positive reviews from past travelers','Transparent pricing without hidden charges'].map(item => (
                        <li key={item} className="flex items-start space-x-2"><span className="text-blue-500">•</span><span>{item}</span></li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Reveal className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-xl text-center">
                  <div>
                    <h4 className="text-2xl font-bold mb-4">Final Thoughts</h4>
                    <p className="text-lg text-emerald-100">Fly To Lanka Tours is the perfect choice for travelers who want comfort, safety, and a personalized travel experience. Whether you are on a short trip or a long holiday, having a local driver guide will make your journey unforgettable.</p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden scroll-mt-24">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png')] bg-cover bg-center opacity-10"></div>
        </div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="relative container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 text-yellow-300 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-yellow-400/30">🌟 Start Your Journey Today</div>
            </Reveal>
            <Reveal className="delay-75">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">Sri Lanka Private Driver Tour Guide With <span className="text-yellow-400"> Fly To Lanka Tours</span><br /><span className="text-2xl lg:text-3xl text-blue-200 font-normal">The Best Way to Explore the Island</span></h2>
            </Reveal>
            <Reveal className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10 border border-white/20">
              <p className="text-xl lg:text-2xl mb-6 max-w-4xl mx-auto leading-relaxed text-gray-100">Are you planning your dream holiday to Sri Lanka? One of the best ways to explore this beautiful island is by hiring a <strong className="text-yellow-400">Sri Lanka private driver tour guide</strong> with Fly to Lanka Tours. You can travel across the island, discover hidden gems, and enjoy a tailor-made experience that goes beyond ordinary tourism.</p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                { [
                  ['🚗','Premium Vehicles','Comfortable & well-maintained fleet'],
                  ['👨‍💼','Expert Guides','Licensed & experienced drivers'],
                  ['⭐','5-Star Service','Award-winning customer service']
                ].map(([icon, title, desc]) => (
                  <div key={title} className="text-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">{icon}</span></div>
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-blue-200 text-sm">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold text-xl px-12 py-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">Start Planning Your Trip</Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold text-xl px-12 py-5 rounded-full backdrop-blur-sm">Contact Us Today</Button>
            </Reveal>
            <Reveal className="flex items-center justify-center mt-8 space-x-8 text-blue-200">
              <div className="flex items-center space-x-2"><span className="text-yellow-400">✓</span><span>No advance payment</span></div>
              <div className="flex items-center space-x-2"><span className="text-yellow-400">✓</span><span>24/7 support</span></div>
              <div className="flex items-center space-x-2"><span className="text-yellow-400">✓</span><span>Best price guarantee</span></div>
            </Reveal>
          </div>
        </div>
      </section>

      {showScrollTop && (
        <button
          aria-label="Scroll to top"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        >
          <span className="block group-hover:scale-110 transition-transform">↑</span>
        </button>
      )}
    </div>
  )
}
