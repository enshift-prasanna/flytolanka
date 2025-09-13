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

      <a
        href="https://wa.me/94771234567"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact via WhatsApp"
        style={{
          position: 'fixed',
          right: '1.5rem',
          bottom: '1.5rem',
          zIndex: 50,
          background: 'none',
          boxShadow: 'none',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        ...(
          typeof window !== 'undefined' && window.innerWidth <= 600
            ? { right: '0.5rem', bottom: '0.5rem' }
            : {}
        )
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
