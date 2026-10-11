import { useEffect, useRef, useState } from 'react'
import { useIsFinePointer, usePrefersReducedMotion } from '../hooks.js'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const [label, setLabel] = useState(null)
  const isFine = useIsFinePointer()
  const reducedMotion = usePrefersReducedMotion()
  const enabled = isFine && !reducedMotion

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-active')
      return
    }
    document.body.classList.add('cursor-active')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let curX = x
    let curY = y
    let raf

    const onMove = (e) => { x = e.clientX; y = e.clientY }
    const tick = () => {
      curX += (x - curX) * 0.22
      curY += (y - curY) * 0.22
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      setLabel(target ? target.dataset.cursor : null)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf)
      document.body.classList.remove('cursor-active')
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      className={`pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center
                  rounded-full transition-[width,height,background-color] duration-200
                  ${label ? 'h-16 w-16 bg-accent' : 'h-4 w-4 bg-ink'}`}
    >
      {label && <span className="text-[10px] font-semibold uppercase tracking-wide text-paper">{label}</span>}
    </div>
  )
}
