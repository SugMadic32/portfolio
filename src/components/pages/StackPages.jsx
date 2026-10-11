import React from 'react'
import Page from '../Page.jsx'
import {
  SiPython, SiOpenjdk, SiJavascript, SiTypescript, SiReact, SiFlutter, SiTailwindcss, SiVite,
  SiNodedotjs, SiFlask, SiFastapi, SiSupabase, SiFirebase, SiAnthropic, SiGooglegemini,
} from 'react-icons/si'
import { Boxes, ScanEye, Database } from 'lucide-react'

const CORE = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'Python', Icon: SiPython, color: '#FFD43B' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#5B9BE8' },
  { name: 'Node.js', Icon: SiNodedotjs, color: '#6CC24A' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' },
  { name: 'Claude API', Icon: SiAnthropic, color: '#E8896A' },
]

export const StackArtPage = React.forwardRef((props, ref) => {
  const R = 128
  return (
    <Page ref={ref} side="left" variant="art" color="#0EA5A0">
      <div className="absolute inset-x-0 top-[44px] px-9">
        <div className="eyebrow" style={{ color: 'rgba(255,255,255,.55)' }}>Core skills</div>
        <h2 className="h-display mt-3 text-[40px]">What I reach for <span className="serif text-[46px] text-[#7FE3DE]">first.</span></h2>
      </div>
      <div className="absolute left-1/2 top-[330px] h-0 w-0">
        <div className="absolute -left-[168px] -top-[168px] h-[336px] w-[336px] rounded-full border border-white/10" />
        <div className="absolute -left-[104px] -top-[104px] h-[208px] w-[208px] rounded-full border border-dashed border-white/15" />
        <div className="orbit absolute left-0 top-0 h-0 w-0">
          {CORE.map(({ name, Icon, color }, i) => {
            const a = (360 / CORE.length) * i
            return (
              <div key={name} className="absolute" style={{ transform: `rotate(${a}deg) translateY(-${R}px) rotate(-${a}deg)` }}>
                <div className="orbit-counter">
                  <div className="orbit-item absolute -left-[34px] -top-[34px] flex h-[68px] w-[68px] flex-col items-center justify-center gap-1 rounded-full border border-white/20 bg-white/10" data-cursor="">
                    <Icon size={24} style={{ color }} />
                    <span className="text-[8.5px] font-medium text-white/80">{name}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="glow absolute -left-[46px] -top-[46px] flex h-[92px] w-[92px] items-center justify-center rounded-full border border-white/30 bg-white/10 text-center h-display text-[17px] leading-tight">
          My<br />stack
        </div>
      </div>
      <div className="absolute inset-x-9 bottom-[40px] text-[12px] leading-relaxed text-white/55">
        Six tools that show up in almost everything I ship. Hover an icon, or turn the page for the full list.
      </div>
    </Page>
  )
})

const CATS = [
  { label: 'Languages', color: '#7C5CFF', items: [['Python', SiPython], ['Java', SiOpenjdk], ['JavaScript', SiJavascript], ['TypeScript', SiTypescript]] },
  { label: 'Frontend', color: '#0EA5A0', items: [['React', SiReact], ['Flutter', SiFlutter], ['Tailwind CSS', SiTailwindcss], ['Vite', SiVite]] },
  { label: 'Backend & database', color: '#2E9E5B', items: [['Node.js / Express', SiNodedotjs], ['Flask', SiFlask], ['FastAPI', SiFastapi], ['Supabase', SiSupabase], ['Firebase', SiFirebase]] },
  { label: 'AI / ML tools', color: '#F0A202', items: [['Claude API', SiAnthropic], ['Gemini Robotics', SiGooglegemini], ['YOLO', ScanEye], ['HDOCK / HADDOCK', Boxes], ['ChromaDB', Database]] },
]

export const StackTechPage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="right">
    <div className="absolute inset-x-10 top-[44px]">
      <div className="eyebrow">All technologies</div>
      <h2 className="h-display mt-3 text-[34px]">Everything I <span className="serif text-[40px] text-[var(--c-accent)]">use.</span></h2>
      <div className="mt-5 flex flex-col gap-3">
        {CATS.map((cat) => (
          <div key={cat.label} className="rounded-xl border border-[var(--c-line)] bg-[var(--c-paper-alt)] px-4 pb-3.5 pt-3" style={{ borderTop: `3px solid ${cat.color}` }}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[.14em]" style={{ color: cat.color }}>{cat.label}</div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {cat.items.map(([name, Icon]) => (
                <span key={name} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--c-line)] bg-[var(--c-paper)] px-2.5 py-1 text-[11.5px]">
                  <Icon size={12} style={{ color: cat.color }} />{name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>
))
