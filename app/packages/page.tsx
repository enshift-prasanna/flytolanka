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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">Sri Lanka Travel Packages</h1>
            <p className="text-xl text-blue-100 mb-8 text-pretty">Discover the wonders of Sri Lanka with our carefully crafted travel packages. From cultural heritage to pristine beaches, wildlife adventures to wellness retreats - we have the perfect journey for you.</p>
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full px-10 shadow-lg hover:shadow-2xl transition">
              <Phone className="mr-2 h-5 w-5" />
              Plan My Trip
            </Button>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent via-white/10 to-white/20" />
      </section>

      {/* Package Categories */}
      <section className="py-20 relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="absolute -top-24 -right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-6">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Adventure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Select from our specialized tour categories designed to match your interests and travel style</p>
          </Reveal>
          {loading ? (
            <Reveal className="text-center py-16">Loading categories...</Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {categories.map((category: any, idx) => (
                <Reveal key={category.id} className={idx % 2 === 0 ? 'delay-75' : ''}>
                  <Link href={`/packages/category/${category.id}`}>
                    <Card className="group overflow-hidden cursor-pointer h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image src={category.image || "/placeholder.svg"} alt={category.name} width={400} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{category.name}</CardTitle>
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

      {/* Filter Section */}
      <section className="py-8 bg-white/70 backdrop-blur-sm border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center" />
        </div>
      </section>

      {/* Why Choose Our Packages */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="container mx-auto px-6">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Travel Packages?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We create unforgettable experiences with attention to every detail</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <Reveal className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Local Guides</h3>
              <p className="text-gray-600 text-sm">Knowledgeable guides who bring Sri Lanka's history and culture to life</p>
            </Reveal>
            <Reveal className="text-center group delay-75">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Small Group Sizes</h3>
              <p className="text-gray-600 text-sm">Intimate group experiences for personalized attention and flexibility</p>
            </Reveal>
            <Reveal className="text-center group delay-100">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Carefully selected accommodations and experiences for maximum comfort</p>
            </Reveal>
            <Reveal className="text-center group delay-150">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance throughout your entire journey</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Sri Lankan Adventure?</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">Contact us to customize any package according to your preferences or create a completely personalized itinerary.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full shadow-md hover:shadow-lg transition">
                <Phone className="mr-2 h-5 w-5" />
                Call +94 77 123 4567
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-emerald-700 bg-transparent rounded-full backdrop-blur-sm">
                Request Custom Package
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
      {showScrollTop && (
        <button aria-label="Scroll to top" onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
          <span className="block group-hover:scale-110 transition-transform">↑</span>
        </button>
      )}
    </div>
  );
}
