"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Car, ShieldCheck, ShoppingCart, Route, Smile, Users, UserCheck } from "lucide-react"

// Reusable reveal animation wrapper
function Reveal({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
    >
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-secondary via-primary/90 to-secondary text-white">
      <section id="contact" className="py-10 pb-0 bg-gradient-to-r from-secondary via-primary/90 to-secondary text-white relative overflow-hidden scroll-mt-24">

        <div className="relative container mx-auto px-4 lg:px-24 text-center">
          <div className="mx-auto">
            <Reveal className="delay-75">
              <h2 className="text-4xl lg:text-6xl font-bold  leading-tight">Fly To Lanka Tours</h2>
              <span className="text-base lg:text-lg text-white/70 font-normal">100% Trusted Travel Service with Professional Tour Guides &amp; Private Drivers for Round Trips</span>
              {/* Service Features Horizontal Row: icon and text side by side */}
              <div className="flex flex-wrap justify-center items-stretch mb-10 mt-8 w-full gap-y-4 gap-x-2 sm:gap-x-4">
                {/* Responsive: 2 per row on xs, 3 per row on sm, all in one row on md+ */}
                {[
                  { icon: <Car className="h-6 w-6 text-white mb-2" />, text: 'Private Chauffeur Service' },
                  { icon: <ShieldCheck className="h-6 w-6 text-white mb-2" />, text: 'Comfortable & Well-Maintained Vehicles' },
                  { icon: <ShoppingCart className="h-6 w-6 text-white mb-2" />, text: 'No Compulsory Shopping Stops' },
                  { icon: <Route className="h-6 w-6 text-white mb-2" />, text: 'Unlimited Kilometers Per Day' },
                  { icon: <Smile className="h-6 w-6 text-white mb-2" />, text: 'Customer Satisfaction Guaranteed' },
                  { icon: <Users className="h-6 w-6 text-white mb-2" />, text: 'Experienced Local Guides' },
                  { icon: <UserCheck className="h-6 w-6 text-white mb-2" />, text: 'Your Safety is Our Top Concern' }
                ].map(({ icon, text }, idx, arr) => (
                  <div
                    key={text}
                    className="flex flex-col items-center justify-center min-w-0 flex-1 px-1 border-l border-secondary first:border-l-0 basis-1/2 sm:basis-1/3 md:basis-0 md:flex-1 max-w-full"
                  >
                    {icon}
                    <span className="text-base font-semibold text-gray-400 text-center break-words">{text}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-24">
            <div className="flex flex-col items-center justify-center text-center py-4 lg:py-10">
              <h2 className="text-4xl lg:text-6xl font-bold color-white">Contact Us</h2>
                <a href="tel:+94765533874" className="block">
                <h2 className="text-4xl lg:text-8xl text-yellow-300 font-bold color-white">+94765533874</h2>
                </a>
            </div>
        </div>
        <div className="container mx-auto px-4 lg:px-24 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Mail Us */}
            <div>
              <div className="font-bold text-lg mb-2">Mail Us</div>
              <div className="text-gray-400 text-base">info@flytolanka.com</div>
            </div>
            {/* Meet Us */}
            <div>
              <div className="font-bold text-lg mb-2">Meet Us</div>
              <div className="text-gray-400 text-base">Ihala Karagahamuna, Kadawata</div>
            </div>
            {/* Follow Us */}
            <div>
              <div className="font-bold text-lg mb-2">Follow Us</div>
              <div className="flex flex-wrap justify-center items-center gap-3 mt-2">
                <a href="#" className="text-gray-400 hover:text-secondary flex items-center"><span className="mr-1">Tripadvisor</span></a>
                <a href="#" className="text-gray-400 hover:text-secondary flex items-center"><Facebook className="h-5 w-5 mr-1" />Facebook</a>
                <a href="#" className="text-gray-400 hover:text-secondary flex items-center"><Instagram className="h-5 w-5 mr-1" />Instagram</a>
                <a href="#" className="text-gray-400 hover:text-secondary flex items-center"><span className="mr-1">Google Review</span></a>
                <a href="#" className="text-gray-400 hover:text-secondary flex items-center"><span className="mr-1">Youtube</span></a>
                <a href="#" className="text-gray-400 hover:text-secondary flex items-center"><span className="mr-1">Tiktok</span></a>
              </div>
            </div>
            {/* T&C / Privacy Policy */}
            <div>
              <div className="font-bold text-lg mb-2">T &amp; C</div>
              <a href="#" className="text-gray-400 block mb-1">Terms &amp; Conditions</a>
              <a href="#" className="text-gray-400 block">Privacy Policy</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
