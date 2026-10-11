import { Mail, Github, Linkedin } from 'lucide-react'
import { PROFILE } from '../data/profile.js'

export default function SocialLinks({ dark = false }) {
  const base = dark
    ? 'border-white/25 text-white/80 hover:bg-white/15 hover:text-white'
    : 'border-[var(--c-line)] text-[var(--c-mute)] hover:border-[var(--c-ink)] hover:text-[var(--c-ink)]'
  const items = [
    { Icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
    { Icon: Linkedin, href: PROFILE.linkedin, label: 'LinkedIn' },
    { Icon: Github, href: PROFILE.github, label: 'GitHub' },
  ]
  return (
    <div className="flex items-center gap-2.5">
      {items.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={label}
          data-cursor="→"
          className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${base}`}
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  )
}
