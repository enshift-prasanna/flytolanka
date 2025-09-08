"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Users, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// Package categories with default text
const packageCategories = [
  {
    id: 1,
    name: "Cultural Tours",
    defaultText:
      "All cultural tours include professional English-speaking guides, entrance fees to historical sites, and traditional cultural experiences. Transportation in air-conditioned vehicles with complimentary water bottles.",
  },
  {
    id: 2,
    name: "Adventure Tours",
    defaultText:
      "Adventure packages include safety equipment, experienced guides, and emergency support. All activities are weather dependent and safety briefings are provided before each adventure.",
  },
  {
    id: 3,
    name: "Beach & Coastal Tours",
    defaultText:
      "Beach tours include coastal transportation, beach activities, and marine life experiences. Snorkeling equipment and life jackets provided where applicable.",
  },
  {
    id: 4,
    name: "Wildlife Safari Tours",
    defaultText:
      "Safari tours include park entrance fees, 4WD safari vehicles, and expert naturalist guides. Binoculars provided and photography assistance available.",
  },
  {
    id: 5,
    name: "Wellness & Ayurveda",
    defaultText:
      "Wellness packages include authentic Ayurvedic treatments, organic meals, yoga sessions, and meditation guidance. All treatments are performed by certified practitioners.",
  },
]

// ...existing code...
import { useEffect, useState } from "react";

async function fetchPackage(id: string) {
  const res = await fetch(`/api/package/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const [packageData, setPackageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackage(params.id).then((data) => {
      setPackageData(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading package details...</div>;
  }
  if (!packageData || packageData.error) {
    notFound();
  }

  const category = packageCategories.find((cat) => cat.id === Number(packageData.categoryId));

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-96 lg:h-[500px]">
          <Image src={packageData.image || "/placeholder.svg"} alt={packageData.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl text-white">
                <Link href="/packages" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Packages
                </Link>
                <Badge className="bg-emerald-600 mb-4">{category?.name}</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">{packageData.title}</h1>
                <p className="text-xl text-white/90 mb-6">{packageData.shortDescription}</p>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{packageData.days} Days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-5 w-5" />
                    <span>Max {packageData.maxPeople} people</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span>
                      {packageData.rating} ({packageData.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Package Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Package Details</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-emerald max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: packageData.detailedDescription }} className="space-y-4" />
                </CardContent>
              </Card>

              {category && (
                <Card>
                  <CardHeader>
                    <CardTitle>Important Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{category.defaultText}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Book Your Private Driver & Tour Guide</CardTitle>
                  <p className="text-sm text-gray-600">Fields marked with an * are required</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" placeholder="+94 77 123 4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mini-car">Mini Car & Driver</SelectItem>
                        <SelectItem value="sedan-car">Sedan Car & Driver</SelectItem>
                        <SelectItem value="luxury-car">Luxury Car & Driver</SelectItem>
                        <SelectItem value="suv">SUV & Driver</SelectItem>
                        <SelectItem value="van">Van & Driver</SelectItem>
                        <SelectItem value="luxury-van">Luxury Van & Driver</SelectItem>
                        <SelectItem value="mini-coach">Mini Coach & Driver</SelectItem>
                        <SelectItem value="luxury-coach">Luxury Coach & Driver</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arrival">Arrival Date *</Label>
                    <Input id="arrival" type="date" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departure">Departure Date</Label>
                    <Input id="departure" type="date" />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="adults">Number of Adults (13+)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Adults" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="children">Number of Children (6 to 12)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Children" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="infants">Number of Infants (0 to 5)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Infants" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      Describe your planned route, places you wish to visit, interests, or any special requirements... *
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder="Please describe your travel plans, interests, and any special requirements..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                    Send Inquiry
                  </Button>

                  <div className="text-center text-sm text-gray-600">
                    <p>Questions? Call us at</p>
                    <p className="font-medium text-emerald-600">+94 77 123 4567</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
