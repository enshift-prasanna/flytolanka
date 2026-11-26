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

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  ) {
    return null;
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/packages", label: "Packages" },
    { href: "/sri-lanka", label: "Blogs" },
    { href: "/things-to-do", label: "Things to Do" },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-primary font-medium py-1 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                <Link href="/tailor-made" onClick={() => setIsOpen(false)}>
                  <Button className="bg-secondary hover:bg-secondary/80 w-full text-white font-medium">
                    Tailor Made
                  </Button>
                </Link>
                <Show when="signed-in">
                  <div className="flex items-center gap-2">
                    <Link href="/my-bookings" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold border border-yellow-300">
                        My Bookings
                      </Button>
                    </Link>
                    <div className="rounded-full p-[2.5px] bg-gradient-to-r from-yellow-400 to-yellow-500 border border-yellow-300 shadow-sm flex items-center justify-center shrink-0">
                      <UserButton />
                    </div>
                  </div>
                </Show>
                <Show when="signed-out">
                  <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold border border-yellow-300">
                      Sign In
                    </Button>
                  </Link>
                </Show>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
