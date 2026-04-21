import { motion } from 'motion/react'
import { features } from '../data'
import { useSectionParallax, staggerContainer, fadeUp } from '../hooks/useMotion'

const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

const iconList = [
  'cloud', 'code', 'integration_instructions', 'database', 'security',
  'automation', 'terminal', 'api', 'storage', 'settings', 'data_object',
  'developer_mode', 'device_hub', 'build', 'shield', 'sync', 'upload',
  'download', 'extension', 'dashboard', 'deployed_code', 'folder', 'memory', 'bolt',
]

function FeatureCard({ feature, index }) {
  const isEven = index % 2 === 0
  return (
    <motion.div
      className={`feature-card ${isEven ? '' : 'feature-card-reverse'}`}
      initial={{ opacity: 0, y: 40, x: IS_TOUCH ? 0 : (isEven ? -25 : 25) }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 90 }}
    >
      <motion.div
        className="feature-icon-wrapper"
        whileHover={{ rotate: 360, scale: 1.15 }}
        transition={{ duration: 0.6 }}
      >
        <span className="material-symbols-outlined">{feature.icon}</span>
        <motion.div
          className="feature-icon-ring"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        />
      </motion.div>
      <div className="feature-content">
        <h3>{feature.title}</h3>
        <p>{feature.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Features() {
  const { ref, y } = useSectionParallax(20)

  return (
    <section id="features" className="features-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Building the Future of Salesforce
          </motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Core competencies that drive enterprise transformation
          </motion.p>
        </motion.div>

        {/* Infinite icon strip */}
        <div className="icon-strip">
          <div className="icon-strip-inner">
            {[...iconList, ...iconList].map((icon, i) => (
              <motion.span
                key={i}
                className="material-symbols-outlined icon-strip-icon"
                style={{ animationDelay: `${(i % iconList.length) * -0.5}s` }}
                whileHover={{ scale: 1.4, color: 'var(--accent-primary)', y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {icon}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Feature cards */}
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
