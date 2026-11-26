"use client"
import React from "react"
import { usePathname } from "next/navigation"

export const FixedButtons = () => {
  const pathname = usePathname()
  const [showScrollTop, setShowScrollTop] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Don't render on /admin or auth pages
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up")
  ) {
    return null
  }

  return (
    <>
      {/* Scroll to Top Button (Bottom Left) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          style={{
            position: "fixed",
            left: "1.5rem",
            bottom: "1.5rem",
            zIndex: 30,
            background: "#fff",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            width: "48px",
            height: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            transition: "box-shadow 0.2s, bottom 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(0,0,0,0.25)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(0,0,0,0.15)")
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19V5"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12L12 5L19 12"
              stroke="#222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/94765533874"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-1 bottom-1 lg:right-3 lg:bottom-3 z-30 flex items-center group no-underline cursor-pointer select-none"
      >
        {/* Chat with us text bubble */}
        <span className="relative bg-[#25D366] text-white px-4 py-2 lg:px-4.5 lg:py-2.5 rounded-full text-sm lg:text-[15px] font-medium shadow-md whitespace-nowrap transition-transform duration-200 group-hover:scale-105 mr-[-6px]">
          Chat with us
          <span
            className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderLeft: "7px solid #25D366",
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
            }}
          />
        </span>

        {/* Animated WhatsApp icon */}
        <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
          <iframe
            src="https://lottie.host/embed/1207ea19-22eb-4450-b8f9-d03b3a00f187/EVzS4iKWsm.lottie"
            title="WhatsApp Animation"
            className="w-[88px] h-[88px] lg:w-[100px] lg:h-[100px]"
            style={{ border: "none", background: "none", pointerEvents: "none" }}
            allowFullScreen
          />
        </div>
      </a>
    </>
  )
}
