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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section (copied from package[id], static image) */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[460px] lg:h-[520px]">
          <Image
            src={category?.image || "/placeholder.svg"}
            alt={category?.name || "Category"}
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
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                    {loading ? "Loading..." : category?.name}
                  </h1>
                  <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
                    {category?.description}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Packages Grid */}
      <section className="py-20 relative bg-gradient-to-br from-gray-50 via-white to-slate-100 overflow-hidden">
        <div className="absolute -top-24 -right-10 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-4 lg:px-24">
          {loading ? (
            <Reveal className="text-center py-16">Loading packages...</Reveal>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map((pkg: any, idx: number) => (
                <Reveal key={pkg.id} className={idx % 2 === 0 ? 'delay-75' : ''}>
                  <Card className="pt-0 group overflow-hidden h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image src={pkg.image || "/placeholder.svg"} alt={pkg.title} width={600} height={400} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Badge className="absolute top-4 left-4 bg-secondary">{category?.name}</Badge>
                    </div>
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">{pkg.title}</CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">{pkg.shortDescription}</CardDescription>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{pkg.days} Days</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <span className="text-lg font-bold text-secondary">Contact for Pricing</span>
                        </div>
                        <Link href={`/packages/${pkg.id}`}>
                          <Button className="bg-secondary hover:bg-secondary/80">
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
    </div>
  )
}
