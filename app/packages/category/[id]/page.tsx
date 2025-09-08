"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, Check, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { useEffect, useState, useRef } from "react"

// Local Reveal animation (non-intrusive; preserves text content)
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

interface PageProps {
  params: { id: string }
}

export default function CategoryPage({ params }: PageProps) {
  const categoryId = params.id
  const [category, setCategory] = useState<any>(null)
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const catRes = await fetch(`/api/category`)
      const categories = await catRes.json()
      const found = categories.find((cat: any) => cat.id === categoryId)
      setCategory(found)
      const pkgRes = await fetch(`/api/package`)
      const allPackages = await pkgRes.json()
      const filtered = allPackages.filter((pkg: any) => pkg.categoryId === categoryId)
      setPackages(filtered)
      setLoading(false)
    }
    fetchData()
  }, [categoryId])

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!category && !loading) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-6">
          <Reveal className="max-w-4xl mx-auto">
            <Link href="/packages" className="inline-flex items-center text-yellow-300 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Categories
            </Link>
            {loading ? (
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">Loading...</h1>
            ) : (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">{category?.name}</h1>
                <p className="text-xl text-blue-100 mb-8 text-pretty">{category?.description}</p>
              </>
            )}
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-b from-transparent via-white/10 to-white/20" />
      </section>

      {/* Packages Grid */}
      <section className="py-20 relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
        <div className="absolute -top-24 -right-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-6">
          {loading ? (
            <Reveal className="text-center py-16">Loading packages...</Reveal>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map((pkg: any, idx: number) => (
                <Reveal key={pkg.id} className={idx % 2 === 0 ? 'delay-75' : ''}>
                  <Card className="group overflow-hidden h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} width={600} height={400} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge className="absolute top-4 left-4 bg-emerald-600">{category?.name}</Badge>
                    </div>
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{pkg.title}</CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">{pkg.shortDescription}</CardDescription>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{pkg.days} Days</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Package Highlights:</h4>
                        <ul className="space-y-1">
                          {pkg.highlights?.slice(0, 3).map((highlight: any, index: number) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                          {pkg.highlights?.length > 3 && (
                            <li className="text-sm text-emerald-600 font-medium">+{pkg.highlights.length - 3} more highlights</li>
                          )}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-lg font-bold text-emerald-600">Contact for Pricing</span>
                        </div>
                        <Link href={`/packages/${pkg.id}`}>
                          <Button className="bg-emerald-600 hover:bg-emerald-700">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages available</h3>
              <p className="text-gray-600">Packages for this category are coming soon!</p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Category Info */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        <div className="container mx-auto px-6">
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
            <div className="text-gray-600 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: category?.defaultText || "" }} />
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
