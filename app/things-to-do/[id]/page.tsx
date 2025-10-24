"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ThingsToDoPostPage({
  params,
}: {
  params: { id: string };
}) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundState, setNotFoundState] = useState(false);
  const [recentThings, setRecentThings] = useState<any[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/things-to-do/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFoundState(true);
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setNotFoundState(true);
        setLoading(false);
      });
  }, [params.id]);

  useEffect(() => {
    fetch("/api/things-to-do?includeContent=false")
      .then((res) => res.json())
      .then((data) => {
        const filtered = Array.isArray(data)
          ? data.filter((b: any) => b.id !== params.id)
          : [];
        setRecentThings(filtered.slice(0, 4));
        setRecentLoading(false);
      })
      .catch(() => setRecentLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-gray-600">
        Loading...
      </div>
    );
  }
  if (notFoundState || !post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center text-red-500">
        Things to do post not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden" id="top">
        <div className="relative h-[460px] lg:h-[520px]">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(255,255,255,0.12),transparent_55%)]" />
          <div className="absolute inset-0 flex items-end pb-12 lg:items-center lg:pb-0">
            <div className="container mx-auto px-4 lg:px-24">
              <div className="max-w-4xl text-white">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <Link
                    href="/things-to-do"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/10 transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Things to Do
                  </Link>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
                  {post.title}
                </h1>
                <p className="text-xl text-white/90 mb-6 max-w-3xl">
                  {post.excerpt}
                </p>
                <div className="hidden lg:grid grid-cols-3 gap-6 max-w-3xl">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <User className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Author
                      </p>
                      <p className="font-semibold">FlyToLanka Team</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Calendar className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Published
                      </p>
                      <p className="font-semibold">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                    <Clock className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs uppercase tracking-wide text-white/70">
                        Read Time
                      </p>
                      <p className="font-semibold">10 Min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="prose prose-lg prose-emerald max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="space-y-6"
                />
              </article>
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Share this activity:</h3>
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
            {/* Sidebar - Recent Things to Do */}
            <div className="lg:col-span-1">
              <div className="mb-8">
                <Card className="shadow-md border-gray-200/70 rounded-2xl backdrop-blur-sm bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle>Recent Things to Do</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentLoading ? (
                      <div className="text-center text-gray-400">
                        Loading...
                      </div>
                    ) : recentThings.length === 0 ? (
                      <div className="text-center text-gray-400">
                        No recent activities found.
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {recentThings.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={`/things-to-do/${item.id}`}
                              className="flex gap-3 items-center group"
                            >
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                                  {item.title}
                                </h4>
                                <span className="text-xs text-gray-400">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
