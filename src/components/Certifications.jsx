import { motion } from 'motion/react'
import { certifications, courses } from '../data'
import { useSectionParallax, staggerContainer } from '../hooks/useMotion'

export default function Certifications() {
  const { ref, y } = useSectionParallax(15)

  return (
    <section id="certifications" className="certs-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Certifications & Credentials
          </motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            6x Salesforce Certified professional
          </motion.p>
        </motion.div>

        <motion.div
          className="certs-grid"
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              className="cert-card"
              variants={{ hidden: { opacity: 0, y: 30, rotateY: -30 }, show: { opacity: 1, y: 0, rotateY: 0 } }}
              whileHover={{ y: -10, rotateY: 10, boxShadow: '0 20px 40px rgba(14,165,233,0.25)' }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="cert-badge-ring"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 15 + i * 2, ease: 'linear' }}
              />
              <img src={c.image} alt={c.name} loading="lazy" width="100" height="100" />
              <span>{c.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.h3 className="courses-heading" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Courses Completed
        </motion.h3>
        <div className="courses-grid">
          {courses.map((c, i) => (
            <motion.div
              key={c.name}
              className="course-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, borderColor: 'var(--accent-primary)' }}
            >
              <span className="material-symbols-outlined">{c.icon}</span>
              <strong>{c.name}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
