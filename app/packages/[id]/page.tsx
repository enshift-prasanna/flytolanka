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

// This would typically come from a database or API
const getPackageById = (id: string) => {
  const packages = [
    {
      id: 1,
      categoryId: 1,
      title: "Cultural Triangle Explorer",
      days: 5,
      rating: 4.9,
      reviews: 124,
      maxPeople: 8,
      image: "/placeholder.svg?height=500&width=800&text=Cultural+Triangle",
      shortDescription: "Discover ancient kingdoms and UNESCO World Heritage sites",
      highlights: [
        "Visit Sigiriya Rock Fortress",
        "Explore Polonnaruwa ancient city",
        "Temple visits in Kandy",
        "Traditional cultural shows",
        "Professional guide included",
      ],
      detailedDescription: `
        <h2>Experience Sri Lanka's Rich Cultural Heritage</h2>
        <p>Embark on a fascinating journey through Sri Lanka's <strong>Cultural Triangle</strong>, where ancient kingdoms once flourished and magnificent monuments still stand as testaments to a glorious past.</p>
        
        <h3>Day-by-Day Itinerary</h3>
        
        <h4>Day 1: Arrival in Colombo - Transfer to Sigiriya</h4>
        <ul>
          <li>Airport pickup and welcome briefing</li>
          <li>Scenic drive to Sigiriya (3.5 hours)</li>
          <li>Check-in at heritage hotel</li>
          <li>Evening relaxation and traditional dinner</li>
        </ul>
        
        <h4>Day 2: Sigiriya Rock Fortress</h4>
        <ul>
          <li><strong>Early morning climb</strong> to Sigiriya Rock Fortress</li>
          <li>Explore the ancient frescoes and mirror wall</li>
          <li>Visit Sigiriya Museum</li>
          <li>Afternoon visit to Pidurangala Rock for sunset views</li>
        </ul>
        
        <h4>Day 3: Polonnaruwa Ancient City</h4>
        <ul>
          <li>Full day exploration of <em>Polonnaruwa UNESCO World Heritage Site</em></li>
          <li>Visit Gal Vihara rock sculptures</li>
          <li>Explore the Royal Palace complex</li>
          <li>Bicycle tour through ancient ruins</li>
        </ul>
        
        <h4>Day 4: Transfer to Kandy</h4>
        <ul>
          <li>Morning departure to Kandy</li>
          <li>Visit Dambulla Cave Temple en route</li>
          <li>Afternoon city tour of Kandy</li>
          <li><strong>Evening cultural show</strong> featuring traditional Kandyan dancing</li>
        </ul>
        
        <h4>Day 5: Temple of the Tooth - Departure</h4>
        <ul>
          <li>Morning visit to Temple of the Sacred Tooth Relic</li>
          <li>Royal Botanical Gardens tour</li>
          <li>Transfer to Colombo airport for departure</li>
        </ul>
        
        <h3>What's Included</h3>
        <ul>
          <li>✅ <strong>Accommodation:</strong> 4-star heritage hotels (4 nights)</li>
          <li>✅ <strong>Transportation:</strong> Air-conditioned vehicle with professional driver</li>
          <li>✅ <strong>Meals:</strong> Daily breakfast + 2 traditional dinners</li>
          <li>✅ <strong>Guide:</strong> English-speaking cultural guide</li>
          <li>✅ <strong>Entrance fees:</strong> All monument and museum tickets</li>
          <li>✅ <strong>Activities:</strong> Cultural show tickets included</li>
        </ul>
        
        <h3>What to Bring</h3>
        <ul>
          <li>Comfortable walking shoes for climbing</li>
          <li>Sun hat and sunscreen</li>
          <li>Camera for capturing memories</li>
          <li>Light cotton clothing (modest dress for temples)</li>
        </ul>
        
        <p><em>This package offers an immersive experience into Sri Lanka's ancient civilization, perfect for history enthusiasts and culture lovers.</em></p>
      `,
      inclusions: [
        "4-star heritage hotel accommodation",
        "Air-conditioned transportation",
        "Professional English-speaking guide",
        "Daily breakfast + 2 traditional dinners",
        "All entrance fees and permits",
        "Cultural show tickets",
        "Airport transfers",
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Lunch meals (except mentioned)",
        "Tips and gratuities",
        "Visa fees",
      ],
    },
    {
      id: 2,
      categoryId: 2,
      title: "Hill Country Adventure",
      days: 4,
      rating: 4.8,
      reviews: 89,
      maxPeople: 6,
      image: "/placeholder.svg?height=500&width=800&text=Hill+Country",
      shortDescription: "Explore tea plantations and scenic mountain landscapes",
      highlights: [
        "Visit Nuwara Eliya tea estates",
        "Train ride through hill country",
        "Horton Plains National Park",
        "World's End viewpoint",
        "Tea factory tours",
      ],
      detailedDescription: `
        <h2>Discover Sri Lanka's Breathtaking Hill Country</h2>
        <p>Journey through the <strong>misty mountains</strong> and lush tea plantations of Sri Lanka's central highlands, where colonial charm meets natural beauty.</p>
        
        <h3>Detailed Itinerary</h3>
        
        <h4>Day 1: Colombo to Kandy</h4>
        <ul>
          <li>Morning departure from Colombo</li>
          <li>Visit Royal Botanical Gardens, Peradeniya</li>
          <li>Kandy city tour and Temple of the Tooth</li>
          <li>Traditional cultural dance performance</li>
        </ul>
        
        <h4>Day 2: Kandy to Nuwara Eliya</h4>
        <ul>
          <li><strong>Scenic train journey</strong> through tea country</li>
          <li>Visit tea plantation and factory</li>
          <li>Explore Nuwara Eliya town</li>
          <li>Evening at leisure in "Little England"</li>
        </ul>
        
        <h4>Day 3: Horton Plains National Park</h4>
        <ul>
          <li>Early morning departure to Horton Plains</li>
          <li>Trekking to <em>World's End</em> viewpoint</li>
          <li>Visit Baker's Falls</li>
          <li>Wildlife spotting opportunities</li>
        </ul>
        
        <h4>Day 4: Return to Colombo</h4>
        <ul>
          <li>Morning at leisure</li>
          <li>Scenic drive back to Colombo</li>
          <li>Shopping at local markets</li>
          <li>Airport transfer for departure</li>
        </ul>
      `,
      inclusions: [
        "3-star mountain hotel accommodation",
        "Air-conditioned transportation",
        "Train tickets for scenic journey",
        "Daily breakfast + 1 dinner",
        "National park entrance fees",
        "Tea plantation tour",
        "Professional guide",
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Lunch meals",
        "Tips and gratuities",
        "Visa fees",
      ],
    },
    {
      id: 3,
      categoryId: 3,
      title: "Southern Coast Explorer",
      days: 6,
      rating: 4.7,
      reviews: 156,
      maxPeople: 10,
      image: "/placeholder.svg?height=500&width=800&text=Southern+Coast",
      shortDescription: "Beaches, wildlife, and historic Galle Fort",
      highlights: [
        "Yala National Park safari",
        "Galle Fort UNESCO site",
        "Beautiful southern beaches",
        "Whale watching in Mirissa",
        "Turtle hatchery visit",
      ],
      detailedDescription: `
        <h2>Explore Sri Lanka's Stunning Southern Coast</h2>
        <p>Discover the perfect blend of <strong>pristine beaches</strong>, abundant wildlife, and rich colonial history along Sri Lanka's beautiful southern coastline.</p>
        
        <h3>Complete Itinerary</h3>
        
        <h4>Day 1: Colombo to Bentota</h4>
        <ul>
          <li>Departure from Colombo</li>
          <li>Visit Kosgoda Turtle Hatchery</li>
          <li>Check-in at beach resort in Bentota</li>
          <li>Sunset at Bentota Beach</li>
        </ul>
        
        <h4>Day 2: Bentota Water Sports</h4>
        <ul>
          <li>Morning water sports activities</li>
          <li>Madu River boat safari</li>
          <li>Visit cinnamon plantation</li>
          <li>Beach relaxation time</li>
        </ul>
        
        <h4>Day 3: Bentota to Galle</h4>
        <ul>
          <li>Transfer to historic Galle</li>
          <li><strong>Galle Fort exploration</strong> - UNESCO World Heritage Site</li>
          <li>Walking tour of colonial architecture</li>
          <li>Shopping for local crafts</li>
        </ul>
        
        <h4>Day 4: Galle to Mirissa</h4>
        <ul>
          <li>Morning in Galle</li>
          <li>Transfer to Mirissa</li>
          <li>Beach time and surfing opportunities</li>
          <li>Sunset viewing at Coconut Tree Hill</li>
        </ul>
        
        <h4>Day 5: Whale Watching & Yala Safari</h4>
        <ul>
          <li><em>Early morning whale watching</em> excursion</li>
          <li>Transfer to Yala National Park</li>
          <li>Afternoon safari game drive</li>
          <li>Wildlife photography opportunities</li>
        </ul>
        
        <h4>Day 6: Return to Colombo</h4>
        <ul>
          <li>Morning departure from Yala</li>
          <li>Scenic coastal drive</li>
          <li>Lunch in Colombo</li>
          <li>Airport transfer</li>
        </ul>
      `,
      inclusions: [
        "4-star beach resort accommodation",
        "Air-conditioned transportation",
        "Professional wildlife guide",
        "Daily breakfast + 3 dinners",
        "Yala National Park safari",
        "Whale watching boat trip",
        "All entrance fees",
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses and souvenirs",
        "Water sports activities",
        "Tips and gratuities",
        "Visa fees",
      ],
    },
    {
      id: 4,
      categoryId: 4,
      title: "Ancient Cities & Wildlife",
      days: 7,
      rating: 4.9,
      reviews: 203,
      maxPeople: 8,
      image: "/placeholder.svg?height=500&width=800&text=Ancient+Cities",
      shortDescription: "Combine history with wildlife adventures",
      highlights: [
        "Anuradhapura ancient city",
        "Minneriya elephant gathering",
        "Sigiriya and Dambulla",
        "Udawalawe National Park",
        "Traditional village experience",
      ],
      detailedDescription: `
        <h2>Journey Through Ancient Kingdoms and Wild Landscapes</h2>
        <p>Experience the perfect combination of Sri Lanka's <strong>ancient heritage</strong> and incredible wildlife in this comprehensive tour.</p>
        
        <h3>Detailed Day-by-Day Program</h3>
        
        <h4>Day 1: Arrival & Anuradhapura</h4>
        <ul>
          <li>Airport pickup and transfer</li>
          <li>Visit Anuradhapura sacred city</li>
          <li>Explore ancient stupas and monasteries</li>
          <li>Evening at heritage hotel</li>
        </ul>
        
        <h4>Day 2: Anuradhapura to Sigiriya</h4>
        <ul>
          <li>Morning temple visits</li>
          <li>Transfer to Sigiriya</li>
          <li>Afternoon village tour and cooking class</li>
          <li>Traditional Sri Lankan dinner</li>
        </ul>
        
        <h4>Day 3: Sigiriya Rock Fortress</h4>
        <ul>
          <li><strong>Sunrise climb</strong> of Sigiriya Rock</li>
          <li>Explore ancient palace ruins</li>
          <li>Visit Dambulla Cave Temple</li>
          <li>Afternoon at leisure</li>
        </ul>
        
        <h4>Day 4: Minneriya National Park</h4>
        <ul>
          <li>Morning relaxation</li>
          <li><em>Afternoon elephant safari</em> at Minneriya</li>
          <li>Witness the famous elephant gathering</li>
          <li>Photography opportunities</li>
        </ul>
        
        <h4>Day 5: Transfer to Udawalawe</h4>
        <ul>
          <li>Scenic drive to Udawalawe</li>
          <li>Visit Elephant Transit Home</li>
          <li>Afternoon game drive in Udawalawe National Park</li>
          <li>Evening at safari lodge</li>
        </ul>
        
        <h4>Day 6: Udawalawe to Colombo</h4>
        <ul>
          <li>Early morning safari</li>
          <li>Transfer to Colombo</li>
          <li>City tour and shopping</li>
          <li>Farewell dinner</li>
        </ul>
        
        <h4>Day 7: Departure</h4>
        <ul>
          <li>Morning at leisure</li>
          <li>Last-minute shopping</li>
          <li>Airport transfer for departure</li>
        </ul>
      `,
      inclusions: [
        "Heritage and safari lodge accommodation",
        "Air-conditioned 4WD vehicle",
        "Professional guide and tracker",
        "All meals included",
        "National park entrance fees",
        "Village experience and cooking class",
        "Airport transfers",
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses",
        "Alcoholic beverages",
        "Tips and gratuities",
        "Visa fees",
      ],
    },
    {
      id: 5,
      categoryId: 1,
      title: "Complete Sri Lanka Experience",
      days: 10,
      rating: 4.9,
      reviews: 287,
      maxPeople: 12,
      image: "/placeholder.svg?height=500&width=800&text=Complete+Sri+Lanka",
      shortDescription: "The ultimate comprehensive tour of Sri Lanka",
      highlights: [
        "All major UNESCO World Heritage sites",
        "Multiple national park safaris",
        "Hill country tea plantations",
        "Southern coast beaches",
        "Cultural performances and local experiences",
      ],
      detailedDescription: `
        <h2>The Ultimate Sri Lankan Adventure</h2>
        <p>Embark on the most <strong>comprehensive journey</strong> through Sri Lanka, covering ancient cities, pristine beaches, misty mountains, and abundant wildlife in one unforgettable experience.</p>
        
        <h3>Complete 10-Day Itinerary</h3>
        
        <h4>Day 1: Arrival in Colombo</h4>
        <ul>
          <li>Airport pickup and welcome briefing</li>
          <li>Colombo city orientation tour</li>
          <li>Visit Gangaramaya Temple</li>
          <li>Welcome dinner at heritage hotel</li>
        </ul>
        
        <h4>Day 2: Colombo to Anuradhapura</h4>
        <ul>
          <li>Transfer to ancient capital Anuradhapura</li>
          <li>Explore <strong>UNESCO World Heritage</strong> sacred city</li>
          <li>Visit Sri Maha Bodhi tree and ancient stupas</li>
          <li>Evening meditation session</li>
        </ul>
        
        <h4>Day 3: Anuradhapura to Sigiriya</h4>
        <ul>
          <li>Morning temple visits</li>
          <li>Transfer to Sigiriya via Aukana Buddha statue</li>
          <li>Afternoon village cycling tour</li>
          <li>Traditional cooking demonstration</li>
        </ul>
        
        <h4>Day 4: Sigiriya & Polonnaruwa</h4>
        <ul>
          <li><em>Sunrise climb</em> of Sigiriya Rock Fortress</li>
          <li>Explore ancient frescoes and mirror wall</li>
          <li>Afternoon visit to Polonnaruwa ancient city</li>
          <li>Bicycle tour through archaeological sites</li>
        </ul>
        
        <h4>Day 5: Dambulla to Kandy</h4>
        <ul>
          <li>Visit Dambulla Cave Temple complex</li>
          <li>Scenic drive to Kandy through spice gardens</li>
          <li>Kandy city tour and Temple of the Tooth</li>
          <li><strong>Traditional Kandyan dance</strong> performance</li>
        </ul>
        
        <h4>Day 6: Kandy to Nuwara Eliya</h4>
        <ul>
          <li>Visit Royal Botanical Gardens</li>
          <li>Scenic train journey to hill country</li>
          <li>Tea plantation and factory tour</li>
          <li>Evening in "Little England"</li>
        </ul>
        
        <h4>Day 7: Horton Plains & Ella</h4>
        <ul>
          <li>Early morning trek to World's End</li>
          <li>Visit Baker's Falls</li>
          <li>Transfer to Ella via scenic mountain roads</li>
          <li>Nine Arch Bridge photography</li>
        </ul>
        
        <h4>Day 8: Ella to Yala</h4>
        <ul>
          <li>Morning at Little Adam's Peak</li>
          <li>Transfer to Yala National Park</li>
          <li>Afternoon safari game drive</li>
          <li>Wildlife photography workshop</li>
        </ul>
        
        <h4>Day 9: Yala to Galle</h4>
        <ul>
          <li>Early morning safari</li>
          <li>Transfer to historic Galle</li>
          <li>Explore <em>Galle Fort UNESCO site</em></li>
          <li>Sunset at Galle ramparts</li>
        </ul>
        
        <h4>Day 10: Galle to Colombo - Departure</h4>
        <ul>
          <li>Morning beach time in Unawatuna</li>
          <li>Coastal drive back to Colombo</li>
          <li>Last-minute shopping at Pettah markets</li>
          <li>Airport transfer for departure</li>
        </ul>
        
        <h3>What Makes This Tour Special</h3>
        <ul>
          <li>✅ <strong>All 8 UNESCO World Heritage Sites</strong> included</li>
          <li>✅ <strong>3 National Park safaris</strong> with expert guides</li>
          <li>✅ <strong>Scenic train journey</strong> through tea country</li>
          <li>✅ <strong>Cultural immersion</strong> with local families</li>
          <li>✅ <strong>Professional photography</strong> guidance throughout</li>
          <li>✅ <strong>Flexible itinerary</strong> adaptable to your interests</li>
        </ul>
        
        <h3>Accommodation Standards</h3>
        <p>Stay in carefully selected <strong>4-5 star properties</strong> including heritage hotels, boutique resorts, and eco-lodges that showcase Sri Lankan hospitality while maintaining international standards.</p>
        
        <h3>Best Time to Travel</h3>
        <p>This tour is available year-round, but the <em>best months are December to March</em> for optimal weather conditions across all regions.</p>
      `,
      inclusions: [
        "Luxury accommodation (4-5 star properties)",
        "Air-conditioned luxury vehicle with driver",
        "Professional English-speaking guide",
        "All meals (breakfast, lunch, dinner)",
        "All entrance fees and permits",
        "Train tickets for scenic journey",
        "3 national park safaris",
        "Cultural show tickets",
        "Airport transfers",
        "Photography guidance",
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Personal expenses and souvenirs",
        "Alcoholic beverages",
        "Tips and gratuities",
        "Visa fees",
        "Optional activities not mentioned",
      ],
    },
  ]

  return packages.find((pkg) => pkg.id === Number.parseInt(id))
}

export default function PackageDetailPage({ params }: { params: { id: string } }) {
  const packageData = getPackageById(params.id)

  if (!packageData) {
    notFound()
  }

  const category = packageCategories.find((cat) => cat.id === packageData.categoryId)

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
