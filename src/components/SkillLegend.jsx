import { motion } from 'motion/react'

const skillCategories = [
  { category: 'ai', label: 'AI & Agentforce', color: '#ec4899' },
  { category: 'platform', label: 'Salesforce Platform', color: '#6366f1' },
  { category: 'frontend', label: 'Frontend Development', color: '#0ea5e9' },
  { category: 'backend', label: 'Backend & Apex', color: '#22c55e' },
  { category: 'integration', label: 'Integration & APIs', color: '#f59e0b' },
  { category: 'data', label: 'Data Architecture', color: '#a855f7' },
  { category: 'security', label: 'Enterprise Security', color: '#ef4444' },
  { category: 'automation', label: 'Process Automation', color: '#06b6d4' },
  { category: 'architecture', label: 'Solution Architecture', color: '#8b5cf6' },
  { category: 'devops', label: 'CI/CD & DevOps', color: '#14b8a6' },
]

export default function SkillLegend() {
  return (
    <motion.div
      className="skill-legend"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <h4 className="skill-legend-title">Skill Categories</h4>
      <div className="skill-legend-grid">
        {skillCategories.map((cat) => (
          <motion.div
            key={cat.category}
            className="legend-item"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="legend-color"
              style={{ backgroundColor: cat.color }}
              title={cat.label}
            />
            <span className="legend-label">{cat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
