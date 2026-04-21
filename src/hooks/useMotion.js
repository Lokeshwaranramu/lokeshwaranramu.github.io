import { useRef, useState, useEffect, useCallback } from 'react'
import { useScroll, useTransform, useSpring, useMotionValue } from 'motion/react'

/* ─── Magnetic Element ─── */
export function useMagnetic(strength = 0.3) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    }
    const leave = () => { x.set(0); y.set(0) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [strength, x, y])

  return { ref, style: { x: springX, y: springY } }
}

/* ─── 3D Tilt Card ─── */
export function useTilt(intensity = 15) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRY = useSpring(rotateY, { stiffness: 300, damping: 30 })
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      rotateX.set((py - 0.5) * -intensity)
      rotateY.set((px - 0.5) * intensity)
      glareX.set(px * 100)
      glareY.set(py * 100)
    }
    const leave = () => { rotateX.set(0); rotateY.set(0); glareX.set(50); glareY.set(50) }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
  }, [intensity, rotateX, rotateY, glareX, glareY])

  return {
    ref,
    style: {
      rotateX: springRX,
      rotateY: springRY,
      transformPerspective: 800,
    },
    glareX,
    glareY,
  }
}

/* ─── Mouse Parallax ─── */
export function useMouseParallax(factor = 0.02) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 50, damping: 20 })
  const springY = useSpring(y, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      x.set((e.clientX - cx) * factor)
      y.set((e.clientY - cy) * factor)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [factor, x, y])

  return { x: springX, y: springY }
}

/* ─── Scroll-linked section parallax ─── */
export function useSectionParallax(offset = 50) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const springY = useSpring(y, { stiffness: 100, damping: 30 })
  return { ref, y: springY, progress: scrollYProgress }
}

/* ─── Text split for character animation ─── */
export function splitText(text) {
  return text.split('').map((char, i) => ({
    char: char === ' ' ? '\u00A0' : char,
    index: i,
  }))
}

/* ─── Stagger container + child presets ─── */
export const staggerContainer = (delay = 0, stagger = 0.03) => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: stagger } },
})

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export const charReveal = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  show: { opacity: 1, y: 0, rotateX: 0 },
}
