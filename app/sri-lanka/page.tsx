"use client";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

// Local lightweight reveal animation (no textual content changes)
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
    >
      {children}
    </div>
  );
}

// ...existing code...

// Removed categories

export default function SriLankaPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_65%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="relative container mx-auto px-5">
          <Reveal className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">Discover Sri Lanka</h1>
            <p className="text-xl text-emerald-100 mb-8 text-pretty">
              Explore the Pearl of the Indian Ocean through our comprehensive travel guides, cultural insights, and
              insider tips to make your Sri Lankan adventure unforgettable.
            </p>
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-300 h-5 w-5" />
              <Input placeholder="Search articles..." className="pl-10 pr-4 py-3 text-lg bg-white/95 backdrop-blur-sm border-white/40 focus-visible:ring-emerald-500" />
            </div>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Combined Articles Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-5">
          {loading ? (
            <Reveal className="text-center py-20 text-gray-600">Loading articles...</Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post: any, idx) => (
                <Reveal key={post.id} className={idx % 2 === 0 ? "delay-75" : ""}>
                  <Card className="group overflow-hidden h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                      <div className="text-sm text-gray-500 pt-2">
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </CardHeader>
                  </Card>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative container mx-auto px-5 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest travel tips, destination guides, and exclusive offers for Sri
              Lanka.
            </p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <Input placeholder="Enter your email" className="bg-white/95 backdrop-blur-sm" />
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 whitespace-nowrap rounded-full px-8 shadow-md hover:shadow-lg transition">
                Subscribe
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
      {showScrollTop && (
        <button
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 group bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white rounded-full p-4 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <span className="block group-hover:scale-110 transition-transform">↑</span>
        </button>
      )}
    </div>
  )
}
