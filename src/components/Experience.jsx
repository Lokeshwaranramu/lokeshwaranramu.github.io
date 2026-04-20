import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { experience } from '../data'
import { useSectionParallax, staggerContainer, slideInLeft } from '../hooks/useMotion'

function formatDate(d) {
  if (!d) return 'Present'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
function calcDuration(s, e) {
  const start = new Date(s), end = e ? new Date(e) : new Date()
  let y = end.getFullYear() - start.getFullYear(), m = end.getMonth() - start.getMonth()
  if (m < 0) { y--; m += 12 }
  let r = ''
  if (y > 0) r += `${y}y `
  if (m > 0) r += `${m}m`
  return r.trim() || '1m'
}

/* ─── Timeline dot with scroll-linked pulse ─── */
function TimelineDot({ index, isLast }) {
  return (
    <div className="timeline-dot-wrapper">
      <motion.div
        className="timeline-dot"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, delay: index * 0.15 }}
      >
        <motion.div
          className="timeline-dot-pulse"
          animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
        />
      </motion.div>
    </div>
  )
}

/* ─── Experience card with hover expand ─── */
function ExperienceCard({ job, index }) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      className={`timeline-item ${isLeft ? 'timeline-left' : 'timeline-right'}`}
      initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, type: 'spring', stiffness: 100, delay: index * 0.12 }}
    >
      <TimelineDot index={index} isLast={index === experience.length - 1} />

      <motion.div
        className="timeline-card"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="timeline-date-badge">
          <span className="material-symbols-outlined">calendar_month</span>
          {formatDate(job.startDate)} — {formatDate(job.endDate)}
          <span className="timeline-duration">{calcDuration(job.startDate, job.endDate)}</span>
        </div>

        <h3 className="timeline-title">{job.title}</h3>

        <div className="timeline-company">
          <span className="material-symbols-outlined">apartment</span>
          {job.company}
          <span className="timeline-location">
            <span className="material-symbols-outlined">location_on</span>
            {job.location}
          </span>
        </div>

        <p className="timeline-desc">{job.desc}</p>

        {/* Decorative animated bar */}
        <motion.div
          className="timeline-progress-bar"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 + index * 0.15 }}
        />
      </motion.div>
    </motion.div>
  )
}

/* ─── Animated timeline line that draws on scroll ─── */
function TimelineLine() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <div className="timeline-line-wrapper" ref={ref}>
      <motion.div className="timeline-line-bg" />
      <motion.div className="timeline-line-progress" style={{ scaleY, transformOrigin: 'top' }} />
    </div>
  )
}

/* ─── EXPERIENCE SECTION ─── */
export default function Experience() {
  const { ref, y } = useSectionParallax(20)

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional Journey
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A track record of impactful Salesforce implementations
          </motion.p>
        </motion.div>

        <div className="timeline">
          <TimelineLine />
          {experience.map((job, i) => (
            <ExperienceCard key={job.company} job={job} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
