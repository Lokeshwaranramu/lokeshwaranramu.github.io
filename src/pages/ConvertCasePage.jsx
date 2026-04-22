import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { appExchangeProducts } from '../data'
import ConversionPipeline, { StorageMeter } from '../components/ConversionPipeline'

const product = appExchangeProducts[0]

/* ─── Top nav bar ─── */
function PageNav() {
  return (
    <motion.nav
      className="page-nav"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
    >
      <div className="page-nav-inner">
        <Link to="/" className="page-nav-back">
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Portfolio
        </Link>
        <span className="page-nav-logo">
          <span className="logo-text">Lokeshwaran</span>
          <span className="logo-dot">.</span>
        </span>
        <motion.a
          href={product.appExchangeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ax-btn-primary page-nav-cta"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '0.95rem' }}>open_in_new</span>
          Get It Free
        </motion.a>
      </div>
    </motion.nav>
  )
}

/* ─── Star rating row ─── */
function Stars({ rating }) {
  return (
    <div className="ax-stars" style={{ gap: '0.15rem' }}>
      {[1, 2, 3, 4, 5].map((s, i) => {
        const filled = s <= Math.floor(rating)
        const half = !filled && s === Math.ceil(rating) && rating % 1 >= 0.25
        return (
          <motion.span
            key={s}
            className={`ax-star${filled ? ' ax-star-filled' : half ? ' ax-star-half' : ''}`}
            style={{ fontSize: '1.5rem' }}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.6 + i * 0.08, type: 'spring', stiffness: 350 }}
          >
            ★
          </motion.span>
        )
      })}
      <span className="ax-rating-num" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', marginLeft: '0.5rem' }}>
        {rating}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginLeft: '0.25rem' }}>
        ({product.reviewCount} reviews)
      </span>
    </div>
  )
}

/* ─── Highlight card ─── */
function HighlightCard({ highlight, index }) {
  return (
    <motion.div
      className="ax-highlight-card cp-highlight"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.14, type: 'spring', stiffness: 150 }}
      whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
    >
      <motion.div
        className="ax-highlight-icon"
        style={{ background: `${highlight.color}18`, border: `1px solid ${highlight.color}30` }}
        whileHover={{ rotate: 12, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <span className="material-symbols-outlined" style={{ color: highlight.color }}>
          {highlight.icon}
        </span>
      </motion.div>
      <h4>{highlight.title}</h4>
      <p>{highlight.desc}</p>
    </motion.div>
  )
}

/* ─── Pro / Con list ─── */
function ProConList({ items, type }) {
  const isProCon = type === 'pro'
  return (
    <ul className="cp-list">
      {items.map((item, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, x: isProCon ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
          className={`cp-list-item cp-list-${type}`}
        >
          <span className="material-symbols-outlined cp-list-icon">
            {isProCon ? 'check_circle' : 'cancel'}
          </span>
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

/* ─── Compatibility chip ─── */
function Chip({ label }) {
  return (
    <motion.span
      className="cp-chip"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {label}
    </motion.span>
  )
}

/* ─── Page footer ─── */
function PageFooter() {
  return (
    <footer className="cp-footer">
      <div className="container">
        <p>
          Built by{' '}
          <a href="https://www.lokeshwaranramu.com" target="_blank" rel="noopener noreferrer">
            Lokeshwaran Ramu
          </a>{' '}
          · Troppo Solutions · Adelaide, Australia
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Listed{' '}
          <a href={product.appExchangeUrl} target="_blank" rel="noopener noreferrer">
            on Salesforce AppExchange ↗
          </a>
        </p>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════
   Main Page
   ═══════════════════════════════════════ */
export default function ConvertCasePage() {
  /* Set document title for SEO */
  useEffect(() => {
    const prev = document.title
    document.title = 'Convert Case Emails to PDF | Salesforce AppExchange | Lokeshwaran Ramu'
    return () => { document.title = prev }
  }, [])

  return (
    <div className="cp-page">
      <PageNav />

      {/* ── Hero ── */}
      <section className="cp-hero">
        <div className="cp-hero-bg">
          <div className="cp-hero-blob cp-blob-1" />
          <div className="cp-hero-blob cp-blob-2" />
        </div>

        <div className="container cp-hero-content">
          <motion.div
            className="cp-hero-badge-row"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="ax-badge ax-badge-sf">
              <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>cloud</span>
              Salesforce AppExchange
            </span>
            <span className="ax-badge ax-badge-free">
              <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>sell</span>
              Free · Never requires payment
            </span>
            <span className="ax-badge ax-badge-cat">{product.category}</span>
          </motion.div>

          <motion.h1
            className="cp-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          >
            Convert Case Emails<br />
            <span className="cp-hero-accent">to PDF</span>
          </motion.h1>

          <motion.p
            className="cp-hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            {product.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <Stars rating={product.rating} />
          </motion.div>

          <motion.div
            className="cp-hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <motion.a
              href={product.appExchangeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn-primary cp-btn-large"
              whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(2,132,199,0.4)' }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="material-symbols-outlined">download</span>
              Get It Free on AppExchange
            </motion.a>
            <motion.a
              href="https://www.youtube.com/watch?v=DEMO_PLACEHOLDER"
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn-secondary cp-btn-large cp-btn-outline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="material-symbols-outlined">play_circle</span>
              Watch Demo
            </motion.a>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            className="cp-hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            {[
              { icon: 'star', value: '4.25 ★', label: 'Average Rating' },
              { icon: 'group', value: '10+ Orgs', label: 'Using This' },
              { icon: 'language', value: '18', label: 'Languages' },
              { icon: 'calendar_today', value: 'Feb 2023', label: 'Listed' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="cp-hero-stat"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08, type: 'spring' }}
              >
                <span className="material-symbols-outlined">{s.icon}</span>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why section ── */}
      <section className="cp-section">
        <div className="container">
          <motion.div
            className="cp-section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Why Convert Case Emails to PDF?</h2>
            <p>The storage problem every Salesforce org faces — and how we solve it.</p>
          </motion.div>

          <div className="cp-why-grid">
            <motion.div
              className="cp-why-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p>
                Storage in Salesforce is divided into two categories: <strong>Data Storage</strong> and{' '}
                <strong>File Storage</strong>. Most organisations face issues with data storage, which forces
                them to buy additional licenses to increase capacity.
              </p>
              <p>
                Email messages form a large part of data storage, especially for Service Cloud orgs handling
                high case volumes. As per regulations, organisations must store emails for at least{' '}
                <strong>7 years</strong> — meaning they need ever-increasing storage for new emails.
              </p>
              <p>
                By using <em>Convert Case Emails to PDF</em>, you can convert those email messages into PDFs
                and attach them back to the respective case records. This frees up data storage while keeping
                all communications accessible inside your Salesforce org — no external tools needed.
              </p>
            </motion.div>

            <div className="cp-why-cards">
              {[
                { icon: 'database', title: 'Data Storage', pct: 100, color: '#ef4444', label: 'Before — Emails eating storage' },
                { icon: 'save', title: 'After Conversion', pct: 10, color: '#16a34a', label: 'After — PDFs use ~96% less space' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="cp-why-card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.2 }}
                >
                  <div className="cp-why-card-head">
                    <span className="material-symbols-outlined" style={{ color: item.color }}>{item.icon}</span>
                    <strong>{item.title}</strong>
                  </div>
                  <div className="cp-why-bar-track">
                    <motion.div
                      className="cp-why-bar-fill"
                      style={{ background: item.color, transformOrigin: 'left' }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: item.pct / 100 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.3, duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="cp-why-bar-label">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works (Mechanism) ── */}
      <section className="cp-section cp-section-alt">
        <div className="container">
          <motion.div
            className="cp-section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>How It Works</h2>
            <p>The app processes your closed cases automatically — zero manual steps required.</p>
          </motion.div>

          {/* Step flow */}
          <div className="cp-steps">
            {[
              { icon: 'inbox', step: '01', title: 'Trigger Runs', desc: 'For cases where isClosed = true, the app identifies all email messages attached to the case.' },
              { icon: 'transform', step: '02', title: 'PDF Generation', desc: 'Each email is converted into a compact, minimum-size PDF preserving the full message content and metadata.' },
              { icon: 'attach_file', step: '03', title: 'Auto-Attachment', desc: 'The generated PDF is attached directly to the Case record, grouped by the original email created date.' },
              { icon: 'storage', step: '04', title: 'Storage Freed', desc: 'The original email data is compressed, dramatically freeing up Salesforce data storage for new records.' },
            ].map((s, i) => (
              <motion.div
                key={s.step}
                className="cp-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.14, type: 'spring', stiffness: 150 }}
              >
                <motion.div
                  className="cp-step-icon"
                  whileHover={{ rotate: 12, scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <span className="material-symbols-outlined">{s.icon}</span>
                  <span className="cp-step-num">{s.step}</span>
                </motion.div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Animated pipeline */}
          <ConversionPipeline
            emails={product.sampleEmails}
            storageStats={product.storageStats}
          />
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="cp-section">
        <div className="container">
          <motion.div
            className="cp-section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Key Highlights</h2>
            <p>Three reasons thousands of Salesforce admins choose this solution.</p>
          </motion.div>

          <div className="ax-highlights-grid">
            {product.highlights.map((h, i) => (
              <HighlightCard key={h.title} highlight={h} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pros & Cons ── */}
      <section className="cp-section cp-section-alt">
        <div className="container">
          <motion.div
            className="cp-section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Honest Assessment</h2>
            <p>What works well and what to know before installing.</p>
          </motion.div>

          <div className="cp-proscons">
            <motion.div
              className="cp-proscons-col"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="cp-proscons-head cp-pros-head">
                <span className="material-symbols-outlined">thumb_up</span>
                Advantages
              </div>
              <ProConList items={product.pros} type="pro" />
            </motion.div>

            <motion.div
              className="cp-proscons-col"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="cp-proscons-head cp-cons-head">
                <span className="material-symbols-outlined">info</span>
                Considerations
              </div>
              <ProConList items={product.cons} type="con" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Compatibility & Details ── */}
      <section className="cp-section">
        <div className="container">
          <motion.div
            className="cp-section-head"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Compatibility & Details</h2>
            <p>Works across all major Salesforce editions with 18 language support.</p>
          </motion.div>

          <div className="cp-details-grid">
            {[
              {
                title: 'Requires',
                icon: 'verified',
                items: [product.requires, product.additionalRequirements],
              },
              {
                title: 'Compatible With',
                icon: 'cloud',
                items: product.compatibility,
              },
              {
                title: 'Industries',
                icon: 'business',
                items: product.industries,
              },
              {
                title: 'Supported Editions',
                icon: 'workspace_premium',
                items: product.salesforceEditions,
              },
              {
                title: 'Features',
                icon: 'star',
                items: product.supportedFeatures,
              },
              {
                title: 'App Details',
                icon: 'info',
                items: [
                  `Version: ${product.version}`,
                  `Listed: ${product.listedDate}`,
                  `Latest Release: ${product.latestRelease}`,
                  `${product.languages} languages supported`,
                ],
              },
            ].map((block, i) => (
              <motion.div
                key={block.title}
                className="cp-detail-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="cp-detail-head">
                  <span className="material-symbols-outlined">{block.icon}</span>
                  {block.title}
                </div>
                <div className="cp-chips">
                  {block.items.map(item => (
                    <Chip key={item} label={item} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cp-cta-section">
        <div className="container">
          <motion.div
            className="cp-cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <motion.div
              className="cp-cta-icon"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="material-symbols-outlined">picture_as_pdf</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Ready to Save Storage?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Install for free from the Salesforce AppExchange. No payment, no trial period — fully featured from day one.
            </motion.p>

            <motion.div
              className="cp-cta-btns"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href={product.appExchangeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn-primary cp-btn-large"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 28px rgba(2,132,199,0.4)' }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="material-symbols-outlined">download</span>
                Get It Now — Free
              </motion.a>
              <Link to="/" className="ax-btn-secondary cp-btn-large">
                <span className="material-symbols-outlined">arrow_back</span>
                Back to Portfolio
              </Link>
            </motion.div>

            <p className="cp-cta-by">
              Developed by{' '}
              <a href="https://www.lokeshwaranramu.com" target="_blank" rel="noopener noreferrer">
                Lokeshwaran Ramu
              </a>{' '}
              · Troppo Solutions · Australia
            </p>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  )
}
