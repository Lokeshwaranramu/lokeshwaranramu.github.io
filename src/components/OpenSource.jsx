import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { openSourceProjects } from '../data'
import { useSectionParallax } from '../hooks/useMotion'

/* ─── GitHub-style contribution activity ─── */
function ActivityGraph({ results }) {
  return (
    <div className="os-activity">
      {results.map((r, i) => (
        <motion.div
          key={r.label}
          className="os-activity-bar"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 150 }}
          style={{ transformOrigin: 'bottom' }}
        >
          <motion.div
            className="os-activity-fill"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
          />
          <span className="os-activity-value">{r.value}</span>
          <span className="os-activity-label">{r.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ─── Open Source Card ─── */
function OSCard({ project, index }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      className="os-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 100 }}
    >
      <div className="os-card-header">
        <motion.div
          className="os-card-icon"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
        >
          <span className="material-symbols-outlined">{project.icon}</span>
        </motion.div>
        <div>
          <h3>
            <a href={project.repo} target="_blank" rel="noopener noreferrer">{project.title}</a>
          </h3>
          <div className="os-meta">
            <span><span className="material-symbols-outlined">schedule</span>{project.duration}</span>
            <span><span className="material-symbols-outlined">star</span>Open Source</span>
          </div>
        </div>
      </div>

      <div className="os-card-sections">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <h4><span className="material-symbols-outlined">warning</span> Challenge</h4>
          <p>{project.challenge}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          <h4><span className="material-symbols-outlined">lightbulb</span> Solution</h4>
          <p>{project.solution}</p>
        </motion.div>
      </div>

      <div className="os-card-tech">
        {project.tech.map((t, i) => (
          <motion.span
            key={t}
            className="tech-tag"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.05, type: 'spring' }}
          >
            {t}
          </motion.span>
        ))}
      </div>

      <ActivityGraph results={project.results} />

      <motion.a
        href={project.repo}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary os-cta"
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(14,165,233,0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="material-symbols-outlined">code</span>
        View on GitHub
      </motion.a>
    </motion.div>
  )
}

export default function OpenSource() {
  const { ref, y } = useSectionParallax(20)

  return (
    <section className="opensource-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Open Source Solutions
          </motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Problem-solving through code: innovative solutions, measurable results
          </motion.p>
        </motion.div>

        <div className="opensource-grid">
          {openSourceProjects.map((p, i) => (
            <OSCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
