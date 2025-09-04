import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, MapPin, Star, Phone, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const packageCategories = [
  {
    id: 1,
    name: "Cultural Tours",
    image: "/placeholder.svg?height=300&width=400&text=Cultural+Tours",
    description: "Explore ancient kingdoms, UNESCO World Heritage sites, and traditional cultural experiences",
    defaultText:
      "All cultural tours include professional English-speaking guides, entrance fees to historical sites, and traditional cultural experiences. Transportation in air-conditioned vehicles with complimentary water bottles.",
  },
  {
    id: 2,
    name: "Adventure Tours",
    image: "/placeholder.svg?height=300&width=400&text=Adventure+Tours",
    description: "Thrilling adventures in Sri Lanka's diverse landscapes and natural wonders",
    defaultText:
      "Adventure packages include safety equipment, experienced guides, and emergency support. All activities are weather dependent and safety briefings are provided before each adventure.",
  },
  {
    id: 3,
    name: "Beach & Coastal Tours",
    image: "/placeholder.svg?height=300&width=400&text=Beach+Tours",
    description: "Relax on pristine beaches and explore stunning coastal attractions",
    defaultText:
      "Beach tours include coastal transportation, beach activities, and marine life experiences. Snorkeling equipment and life jackets provided where applicable.",
  },
  {
    id: 4,
    name: "Wildlife Safari Tours",
    image: "/placeholder.svg?height=300&width=400&text=Wildlife+Tours",
    description: "Encounter incredible wildlife in their natural habitats across national parks",
    defaultText:
      "Safari tours include park entrance fees, 4WD safari vehicles, and expert naturalist guides. Binoculars provided and photography assistance available.",
  },
  {
    id: 5,
    name: "Wellness & Ayurveda",
    image: "/placeholder.svg?height=300&width=400&text=Wellness+Tours",
    description: "Rejuvenate with authentic Ayurvedic treatments and wellness experiences",
    defaultText:
      "Wellness packages include authentic Ayurvedic treatments, organic meals, yoga sessions, and meditation guidance. All treatments are performed by certified practitioners.",
  },
]

const packages = [
  {
    id: 1,
    categoryId: 1,
    title: "Cultural Triangle Explorer",
    days: 5,
    image: "/placeholder.svg?height=400&width=600&text=Cultural+Triangle",
    shortDescription: "Discover ancient kingdoms and UNESCO World Heritage sites",
    highlights: [
      "Visit Sigiriya Rock Fortress",
      "Explore Polonnaruwa ancient city",
      "Temple visits in Kandy",
      "Traditional cultural shows",
      "Professional guide included",
    ],
  },
  {
    id: 2,
    categoryId: 2,
    title: "Hill Country Adventure",
    days: 4,
    image: "/placeholder.svg?height=400&width=600&text=Hill+Country",
    shortDescription: "Experience the scenic beauty of Sri Lanka's hill country",
    highlights: [
      "Tea plantation tours",
      "Train ride to Ella",
      "Nine Arch Bridge visit",
      "Little Adam's Peak hike",
      "Nuwara Eliya city tour",
    ],
  },
  {
    id: 3,
    categoryId: 3,
    title: "Southern Coast Paradise",
    days: 6,
    image: "/placeholder.svg?height=400&width=600&text=Southern+Coast",
    shortDescription: "Relax on pristine beaches and explore coastal attractions",
    highlights: [
      "Galle Fort exploration",
      "Whale watching in Mirissa",
      "Beach relaxation time",
      "Stilt fishermen experience",
      "Turtle hatchery visit",
    ],
  },
  {
    id: 4,
    categoryId: 4,
    title: "Wildlife Safari Experience",
    days: 3,
    image: "/placeholder.svg?height=400&width=600&text=Wildlife+Safari",
    shortDescription: "Encounter Sri Lanka's incredible wildlife in their natural habitat",
    highlights: [
      "Yala National Park safari",
      "Elephant gathering at Minneriya",
      "Bird watching opportunities",
      "Leopard spotting chances",
      "Expert naturalist guide",
    ],
  },
  {
    id: 5,
    categoryId: 1,
    title: "Complete Island Discovery",
    days: 10,
    image: "/placeholder.svg?height=400&width=600&text=Complete+Island",
    shortDescription: "The ultimate Sri Lankan experience covering all major attractions",
    highlights: [
      "All UNESCO World Heritage sites",
      "Multiple national park visits",
      "Beach and hill country experiences",
      "Cultural performances",
      "Luxury accommodation included",
    ],
  },
  {
    id: 6,
    categoryId: 5,
    title: "Ayurveda Wellness Retreat",
    days: 7,
    image: "/placeholder.svg?height=400&width=600&text=Ayurveda+Wellness",
    shortDescription: "Rejuvenate your mind and body with authentic Ayurvedic treatments",
    highlights: [
      "Daily Ayurvedic treatments",
      "Yoga and meditation sessions",
      "Organic herbal meals",
      "Spa and wellness facilities",
      "Peaceful natural settings",
    ],
  },
]

export default function PackagesPage() {
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packageCategories.map((category) => (
              <Link key={category.id} href={`/packages/category/${category.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full group">
                  <div className="relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-600 font-medium">Explore Packages</span>
                      <ArrowRight className="h-4 w-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Available Packages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const category = packageCategories.find((cat) => cat.id === pkg.categoryId)
              return (
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

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{pkg.days} Days</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Package Highlights:</h4>
                      <ul className="space-y-1">
                        {pkg.highlights.slice(0, 3).map((highlight, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-3 w-3 text-emerald-600 flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                        {pkg.highlights.length > 3 && (
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
              )
            })}
          </div>
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
  )
}
