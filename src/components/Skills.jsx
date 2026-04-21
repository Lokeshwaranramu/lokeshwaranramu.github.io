import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react'
import { skills } from '../data'
import { useSectionParallax, staggerContainer, fadeScale } from '../hooks/useMotion'

/* ─── Skill node with interactive glow ring ─── */
function SkillNode({ skill, index, total }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 400, damping: 30 })
  const springRY = useSpring(rotateY, { stiffness: 400, damping: 30 })
  const [hovered, setHovered] = useState(false)

  const handleMouse = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((py - 0.5) * -15)
    rotateY.set((px - 0.5) * 15)
  }
  const handleLeave = () => { rotateX.set(0); rotateY.set(0); setHovered(false) }

  const colorMap = {
    ai: '#ec4899', platform: '#6366f1', frontend: '#0ea5e9',
    backend: '#22c55e', automation: '#f97316', data: '#eab308',
    architecture: '#8b5cf6', integration: '#14b8a6', security: '#ef4444',
    marketing: '#f472b6',
  }
  const color = colorMap[skill.category] || '#0ea5e9'

  return (
    <motion.div
      ref={ref}
      className={`skill-node ${hovered ? 'skill-node-active' : ''}`}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 600,
        '--skill-color': color,
      }}
      variants={fadeScale}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated ring */}
      <motion.div
        className="skill-ring"
        animate={hovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
        transition={hovered ? { rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, scale: { duration: 0.3 } } : { duration: 0.3 }}
      />

      {/* Floating particles on hover */}
      {hovered && (
        <div className="skill-particles">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos((i / 6) * Math.PI * 2) * 40,
                y: Math.sin((i / 6) * Math.PI * 2) * 40,
              }}
              transition={{ duration: 1.2, delay: i * 0.1, repeat: Infinity }}
              style={{ background: color }}
              className="skill-particle-dot"
            />
          ))}
        </div>
      )}

      <span className="material-symbols-outlined skill-icon" style={{ color }}>{skill.icon}</span>
      <strong className="skill-name">{skill.name}</strong>
      <span className="skill-desc">{skill.desc}</span>

      {/* Glow backdrop */}
      <motion.div
        className="skill-glow"
        animate={hovered ? { opacity: 0.4, scale: 1.2 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
      />
    </motion.div>
  )
}

/* ─── Connecting lines canvas ─── */
function SkillConnections() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    const animate = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
      const nodes = canvas.parentElement.querySelectorAll('.skill-node')
      const rects = Array.from(nodes).map(n => {
        const r = n.getBoundingClientRect()
        const cr = canvas.getBoundingClientRect()
        return { x: r.left - cr.left + r.width / 2, y: r.top - cr.top + r.height / 2 }
      })

      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          const dx = rects[i].x - rects[j].x
          const dy = rects[i].y - rects[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 250) {
            const alpha = 0.06 * (1 - dist / 250) * (0.5 + 0.5 * Math.sin(time + i + j))
            ctx.beginPath()
            ctx.moveTo(rects[i].x, rects[i].y)
            ctx.lineTo(rects[j].x, rects[j].y)
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(animate)
    }

    resize(); animate()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="skill-connections-canvas" />
}

/* ─── SKILLS SECTION ─── */
export default function Skills() {
  const { ref, y } = useSectionParallax(20)

  return (
    <section id="skills" className="skills-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Technical Expertise
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Hover to interact — Technologies and platforms I specialize in
          </motion.p>
        </motion.div>

        <div className="skills-wrapper">
          <SkillConnections />
          <motion.div
            className="skills-grid"
            variants={staggerContainer(0.1, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {skills.map((s, i) => (
              <SkillNode key={s.name} skill={s} index={i} total={skills.length} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
