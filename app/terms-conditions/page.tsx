'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm backdrop-blur-sm px-3 py-1.5 rounded-full bg-white/10 border border-white/10 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
          <p className="text-xl text-white/90">Please read these terms carefully before using our services</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-24 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Terms & Conditions for Fly To Lanka Tours</CardTitle>
              <p className="text-gray-600">Effective Date: January 1, 2025</p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h3>
                  <p className="text-gray-700">By using our services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. Services Offered</h3>
                  <p className="text-gray-700 mb-4">Fly To Lanka Tours provides:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Private driver and tour guide services</li>
                    <li>Vehicle rental with chauffeur</li>
                    <li>Customized tour packages</li>
                    <li>Accommodation arrangements</li>
                    <li>Airport transfers</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. Booking and Payment</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Booking Process</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>All bookings must be confirmed in writing</li>
                        <li>Booking confirmation is subject to availability</li>
                        <li>We reserve the right to refuse service</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Payment Terms</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>No advance payment required for most services</li>
                        <li>Payment due upon service completion</li>
                        <li>Accepted payment methods: Cash, Bank Transfer, Credit Cards</li>
                        <li>All prices are in USD or LKR as specified</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">4. Cancellation Policy</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Customer Cancellations</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>24+ hours notice: No charge</li>
                        <li>12-24 hours notice: 50% charge</li>
                        <li>Less than 12 hours: Full charge</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Force Majeure</h4>
                      <p className="text-gray-700">We are not liable for cancellations due to weather, natural disasters, government restrictions, or other circumstances beyond our control.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">5. Liability and Insurance</h3>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Our Liability</h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>We maintain comprehensive insurance for our vehicles and operations</li>
                      <li>Our liability is limited to the cost of services provided</li>
                      <li>We are not responsible for personal belongings</li>
                      <li>Customers are advised to obtain travel insurance</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">6. Customer Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Provide accurate information for bookings</li>
                    <li>Arrive on time for scheduled services</li>
                    <li>Respect local customs and laws</li>
                    <li>Ensure valid travel documents</li>
                    <li>Follow safety instructions from guides and drivers</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">7. Vehicle and Driver Policies</h3>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Vehicle Standards</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>All vehicles are regularly maintained and inspected</li>
                      <li>Vehicles are air-conditioned and comfortable</li>
                      <li>Smoking is prohibited in all vehicles</li>
                      <li>Maximum passenger limits must be observed</li>
                    </ul>
                    <h4 className="font-semibold text-gray-800 mb-2">Driver Guidelines</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700">
                      <li>All drivers are licensed and experienced</li>
                      <li>Drivers follow all traffic laws and safety regulations</li>
                      <li>Rest periods are mandatory for long journeys</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">8. Privacy and Data Protection</h3>
                  <p className="text-gray-700">Your privacy is important to us. Please refer to our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for information on how we collect, use, and protect your personal data.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h3>
                  <div className="space-y-4">
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>Any disputes will be resolved through good faith negotiation</li>
                      <li>If unresolved, disputes are subject to Sri Lankan law</li>
                      <li>Jurisdiction: Courts of Colombo, Sri Lanka</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">10. Changes to Terms</h3>
                  <p className="text-gray-700">We reserve the right to modify these terms at any time. Updated terms will be posted on our website and will be effective immediately.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">11. Contact Information</h3>
                  <p className="text-gray-700 mb-4">For questions about these terms, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Email:</strong> info@flytolanka.com</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +94 76 553 3874</p>
                    <p className="text-gray-700"><strong>Address:</strong> Colombo, Sri Lanka</p>
                    <p className="text-gray-700"><strong>Business Registration:</strong> Licensed Tour Operator in Sri Lanka</p>
                  </div>
                </section>

              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}