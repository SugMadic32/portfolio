import React from 'react'
import Page from '../Page.jsx'
import RotatingRole from '../RotatingRole.jsx'
import SocialLinks from '../SocialLinks.jsx'
import { ABOUT, PROFILE } from '../../data/profile.js'
import profilePhoto from '../../assets/me.jpg'

export const IntroArtPage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="left" variant="art" color="#5B7FE8">
    <div className="absolute left-0 right-0 top-[56px] flex flex-col items-center">
      <div className="relative flex h-[190px] w-[190px] items-center justify-center">
        <div className="orbit absolute inset-0 rounded-full border border-dashed border-white/30" />
        <div className="orbit absolute -inset-5 rounded-full border border-white/10" style={{ animationDirection: 'reverse', animationDuration: '70s' }}>
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9DB8F5]" />
        </div>
        <img src={profilePhoto} alt="Portrait of Aizen" width="160" height="160" draggable="false"
          className="h-[160px] w-[160px] rounded-full border-2 border-white/40 object-cover shadow-[0_10px_40px_rgba(0,0,0,.45)]" />
      </div>
    </div>
    <div className="absolute inset-x-0 top-[290px] text-center">
      <div className="text-[13px] text-white/60">Hello, I'm</div>
      <h2 className="h-display mt-1 text-[78px]" style={{ letterSpacing: '-.04em' }}>Aizen</h2>
      <div className="mt-1 text-[20px]"><RotatingRole light /></div>
    </div>
    <div className="absolute inset-x-9 bottom-[58px] grid grid-cols-3 gap-3 border-t border-white/15 pt-5 text-center">
      {[['7', 'projects built'], ['1', 'symposium led'], ['1', 'paper in progress']].map(([n, l]) => (
        <div key={l}>
          <div className="h-display text-[34px]">{n}</div>
          <div className="mt-0.5 text-[11px] leading-tight text-white/55">{l}</div>
        </div>
      ))}
    </div>
  </Page>
))

export const AboutPage = React.forwardRef((props, ref) => (
  <Page ref={ref} side="right">
    <div className="absolute inset-x-10 top-[48px]">
      <div className="eyebrow">About</div>
      <h2 className="h-display mt-3 text-[34px]">Builder first, <span className="serif text-[40px] text-[var(--c-accent)]">student second.</span></h2>
      <div className="mt-5 space-y-3 text-[13px] leading-[1.6] text-[var(--c-ink)]/85">
        {ABOUT.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[var(--c-line)] pt-4 text-[12px]">
        <div><div className="eyebrow !text-[10px]">Based in</div><div className="mt-1 font-medium">{PROFILE.location}</div></div>
        <div><div className="eyebrow !text-[10px]">Languages</div><div className="mt-1 font-medium">Burmese · English</div></div>
      </div>
      <div className="mt-4"><SocialLinks /></div>
    </div>
  </Page>
))
