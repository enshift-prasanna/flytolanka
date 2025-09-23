"use client"
import React from "react"

export const FixedButtons = () => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll to Top Button (Bottom Left) */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            left: '1.5rem',
            bottom: '1.5rem',
            zIndex: 50,
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s'
          }}
          onMouseOver={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)')}
          onMouseOut={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 12L12 5L19 12" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Chat with us text box */}
      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-28 bottom-10 lg:right-35 lg:bottom-13 z-50 bg-[#25D366] text-white px-5 py-2 lg:px-6 lg:py-3 rounded-[20px] text-lg lg:text-lg font-medium shadow-lg whitespace-nowrap no-underline block cursor-pointer transition-transform duration-200 hover:scale-105"
        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Chat with us
        {/* Arrow pointing to WhatsApp button */}
        <div
          style={{
            position: 'absolute',
            right: '-8px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderLeft: '8px solid #25D366',
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent'
          }}
        />
      </a>

      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
        className="fixed right-0 bottom-0 lg:right-4 lg:bottom-4 z-50 w-[120px] h-[120px] flex items-center justify-center cursor-pointer p-0"
        style={{
          background: 'none',
          boxShadow: 'none',
          border: 'none'
        }}
      >
        <iframe
          src="https://lottie.host/embed/1207ea19-22eb-4450-b8f9-d03b3a00f187/EVzS4iKWsm.lottie"
          title="WhatsApp Animation"
          style={{ width: '120px', height: '120px', border: 'none', background: 'none', pointerEvents: 'none' }}
          allowFullScreen
        />
      </a>
    </>
  )
}
