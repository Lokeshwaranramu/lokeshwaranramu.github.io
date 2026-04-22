import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

/* ─── Individual email / PDF card ─── */
function PipelineCard({ type, id, subject, size, delay, inView }) {
  const isEmail = type === 'email'
  return (
    <motion.div
      className={isEmail ? 'pipeline-email-card' : 'pipeline-pdf-card'}
      initial={{ opacity: 0, x: isEmail ? -50 : 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 22 }}
    >
      <div className={`pipeline-card-icon ${isEmail ? 'pci-email' : 'pci-pdf'}`}>
        <span className="material-symbols-outlined">
          {isEmail ? 'email' : 'description'}
        </span>
      </div>
      <div className="pipeline-card-content">
        <strong>{isEmail ? `Case ${id}` : `Case${id}.pdf`}</strong>
        <span>{isEmail ? subject : <span className="pipeline-saved">Attached ✓</span>}</span>
        <span className="pipeline-card-size" style={{ color: isEmail ? undefined : '#16a34a' }}>
          {isEmail ? size : '~0.1 MB'}
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Animated data-flow arrows ─── */
function FlowArrows({ side, inView }) {
  return (
    <div className={`pipeline-arrows pipeline-arrows-${side}`}>
      {[0, 1, 2].map(i => (
        <div key={i} className="pipeline-arrow-wrap">
          {/* Static dashed line */}
          <div className="pipeline-arrow-track" />
          {/* Animated traveling dot */}
          {inView && (
            <motion.div
              className="pipeline-dot"
              style={{ left: 0 }}
              animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.4,
                delay: i * 0.5 + (side === 'right' ? 0.7 : 0),
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          )}
          {/* Arrow head */}
          <span className={`pipeline-arrowhead pipeline-arrowhead-${side}`}>›</span>
        </div>
      ))}
    </div>
  )
}

/* ─── Central rotating processor ─── */
function Processor({ inView }) {
  return (
    <div className="pipeline-processor-wrap">
      <motion.div
        className="pipeline-ring pipeline-ring-outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pipeline-ring pipeline-ring-inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="pipeline-core"
        animate={inView ? { scale: [1, 1.06, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="material-symbols-outlined">picture_as_pdf</span>
      </motion.div>
      <motion.p
        className="pipeline-proc-label"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        Converting…
      </motion.p>
    </div>
  )
}

/* ─── Storage comparison meter ─── */
export function StorageMeter({ inView, storageStats }) {
  const { before, beforePct, after, afterPct, saved } = storageStats
  return (
    <div className="pipeline-storage">
      <div className="pipeline-storage-title">
        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
          insights
        </span>
        Storage Impact
      </div>

      {/* Before */}
      <div className="pipeline-storage-row">
        <span className="pipeline-storage-row-label">Before</span>
        <div className="pipeline-storage-track">
          <motion.div
            className="pipeline-storage-fill pipeline-fill-before"
            style={{ width: `${beforePct}%`, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <span className="pipeline-storage-info" style={{ color: '#ef4444' }}>{before}</span>
      </div>

      {/* After */}
      <div className="pipeline-storage-row">
        <span className="pipeline-storage-row-label">After</span>
        <div className="pipeline-storage-track">
          <motion.div
            className="pipeline-storage-fill pipeline-fill-after"
            style={{ width: `${afterPct}%`, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 1.6, duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <span className="pipeline-storage-info" style={{ color: '#16a34a' }}>{after}</span>
      </div>

      <motion.div
        className="pipeline-savings-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 3, type: 'spring', stiffness: 300 }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>savings</span>
        {saved} storage freed per case batch
      </motion.div>
    </div>
  )
}

/* ─── Main exported component ─── */
export default function ConversionPipeline({ emails, storageStats }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="pipeline-wrapper" ref={ref}>
      <div className="pipeline-grid">
        {/* Left — Email column */}
        <div className="pipeline-col">
          <motion.div
            className="pipeline-col-header"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span className="material-symbols-outlined">inbox</span>
            Case Emails
          </motion.div>
          {emails.map((e, i) => (
            <PipelineCard
              key={e.id}
              type="email"
              id={e.id}
              subject={e.subject}
              size={e.size}
              delay={0.2 + i * 0.2}
              inView={inView}
            />
          ))}
        </div>

        {/* Center — arrows + processor */}
        <div className="pipeline-center-col">
          <div className="pipeline-center-grid">
            <FlowArrows side="left" inView={inView} />
            <Processor inView={inView} />
            <FlowArrows side="right" inView={inView} />
          </div>
        </div>

        {/* Right — PDF column */}
        <div className="pipeline-col">
          <motion.div
            className="pipeline-col-header pipeline-col-header-green"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            <span className="material-symbols-outlined">description</span>
            PDF Attachments
          </motion.div>
          {emails.map((e, i) => (
            <PipelineCard
              key={e.id}
              type="pdf"
              id={e.id}
              subject={e.subject}
              size={e.size}
              delay={1.1 + i * 0.2}
              inView={inView}
            />
          ))}
        </div>
      </div>

      <StorageMeter inView={inView} storageStats={storageStats} />
    </div>
  )
}
