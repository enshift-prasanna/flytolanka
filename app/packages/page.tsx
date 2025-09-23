"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Star, Phone } from "lucide-react";

// Local Reveal animation (keeps existing content, only adds motion)
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

export default function PackagesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Form state
  const [form, setForm] = useState({
    name: '',
    country: '',
    email: '',
    phone: '',
    arrival: '',
    departure: '',
    days: '',
    adults: '',
    children: '',
    specialInterest: '',
    specialRequests: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch("/api/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
        console.log(data);
      })
      .catch(() => setLoading(false));
  }, []);
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
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
          name: '', country: '', email: '', phone: '', arrival: '', departure: '', 
          days: '', adults: '', children: '', specialInterest: '', specialRequests: ''
        });
      } else {
        setError(result.error || 'Failed to send.');
      }
    } catch (err) {
      setError('Failed to send.');
    }
    setFormLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section - matches [id] style, static image, centered content */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[420px] lg:h-[500px]">
          <Image
            src="/modern-luxury-car-in-sri-lanka-with-palm-trees-and.png"
            alt="Sri Lanka Travel Packages"
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
            <div className="container mx-auto px-4 lg:px-24">
                <Reveal>
                  <div className="max-w-3xl mx-auto text-center text-white pt-8 lg:pt-12">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                      Sri Lanka Travel Packages
                    </h1>
                    <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                      Discover the wonders of Sri Lanka with our carefully crafted travel packages. From cultural heritage to pristine beaches, wildlife adventures to wellness retreats - we have the perfect journey for you.
                    </p>
                  </div>
                </Reveal>
            </div>
          </div>
          {/* White bottom-to-top gradient overlay, matching [id] hero */}
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent" />
        </div>
  </section>
  {/* Dividing fader below hero section */}
  <div className="absolute inset-x-0 top-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" style={{ position: 'relative', zIndex: 1 }} />

      {/* Package Categories - removed blue part between hero and next section */}
      <section className="py-20 relative bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
        <div className="absolute -top-24 -right-10 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl" />
        <div className="relative container mx-auto lg:px-24 px-4">
          {/* ...removed 'Choose Your Adventure' heading and description... */}
          {loading ? (
            <Reveal className="text-center py-16">Loading categories...</Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {categories.map((category: any, idx) => (
                <Reveal key={category.id} className={idx % 2 === 0 ? 'delay-75' : ''}>
                  <Link href={`/packages/category/${category.id}`}>
                    <Card className="pt-0 group overflow-hidden cursor-pointer h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image src={category.image || "/placeholder.svg"} alt={category.name} width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          {/* Removed colored line on hover */}
                      </div>
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">{category.name}</CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">{category.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tailor-Made Tour Request Form */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary">
        <div className="absolute -top-24 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4 lg:px-24">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Plan Your Custom Sri Lanka Tour</h2>
            <p className="text-white/90 max-w-2xl mx-auto">Can't find the perfect package? Let us create a personalized itinerary just for you. Tell us your preferences and we'll craft your dream Sri Lankan adventure.</p>
          </Reveal>
          <div className="max-w-3xl mx-auto">
            <Reveal className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 lg:p-10 shadow-xl">
              <form className="space-y-8" onSubmit={handleSubmit}>
                {/* Personal Details */}
                <h3 className="text-xl font-semibold text-white mb-2">🧑‍🤝‍🧑 Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-white">Name *</label>
                    <input 
                      id="name" 
                      type="text" 
                      required 
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-white">Country</label>
                    <input 
                      id="country" 
                      type="text" 
                      value={form.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-white">Email *</label>
                    <input 
                      id="email" 
                      type="email" 
                      required 
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-white">Phone / WhatsApp *</label>
                    <input 
                      id="phone" 
                      type="tel" 
                      required 
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                </div>

                {/* Travel Information */}
                <h3 className="text-xl font-semibold text-white mb-2">📅 Travel Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="arrival" className="text-white">Arrival Date *</label>
                    <input 
                      id="arrival" 
                      type="date" 
                      required 
                      value={form.arrival}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="departure" className="text-white">Departure Date</label>
                    <input 
                      id="departure" 
                      type="date" 
                      value={form.departure}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="days" className="text-white">Number of Days</label>
                    <input 
                      id="days" 
                      type="number" 
                      min="1" 
                      value={form.days}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="adults" className="text-white">Number of Adults</label>
                    <input 
                      id="adults" 
                      type="number" 
                      min="0" 
                      value={form.adults}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="children" className="text-white">Number of Children (Age)</label>
                    <input 
                      id="children" 
                      type="text" 
                      value={form.children}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      placeholder="e.g. 2 (5, 8 yrs)" 
                    />
                  </div>
                </div>

                {/* Interests & Experiences */}
                <h3 className="text-xl font-semibold text-white mb-2">🌍 Interests & Experiences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Cultural Heritage',
                    'Nature & Wildlife',
                    'Beaches',
                    'Hill Country',
                    'Adventure',
                    'Spiritual / Pilgrimage',
                    'Ayurveda & Wellness',
                    'Photography Tours',
                    'Food & Culinary',
                    'Festivals & Events'
                  ].map((interest, i) => (
                    <label key={i} className="flex items-center gap-2 text-white">
                      <input 
                        type="checkbox" 
                        name="interests" 
                        value={interest} 
                        onChange={(e) => {
                          const interests = form.specialInterest ? form.specialInterest.split(', ') : [];
                          if (e.target.checked) {
                            interests.push(interest);
                          } else {
                            const index = interests.indexOf(interest);
                            if (index > -1) interests.splice(index, 1);
                          }
                          setForm({ ...form, specialInterest: interests.join(', ') });
                        }}
                        checked={form.specialInterest.includes(interest)}
                        className="accent-primary" 
                      />
                      {interest}
                    </label>
                  ))}
                </div>

                {/* Special Requests */}
                <div className="space-y-2">
                  <label htmlFor="specialRequests" className="text-white">Special Requests</label>
                  <textarea
                    id="specialRequests"
                    rows={4}
                    value={form.specialRequests}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/80 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Tell us about your preferences, special needs, or any specific requests..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={formLoading}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
                  >
                    {formLoading ? 'Sending...' : 'Get Your Custom Itinerary'}
                  </button>
                  {success && <p className="text-center text-green-300 mt-3">Request sent successfully!</p>}
                  {error && <p className="text-center text-red-300 mt-3">{error}</p>}
                  <p className="text-center text-xs text-white/70 mt-3">Free consultation • No obligation • Quick response</p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Our Packages */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="container mx-auto px-4 lg:px-24">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Travel Packages?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We create unforgettable experiences with attention to every detail</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <Reveal className="text-center group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Local Guides</h3>
              <p className="text-gray-600 text-sm">Knowledgeable guides who bring Sri Lanka's history and culture to life</p>
            </Reveal>
            <Reveal className="text-center group delay-75">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Small Group Sizes</h3>
              <p className="text-gray-600 text-sm">Intimate group experiences for personalized attention and flexibility</p>
            </Reveal>
            <Reveal className="text-center group delay-100">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Carefully selected accommodations and experiences for maximum comfort</p>
            </Reveal>
            <Reveal className="text-center group delay-150">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance throughout your entire journey</p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
