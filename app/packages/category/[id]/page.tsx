"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, Check, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { useEffect, useState } from "react"

interface PageProps {
  params: { id: string }
}

export default function CategoryPage({ params }: PageProps) {
  const categoryId = params.id;
  const [category, setCategory] = useState<any>(null);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Fetch category details
      const catRes = await fetch(`/api/category`);
      const categories = await catRes.json();
      const found = categories.find((cat: any) => cat.id === categoryId);
      setCategory(found);

      // Fetch packages for this category
      const pkgRes = await fetch(`/api/package`);
      const allPackages = await pkgRes.json();
      const filtered = allPackages.filter((pkg: any) => pkg.categoryId === categoryId);
      setPackages(filtered);
      setLoading(false);
    }
    fetchData();
  }, [categoryId]);

  if (!category && !loading) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/packages" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Categories
            </Link>
            {loading ? (
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">Loading...</h1>
            ) : (
              <>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">{category?.name}</h1>
                <p className="text-xl text-gray-600 mb-8 text-pretty">{category?.description}</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-16">Loading packages...</div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg: any) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-emerald-600">{category?.name}</Badge>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{pkg.title}</CardTitle>
                    <CardDescription>{pkg.shortDescription}</CardDescription>

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
                          <li className="text-sm text-emerald-600 font-medium">
                            +{pkg.highlights.length - 3} more highlights
                          </li>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages available</h3>
              <p className="text-gray-600">Packages for this category are coming soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Category Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
              <div
                className="text-gray-600 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: category?.defaultText || "" }}
              />
          </div>
        </div>
      </section>
    </div>
  )
}
