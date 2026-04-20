import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react'
import { projects } from '../data'
import { useSectionParallax, staggerContainer, fadeUp } from '../hooks/useMotion'

/* ─── 3D Tilt Project Card ─── */
function ProjectCard({ project, index, onSelect }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 30 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const springGX = useSpring(glowX, { stiffness: 200, damping: 25 })
  const springGY = useSpring(glowY, { stiffness: 200, damping: 25 })

  const handleMouse = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateX.set((py - 0.5) * -20)
    rotateY.set((px - 0.5) * 20)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  const handleLeave = () => {
    rotateX.set(0); rotateY.set(0); glowX.set(50); glowY.set(50)
  }

  return (
    <motion.div
      ref={ref}
      className="project-card-3d"
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 800,
        transformStyle: 'preserve-3d',
      }}
      variants={fadeUp}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={() => onSelect(project)}
      whileTap={{ scale: 0.97 }}
    >
      {/* Glare overlay */}
      <motion.div
        className="project-card-glare"
        style={{
          background: useTransform(
            [springGX, springGY],
            ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
          ),
        }}
      />

      <div
        className="project-card-header"
        style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
      >
        <motion.span
          className="material-symbols-outlined project-card-icon"
          style={{ transform: 'translateZ(40px)' }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: index * 0.3 }}
        >
          {project.icon}
        </motion.span>
        <div className="project-card-particles" aria-hidden="true">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              className="pcard-particle"
              animate={{ y: [0, -30, 0], x: [0, (i % 2 ? 10 : -10), 0], opacity: [0, 0.8, 0] }}
              transition={{ repeat: Infinity, duration: 2 + i * 0.5, delay: i * 0.4, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>

      <div className="project-card-body" style={{ transform: 'translateZ(20px)' }}>
        <h3>
          <span className="material-symbols-outlined" style={{ color: project.gradient[0] }}>{project.icon}</span>
          {project.title}
        </h3>
        <p>{project.desc}</p>
        <motion.span
          className="project-card-cta"
          whileHover={{ x: 5 }}
        >
          Explore Details <span className="material-symbols-outlined">arrow_forward</span>
        </motion.span>
      </div>
    </motion.div>
  )
}

/* ─── Project Detail Modal ─── */
function ProjectModal({ project, onClose }) {
  if (!project) return null

  const codeSnippets = {
    'cloud_sync': `// Org Merger Batch Processor
global class OrgMergerBatch implements
    Database.Batchable<sObject> {
  global Database.QueryLocator start(
    Database.BatchableContext bc) {
    return Database.getQueryLocator(
      'SELECT Id, Name FROM Account'
    );
  }
  global void execute(
    Database.BatchableContext bc,
    List<Account> scope) {
    // Merge logic with fuzzy matching
    MergeEngine.process(scope);
  }
}`,
    'call_split': `// De-Merger Data Splitter
public class OrgDeMerger {
  public static void splitRecords(
    String orgId) {
    List<Case> cases = [
      SELECT Id, Brand__c, Status
      FROM Case
      WHERE OrgSource__c = :orgId
    ];
    DataRouter.routeToTarget(cases);
  }
}`,
    'desktop_windows': `<!-- Lightning Web Component -->
<template>
  <lightning-card title="Dashboard">
    <div class="slds-grid">
      <template for:each={metrics}
        for:item="m">
        <c-metric-tile
          key={m.id}
          label={m.label}
          value={m.value}>
        </c-metric-tile>
      </template>
    </div>
  </lightning-card>
</template>`,
    'psychology': `// Einstein AI Prediction Service
public class EinsteinService {
  @future(callout=true)
  public static void predict(Id caseId) {
    Einstein_PredictionResult result =
      Einstein_API.predictIntent(
        getCaseDescription(caseId)
      );
    updateCaseCategory(
      caseId, result.label
    );
  }
}`,
  }

  const snippet = codeSnippets[project.icon] || `// ${project.title}\n// Enterprise Salesforce Solution\npublic class ${project.title.replace(/\s+/g, '')} {\n  // Implementation details\n  public void execute() {\n    System.debug('Processing...');\n  }\n}`

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal"
        initial={{ scale: 0.8, y: 100, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.8, y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="project-modal-close" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>

        <div
          className="project-modal-header"
          style={{ background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})` }}
        >
          <motion.span
            className="material-symbols-outlined"
            style={{ fontSize: '3rem' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            {project.icon}
          </motion.span>
          <h2>{project.title}</h2>
        </div>

        <div className="project-modal-body">
          <p className="project-modal-desc">{project.desc}</p>

          <div className="project-modal-code">
            <div className="code-header">
              <span className="code-dot" style={{ background: '#ef4444' }} />
              <span className="code-dot" style={{ background: '#eab308' }} />
              <span className="code-dot" style={{ background: '#22c55e' }} />
              <span className="code-title">Solution.cls</span>
            </div>
            <TypingCode code={snippet} />
          </div>

          <div className="project-modal-tech">
            {['Apex', 'LWC', 'Flows', 'REST API'].map((t, i) => (
              <motion.span
                key={t}
                className="tech-tag"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Typing Code Animation ─── */
function TypingCode({ code }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed(''); setDone(false)
    let i = 0
    const timer = setInterval(() => {
      i++
      if (i >= code.length) { setDone(true); clearInterval(timer) }
      else setDisplayed(code.slice(0, i))
    }, 15)
    return () => clearInterval(timer)
  }, [code])

  return (
    <pre className="code-block">
      <code>{displayed}</code>
      {!done && <motion.span className="code-cursor" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>▋</motion.span>}
    </pre>
  )
}

/* ─── PROJECTS SECTION ─── */
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const { ref: sectionRef, y: parallaxY } = useSectionParallax(30)

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="container">
        <motion.div style={{ y: parallaxY }}>
          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Click any card to see the code behind it
          </motion.p>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={staggerContainer(0.1, 0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} onSelect={setSelected} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
