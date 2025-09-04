import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function DriversPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-green-500 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">Our Trusted Driver Guides</h1>
            <p className="text-xl text-blue-100 mb-8 text-pretty">
              Travel with our friendly, English-speaking drivers who know the roads, culture, and hidden gems of Sri
              Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-center mb-2">Book Your Private Driver & Tour Guide</h2>
                <p className="text-center text-gray-600 mb-8">Fields marked with an * are required</p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" type="text" required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" type="tel" />
                  </div>

                  <div>
                    <Label htmlFor="vehicle">Vehicle Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mini-car">Mini Car & Driver</SelectItem>
                        <SelectItem value="sedan">Sedan Car & Driver</SelectItem>
                        <SelectItem value="luxury-car">Luxury Car & Driver</SelectItem>
                        <SelectItem value="suv">SUV & Driver</SelectItem>
                        <SelectItem value="van">Van & Driver</SelectItem>
                        <SelectItem value="luxury-van">Luxury Van & Driver</SelectItem>
                        <SelectItem value="mini-coach">Mini Coach & Driver</SelectItem>
                        <SelectItem value="luxury-coach">Luxury Coach & Driver</SelectItem>
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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
                    <div>
                      <Label htmlFor="children">Number of Children (6 to 12)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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
                    <div>
                      <Label htmlFor="infants">Number of Infants (0 to 5)</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
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
                  </div>

                  <div>
                    <Label htmlFor="requirements">
                      Describe your planned route, places you wish to visit, interests,...or any special requirements...
                      *
                    </Label>
                    <Textarea id="requirements" rows={6} required className="mt-2" />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Submit Booking Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fly To Lanka Tours</h2>
            <p className="text-xl text-gray-600 mb-8">
              100% Trusted Travel Service with Professional Tour Guides & Private Drivers for Round Trips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Private Chauffeur Service</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Comfortable & Well-Maintained Vehicles</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ No Compulsory Shopping Stops</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Unlimited Kilometers Per Day</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Customer Satisfaction Guaranteed</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Experienced Local Guides</h3>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-900 mb-2">✓ Your Safety is Our Top Concern</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-bold mb-2">Call Or WhatsApp</h3>
              <p className="text-blue-400">+94765533874</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Mail Us</h3>
              <p className="text-blue-400">info@flytolanka.com</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Meet Us</h3>
              <p className="text-blue-400">Ihala Karagahamuna, Kadawata</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
