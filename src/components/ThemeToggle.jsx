import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('aizen-theme', theme) } catch (e) { /* ignore */ }
  }, [theme])
  return (
    <button type="button" data-cursor="→" aria-label="Switch page colors between light and dark"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} className="hud-btn !px-0">
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
