import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks.js'

export default function Scene({ children, still = false }) {
  const canvasRef = useRef(null)
  const lightRef = useRef(null)
  const reducedPref = usePrefersReducedMotion()
  const reduce = reducedPref || still

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      lightRef.current?.style.setProperty('--lx', `${50 + (x - 50) * 0.35}%`)
      lightRef.current?.style.setProperty('--ly', `${40 + (y - 50) * 0.35}%`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    let w = 0, h = 0, raf, ps = []

    const resize = () => {
      w = c.width = window.innerWidth
      h = c.height = window.innerHeight
      const count = Math.min(70, Math.floor((w * h) / 20000))
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.16, vy: -Math.random() * 0.22 - 0.03,
        a: Math.random() * 0.35 + 0.08,
      }))
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        if (!reduce) {
          p.x += p.vx; p.y += p.vy
          if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w }
          if (p.x < -5) p.x = w + 5
          if (p.x > w + 5) p.x = -5
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,236,200,${p.a})`
        ctx.fill()
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [reduce])

  return (
    <div className="scene">
      <div ref={lightRef} className="scene-light" />
      <canvas ref={canvasRef} className="scene-dust" />
      {children}
    </div>
  )
}
