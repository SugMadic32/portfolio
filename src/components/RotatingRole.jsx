import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks.js'

const ROLES = ['Full-Stack Builder', 'Technical Lead', 'IT Student', 'Systems Engineer']

export default function RotatingRole({ light = false }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState('typing')
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) { setDisplay(ROLES[0]); return }
    const current = ROLES[roleIndex]
    let timeout

    if (phase === 'typing') {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 45)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), 1200)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 800)
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(display.slice(0, -1)), 22)
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timeout)
  }, [display, phase, roleIndex, reducedMotion])

  return (
    <span className={`font-display font-medium ${light ? 'text-[#9DB8F5]' : 'text-accent'}`}>
      {display}
      {!reducedMotion && <span className="ml-0.5 animate-pulse">|</span>}
    </span>
  )
}
