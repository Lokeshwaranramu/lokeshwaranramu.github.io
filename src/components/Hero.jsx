import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react'
import { personalInfo } from '../data'
import { useMagnetic, useMouseParallax, splitText, charReveal, staggerContainer } from '../hooks/useMotion'

const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

/* ─── Interactive Particle Constellation (performance-optimised) ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    let visible = true
    // Fewer particles on touch/mobile, no gradient glow, no connections
    const PARTICLE_COUNT = IS_TOUCH ? 25 : 65
    const CONNECT_DIST = 120
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const colors = ['#0284c7', '#4f46e5', '#16a34a', '#ea580c', '#ca8a04', '#db2777']

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const resize = () => {
      canvas.width = canvas.offsetWidth * DPR
      canvas.height = canvas.offsetHeight * DPR
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    class Particle {
      constructor(w, h) {
        this.reset(w, h)
      }
      reset(w, h) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.35
        this.vy = (Math.random() - 0.5) * 0.35
        this.baseR = Math.random() * 2 + 0.8
        this.r = this.baseR
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.baseAlpha = Math.random() * 0.5 + 0.15
        this.pulseSpeed = Math.random() * 0.015 + 0.005
        this.pulseOffset = Math.random() * Math.PI * 2
        this.tick = 0
        this.w = w; this.h = h
      }
      update(mouse) {
        this.tick++
        if (!IS_TOUCH) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150 * 0.6
            this.vx += (dx / dist) * force
            this.vy += (dy / dist) * force
            this.r = this.baseR + (150 - dist) / 150 * 2
          } else {
            this.r += (this.baseR - this.r) * 0.05
          }
        }
        this.vx *= 0.98; this.vy *= 0.98
        this.x = (this.x + this.vx + this.w) % this.w
        this.y = (this.y + this.vy + this.h) % this.h
      }
      draw(ctx) {
        const alpha = this.baseAlpha + Math.sin(this.tick * this.pulseSpeed + this.pulseOffset) * 0.25
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = Math.max(0.05, Math.min(1, alpha))
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const init = () => {
      resize()
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle(w, h))
    }

    const drawConnections = () => {
      if (IS_TOUCH) return
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(2,132,199,${0.06 * (1 - dist / CONNECT_DIST)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
        const mx = mouseRef.current
        const mdx = particles[i].x - mx.x, mdy = particles[i].y - mx.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 180) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mx.x, mx.y)
          ctx.strokeStyle = `rgba(79,70,229,${0.1 * (1 - mdist / 180)})`
          ctx.lineWidth = 0.6; ctx.stroke()
        }
      }
    }

    const animate = () => {
      animId = requestAnimationFrame(animate)
      if (!visible) return
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      particles.forEach(p => { p.update(mouseRef.current); p.draw(ctx) })
      drawConnections()
    }

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }

    init(); animate()
    const resizeObs = new ResizeObserver(init)
    resizeObs.observe(canvas)
    if (!IS_TOUCH) {
      canvas.addEventListener('mousemove', onMouse, { passive: true })
      canvas.addEventListener('mouseleave', onLeave)
    }
    return () => {
      cancelAnimationFrame(animId)
      io.disconnect()
      resizeObs.disconnect()
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

/* ─── Floating shapes (desktop only) ─── */
function FloatingShapes() {
  const m1 = useMouseParallax(0.03)
  const m2 = useMouseParallax(0.05)
  const m3 = useMouseParallax(0.02)
  if (IS_TOUCH) return null
  return (
    <div className="hero-shapes" aria-hidden="true">
      <motion.div className="hero-shape hero-shape-1" style={{ x: m1.x, y: m1.y }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} />
      <motion.div className="hero-shape hero-shape-2" style={{ x: m2.x, y: m2.y }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 35, ease: 'linear' }} />
      <motion.div className="hero-shape hero-shape-3" style={{ x: m3.x, y: m3.y }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} />
      <motion.div className="hero-shape hero-shape-4" style={{ x: m2.x, y: m3.y }} animate={{ rotate: 360, borderRadius: ['30%', '50%', '30%'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} />
    </div>
  )
}

/* ─── Typewriter (no per-char motion elements — uses plain text render) ─── */
function TypewriterRoles({ roles }) {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 20 : 45
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) setTimeout(() => setDeleting(true), 2200)
        else setCharIndex(c => c + 1)
      } else {
        setText(current.slice(0, charIndex))
        if (charIndex === 0) { setDeleting(false); setRoleIndex(r => (r + 1) % roles.length) }
        else setCharIndex(c => c - 1)
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, roleIndex, roles])

  return (
    <span className="typewriter-text">
      {text}
      <motion.span className="cursor" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}>|</motion.span>
    </span>
  )
}

function MagneticButton({ children, className, ...props }) {
  const mag = useMagnetic(0.4)
  return (
    <motion.a ref={mag.ref} style={mag.style} className={className} whileTap={{ scale: 0.95 }} {...(!IS_TOUCH && { whileHover: { scale: 1.05 } })} {...props}>{children}</motion.a>
  )
}

function AnimatedTitle({ text }) {
  const chars = splitText(text)
  return (
    <motion.h1 className="hero-title" variants={staggerContainer(0.4, IS_TOUCH ? 0.04 : 0.03)} initial="hidden" animate="show">
      {chars.map(({ char, index }) => (
        <motion.span key={index} variants={charReveal} transition={{ duration: 0.4, type: 'spring', stiffness: 220 }} style={{ display: 'inline-block' }}>{char}</motion.span>
      ))}
    </motion.h1>
  )
}

/* ─── Avatar — CSS ring rotation, no rAF loop ─── */
function InteractiveAvatar() {
  const mouse = useMouseParallax(0.01)

  return (
    <motion.div className="hero-avatar-wrapper" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 12 }}>
      {/* ring spins via CSS animation instead of rAF */}
      <motion.div className="hero-avatar-ring hero-avatar-ring--spin" style={IS_TOUCH ? {} : { x: mouse.x, y: mouse.y }} />
      <motion.div className="hero-avatar-glow" animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }} />
      <motion.div className="hero-avatar" style={IS_TOUCH ? {} : { x: mouse.x, y: mouse.y }}>
        <img src={personalInfo.profileImage} alt={personalInfo.name} />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  // Disable parallax on touch — iOS momentum scroll makes it janky
  const bgY = useTransform(scrollYProgress, [0, 1], IS_TOUCH ? ['0%', '0%'] : ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], IS_TOUCH ? ['0%', '0%'] : ['0%', '12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, IS_TOUCH ? 1 : 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], IS_TOUCH ? [1, 1] : [1, 1.08])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <ParticleCanvas />
        <FloatingShapes />
        <div className="hero-gradient hero-gradient-1" />
        <div className="hero-gradient hero-gradient-2" />
        <div className="hero-gradient hero-gradient-3" />
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <InteractiveAvatar />
        <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}>
          <motion.span className="hero-badge-dot" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
          Available for opportunities
        </motion.div>
        <AnimatedTitle text={personalInfo.name} />
        <motion.div className="hero-roles" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <TypewriterRoles roles={personalInfo.roles} />
        </motion.div>
        <motion.p className="hero-desc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          6x Salesforce Certified Architect & Developer crafting enterprise CRM solutions from Adelaide, Australia
        </motion.p>
        <motion.div className="hero-buttons" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, type: 'spring' }}>
          <MagneticButton href="#contact" className="btn btn-primary btn-glow">
            <span className="material-symbols-outlined">chat</span>
            Get in Touch
          </MagneticButton>
          <MagneticButton href="#projects" className="btn btn-secondary">
            <span className="material-symbols-outlined">arrow_downward</span>
            View Work
          </MagneticButton>
        </motion.div>
      </motion.div>

    </section>
  )
}


/* ─── Interactive Particle Constellation ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const colors = ['#0284c7', '#4f46e5', '#16a34a', '#ea580c', '#ca8a04', '#db2777']

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = (Math.random() - 0.5) * 0.4
        this.baseR = Math.random() * 2.5 + 0.5
        this.r = this.baseR
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.baseAlpha = Math.random() * 0.6 + 0.1
        this.pulseSpeed = Math.random() * 0.02 + 0.005
        this.pulseOffset = Math.random() * Math.PI * 2
        this.tick = 0
        this.w = w; this.h = h
      }
      update(mouse) {
        this.tick++
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          const force = (200 - dist) / 200 * 0.8
          this.vx += (dx / dist) * force
          this.vy += (dy / dist) * force
          this.r = this.baseR + (200 - dist) / 200 * 3
        } else {
          this.r += (this.baseR - this.r) * 0.05
        }
        this.vx *= 0.98; this.vy *= 0.98
        this.x += this.vx; this.y += this.vy
        if (this.x < 0) this.x = this.w
        if (this.x > this.w) this.x = 0
        if (this.y < 0) this.y = this.h
        if (this.y > this.h) this.y = 0
      }
      draw(ctx) {
        const alpha = this.baseAlpha + Math.sin(this.tick * this.pulseSpeed + this.pulseOffset) * 0.3
        const a = Math.max(0.05, Math.min(1, alpha))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = a
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2)
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3)
        grad.addColorStop(0, this.color); grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad; ctx.globalAlpha = a * 0.15; ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const init = () => {
      resize()
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      particles = Array.from({ length: 100 }, () => new Particle(w, h))
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(2,132,199,${0.08 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
        const mdx = particles[i].x - mouseRef.current.x
        const mdy = particles[i].y - mouseRef.current.y
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < 200) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
          ctx.strokeStyle = `rgba(79,70,229,${0.12 * (1 - mdist / 200)})`
          ctx.lineWidth = 0.8; ctx.stroke()
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      particles.forEach(p => { p.update(mouseRef.current); p.draw(ctx) })
      drawConnections()
      animId = requestAnimationFrame(animate)
    }

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }

    init(); animate()
    window.addEventListener('resize', init)
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', init) }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}

function FloatingShapes() {
  const m1 = useMouseParallax(0.03)
  const m2 = useMouseParallax(0.05)
  const m3 = useMouseParallax(0.02)
  return (
    <div className="hero-shapes" aria-hidden="true">
      <motion.div className="hero-shape hero-shape-1" style={{ x: m1.x, y: m1.y }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 25, ease: 'linear' }} />
      <motion.div className="hero-shape hero-shape-2" style={{ x: m2.x, y: m2.y }} animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 35, ease: 'linear' }} />
      <motion.div className="hero-shape hero-shape-3" style={{ x: m3.x, y: m3.y }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }} />
      <motion.div className="hero-shape hero-shape-4" style={{ x: m2.x, y: m3.y }} animate={{ rotate: 360, borderRadius: ['30%', '50%', '30%'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }} />
    </div>
  )
}

function TypewriterRoles({ roles }) {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = deleting ? 25 : 50
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) setTimeout(() => setDeleting(true), 2500)
        else setCharIndex(c => c + 1)
      } else {
        setText(current.slice(0, charIndex))
        if (charIndex === 0) { setDeleting(false); setRoleIndex(r => (r + 1) % roles.length) }
        else setCharIndex(c => c - 1)
      }
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, deleting, roleIndex, roles])

  return (
    <span className="typewriter-text">
      {text.split('').map((char, i) => (
        <motion.span key={`${roleIndex}-${i}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.08 }} style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <motion.span className="cursor" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}>|</motion.span>
    </span>
  )
}

function MagneticButton({ children, className, ...props }) {
  const mag = useMagnetic(0.4)
  return (
    <motion.a ref={mag.ref} style={mag.style} className={className} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} {...props}>{children}</motion.a>
  )
}

function AnimatedTitle({ text }) {
  const chars = splitText(text)
  return (
    <motion.h1 className="hero-title" variants={staggerContainer(0.4, 0.03)} initial="hidden" animate="show">
      {chars.map(({ char, index }) => (
        <motion.span key={index} variants={charReveal} transition={{ duration: 0.5, type: 'spring', stiffness: 200 }} style={{ display: 'inline-block' }}>{char}</motion.span>
      ))}
    </motion.h1>
  )
}

function InteractiveAvatar() {
  const mouse = useMouseParallax(0.01)
  const rotate = useMotionValue(0)
  useEffect(() => {
    let frame, deg = 0
    const spin = () => { deg += 0.3; rotate.set(deg); frame = requestAnimationFrame(spin) }
    spin()
    return () => cancelAnimationFrame(frame)
  }, [rotate])

  return (
    <motion.div className="hero-avatar-wrapper" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, type: 'spring', stiffness: 80, damping: 12 }}>
      <motion.div className="hero-avatar-ring" style={{ rotate, x: mouse.x, y: mouse.y }} />
      <motion.div className="hero-avatar-glow" animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} />
      <motion.div className="hero-avatar" style={{ x: mouse.x, y: mouse.y }}>
        <img src={personalInfo.profileImage} alt={personalInfo.name} />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      <motion.div className="hero-bg" style={{ y: bgY, scale: bgScale }}>
        <ParticleCanvas />
        <FloatingShapes />
        <div className="hero-gradient hero-gradient-1" />
        <div className="hero-gradient hero-gradient-2" />
        <div className="hero-gradient hero-gradient-3" />
      </motion.div>

      <motion.div className="hero-content" style={{ y: contentY, opacity: contentOpacity }}>
        <InteractiveAvatar />
        <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}>
          <motion.span className="hero-badge-dot" animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
          Available for opportunities
        </motion.div>
        <AnimatedTitle text={personalInfo.name} />
        <motion.div className="hero-roles" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <TypewriterRoles roles={personalInfo.roles} />
        </motion.div>
        <motion.p className="hero-desc" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          6x Salesforce Certified Architect & Developer crafting enterprise CRM solutions from Adelaide, Australia
        </motion.p>
        <motion.div className="hero-buttons" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: 'spring' }}>
          <MagneticButton href="#contact" className="btn btn-primary btn-glow">
            <span className="material-symbols-outlined">chat</span>
            Get in Touch
          </MagneticButton>
          <MagneticButton href="#projects" className="btn btn-secondary">
            <span className="material-symbols-outlined">arrow_downward</span>
            View Work
          </MagneticButton>
        </motion.div>
      </motion.div>

    </section>
  )
}
