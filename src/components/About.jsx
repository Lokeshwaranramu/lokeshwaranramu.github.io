import { motion } from 'motion/react'
import { personalInfo, aboutParagraphs } from '../data'
import { useSectionParallax, staggerContainer, fadeUp, slideInLeft, slideInRight } from '../hooks/useMotion'

function getYearsOfExperience() {
  const start = new Date(personalInfo.careerStart), now = new Date()
  let y = now.getFullYear() - start.getFullYear()
  if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) y--
  return y
}
function getAge() {
  const b = new Date(personalInfo.birthDate), now = new Date()
  let a = now.getFullYear() - b.getFullYear()
  if (now.getMonth() < b.getMonth() || (now.getMonth() === b.getMonth() && now.getDate() < b.getDate())) a--
  return a
}

const details = [
  { icon: 'school', label: 'Education', value: personalInfo.education },
  { icon: 'cake', label: 'Age', value: () => getAge() },
  { icon: 'email', label: 'Email', value: personalInfo.email },
  { icon: 'phone', label: 'Phone', value: personalInfo.phone },
  { icon: 'location_on', label: 'Location', value: personalInfo.location },
]

export default function About() {
  const years = getYearsOfExperience()
  const { ref, y } = useSectionParallax(20)

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            About Me
          </motion.h2>
          <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            Salesforce expert with {years}+ years of enterprise experience
          </motion.p>
        </motion.div>

        <div className="about-grid">
          <motion.div className="about-text" variants={staggerContainer(0.1, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {aboutParagraphs.map((p, i) => (
              <motion.p key={i} variants={fadeUp}>{p.replace('{years}', String(years))}</motion.p>
            ))}
          </motion.div>

          <motion.div className="about-details" variants={staggerContainer(0.3, 0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {details.map((d) => (
              <motion.div
                key={d.label}
                className="detail-card"
                variants={slideInRight}
                whileHover={{ x: 8, boxShadow: '0 0 20px rgba(14,165,233,0.2)' }}
              >
                <span className="material-symbols-outlined">{d.icon}</span>
                <div>
                  <strong>{d.label}</strong>
                  <span>{typeof d.value === 'function' ? d.value() : d.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
