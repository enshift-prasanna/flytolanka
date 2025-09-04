import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

const vehicleTypes = [
  {
    name: "Mini Car & Driver",
    image: "/mini-car-vehicle.png",
  },
  {
    name: "Sedan Car & Driver",
    image: "/sedan-car-vehicle.png",
  },
  {
    name: "Luxury Car & Driver",
    image: "/luxury-car-vehicle.png",
  },
  {
    name: "SUV & Driver",
    image: "/suv-vehicle.png",
  },
  {
    name: "Van & Driver",
    image: "/van-vehicle.png",
  },
  {
    name: "Luxury Van & Driver",
    image: "/luxury-van-vehicle.png",
  },
  {
    name: "Mini Coach & Driver",
    image: "/mini-coach-bus.png",
  },
  {
    name: "Luxury Coach & Driver",
    image: "/luxury-coach-bus.png",
  },
]

const features = [
  {
    category: "🛋️ Comfort & Convenience",
    items: [
      "Fully air-conditioned interiors",
      "Comfortable reclining seats with ample legroom",
      "Adjustable headrests and armrests",
      "Spacious luggage storage capacity",
      "Curtains or tinted windows for privacy and sun protection",
    ],
  },
  {
    category: "🎶 Entertainment & Connectivity",
    items: [
      "High-quality sound system / FM radio",
      "USB charging ports for mobile devices",
      "Wi-Fi (on request in selected vehicles)",
      "Microphone and PA system (for group tours, coaches & vans)",
    ],
  },
  {
    category: "🛡️ Safety & Security",
    items: [
      "Comprehensive seat belts for all passengers",
      "First aid kit available onboard",
      "Fire extinguisher and emergency exit facilities",
      "GPS tracking for route safety",
      "Professional, licensed, and experienced drivers",
    ],
  },
  {
    category: "🧼 Cleanliness & Hygiene",
    items: [
      "Daily cleaned and sanitized interiors",
      "Bottled drinking water provided",
      "Neat and well-maintained upholstery",
      "Garbage bin for passenger convenience",
    ],
  },
]

export default function VehiclesPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-green-500 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-center mb-8">Our Trusted Vehicles</h1>
        </div>
      </section>

      {/* Vehicle Types Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative h-48 mb-4">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {(index === 3 || index === 7) && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Book Now</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">🚖 Our Vehicles Standard Features</h2>
          <p className="text-center text-gray-600 mb-12 max-w-4xl mx-auto">
            To ensure a comfortable, safe, and enjoyable journey, all our tourism vehicles are equipped with the
            following standard features:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{feature.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">🚍 Vehicle Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Cars</h3>
                <p className="text-sm text-gray-600">(for private tours & transfers)</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Vans & Mini Coaches</h3>
                <p className="text-sm text-gray-600">(ideal for families & small groups)</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Luxury Coaches & Buses</h3>
                <p className="text-sm text-gray-600">(for large group tours)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Drivers */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Trusted Driver Guides</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Travel with our friendly, English-speaking drivers who know the roads, culture, and hidden gems of Sri
            Lanka.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Your Private Driver & Tour Guide</h2>
            <p className="text-center text-gray-600 mb-8">Fields marked with an * are required</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" required />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" />
              </div>

              <div>
                <Label htmlFor="vehicle">Vehicle Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Mini Car & Driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((vehicle, index) => (
                      <SelectItem key={index} value={vehicle.name}>
                        {vehicle.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="arrival">Arrival Date *</Label>
                  <Input id="arrival" type="date" required />
                </div>
                <div>
                  <Label htmlFor="departure">Departure Date</Label>
                  <Input id="departure" type="date" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="adults">Number of Adults (13+)</Label>
                  <Input id="adults" type="number" min="0" />
                </div>
                <div>
                  <Label htmlFor="children">Number of Children (6 to 12)</Label>
                  <Input id="children" type="number" min="0" />
                </div>
                <div>
                  <Label htmlFor="infants">Number of Infants (0 to 5)</Label>
                  <Input id="infants" type="number" min="0" />
                </div>
              </div>

              <div>
                <Label htmlFor="requirements">
                  Describe your planned route, places you wish to visit, interests, or any special requirements... *
                </Label>
                <Textarea id="requirements" rows={6} required className="mt-2" />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                Submit Booking Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
