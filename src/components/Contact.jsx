import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import emailjs from '@emailjs/browser'
import { personalInfo } from '../data'
import { useMagnetic } from '../hooks/useMotion'

function FormField({ type, name, placeholder, rows }) {
  const [focused, setFocused] = useState(false)
  const Tag = rows ? 'textarea' : 'input'

  return (
    <motion.div
      className={`form-group ${focused ? 'form-group-focus' : ''}`}
      animate={focused ? { borderColor: 'rgba(14,165,233,0.6)' } : { borderColor: 'rgba(148,163,184,0.1)' }}
    >
      <motion.div
        className="form-group-glow"
        animate={focused ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.95 }}
      />
      <Tag
        type={type}
        name={name}
        placeholder={placeholder}
        rows={rows}
        required
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </motion.div>
  )
}

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)
  const submitMag = useMagnetic(0.3)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const form = formRef.current
    const data = new FormData(form)

    try {
      await emailjs.send(
        'service_hln8j1b',
        'template_zvnpvci',
        {
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
        },
        'o7Ti-dGjJ0U5icMI3'
      )
      setStatus('success'); form.reset()
    } catch (err) { console.error('EmailJS error:', err); setStatus('error') }
    setSending(false)
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.h2 className="section-heading" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Let's Connect
        </motion.h2>
        <motion.p className="section-subtitle" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          I'm always interested in hearing about new projects and opportunities
        </motion.p>

        <div className="contact-grid">
          <motion.div className="contact-info" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: 'spring' }}>
            <h3>Get in Touch</h3>
            <p>Let's create something amazing together!</p>

            {[
              { icon: 'email', label: 'Email', value: personalInfo.email },
              { icon: 'phone', label: 'Phone', value: personalInfo.phone },
              { icon: 'location_on', label: 'Location', value: personalInfo.location },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="contact-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 8 }}
              >
                <motion.span className="material-symbols-outlined" whileHover={{ rotate: 20, scale: 1.2 }}>{item.icon}</motion.span>
                <div><strong>{item.label}</strong><span>{item.value}</span></div>
              </motion.div>
            ))}

            <div className="social-links">
              {[
                { href: personalInfo.social.linkedin, label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                { href: personalInfo.social.github, label: 'GitHub', path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' },
                { href: personalInfo.social.twitter, label: 'Twitter', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
              ].map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={s.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(14,165,233,0.3)' }}
                >
                  <svg viewBox="0 0 24 24"><path d={s.path} /></svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form ref={formRef} className="contact-form" onSubmit={handleSubmit} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ type: 'spring' }}>
            <FormField type="text" name="name" placeholder="Your Name" />
            <FormField type="email" name="email" placeholder="Your Email" />
            <FormField type="text" name="subject" placeholder="Subject" />
            <FormField name="message" placeholder="Your Message" rows={5} />
            <motion.button
              ref={submitMag.ref}
              style={{ ...submitMag.style, width: '100%', justifyContent: 'center' }}
              type="submit"
              className="btn btn-primary btn-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={sending}
            >
              {sending ? (
                <motion.span className="material-symbols-outlined" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>progress_activity</motion.span>
              ) : (
                <span className="material-symbols-outlined">send</span>
              )}
              {sending ? 'Sending...' : 'Send Message'}
            </motion.button>
            {status && (
              <motion.div
                className={`form-status ${status}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status === 'success' ? 'Message sent successfully!' : 'Failed to send. Please try again.'}
              </motion.div>
            )}
          </motion.form>
        </div>

        <motion.div className="map-wrapper" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d416531.77948564296!2d138.3200221!3d-34.9284989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab735c7c526b33f%3A0x4033654628ec640!2sAdelaide%20SA!5e0!3m2!1sen!2sau!4v1645830240744!5m2!1sen!2sau"
            width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title="Adelaide, Australia"
          />
        </motion.div>
      </div>
    </section>
  )
}
