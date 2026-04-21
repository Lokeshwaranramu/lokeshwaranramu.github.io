import { useEffect, useRef, useState } from 'react'

const IS_TOUCH = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

export default function CustomCursor() {
  // Don't render on touch devices — pointless and wastes a rAF loop
  if (IS_TOUCH) return null

  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const outer = outerRef.current, inner = innerRef.current
    if (!outer || !inner) return
    let ox = 0, oy = 0, ix = 0, iy = 0, mx = 0, my = 0

    const move = (e) => { mx = e.clientX; my = e.clientY }
    const tick = () => {
      ox += (mx - ox) * 0.12; oy += (my - oy) * 0.12
      ix += (mx - ix) * 0.25; iy += (my - iy) * 0.25
      outer.style.transform = `translate(${ox - 20}px, ${oy - 20}px)`
      inner.style.transform = `translate(${ix - 4}px, ${iy - 4}px)`
      requestAnimationFrame(tick)
    }
    const overHandler = (e) => {
      if (e.target.closest('a, button, [role="button"], .project-card-3d, .skill-node, .cert-card, .timeline-card')) setHovering(true)
    }
    const outHandler = () => setHovering(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', overHandler)
    document.addEventListener('mouseout', outHandler)
    const frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', overHandler)
      document.removeEventListener('mouseout', outHandler)
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className={`cursor-outer ${hovering ? 'cursor-hover' : ''}`} />
      <div ref={innerRef} className={`cursor-inner ${hovering ? 'cursor-hover' : ''}`} />
    </>
  )
}
