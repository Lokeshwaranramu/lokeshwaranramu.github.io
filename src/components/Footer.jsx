import { motion } from 'motion/react'
import { personalInfo } from '../data'
import { staggerContainer, fadeUp } from '../hooks/useMotion'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer-grid">
          <motion.div className="footer-col" variants={fadeUp}>
            <h4 className="footer-brand">
              {personalInfo.name.split(' ')[0]}<span className="logo-dot">.</span>
            </h4>
            <p>{personalInfo.title}</p>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h5>Quick Links</h5>
            {['About', 'Projects', 'Experience', 'Contact'].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
            ))}
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h5>Resources</h5>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Resume</a>
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h5>Contact</h5>
            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.location}</span>
          </motion.div>
        </div>

        <motion.div className="footer-bottom" variants={fadeUp}>
          <p>&copy; {year} {personalInfo.name}. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
