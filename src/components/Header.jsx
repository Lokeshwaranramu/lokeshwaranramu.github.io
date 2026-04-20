import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { personalInfo } from '../data'
import { useMagnetic } from '../hooks/useMotion'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
]

function MagneticNavItem({ href, label, onClick }) {
  const { ref, style } = useMagnetic(0.3)
  return (
    <motion.a
      ref={ref}
      style={style}
      href={href}
      onClick={onClick}
      className="nav-link"
      whileHover={{ color: 'var(--accent-primary)' }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.a>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const resumeMag = useMagnetic(0.2)

  useEffect(() => {
    let lastY = 0
    const handleScroll = () => {
      const y = window.scrollY
      setHidden(y > 100 && y > lastY)
      setScrolled(y > 50)
      lastY = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <motion.header
      className={`header ${scrolled ? 'header-scrolled' : ''}`}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="header-inner">
        <motion.a
          href="#"
          className="header-logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="logo-text">{personalInfo.name.split(' ')[0]}</span>
          <span className="logo-dot">.</span>
        </motion.a>

        <nav className="header-nav">
          {navLinks.map((l) => (
            <MagneticNavItem key={l.href} href={l.href} label={l.label} />
          ))}
        </nav>

        <motion.a
          ref={resumeMag.ref}
          style={resumeMag.style}
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary header-cta"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(14,165,233,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-symbols-outlined">download</span>
          Resume
        </motion.a>

        <motion.button
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
        >
          <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} />
          <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} />
          <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} />
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                className="mobile-nav-link"
                onClick={closeMobile}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
