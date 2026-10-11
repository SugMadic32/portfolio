import { useEffect } from 'react'
import { X, ArrowUpRight, Github } from 'lucide-react'
import { categoryColors } from '../data/projects.js'
import { PROFILE } from '../data/profile.js'

function Section({ title, children }) {
  return (
    <div className="mt-6">
      <div className="text-[11px] font-semibold uppercase tracking-[.16em] text-mute">{title}</div>
      <p className="mt-2 text-[15px] leading-[1.7] text-ink/90">{children}</p>
    </div>
  )
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null
  const color = categoryColors[project.category]

  return (
    <div className="fixed inset-0 z-[350] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={project.title}
        className="max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-paper p-6 shadow-2xl md:p-9" style={{ borderTop: `4px solid ${color}` }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[.16em]" style={{ color }}>{project.tag}</div>
            <h2 className="mt-2 font-display text-[28px] font-semibold leading-tight text-ink">{project.title}</h2>
            <p className="mt-1.5 text-[13px] text-mute">{project.role} · {project.context} · {project.status}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-mute hover:text-ink">
            <X size={16} />
          </button>
        </div>

        <Section title="Overview">{project.overview}</Section>
        <Section title="The problem">{project.problem}</Section>
        <Section title="Approach">{project.approach}</Section>
        <Section title="What I built">{project.build}</Section>
        <Section title="Outcome">{project.outcome}</Section>
        <Section title="Reflection">{project.reflection}</Section>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tools.map((t) => (
            <span key={t} className="rounded-full border px-3 py-1 text-xs text-mute" style={{ borderColor: `${color}55` }}>{t}</span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: color }}>
              {l.label} <ArrowUpRight size={14} />
            </a>
          ))}
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink">
            <Github size={14} /> My GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
