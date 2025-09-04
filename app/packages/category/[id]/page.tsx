import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight, Check, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

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
]

function getCategoryById(id: number) {
  return packageCategories.find((category) => category.id === id)
}

function getPackagesByCategory(categoryId: number) {
  return packages.filter((pkg) => pkg.categoryId === categoryId)
}

export default function CategoryPackagesPage({ params }: { params: { id: string } }) {
  const categoryId = Number.parseInt(params.id)
  const category = getCategoryById(categoryId)
  const categoryPackages = getPackagesByCategory(categoryId)

  if (!category) {
    notFound()
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
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">{category.name}</h1>
            <p className="text-xl text-gray-600 mb-8 text-pretty">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {categoryPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-emerald-600">{category.name}</Badge>
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
            <p className="text-gray-600 text-lg leading-relaxed">{category.defaultText}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
