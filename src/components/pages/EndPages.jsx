import React, { useState } from 'react'
import Page from '../Page.jsx'
import SocialLinks from '../SocialLinks.jsx'
import { FAQS } from '../../data/profile.js'
import { Plus, RotateCcw } from 'lucide-react'

export const FaqPage = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(0)
  return (
    <Page ref={ref} side="left">
      <div className="absolute inset-x-10 top-[46px]">
        <div className="eyebrow">FAQ</div>
        <h2 className="h-display mt-3 text-[36px]">Questions people <span className="serif text-[42px] text-[var(--c-accent)]">ask.</span></h2>
        <div className="mt-5 flex flex-col gap-2">
          {FAQS.map((f, i) => (
            <div key={f.q} className="rounded-xl border border-[var(--c-line)] bg-[var(--c-paper-alt)]">
              <button type="button" data-cursor="→" onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[13px] font-medium">
                <span>{f.q}</span>
                <Plus size={15} className="shrink-0 text-[var(--c-accent)] transition-transform" style={{ transform: open === i ? 'rotate(45deg)' : 'none' }} />
              </button>
              {open === i && <p className="px-4 pb-3.5 text-[12.5px] leading-[1.55] text-[var(--c-mute)]">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
})

export const ThanksPage = React.forwardRef(({ onRestart }, ref) => (
  <Page ref={ref} side="right" variant="art" color="#2954C8">
    <div className="absolute inset-x-9 top-[150px]">
      <div className="eyebrow" style={{ color: 'rgba(255,255,255,.55)' }}>The end</div>
      <h2 className="h-display mt-4 text-[58px] leading-[1]" style={{ letterSpacing: '-.035em' }}>Thanks for reading.</h2>
      <div className="serif mt-3 text-[36px] text-[#9DB8F5]">— Aizen</div>
    </div>
    <div className="absolute inset-x-9 bottom-[70px]">
      <SocialLinks dark />
      <button type="button" data-cursor="↺" onClick={onRestart}
        className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-white/30 px-5 text-[13px] font-medium text-white hover:bg-white/10">
        <RotateCcw size={14} /> Back to the cover
      </button>
    </div>
  </Page>
))
