"use client";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

// ...existing code...

// Removed categories

export default function SriLankaPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">Discover Sri Lanka</h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty">
              Explore the Pearl of the Indian Ocean through our comprehensive travel guides, cultural insights, and
              insider tips to make your Sri Lankan adventure unforgettable.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input placeholder="Search articles..." className="pl-10 pr-4 py-3 text-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Combined Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">Loading articles...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    <div className="text-sm text-gray-600 pt-2">
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers for Sri
            Lanka.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input placeholder="Enter your email" className="bg-white" />
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 whitespace-nowrap">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
