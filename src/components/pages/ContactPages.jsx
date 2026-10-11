import React from 'react'
import Page from '../Page.jsx'
import { ArrowUpRight, Mail, Github, Linkedin, PenLine } from 'lucide-react'
import { PROFILE } from '../../data/profile.js'

export const ContactArtPage = React.forwardRef(({ onMessage }, ref) => (
  <Page ref={ref} side="left" variant="art" color="#D6449D">
    <div className="glow absolute -right-16 top-[120px] h-[260px] w-[260px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(214,68,157,.45), transparent 68%)' }} />
    <div className="absolute inset-x-9 top-[70px]">
      <div className="eyebrow" style={{ color: 'rgba(255,255,255,.55)' }}>Contact</div>
      <h2 className="h-display mt-4 text-[64px] leading-[.98]" style={{ letterSpacing: '-.035em' }}>Have an idea?</h2>
      <div className="serif mt-3 text-[44px] leading-[1.02] text-[#F59BD2]">Let's build something.</div>
    </div>
    <div className="absolute inset-x-9 bottom-[64px]">
      <button
        type="button"
        data-cursor="WRITE"
        onClick={onMessage}
        className="inline-flex h-12 items-center gap-2.5 rounded-full bg-white px-6 text-[14px] font-semibold text-[#15161A]"
      >
        <PenLine size={16} /> Write me a message
      </button>
      <div className="mt-4 text-[12.5px] text-white/55">or email {PROFILE.email}</div>
    </div>
  </Page>
))

export const ContactInfoPage = React.forwardRef((props, ref) => {
  const rows = [
    { Icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { Icon: Linkedin, label: 'LinkedIn', value: PROFILE.linkedinLabel, href: PROFILE.linkedin },
    { Icon: Github, label: 'GitHub', value: PROFILE.githubLabel, href: PROFILE.github },
  ]
  return (
    <Page ref={ref} side="right">
      <div className="absolute inset-x-10 top-[48px]">
        <div className="eyebrow">Get in touch</div>
        <h2 className="h-display mt-3 text-[34px] leading-[1.05]">Open to internships, collaborations and <span className="serif text-[40px] text-[var(--c-accent)]">research.</span></h2>
        <div className="mt-6 flex flex-col gap-2.5">
          {rows.map(({ Icon, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" data-cursor="→"
              className="flex items-center gap-3 rounded-xl border border-[var(--c-line)] bg-[var(--c-paper-alt)] px-4 py-3.5">
              <Icon size={18} className="shrink-0 text-[var(--c-accent)]" />
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-semibold">{label}</div>
                <div className="truncate text-[11.5px] text-[var(--c-mute)]">{value}</div>
              </div>
              <ArrowUpRight size={15} className="text-[var(--c-mute)]" />
            </a>
          ))}
        </div>
        <p className="mt-6 text-[12.5px] leading-[1.6] text-[var(--c-mute)]">
          Based in {PROFILE.location}. Happy to talk about internships, research collaboration, or freelance builds where I can own a system end to end.
        </p>
      </div>
    </Page>
  )
})
