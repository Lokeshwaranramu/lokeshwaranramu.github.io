import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { appExchangeProducts } from '../data'
import { useSectionParallax } from '../hooks/useMotion'
import ConversionPipeline from './ConversionPipeline'

/* ─── Animated star rating ─── */
function StarRating({ rating, reviewCount, size = 'md' }) {
  const stars = [1, 2, 3, 4, 5]
  return (
    <div className="ax-stars">
      {stars.map((s, i) => {
        const filled = s <= Math.floor(rating)
        const half = !filled && s === Math.ceil(rating) && rating % 1 >= 0.25
        return (
          <motion.span
            key={s}
            className={`ax-star${filled ? ' ax-star-filled' : half ? ' ax-star-half' : ''}`}
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 350 }}
          >
            ★
          </motion.span>
        )
      })}
      <span className={`ax-rating-num ax-rating-${size}`}>{rating}</span>
      <span className="ax-review-count">({reviewCount} reviews)</span>
    </div>
  )
}

/* ─── Stats tile ─── */
function StatTile({ stat, index }) {
  return (
    <motion.div
      className="ax-stat-tile"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.04 }}
    >
      <span className="material-symbols-outlined ax-stat-icon">{stat.icon}</span>
      <span className="ax-stat-value">{stat.value}</span>
      <span className="ax-stat-label">{stat.label}</span>
    </motion.div>
  )
}

/* ─── Highlight card ─── */
function HighlightCard({ highlight, index }) {
  return (
    <motion.div
      className="ax-highlight-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 150 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
    >
      <motion.div
        className="ax-highlight-icon"
        style={{ background: `${highlight.color}18`, border: `1px solid ${highlight.color}30` }}
        whileHover={{ rotate: 10, scale: 1.1 }}
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

/* ─── Main AppExchange section ─── */
export default function AppExchange() {
  const { ref, y } = useSectionParallax(20)
  const product = appExchangeProducts[0]

  return (
    <section className="appexchange-section" ref={ref} id="appexchange">
      <div className="container">
        <motion.div style={{ y }}>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            AppExchange Published Solution
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            A live Salesforce AppExchange managed package used by organisations worldwide to solve real storage challenges
          </motion.p>
        </motion.div>

        {/* Product card */}
        <motion.div
          className="ax-product-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {/* Dark header band */}
          <div className="ax-card-header">
            {/* Left: info */}
            <div className="ax-header-info">
              <motion.div
                className="ax-badges"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <span className="ax-badge ax-badge-sf">
                  <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>cloud</span>
                  Salesforce AppExchange
                </span>
                <span className="ax-badge ax-badge-free">
                  <span className="material-symbols-outlined" style={{ fontSize: '0.85rem' }}>sell</span>
                  Free
                </span>
                <span className="ax-badge ax-badge-cat">{product.category}</span>
              </motion.div>

              <motion.h3
                className="ax-product-name"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                {product.name}
              </motion.h3>

              <motion.p
                className="ax-product-tagline"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {product.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
              </motion.div>

              <motion.p
                className="ax-product-desc"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {product.description}
              </motion.p>

              <motion.div
                className="ax-header-btns"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                <motion.a
                  href={product.appExchangeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ax-btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>open_in_new</span>
                  View on AppExchange
                </motion.a>
                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link to={product.detailPath} className="ax-btn-secondary">
                    <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>info</span>
                    Full Details
                  </Link>
                </motion.span>
              </motion.div>
            </div>

            {/* Right: stats grid */}
            <div className="ax-header-visual">
              <div className="ax-stats-grid">
                {product.stats.map((s, i) => (
                  <StatTile key={s.label} stat={s} index={i} />
                ))}
              </div>

              <motion.div
                className="ax-features-strip"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {product.supportedFeatures.map((f, i) => (
                  <motion.span
                    key={f}
                    className="ax-feature-chip"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.06, type: 'spring' }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '0.75rem' }}>check_circle</span>
                    {f}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Body */}
          <div className="ax-card-body">
            {/* How it works */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="ax-body-section-title">
                <span className="material-symbols-outlined">smart_toy</span>
                How It Works
              </h3>
              <p className="ax-body-section-desc">
                The app automatically processes all closed Salesforce cases, converts each email message into a compact PDF, and attaches it directly to the case record — freeing up significant data storage without losing a single email.
              </p>
            </motion.div>

            {/* Animated conversion pipeline */}
            <ConversionPipeline
              emails={product.sampleEmails}
              storageStats={product.storageStats}
            />

            {/* Highlights */}
            <motion.h3
              className="ax-body-section-title"
              style={{ marginTop: '2.5rem' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="material-symbols-outlined">emoji_events</span>
              Key Highlights
            </motion.h3>

            <div className="ax-highlights-grid">
              {product.highlights.map((h, i) => (
                <HighlightCard key={h.title} highlight={h} index={i} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
