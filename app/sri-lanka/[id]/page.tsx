"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ArrowLeft, Share2, Heart, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFoundState(true)
          setLoading(false)
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data) setPost(data)
        setLoading(false)
      })
      .catch(() => {
        setNotFoundState(true)
        setLoading(false)
      })
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto px-4 py-24 text-center text-gray-600">Loading...</div>
  }
  if (notFoundState || !post) {
    return <div className="container mx-auto px-4 py-24 text-center text-red-500">Blog post not found.</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section - styled like package[id] */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[460px] lg:h-[520px]">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
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
              <div className="max-w-4xl text-white">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <Link href="/sri-lanka" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/10 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to Articles
                  </Link>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                  {post.title}
                </h1>
                <p className="text-xl text-white/90 mb-6 max-w-3xl">{post.excerpt}</p>
                <div className="hidden lg:grid grid-cols-3 gap-6 max-w-3xl">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <User className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70">Author</p>
                      <p className="font-semibold">Travel Writer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Calendar className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70">Published</p>
                      <p className="font-semibold">{new Date(post.publishedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Clock className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70">Read Time</p>
                      <p className="font-semibold">10 Min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Floating stats bar (mobile) */}
        <div className="lg:hidden -mt-10 relative z-10 px-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <User className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">{post.author}</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">{post.readTime}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg prose-emerald max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-6" />
              </article>

              {/* Social Sharing */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Share this article:</h3>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Author Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>About the Author</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium">{post.author}</div>
                        <div className="text-sm text-gray-600">Travel Writer</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Passionate about exploring Sri Lanka's hidden gems and sharing travel experiences with fellow
                      adventurers.
                    </p>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related Articles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-medium text-sm mb-1">Wildlife Safari Guide</h4>
                      <p className="text-xs text-gray-600">Complete guide to Sri Lanka's national parks</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-medium text-sm mb-1">Sri Lankan Cuisine</h4>
                      <p className="text-xs text-gray-600">Explore the flavors of the island</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Ancient Temples</h4>
                      <p className="text-xs text-gray-600">Journey through spiritual heritage</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
