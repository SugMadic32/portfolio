import { useEffect, useState } from 'react'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export function useIsFinePointer() {
  const [isFine, setIsFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handler = (e) => setIsFine(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return isFine
}

// Every page is authored on a fixed 440x640 canvas and scaled to fit,
// so layouts never reflow or overflow on different devices.
export const DESIGN_W = 440
export const DESIGN_H = 640

function computeLayout() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const compact = vh < 760 || vw < 700
  const topH = vh < 700 ? 54 : 62
  const bottomH = vw < 700 ? 98 : compact ? 64 : 82
  const availH = Math.max(280, vh - topH - bottomH)

  // Two-page spread whenever the window is wide enough, even if it is short.
  let h = Math.min(availH, 960)
  let w = (h * DESIGN_W) / DESIGN_H
  const maxSpreadW = (vw - 28) / 2 - 2
  if (w > maxSpreadW) {
    w = maxSpreadW
    h = (w * DESIGN_H) / DESIGN_W
  }
  if (vw >= 640 && w >= 220) {
    const hh = Math.floor(h)
    return { w: Math.floor((hh * DESIGN_W) / DESIGN_H), h: hh, portrait: false, compact, topH, scale: hh / DESIGN_H }
  }

  // Otherwise one page at a time (phones).
  w = Math.min(vw - 24, (availH * DESIGN_W) / DESIGN_H)
  const hh = Math.floor((w * DESIGN_H) / DESIGN_W)
  return { w: Math.floor(w), h: hh, portrait: true, compact, topH, scale: hh / DESIGN_H }
}

export function useBookLayout() {
  const [layout, setLayout] = useState(computeLayout)
  useEffect(() => {
    let t
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => setLayout(computeLayout()), 120)
    }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [])
  return layout
}

// Watches the real frame rate. If the device stays under ~22fps for two
// consecutive 2-second windows, calls onSlow once so the app can pause
// decorative animations. Ignores background tabs.
export function useFpsGuard(enabled, onSlow) {
  useEffect(() => {
    if (!enabled) return
    let raf
    let stopped = false
    let last = performance.now()
    let frames = 0
    let slowWindows = 0
    const tick = (now) => {
      if (stopped) return
      frames++
      if (now - last >= 2000) {
        const fps = (frames * 1000) / (now - last)
        if (document.visibilityState === 'visible' && fps < 22) {
          slowWindows++
          if (slowWindows >= 2) { onSlow(fps); return }
        } else {
          slowWindows = 0
        }
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { stopped = true; cancelAnimationFrame(raf) }
  }, [enabled, onSlow])
}
