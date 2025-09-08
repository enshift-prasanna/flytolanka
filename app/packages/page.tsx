"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Star, Phone } from "lucide-react";

export default function PackagesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
              Sri Lanka Travel Packages
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty">
              Discover the wonders of Sri Lanka with our carefully crafted travel packages. From cultural heritage to
              pristine beaches, wildlife adventures to wellness retreats - we have the perfect journey for you.
            </p>
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Phone className="mr-2 h-5 w-5" />
              Plan My Trip
            </Button>
          </div>
        </div>
      </section>

      {/* Package Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Adventure</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our specialized tour categories designed to match your interests and travel style
            </p>
          </div>

          {loading ? (
            <div className="text-center py-16">Loading categories...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category: any) => (
                <Link key={category.id} href={`/packages/category/${category.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                    <div className="relative">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">{/* Removed categories array and filter buttons */}</div>
        </div>
      </section>

      {/* Why Choose Our Packages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Travel Packages?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We create unforgettable experiences with attention to every detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Local Guides</h3>
              <p className="text-gray-600 text-sm">
                Knowledgeable guides who bring Sri Lanka's history and culture to life
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Small Group Sizes</h3>
              <p className="text-gray-600 text-sm">
                Intimate group experiences for personalized attention and flexibility
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Carefully selected accommodations and experiences for maximum comfort
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance throughout your entire journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Sri Lankan Adventure?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Contact us to customize any package according to your preferences or create a completely personalized
            itinerary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call +94 77 123 4567
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700 bg-transparent">
              Request Custom Package
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
