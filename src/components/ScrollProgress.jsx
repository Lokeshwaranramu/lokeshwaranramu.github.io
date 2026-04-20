import { useScroll, useSpring, motion, useTransform } from 'motion/react'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ['#0284c7', '#4f46e5', '#db2777'])

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX, background: bg }}
    />
  )
}
