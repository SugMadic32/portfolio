import React from 'react'
import Page from '../Page.jsx'
import { ChevronRight } from 'lucide-react'

function Constellation() {
  const nodes = [[60, 70], [150, 30], [250, 80], [330, 40], [370, 130], [300, 170], [190, 150], [90, 160], [40, 120]]
  const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 0], [2, 6], [1, 6], [5, 2]]
  return (
    <svg viewBox="0 0 410 200" className="w-full" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#6B93E8" strokeOpacity=".35" strokeWidth="1" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4.2 : 2.8} fill="#9DB8F5" className="glow" style={{ animationDelay: `${i * -0.6}s`, transformOrigin: `${x}px ${y}px` }} />
      ))}
    </svg>
  )
}

export const CoverPage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="right" variant="cover" hard>
    <div className="absolute inset-[16px] rounded-[10px] border border-white/20" />
    <div className="absolute inset-[24px] rounded-[7px] border border-white/10" />
    <div className="absolute left-0 top-0 h-full w-[18px]" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,.45), transparent)' }} />
    <div className="absolute inset-x-0 top-[70px] px-8 text-center">
      <div className="eyebrow" style={{ color: 'rgba(255,255,255,.55)' }}>Portfolio · Systems & AI</div>
    </div>
    <div className="absolute inset-x-8 top-[150px] text-center">
      <h1 className="h-display text-[88px]" style={{ letterSpacing: '-.04em' }}>Aizen</h1>
      <p className="serif mt-2 text-[28px] text-[#9DB8F5]">builds systems that ship</p>
    </div>
    <div className="absolute inset-x-8 top-[360px] opacity-90"><Constellation /></div>
    <div className="absolute inset-x-0 bottom-[54px] flex flex-col items-center gap-2 text-white/55">
      <div className="text-[11px] uppercase tracking-[.22em]">Open the book</div>
      <ChevronRight size={18} className="nudge" />
    </div>
  </Page>
))

export const BackCoverPage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="left" variant="cover" hard>
    <div className="absolute inset-[16px] rounded-[10px] border border-white/20" />
    <div className="absolute right-0 top-0 h-full w-[18px]" style={{ background: 'linear-gradient(270deg, rgba(0,0,0,.45), transparent)' }} />
    <div className="absolute inset-x-8 top-[250px] text-center">
      <div className="h-display text-[34px]">Aizen</div>
      <p className="serif mt-2 text-[24px] text-[#9DB8F5]">thanks for reading</p>
      <p className="mx-auto mt-6 max-w-[260px] text-[12px] leading-relaxed text-white/50">
        Built with curiosity. Every case study in this book is a real project.
      </p>
    </div>
  </Page>
))
