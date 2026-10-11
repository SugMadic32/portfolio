import React from 'react'
import Page from '../Page.jsx'
import { GraduationCap } from 'lucide-react'
import { EXPERIENCE, NOW_BUILDING, PROFILE } from '../../data/profile.js'

export const ExperiencePage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="left">
    <div className="absolute inset-x-10 top-[40px]">
      <div className="eyebrow">Experience</div>
      <h2 className="h-display mt-2 text-[32px]">Where I've <span className="serif text-[42px] text-[var(--c-accent)]">worked.</span></h2>
      <div className="relative mt-4 pl-6">
        <div className="absolute bottom-1 left-[5px] top-1 w-px bg-[var(--c-line)]" />
        {EXPERIENCE.map((e, i) => (
          <div key={e.title} className="relative pb-[13px] last:pb-0">
            <span className="absolute -left-[25px] top-[5px] h-[11px] w-[11px] rounded-full border-2 border-[var(--c-paper)]" style={{ background: i === 0 ? 'var(--c-accent)' : 'var(--c-mute)' }} />
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-[var(--c-mute)]">{e.when}</div>
            <div className="h-display text-[15.5px] leading-snug">{e.title}</div>
            <div className="text-[11.5px] text-[var(--c-mute)]">{e.org}</div>
            <p className="mt-0.5 text-[12px] leading-[1.45] text-[var(--c-ink)]/80">{e.detail}</p>
          </div>
        ))}
      </div>
    </div>
  </Page>
))

export const EducationPage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="right">
    <div className="absolute inset-x-10 top-[46px]">
      <div className="eyebrow">Education</div>
      <h2 className="h-display mt-3 text-[36px]">Where I <span className="serif text-[42px] text-[var(--c-accent)]">study.</span></h2>
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-[var(--c-line)] bg-[var(--c-paper-alt)] p-4">
        <GraduationCap size={22} className="mt-0.5 shrink-0 text-[var(--c-accent)]" />
        <div className="flex-1">
          <div className="h-display text-[16.5px] leading-snug">Information and Communication Technology</div>
          <div className="mt-1 text-[12px] text-[var(--c-mute)]">Rangsit University International College · Faculty of Information Technology</div>
        </div>
        <div className="text-right">
          <div className="h-display text-[26px] text-[var(--c-accent)]">{PROFILE.gpa}</div>
          <div className="text-[10px] uppercase tracking-wider text-[var(--c-mute)]">GPA</div>
        </div>
      </div>

      <div className="eyebrow mt-8">Now building</div>
      <div className="mt-3 flex flex-col gap-2.5">
        {NOW_BUILDING.map((n) => (
          <div key={n.name} className="rounded-xl bg-[var(--c-paper-alt)] p-3.5" style={{ borderLeft: `4px solid ${n.color}` }}>
            <div className="h-display text-[15px]">{n.name}</div>
            <p className="mt-0.5 text-[12px] leading-[1.5] text-[var(--c-mute)]">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  </Page>
))
