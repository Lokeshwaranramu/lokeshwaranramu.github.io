import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { caseStudies } from '../data'
import { useSectionParallax } from '../hooks/useMotion'

function AnimatedResult({ result, delay }) {
  return (
    <motion.div
      className="result-item"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      <motion.span
        className="result-value"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.15 }}
      >
        {result.value}
      </motion.span>
      <span className="result-label">{result.label}</span>
    </motion.div>
  )
}

function CaseStudyCard({ study, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="case-study-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 120 }}
      layout
    >
      <motion.div
        className="case-study-header"
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: 'rgba(14,165,233,0.08)' }}
        whileTap={{ scale: 0.99 }}
      >
        <motion.div
          className="case-study-icon"
          animate={open ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="material-symbols-outlined">{study.icon}</span>
        </motion.div>
        <h3>{study.title}</h3>
        <motion.span
          className="material-symbols-outlined case-study-toggle"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          expand_more
        </motion.span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="case-study-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="case-study-content">
              <motion.div className="case-study-section" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h4><span className="material-symbols-outlined">warning</span> Challenge</h4>
                <p>{study.challenge}</p>
              </motion.div>

              <motion.div className="case-study-section" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h4><span className="material-symbols-outlined">lightbulb</span> Solution</h4>
                <p>{study.solution}</p>
              </motion.div>

              <motion.div className="case-study-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <h4>Technologies</h4>
                <div className="tech-tags">
                  {study.tech.map((t, i) => (
                    <motion.span
                      key={t}
                      className="tech-tag"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05, type: 'spring' }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="case-study-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h4><span className="material-symbols-outlined">trending_up</span> Results</h4>
                <div className="results-grid">
                  {study.results.map((r, i) => (
                    <AnimatedResult key={r.label} result={r} delay={0.5 + i * 0.1} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CaseStudies() {
  const { ref, y } = useSectionParallax(20)

  return (
    <section className="case-studies-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Success Stories
          </motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Click to expand — Real-world challenges and solutions
          </motion.p>
        </motion.div>

        <div className="case-studies-grid">
          {caseStudies.map((s, i) => (
            <CaseStudyCard key={s.title} study={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
