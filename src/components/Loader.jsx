import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks.js'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const rootRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) { onDone(); return }

    let raf
    const start = performance.now()
    const duration = 1100

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      setCount(Math.round(progress * 100))
      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.15,
          onComplete: onDone,
        })
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion, onDone])

  if (reducedMotion) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-[#0E0F12] text-[#F7F6F3]"
    >
      <div className="font-display text-2xl tracking-tight">AIZEN</div>
      <div className="mt-4 font-mono text-xs tracking-widest text-white/50">
        OPENING THE BOOK · {String(count).padStart(2, '0')}
      </div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-white/15">
        <div className="h-full bg-[#6B93E8]" style={{ width: `${count}%` }} />
      </div>
    </div>
  )
}
