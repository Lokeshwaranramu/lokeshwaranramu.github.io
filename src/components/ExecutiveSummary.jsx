import { motion } from 'motion/react'
import { personalInfo } from '../data'

export default function ExecutiveSummary() {
  const yearsExp = new Date().getFullYear() - 2018 // Started career in 2018
  const topSkills = ['Solution Architect', 'Agentforce & AI', 'Enterprise Security']
  const locationLabel = 'Melbourne, AU'
  const availabilityLabel = 'Available for full-time & consulting'

  return (
    <motion.section
      className="executive-summary"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="summary-container">
        <motion.div
          className="summary-headline"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2>
            {yearsExp}+ Years | {personalInfo.roles[0]} | {availabilityLabel}
          </h2>
          <p className="summary-location">📍 {locationLabel}</p>
        </motion.div>

        <motion.div
          className="summary-tags"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {topSkills.map((skill, i) => (
            <motion.span
              key={skill}
              className="summary-tag"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 + i * 0.05 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="summary-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>
            🏆 {personalInfo.roles.length} core roles | 6 Salesforce certifications | Pioneered early-stage Agentforce implementations
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
