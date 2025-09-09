'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/90">How we collect, use, and protect your information</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-24 max-w-4xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Privacy Policy for Fly To Lanka Tours</CardTitle>
              <p className="text-gray-600">Effective Date: January 1, 2025</p>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="space-y-8">
                
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Personal Information</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>Name, email address, phone number</li>
                        <li>Travel dates and preferences</li>
                        <li>Payment information (processed securely)</li>
                        <li>Passport and visa information (when required)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Automatically Collected Information</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        <li>IP address and browser information</li>
                        <li>Website usage statistics</li>
                        <li>Cookies and tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>To provide and improve our tour services</li>
                    <li>To communicate with you about your bookings</li>
                    <li>To send promotional materials (with your consent)</li>
                    <li>To comply with legal requirements</li>
                    <li>To ensure the safety and security of our services</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. Information Sharing</h3>
                  <p className="text-gray-700 mb-4">We may share your information with:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Tour guides and drivers for service delivery</li>
                    <li>Hotels and accommodation providers</li>
                    <li>Payment processors for transaction handling</li>
                    <li>Government authorities when legally required</li>
                  </ul>
                  <p className="text-gray-700 mt-4">We do not sell your personal information to third parties.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">4. Data Security</h3>
                  <p className="text-gray-700 mb-4">We implement appropriate security measures to protect your information:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure servers and databases</li>
                    <li>Regular security audits</li>
                    <li>Limited access to personal information</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">5. Your Rights</h3>
                  <p className="text-gray-700 mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Data portability</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">6. Cookies</h3>
                  <p className="text-gray-700 mb-4">We use cookies to enhance your browsing experience. You can control cookie settings through your browser preferences.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">7. Changes to This Policy</h3>
                  <p className="text-gray-700">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">8. Contact Us</h3>
                  <p className="text-gray-700 mb-4">If you have any questions about this privacy policy, please contact us:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700"><strong>Email:</strong> info@flytolanka.com</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +94 77 123 4567</p>
                    <p className="text-gray-700"><strong>Address:</strong> Colombo, Sri Lanka</p>
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