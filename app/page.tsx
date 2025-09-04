import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-400 to-blue-600 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-white">
              <h1 className="text-3xl lg:text-4xl font-bold text-balance">Sri Lanka Private Driver Tour Guide</h1>

              <div className="space-y-4 text-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">English-Speaking, Professional & Friendly Tour Guides</span> to make
                    your journey smooth and enjoyable.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">100% Private Tours</span> with Comfortable & Clean Vehicles for your
                    convenience.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">Unlimited Mileage/Kilometers</span> during your tour across Sri
                    Lanka.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">Same Guide & Vehicle for the entire trip</span> – ensuring trust,
                    comfort, and personal attention.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">No Advance Payment Required</span> – Pay directly when you meet us
                    in Sri Lanka.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">Flexible Accommodation Options</span> – choose your own hotels, or
                    let us arrange the best stays for you.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">All Travel Expenses Covered</span> (fuel, driver's food & stay,
                    parking, highway charges, etc. included).
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">Customized Itineraries</span> tailored to your preferences –
                    culture, nature, wildlife, beaches, or adventure.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-300 text-xl">👉</span>
                  <div>
                    <span className="font-semibold">24/7 Support</span> throughout your trip for a worry-free travel
                    experience.
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Book You Driver
              </Button>
            </div>

            <div className="relative">
              <Image
                src="/person-standing-by-ocean-in-sri-lanka.png"
                alt="Person by the ocean in Sri Lanka"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-gradient-to-b from-green-300 to-blue-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Customizable Tour Packages</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <strong>Cultural Tours:</strong> Explore ancient temples, historic landmarks, and UNESCO World
                  Heritage Sites.
                </p>
                <p>
                  <strong>Adventure Tours:</strong> Embark on thrilling activities like hiking, rafting, and wildlife
                  safaris.
                </p>
                <p>
                  <strong>Relaxation Packages:</strong> Unwind on pristine beaches and serene hill stations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Wildlife and Nature Excursions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  <strong>Wildlife Safaris:</strong> Witness majestic elephants, leopards, and exotic bird species in
                  their natural habitat.
                </p>
                <p>
                  <strong>Nature Photography Tours:</strong> Capture the breathtaking landscapes and biodiversity of Sri
                  Lanka.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">City and Heritage Tours</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Discover vibrant cities such as Colombo, Kandy, and Galle with expert guides.</p>
                <p>Immerse yourself in Sri Lanka's rich history, culture, and local traditions.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Transportation Services</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Comfortable and reliable airport transfers.</p>
                <p>Private vehicles with professional drivers for your entire journey.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Accommodation Arrangements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Handpicked hotels, resorts, and homestays to suit your budget and preferences.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Eco-Tourism and Village Tours</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  Experience sustainable tourism by visiting local communities and participating in traditional village
                  activities.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Honeymoon Packages</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Romantic getaways with special arrangements to make your trip truly memorable.</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-blue-600">Travel Assistance</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>24/7 customer support for a hassle-free travel experience.</p>
                <p>Visa assistance, travel insurance, and more.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Book With Us Section */}
      <section className="py-16 bg-blue-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Book With Us Your Taxi In Sri Lanka</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image
                  src="/mini-car-vehicle.png"
                  alt="Mini Car"
                  width={150}
                  height={100}
                  className="mx-auto mb-4 rounded"
                />
                <h3 className="font-semibold">Mini Car & Driver</h3>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image
                  src="/sedan-car-vehicle.png"
                  alt="Sedan Car"
                  width={150}
                  height={100}
                  className="mx-auto mb-4 rounded"
                />
                <h3 className="font-semibold">Sedan Car & Driver</h3>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image
                  src="/luxury-car-vehicle.png"
                  alt="Luxury Car"
                  width={150}
                  height={100}
                  className="mx-auto mb-4 rounded"
                />
                <h3 className="font-semibold">Luxury Car & Driver</h3>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image src="/suv-vehicle.png" alt="SUV" width={150} height={100} className="mx-auto mb-4 rounded" />
                <h3 className="font-semibold">SUV & Driver</h3>
                <Button size="sm" className="mt-2 bg-blue-500 hover:bg-blue-600">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image src="/van-vehicle.png" alt="Van" width={150} height={100} className="mx-auto mb-4 rounded" />
                <h3 className="font-semibold">Van & Driver</h3>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image
                  src="/luxury-van-vehicle.png"
                  alt="Luxury Van"
                  width={150}
                  height={100}
                  className="mx-auto mb-4 rounded"
                />
                <h3 className="font-semibold">Luxury Van & Driver</h3>
                <Button size="sm" className="mt-2 bg-blue-500 hover:bg-blue-600">
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image
                  src="/mini-coach-bus.png"
                  alt="Mini Coach"
                  width={150}
                  height={100}
                  className="mx-auto mb-4 rounded"
                />
                <h3 className="font-semibold">Mini Coach & Driver</h3>
              </CardContent>
            </Card>

            <Card className="bg-white text-center">
              <CardContent className="p-6">
                <Image
                  src="/luxury-coach-bus.png"
                  alt="Luxury Coach"
                  width={150}
                  height={100}
                  className="mx-auto mb-4 rounded"
                />
                <h3 className="font-semibold">Luxury Coach & Driver</h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Book You Driver
            </Button>
          </div>
        </div>
      </section>

      {/* TripAdvisor Awards Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Excellent Reviews On Tripadvisor</h2>
          </div>

          <div className="flex justify-center items-center gap-8">
            <div className="bg-green-500 text-white p-8 rounded-lg text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-bold">Travellers' Choice</div>
              <div className="text-2xl font-bold">2023</div>
            </div>
            <div className="bg-green-500 text-white p-8 rounded-lg text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-bold">Tripadvisor Travellers' Choice Awards</div>
              <div className="text-2xl font-bold">2024</div>
            </div>
            <div className="bg-green-500 text-white p-8 rounded-lg text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="font-bold">Tripadvisor Travelers' Choice Awards</div>
              <div className="text-2xl font-bold">2025</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Read Our Excellent Reviews On Tripadvisor
            </Button>
          </div>
        </div>
      </section>

      {/* Our Private Tours Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">Our Private Tours</h2>

            <div className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold mb-4">Personalized Travel & Sightseeing in Sri Lanka</h3>
                <p className="mb-4">
                  Our travel and tourism services are designed to give you a private, safe, and customized experience.
                  Whether you're exploring cities, cultural sites, or nature escapes, we ensure your journey is
                  comfortable, flexible, and memorable.
                </p>
              </div>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis,
                pulvinar dapibus leo.
              </p>

              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div>
                  <ul className="space-y-2">
                    <li>✦ Fully Air-Conditioned & Comfortable Vehicles</li>
                    <li>✦ Experienced & Licensed Drivers / Chauffeur Guides</li>
                    <li>✦ Customized Itineraries to Suit Your Preferences</li>
                    <li>✦ Clean & Well-Maintained Cars, Vans, and Buses</li>
                    <li>✦ Bottled Water, Umbrellas</li>
                    <li>✦ Child Seats & Booster Seats on Request</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li>✦ First Aid Kit & Travel Essentials Provided</li>
                    <li>✦ Charging Facilities Available</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <h3 className="text-2xl font-bold text-gray-900">
                  Sri Lanka Private Driver Tour Guide With Fly To Lanka Tours– The Best Way to Explore the Island
                </h3>
                <p>
                  Are you planning your dream holiday to Sri Lanka? One of the best ways to explore this beautiful
                  island is by hiring a Sri Lanka private driver tour guide. With a local expert behind the wheel, you
                  can travel stress-free, discover hidden gems, and enjoy a tailor-made experience that goes beyond
                  standard tour packages.
                </p>

                <h4 className="text-xl font-semibold text-gray-900">Why Choose Fly To Lanka Tours?</h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold">Comfort and Convenience</h5>
                    <p>
                      Traveling in Sri Lanka can be challenging if you are unfamiliar with the roads, traffic, and local
                      transportation. A private driver ensures a comfortable journey in an air-conditioned vehicle while
                      you sit back and relax.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold">Local Expertise</h5>
                    <p>
                      A licensed private driver tour guide in Sri Lanka knows the culture, history, and traditions. They
                      can recommend the best attractions, local restaurants, and authentic experiences.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold">Personalized Itinerary</h5>
                    <p>
                      Unlike fixed group tours, a private driver tour guide in Sri Lanka allows you to create a flexible
                      itinerary. Whether you want to explore ancient cities, wildlife safaris, or golden beaches, your
                      journey is customized to your preferences.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-semibold">Safety and Reliability</h5>
                    <p>
                      Navigating busy roads can be stressful. A professional driver ensures safety and provides reliable
                      service throughout your tour.
                    </p>
                  </div>
                </div>

                <h4 className="text-xl font-semibold text-gray-900">
                  Top Places to Visit with a Private Driver in Sri Lanka
                </h4>
                <ul className="space-y-2">
                  <li>
                    <strong>Colombo City Tour</strong> – Experience the modern capital with shopping, temples, and
                    colonial history.
                  </li>
                  <li>
                    <strong>Kandy</strong> – Home to the famous Temple of the Tooth and scenic hill country views.
                  </li>
                  <li>
                    <strong>Nuwara Eliya</strong> – Discover tea plantations and waterfalls in the "Little England" of
                    Sri Lanka.
                  </li>
                  <li>
                    <strong>Sigiriya Rock Fortress</strong> – Climb the iconic Lion Rock, a UNESCO World Heritage Site.
                  </li>
                  <li>
                    <strong>Ella</strong> – A relaxing hill town surrounded by tea fields and hiking trails.
                  </li>
                  <li>
                    <strong>Yala National Park</strong> – Spot leopards, elephants, and wildlife on a safari adventure.
                  </li>
                  <li>
                    <strong>Galle Fort</strong> – Explore the Dutch colonial fort and enjoy the southern beaches.
                  </li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-900">
                  Benefits of Hiring a Private Driver Tour Guide in Sri Lanka With Fly To Lanka Tours
                </h4>
                <ul className="space-y-2">
                  <li>Door-to-door transport from hotels or the airport</li>
                  <li>Insider knowledge of hidden spots tourists often miss</li>
                  <li>Hassle-free travel with no need to worry about maps or public transport</li>
                  <li>Flexibility to travel at your own pace</li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-900">
                  How to Book a Sri Lanka Private Driver Tour Guide With Fly To Lanka Tours
                </h4>
                <p>
                  Booking a Sri Lanka private driver tour guide is easy. Many reputable travel agencies and independent
                  guides offer professional services. Look for:
                </p>
                <ul className="space-y-2">
                  <li>Licensed and experienced drivers</li>
                  <li>Comfortable vehicles (cars, vans, or minibuses)</li>
                  <li>Positive reviews from past travelers</li>
                  <li>Transparent pricing without hidden charges</li>
                </ul>

                <h4 className="text-xl font-semibold text-gray-900">Final Thoughts</h4>
                <p>
                  Fly To Lanka Tours is the perfect choice for travelers who want comfort, safety, and a personalized
                  travel experience. Whether you are on a short trip or a long holiday, having a local driver guide will
                  make your journey unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Sri Lanka Private Driver Tour Guide With Fly To Lanka Tours- The Best Way to Explore the Island
          </h2>
          <p className="text-xl mb-8 max-w-4xl mx-auto">
            Are you planning your dream holiday to Sri Lanka? One of the best ways to explore this beautiful island is
            by hiring a <strong>Sri Lanka private driver tour guide</strong> with Fly to Lanka Tours. You can travel
            across the island, you can travel hidden gems, and enjoy a tailor-made experience that goes beyond ordinary
            tourism.
          </p>
        </div>
      </section>
    </div>
  )
}
