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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section - Styled like drivers page with provided image */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[420px] lg:h-[500px]">
          <Image
            src="https://media.cntravellerme.com/photos/67d18d96d34064451a14d52e/16:9/w_1280,c_limit/SRI%20LANKA%202025%20GettyImages-1643739335.jpg"
            alt="Discover Sri Lanka"
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
                    🌴 Explore Sri Lanka
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                    Discover the Pearl of the Indian Ocean
                  </h1>
                  <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Explore Sri Lanka's vibrant culture, stunning landscapes, and hidden gems with our expert guides and travel tips.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
        </div>
      </section>

      {/* Combined Articles Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-72 h-72 bg-slate-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-200/30 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto lg:px-24 px-4">
          {loading ? (
            <Reveal className="text-center py-20 text-gray-600">Loading articles...</Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post: any, idx) => (
                <Reveal key={post.id} className={idx % 2 === 0 ? "delay-75" : ""}>
                  <Link href={`/sri-lanka/${post.id}`} className="block h-full">
                    <Card className="pt-0 group overflow-hidden h-full bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-secondary transition-colors">
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
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
