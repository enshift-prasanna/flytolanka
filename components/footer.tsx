import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-emerald-600 text-white px-3 py-2 rounded-lg font-bold text-xl">FTL</div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">FlyToLanka</span>
                <span className="text-sm text-gray-400">Travel & Transport</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for transportation and travel services in Sri Lanka. Experience the beauty of the
              island with our professional drivers and quality vehicles.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-emerald-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-gray-400 hover:text-emerald-400">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/drivers" className="text-gray-400 hover:text-emerald-400">
                  Drivers
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-emerald-400">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/sri-lanka" className="text-gray-400 hover:text-emerald-400">
                  Sri Lanka
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Airport Transfers</li>
              <li>City Tours</li>
              <li>Long Distance Travel</li>
              <li>Wedding Transportation</li>
              <li>Corporate Services</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">+94 77 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">info@flytolanka.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-emerald-400" />
                <span className="text-gray-400">Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FlyToLanka. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
