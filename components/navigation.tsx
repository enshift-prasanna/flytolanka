"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail, Calendar } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile fullscreen menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  ) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/vehicles", label: "Vehicles" },
    { href: "/drivers", label: "Drivers" },
    { href: "/packages", label: "Packages" },
    { href: "/sri-lanka", label: "Sri Lanka" },
    { href: "/things-to-do", label: "Things to Do" },
  ];

  return (
    <header className={`bg-white shadow-sm border-b sticky top-0 ${isOpen ? "z-[9999]" : "z-50"}`}>
      {/* Top contact bar */}
      <div className="bg-secondary text-white py-2">
        <div className="container mx-auto px-4 lg:px-24 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4 mx-auto lg:mx-0">
            <Link href="tel:+94765533874" className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>+94 76 553 3874</span>
            </Link>
            <Link
              href="mailto:info@flytolanka.com"
              className="flex items-center gap-1"
            >
              <Mail className="h-4 w-4" />
              <span>info@flytolanka.com</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <span>24/7 Customer Support</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <div className="bg-primary text-white px-3 py-2 rounded-lg font-bold text-xl">
              FTLT
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900">
                Fly To Lanka Tours
              </span>
              <span className="text-sm text-gray-600">Travel & Transport</span>
            </div>
          </Link>

          {/* Desktop Navigation Links & Tailor Made (Middle of Navbar) */}
          <div className="hidden md:flex items-center justify-center space-x-4 lg:space-x-6 flex-1 px-4 lg:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors text-sm lg:text-base whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/tailor-made">
              <Button className="bg-secondary hover:bg-secondary/80 text-white font-medium text-sm">
                Tailor Made
              </Button>
            </Link>
          </div>

          {/* Right Side: Strictly Sign-in Related */}
          <div className="hidden md:flex items-center shrink-0">
            <Show when="signed-in">
              <div className="flex items-center space-x-3">
                <Link href="/my-bookings">
                  <Button className="h-10 px-5 text-[15px] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-lg shadow-sm border border-yellow-300 transition-all hover:shadow-md">
                    My Bookings
                  </Button>
                </Link>
                <div className="rounded-full p-[2.5px] bg-gradient-to-r from-yellow-400 to-yellow-500 border border-yellow-300 shadow-sm flex items-center justify-center hover:shadow-md transition-all">
                  <UserButton />
                </div>
              </div>
            </Show>
            <Show when="signed-out">
              <Link href="/sign-in">
                <Button className="h-10 px-6 text-[15px] bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold rounded-lg shadow-sm border border-yellow-300 transition-all hover:shadow-md">
                  Sign In
                </Button>
              </Link>
            </Show>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="h-7 w-7 text-gray-800" />
            ) : (
              <Menu className="h-7 w-7 text-gray-800" />
            )}
          </Button>
        </div>

        {/* Fullscreen Mobile Navigation */}
        {isOpen && (
          <div className="fixed inset-0 z-[9999] bg-white flex flex-col justify-between p-6 md:hidden overflow-y-auto">
            {/* Top Bar with Logo and Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2"
              >
                <div className="bg-primary text-white px-3 py-2 rounded-lg font-bold text-xl">
                  FTLT
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-900">
                    Fly To Lanka Tours
                  </span>
                  <span className="text-xs text-gray-600">Travel & Transport</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* Centered Navigation Links */}
            <div className="flex flex-col items-center justify-center space-y-5 py-6 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors tracking-tight text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Bottom Actions & Contacts */}
            <div className="space-y-4 pt-4 border-t border-gray-100 w-full max-w-sm mx-auto">
              <Link
                href="/tailor-made"
                className="block w-full"
                onClick={() => setIsOpen(false)}
              >
                <Button className="w-full h-14 bg-secondary hover:bg-secondary/80 text-white font-semibold text-base rounded-xl shadow-sm cursor-pointer flex items-center justify-center">
                  Tailor Made
                </Button>
              </Link>

              <Show when="signed-in">
                <div className="flex items-center justify-center gap-3 w-full">
                  <Link
                    href="/my-bookings"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <Button className="w-full h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-base rounded-xl shadow-sm border border-yellow-300 cursor-pointer flex items-center justify-center">
                      My Bookings
                    </Button>
                  </Link>
                  <div className="rounded-full p-[2.5px] bg-gradient-to-r from-yellow-400 to-yellow-500 border border-yellow-300 shadow-sm flex items-center justify-center shrink-0">
                    <UserButton />
                  </div>
                </div>
              </Show>

              <Show when="signed-out">
                <Link
                  href="/sign-in"
                  className="block w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full h-14 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold text-base rounded-xl shadow-sm border border-yellow-300 cursor-pointer flex items-center justify-center">
                    Sign In
                  </Button>
                </Link>
              </Show>

              {/* Quick Contact Footer */}
              <div className="flex justify-center items-center gap-6 text-xs text-gray-500 pt-1">
                <a
                  href="tel:+94765533874"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" /> +94 76 553 3874
                </a>
                <a
                  href="mailto:info@flytolanka.com"
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" /> info@flytolanka.com
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
