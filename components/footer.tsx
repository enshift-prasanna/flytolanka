"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="relative text-white">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 w-full h-full bg-[url('https://backpacking-tours.imgix.net/storage/uploads/blog/sri-lanka/weather/backpacking-tours-sri-lanka-weather-98_nvten.jpg?w=1920&crop=faces&q=75&auto=format&fm=png')] bg-cover bg-center z-0" />
      <div className="absolute inset-0 w-full h-full bg-black/89 z-10" />
      <section id="contact" className="py-10 pb-0 relative overflow-hidden scroll-mt-24 z-20">

        <div className="relative container mx-auto px-4 lg:px-24 text-center">
          <div className="mx-auto">
            <Reveal className="delay-75">
              <h2 className="text-4xl lg:text-6xl font-bold  leading-tight">Fly To Lanka Tours</h2>
              <span className="text-base lg:text-lg text-white font-normal">100% Trusted Travel Service with Professional Tour Guides &amp; Private Drivers for Round Trips</span>
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
                    <span className="text-base font-semibold text-white text-center break-words">{text}</span>
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
                <a href="https://www.tripadvisor.com/Attraction_Review-g293962-d23803919-Reviews-Fly_To_Lanka_Tours-Colombo_Western_Province.html" target="_blank" rel="noopener noreferrer" className="hover:text-secondary flex items-center">
                  {/* Tripadvisor */}
                  <span className="w-8 h-8 block" aria-label="Tripadvisor">
                    <svg fill="#ffffff" viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"><path d="M8.311 10.278a2.496 2.496 0 1 0 0 4.992 2.496 2.496 0 0 0 0-4.992zm1.309 2.497a1.309 1.309 0 1 1-1.309-1.309c.723 0 1.309.586 1.309 1.309zm6.069-2.497a2.496 2.496 0 1 0 2.496 2.496 2.497 2.497 0 0 0-2.496-2.496zm1.308 2.497a1.309 1.309 0 1 1-1.309-1.309c.724 0 1.309.586 1.309 1.309z"></path><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.689 14.464a3.678 3.678 0 0 1-2.506-.982l-1.182 1.286-1.183-1.287-.006.006a3.69 3.69 0 0 1-4.986-5.439L4.618 8.735h2.683a8.36 8.36 0 0 1 9.406 0h2.676l-1.207 1.313a3.69 3.69 0 0 1-2.487 6.416z"></path><path d="M9.23 9.048c1.576.603 2.771 2.012 2.771 3.655 0-1.643 1.195-3.052 2.77-3.655a7.202 7.202 0 0 0-5.541 0z"></path></svg>
                  </span>
                </a>
                    <a href="https://www.facebook.com/share/16xWV5aVXa/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary flex items-center">
                  {/* Facebook */}
                  <span className="w-8 h-8 block" aria-label="Facebook">
                    <svg viewBox="0 0 16 16" width="32" height="32" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#1877F2" d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"></path><path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"></path></svg>
                  </span>
                </a>
                    <a href="https://www.instagram.com/flytolanka?igsh=bjg5a3k2M3dyNjRn" target="_blank" rel="noopener noreferrer" className="hover:text-secondary flex items-center">
                  {/* Instagram */}
                  <span className="w-8 h-8 block" aria-label="Instagram">
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"></rect><rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"></rect><rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"></rect><path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"></path><defs><radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)"><stop stopColor="#B13589"></stop><stop offset="0.79309" stopColor="#C62F94"></stop><stop offset="1" stopColor="#8A3AC8"></stop></radialGradient><radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)"><stop stopColor="#E0E8B7"></stop><stop offset="0.444662" stopColor="#FB8A2E"></stop><stop offset="0.71474" stopColor="#E2425C"></stop><stop offset="1" stopColor="#E2425C" stopOpacity="0"></stop></radialGradient><radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)"><stop offset="0.156701" stopColor="#406ADC"></stop><stop offset="0.467799" stopColor="#6A45BE"></stop><stop offset="1" stopColor="#6A45BE" stopOpacity="0"></stop></radialGradient></defs></svg>
                  </span>
                </a>
                    <a href="https://share.google/6xful5C1q1k0yh6pO" target="_blank" rel="noopener noreferrer" className="hover:text-secondary flex items-center">
                  {/* Google Review */}
                  <span className="w-8 h-8 block" aria-label="Google Review">
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4"></path><path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853"></path><path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05"></path><path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335"></path></svg>
                  </span>
                </a>
                    <a href="https://www.youtube.com/@flytolankatours" target="_blank" rel="noopener noreferrer" className="hover:text-secondary flex items-center">
                  {/* Youtube */}
                  <span className="w-8 h-8 block" aria-label="Youtube">
                    <svg viewBox="0 -38 256 256" width="32" height="32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="#000000"><g><path d="M250.346231,28.0746923 C247.358133,17.0320558 238.732098,8.40602109 227.689461,5.41792308 C207.823743,0 127.868333,0 127.868333,0 C127.868333,0 47.9129229,0.164179487 28.0472049,5.58210256 C17.0045684,8.57020058 8.37853373,17.1962353 5.39043571,28.2388718 C-0.618533519,63.5374615 -2.94988224,117.322662 5.5546152,151.209308 C8.54271322,162.251944 17.1687479,170.877979 28.2113844,173.866077 C48.0771024,179.284 128.032513,179.284 128.032513,179.284 C128.032513,179.284 207.987923,179.284 227.853641,173.866077 C238.896277,170.877979 247.522312,162.251944 250.51041,151.209308 C256.847738,115.861464 258.801474,62.1091 250.346231,28.0746923 Z" fill="#FF0000"></path><polygon fill="#FFFFFF" points="102.420513 128.06 168.749025 89.642 102.420513 51.224"></polygon></g></svg>
                  </span>
                </a>
                <a href="#" className="hover:text-secondary flex items-center">
                  {/* Tiktok */}
                  <span className="w-8 h-8 block" aria-label="Tiktok">
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.45095 19.7926C8.60723 18.4987 9.1379 17.7743 10.1379 17.0317C11.5688 16.0259 13.3561 16.5948 13.3561 16.5948V13.2197C13.7907 13.2085 14.2254 13.2343 14.6551 13.2966V17.6401C14.6551 17.6401 12.8683 17.0712 11.4375 18.0775C10.438 18.8196 9.90623 19.5446 9.7505 20.8385C9.74562 21.5411 9.87747 22.4595 10.4847 23.2536C10.3345 23.1766 10.1815 23.0889 10.0256 22.9905C8.68807 22.0923 8.44444 20.7449 8.45095 19.7926ZM22.0352 6.97898C21.0509 5.90039 20.6786 4.81139 20.5441 4.04639H21.7823C21.7823 4.04639 21.5354 6.05224 23.3347 8.02482L23.3597 8.05134C22.8747 7.7463 22.43 7.38624 22.0352 6.97898ZM28 10.0369V14.293C28 14.293 26.42 14.2312 25.2507 13.9337C23.6179 13.5176 22.5685 12.8795 22.5685 12.8795C22.5685 12.8795 21.8436 12.4245 21.785 12.3928V21.1817C21.785 21.6711 21.651 22.8932 21.2424 23.9125C20.709 25.246 19.8859 26.1212 19.7345 26.3001C19.7345 26.3001 18.7334 27.4832 16.9672 28.28C15.3752 28.9987 13.9774 28.9805 13.5596 28.9987C13.5596 28.9987 11.1434 29.0944 8.96915 27.6814C8.49898 27.3699 8.06011 27.0172 7.6582 26.6277L7.66906 26.6355C9.84383 28.0485 12.2595 27.9528 12.2595 27.9528C12.6779 27.9346 14.0756 27.9528 15.6671 27.2341C17.4317 26.4374 18.4344 25.2543 18.4344 25.2543C18.5842 25.0754 19.4111 24.2001 19.9423 22.8662C20.3498 21.8474 20.4849 20.6247 20.4849 20.1354V11.3475C20.5435 11.3797 21.2679 11.8347 21.2679 11.8347C21.2679 11.8347 22.3179 12.4734 23.9506 12.8889C25.1204 13.1864 26.7 13.2483 26.7 13.2483V9.91314C27.2404 10.0343 27.7011 10.0671 28 10.0369Z" fill="#EE1D52"></path><path d="M26.7009 9.91314V13.2472C26.7009 13.2472 25.1213 13.1853 23.9515 12.8879C22.3188 12.4718 21.2688 11.8337 21.2688 11.8337C21.2688 11.8337 20.5444 11.3787 20.4858 11.3464V20.1364C20.4858 20.6258 20.3518 21.8484 19.9432 22.8672C19.4098 24.2012 18.5867 25.0764 18.4353 25.2553C18.4353 25.2553 17.4337 26.4384 15.668 27.2352C14.0765 27.9539 12.6788 27.9357 12.2604 27.9539C12.2604 27.9539 9.84473 28.0496 7.66995 26.6366L7.6591 26.6288C7.42949 26.4064 7.21336 26.1717 7.01177 25.9257C6.31777 25.0795 5.89237 24.0789 5.78547 23.7934C5.78529 23.7922 5.78529 23.791 5.78547 23.7898C5.61347 23.2937 5.25209 22.1022 5.30147 20.9482C5.38883 18.9122 6.10507 17.6625 6.29444 17.3494C6.79597 16.4957 7.44828 15.7318 8.22233 15.0919C8.90538 14.5396 9.6796 14.1002 10.5132 13.7917C11.4144 13.4295 12.3794 13.2353 13.3565 13.2197V16.5948C13.3565 16.5948 11.5691 16.028 10.1388 17.0317C9.13879 17.7743 8.60812 18.4987 8.45185 19.7926C8.44534 20.7449 8.68897 22.0923 10.0254 22.991C10.1813 23.0898 10.3343 23.1775 10.4845 23.2541C10.7179 23.5576 11.0021 23.8221 11.3255 24.0368C12.631 24.8632 13.7249 24.9209 15.1238 24.3842C16.0565 24.0254 16.7586 23.2167 17.0842 22.3206C17.2888 21.7611 17.2861 21.1978 17.2861 20.6154V4.04639H20.5417C20.6763 4.81139 21.0485 5.90039 22.0328 6.97898C22.4276 7.38624 22.8724 7.7463 23.3573 8.05134C23.5006 8.19955 24.2331 8.93231 25.1734 9.38216C25.6596 9.61469 26.1722 9.79285 26.7009 9.91314Z" fill="#000000"></path><path d="M4.48926 22.7568V22.7594L4.57004 22.9784C4.56076 22.9529 4.53074 22.8754 4.48926 22.7568Z" fill="#69C9D0"></path><path d="M10.5128 13.7916C9.67919 14.1002 8.90498 14.5396 8.22192 15.0918C7.44763 15.7332 6.79548 16.4987 6.29458 17.354C6.10521 17.6661 5.38897 18.9168 5.30161 20.9528C5.25223 22.1068 5.61361 23.2983 5.78561 23.7944C5.78543 23.7956 5.78543 23.7968 5.78561 23.798C5.89413 24.081 6.31791 25.0815 7.01191 25.9303C7.2135 26.1763 7.42963 26.4111 7.65924 26.6334C6.92357 26.1457 6.26746 25.5562 5.71236 24.8839C5.02433 24.0451 4.60001 23.0549 4.48932 22.7626C4.48919 22.7605 4.48919 22.7584 4.48932 22.7564V22.7527C4.31677 22.2571 3.95431 21.0651 4.00477 19.9096C4.09213 17.8736 4.80838 16.6239 4.99775 16.3108C5.4985 15.4553 6.15067 14.6898 6.92509 14.0486C7.608 13.4961 8.38225 13.0567 9.21598 12.7484C9.73602 12.5416 10.2778 12.3891 10.8319 12.2934C11.6669 12.1537 12.5198 12.1415 13.3588 12.2575V13.2196C12.3808 13.2349 11.4148 13.4291 10.5128 13.7916Z" fill="#69C9D0"></path><path d="M20.5438 4.04635H17.2881V20.6159C17.2881 21.1983 17.2881 21.76 17.0863 22.3211C16.7575 23.2167 16.058 24.0253 15.1258 24.3842C13.7265 24.923 12.6326 24.8632 11.3276 24.0368C11.0036 23.823 10.7187 23.5594 10.4844 23.2567C11.5962 23.8251 12.5913 23.8152 13.8241 23.341C14.7558 22.9821 15.4563 22.1734 15.784 21.2774C15.9891 20.7178 15.9864 20.1546 15.9864 19.5726V3H20.4819C20.4819 3 20.4315 3.41188 20.5438 4.04635ZM26.7002 8.99104V9.9131C26.1725 9.79263 25.6609 9.61447 25.1755 9.38213C24.2352 8.93228 23.5026 8.19952 23.3594 8.0513C23.5256 8.1559 23.6981 8.25106 23.8759 8.33629C25.0192 8.88339 26.1451 9.04669 26.7002 8.99104Z" fill="#69C9D0"></path></svg>
                  </span>
                </a>
              </div>
            </div>
            {/* T&C / Privacy Policy */}
            <div>
              <div className="font-bold text-lg mb-2">T &amp; C</div>
              <a href="/terms-conditions" className="text-gray-400 block mb-1">Terms &amp; Conditions</a>
              <a href="/privacy-policy" className="text-gray-400 block">Privacy Policy</a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}
