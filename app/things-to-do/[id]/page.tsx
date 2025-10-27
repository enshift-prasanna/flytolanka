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

  // Inquiry form state
  const [form, setForm] = useState({
    name: "",
    country: "",
    email: "",
    phone: "",
    contactMethod: "",
    arrival: "",
    departure: "",
    days: "",
    adults: "",
    children: "",
    start: "",
    end: "",
    accommodation: [] as string[],
    transport: [] as string[],
    interests: [] as string[],
    meal: [] as string[],
    budget: [] as string[],
    specialInterest: "",
    specialRequests: "",
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleCheckbox = (
    group: keyof typeof form,
    value: string,
    checked: boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [group]: checked
        ? [...(prev[group] as string[]), value]
        : (prev[group] as string[]).filter((v) => v !== value),
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/send-form-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess(true);
        setForm({
          name: "",
          country: "",
          email: "",
          phone: "",
          contactMethod: "",
          arrival: "",
          departure: "",
          days: "",
          adults: "",
          children: "",
          start: "",
          end: "",
          accommodation: [],
          transport: [],
          interests: [],
          meal: [],
          budget: [],
          specialInterest: "",
          specialRequests: "",
        });
      } else {
        setError(result.error || "Failed to send.");
      }
    } catch (err) {
      setError("Failed to send.");
    }
    setSending(false);
  };

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
              <article
                className="prose prose-lg prose-emerald max-w-none"
                id="post-content"
              >
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>
              <style jsx global>{`
                /* Ensure images are full-width on small screens but smaller on desktop */
                #post-content img {
                  max-width: 100%;
                  height: auto;
                }
                @media (min-width: 1024px) {
                  #post-content img {
                    /* adjust this percentage to your desired desktop size */
                    max-width: 60% !important;
                    height: auto !important;
                    display: block;
                  }
                }
              `}</style>
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
              {/* Recent Things to Do Section */}
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
              {/* Inquiry Form Section */}
              <div>
                <Card className="shadow-md hover:shadow-xl transition-shadow border-gray-200/70 rounded-2xl backdrop-blur-sm bg-white/90">
                  <CardHeader className="pb-2">
                    <CardTitle>Planning Your Sri Lanka Trip?</CardTitle>
                    <p className="text-sm text-gray-600">
                      Let us help you design your perfect journey. Fields marked
                      with an * are required.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Personal Details */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={form.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          type="text"
                          placeholder="Your country"
                          value={form.country}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone / WhatsApp *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+94 76 553 3874"
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-method">
                          Preferred Contact Method
                        </Label>
                        <select
                          id="contactMethod"
                          className="bg-white/80 w-full rounded border-gray-300 p-2"
                          value={form.contactMethod}
                          onChange={handleChange}
                        >
                          <option value="">Select Method</option>
                          <option value="email">Email</option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="phone">Phone</option>
                        </select>
                      </div>

                      {/* Travel Information */}
                      <div className="space-y-2">
                        <Label htmlFor="arrival">Arrival Date *</Label>
                        <Input
                          id="arrival"
                          type="date"
                          required
                          value={form.arrival}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="departure">Departure Date</Label>
                        <Input
                          id="departure"
                          type="date"
                          value={form.departure}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="days">
                          Number of Days in Sri Lanka
                        </Label>
                        <Input
                          id="days"
                          type="number"
                          min="1"
                          placeholder="e.g. 7"
                          value={form.days}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="adults">Number of Adults</Label>
                        <Input
                          id="adults"
                          type="number"
                          min="0"
                          placeholder="e.g. 2"
                          value={form.adults}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="children">
                          Number of Children (Age)
                        </Label>
                        <Input
                          id="children"
                          type="text"
                          placeholder="e.g. 2 (5, 8 yrs)"
                          value={form.children}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="start">Starting Point</Label>
                        <select
                          id="start"
                          className="bg-white/80 w-full rounded border-gray-300 p-2"
                          value={form.start}
                          onChange={handleChange}
                        >
                          <option value="">Select Starting Point</option>
                          <option value="colombo">Colombo</option>
                          <option value="negombo">Negombo</option>
                          <option value="airport">Airport</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="end">Ending Point</Label>
                        <select
                          id="end"
                          className="bg-white/80 w-full rounded border-gray-300 p-2"
                          value={form.end}
                          onChange={handleChange}
                        >
                          <option value="">Select Ending Point</option>
                          <option value="colombo">Colombo</option>
                          <option value="negombo">Negombo</option>
                          <option value="airport">Airport</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Accommodation Preference */}
                      <div className="space-y-2">
                        <Label>Accommodation Preference</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Budget (Guesthouse / 2★)",
                            "Standard (3★ / Boutique)",
                            "Comfort (4★)",
                            "Luxury (5★ / Resorts / Villas)",
                          ].map((v, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                name="accommodation"
                                value={v}
                                className="accent-primary"
                                checked={form.accommodation.includes(v)}
                                onChange={(e) =>
                                  handleCheckbox(
                                    "accommodation",
                                    v,
                                    e.target.checked
                                  )
                                }
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Transportation */}
                      <div className="space-y-2">
                        <Label>Transportation</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            "Mini Car",
                            "Sedan Car",
                            "Luxury Car",
                            "SUV",
                            "Van",
                            "Luxury Van",
                            "Mini Coach",
                            "Luxury Coach",
                          ].map((v, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                name="transport"
                                value={v}
                                className="accent-primary"
                                checked={form.transport.includes(v)}
                                onChange={(e) =>
                                  handleCheckbox(
                                    "transport",
                                    v,
                                    e.target.checked
                                  )
                                }
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Interests & Experiences */}
                      <div className="space-y-2">
                        <Label>Interests & Experiences</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "Cultural Heritage",
                            "Nature & Wildlife",
                            "Beaches",
                            "Hill Country",
                            "Adventure",
                            "Spiritual / Pilgrimage",
                            "Ayurveda & Wellness",
                            "Photography & Birdwatching Tours",
                            "Food & Culinary Experiences",
                            "Festivals & Local Events",
                          ].map((v, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                name="interests"
                                value={v}
                                className="accent-primary"
                                checked={form.interests.includes(v)}
                                onChange={(e) =>
                                  handleCheckbox(
                                    "interests",
                                    v,
                                    e.target.checked
                                  )
                                }
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="special-interest">
                            Other Special Interest
                          </Label>
                          <Textarea
                            id="specialInterest"
                            rows={3}
                            className="bg-white/80 min-h-[60px]"
                            value={form.specialInterest}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* Meal Plan */}
                      <div className="space-y-2">
                        <Label>Meal Plan</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "Bed & Breakfast",
                            "Half Board (Breakfast + Dinner)",
                            "Full Board (Breakfast, Lunch & Dinner)",
                          ].map((v, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                name="meal"
                                value={v}
                                className="accent-primary"
                                checked={form.meal.includes(v)}
                                onChange={(e) =>
                                  handleCheckbox("meal", v, e.target.checked)
                                }
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Budget Range */}
                      <div className="space-y-2">
                        <Label>Estimated Budget Range (per person)</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {[
                            "USD 50–100 per day",
                            "USD 100–200 per day",
                            "USD 200–400 per day",
                            "USD 400+ per day",
                          ].map((v, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <input
                                type="checkbox"
                                name="budget"
                                value={v}
                                className="accent-primary"
                                checked={form.budget.includes(v)}
                                onChange={(e) =>
                                  handleCheckbox("budget", v, e.target.checked)
                                }
                              />
                              {v}
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Special Requests */}
                      <div className="space-y-2">
                        <Label htmlFor="special-requests">
                          Special Requests
                        </Label>
                        <Textarea
                          id="specialRequests"
                          rows={4}
                          className="bg-white/80 min-h-[80px]"
                          placeholder="Let us know any special requests, needs, or details..."
                          value={form.specialRequests}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold py-4 rounded-full shadow-lg hover:shadow-2xl transition"
                        disabled={sending}
                      >
                        {sending
                          ? "Sending..."
                          : "Submit Your Tailor-Made Request"}
                      </Button>
                      {success && (
                        <p className="text-center text-green-600 mt-3">
                          Request sent successfully!
                        </p>
                      )}
                      {error && (
                        <p className="text-center text-red-600 mt-3">{error}</p>
                      )}
                      <p className="text-center text-xs text-gray-500 mt-3">
                        No advance payment • Fast response • Secure & private
                      </p>
                    </form>
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
