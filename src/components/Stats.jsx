import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'motion/react'
import { stats } from '../data'
import { useSectionParallax } from '../hooks/useMotion'

/* ─── Animated counter with spring physics ─── */
function AnimatedCounter({ target, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { stiffness: 50, damping: 20 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionVal.set(target)
  }, [inView, target, motionVal])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setDisplay(Math.round(v)))
    return unsub
  }, [spring])

  return (
    <span ref={ref} className="stat-counter">
      <motion.span className="stat-number">{display}</motion.span>
      {suffix && <span className="stat-suffix">{suffix}</span>}
    </span>
  )
}

/* ─── Stat Card with progress ring ─── */
function StatCard({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(14,165,233,0.2)' }}
    >
      <motion.div
        className="stat-icon-ring"
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <span className="material-symbols-outlined">{stat.icon}</span>
      </motion.div>

      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
      <div className="stat-label">{stat.label}</div>

      {/* Decorative bar */}
      <motion.div
        className="stat-bar"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 + index * 0.1 }}
      />
    </motion.div>
  )
}

export default function Stats() {
  const { ref, y } = useSectionParallax(15)

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Impact by Numbers
          </motion.h2>
        </motion.div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
