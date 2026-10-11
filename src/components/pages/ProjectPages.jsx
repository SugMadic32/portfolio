import React from 'react'
import Page from '../Page.jsx'
import { ART } from '../art/Art.jsx'
import { categoryColors } from '../../data/projects.js'
import { ArrowUpRight } from 'lucide-react'

export const ProjectArtPage = React.forwardRef(({ project, index, total }, ref) => {
  const color = categoryColors[project.category]
  const Art = ART[project.category]
  return (
    <Page ref={ref} side="left" variant="art" color={color}>
      <div className="outline-num absolute left-[30px] top-[26px] text-[96px]" style={{ '--c': color }}>
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="absolute right-[30px] top-[40px] text-right">
        <div className="text-[10.5px] font-semibold uppercase tracking-[.16em]" style={{ color }}>{project.tag}</div>
        <div className="mt-1 text-[10px] uppercase tracking-[.16em] text-white/40">{index + 1} of {total}</div>
      </div>
      <div className="absolute inset-x-[10px] top-[118px]"><Art c={color} /></div>
      <div className="absolute inset-x-[34px] bottom-[50px]">
        <h2 className="h-display text-[42px] leading-[1.02]">{project.display[0]}</h2>
        <div className="serif mt-1 text-[34px] leading-none" style={{ color }}>{project.display[1]}</div>
      </div>
      <div className="absolute bottom-[18px] right-[30px] text-[9px] uppercase tracking-[.2em] text-white/30">Illustration</div>
    </Page>
  )
})

export const ProjectInfoPage = React.forwardRef(({ project, index, onOpen }, ref) => {
  const color = categoryColors[project.category]
  const live = project.links[0]
  return (
    <Page ref={ref} side="right">
      <div className="absolute inset-x-10 top-[46px]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
          <span className="eyebrow !text-[10.5px]" style={{ color }}>{project.tag}</span>
        </div>
        <h3 className="h-display mt-3 text-[28px] leading-[1.08]">{project.title}</h3>
        <p className="mt-3 text-[13.5px] leading-[1.6] text-[var(--c-ink)]/80">{project.oneLiner}</p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-[var(--c-line)] py-3">
          {[['Role', project.role], ['Context', project.context], ['Status', project.status]].map(([k, v]) => (
            <div key={k}>
              <div className="eyebrow !text-[9.5px]">{k}</div>
              <div className="mt-1 text-[11.5px] font-medium leading-snug">{v}</div>
            </div>
          ))}
        </div>

        <ul className="mt-5 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[12.5px] leading-[1.5]">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tools.map((t) => (
            <span key={t} className="rounded-full border px-2.5 py-1 text-[11px] text-[var(--c-mute)]" style={{ borderColor: `${color}55` }}>{t}</span>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-2.5">
          <button
            type="button"
            data-cursor="OPEN"
            onClick={() => onOpen(project)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full text-[13px] font-semibold text-white"
            style={{ background: color }}
          >
            Read the full case study <ArrowUpRight size={15} />
          </button>
          {live && (
            <a href={live.url} target="_blank" rel="noopener noreferrer" data-cursor="→"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[var(--c-line)] text-[13px] font-medium">
              {live.label} <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </Page>
  )
})
