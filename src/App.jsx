import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { ChevronLeft, ChevronRight, List, X, ArrowUpRight } from 'lucide-react'

import Scene from './components/Scene.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import Loader from './components/Loader.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import MessageModal from './components/MessageModal.jsx'

import { CoverPage, BackCoverPage } from './components/pages/CoverPages.jsx'
import { IntroArtPage, AboutPage } from './components/pages/IntroPages.jsx'
import { StackArtPage, StackTechPage } from './components/pages/StackPages.jsx'
import { ExperiencePage, EducationPage } from './components/pages/ExperiencePages.jsx'
import { ProjectArtPage, ProjectInfoPage } from './components/pages/ProjectPages.jsx'
import { ContactArtPage, ContactInfoPage } from './components/pages/ContactPages.jsx'
import { FaqPage, ThanksPage } from './components/pages/EndPages.jsx'

import { projects } from './data/projects.js'
import { useBookLayout, useFpsGuard } from './hooks.js'

// Page indexes: 0 cover | 1-2 intro+about | 3-4 stack | 5-6 experience+education
// | 7-20 projects (2 pages each) | 21-22 contact | 23-24 faq+thanks | 25 back cover
const PROJECT_START = 7
const CONTACT_PAGE = PROJECT_START + projects.length * 2
const LAST_PAGE = CONTACT_PAGE + 4

const CHAPTERS = [
  { label: 'Intro', page: 1 },
  { label: 'Stack', page: 3 },
  { label: 'Experience', page: 5 },
  { label: 'Work', page: PROJECT_START },
  { label: 'Contact', page: CONTACT_PAGE },
]

const TOC = [
  { label: 'Cover', page: 0 },
  { label: 'Intro & About', page: 1 },
  { label: 'Stack', page: 3 },
  { label: 'Experience & Education', page: 5 },
  ...projects.map((p, i) => ({ label: p.title, page: PROJECT_START + i * 2 })),
  { label: 'Contact', page: CONTACT_PAGE },
  { label: 'FAQ & Thanks', page: CONTACT_PAGE + 2 },
]

export default function App() {
  const [loading, setLoading] = useState(true)
  const [activeProject, setActiveProject] = useState(null)
  const [messageOpen, setMessageOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [motionOff, setMotionOff] = useState(() => {
    try { return localStorage.getItem('aizen-motion') === 'off' } catch (e) { return false }
  })
  const [autoLite, setAutoLite] = useState(false)
  const [toast, setToast] = useState(false)
  const lite = motionOff || autoLite
  const [orientation, setOrientation] = useState('landscape')
  const pageRef = useRef(0)
  const bookRef = useRef(null)
  const shellRef = useRef(null)
  const turnRef = useRef(() => {})
  const layout = useBookLayout()

  useEffect(() => {
    document.documentElement.style.setProperty('--page-scale', String(layout.scale))
  }, [layout.scale])

  useEffect(() => {
    document.documentElement.classList.toggle('lite', lite)
  }, [lite])

  const toggleMotion = () => {
    const next = !motionOff
    setMotionOff(next)
    setAutoLite(false)
    try { localStorage.setItem('aizen-motion', next ? 'off' : 'on') } catch (e) { /* ignore */ }
  }

  const onSlow = useCallback(() => {
    setAutoLite(true)
    setToast(true)
    setTimeout(() => setToast(false), 7000)
  }, [])
  useFpsGuard(!loading && !lite, onSlow)

  const onFlip = useCallback((e) => {
    pageRef.current = e.data
    setPageIndex(e.data)
    document.body.dataset.page = String(e.data)
  }, [])

  // Chapter/contents jumps: quick fade, then land exactly on the page.
  // (The library's own flip(n) can overshoot, so we use turnToPage here.
  // Arrow keys and the next/prev buttons keep the real page-turn animation.)
  const goPage = useCallback((n) => {
    setMenuOpen(false)
    const pf = bookRef.current?.pageFlip()
    if (!pf || pf.getCurrentPageIndex() === n) return
    setFading(true)
    setTimeout(() => {
      bookRef.current?.pageFlip()?.turnToPage(n)
      onFlip({ data: n })
      setFading(false)
    }, 230)
  }, [onFlip])
  // The library ignores programmatic backward turns in single-page (phone) mode while
  // click-to-flip is disabled, so allow it for the instant the turn starts.
  const turn = useCallback((dir) => {
    const pf = bookRef.current?.pageFlip()
    if (!pf) return
    const settings = pf.getSettings()
    const was = settings.disableFlipByClick
    settings.disableFlipByClick = false
    try { if (dir === 'next') pf.flipNext(); else pf.flipPrev() } finally { settings.disableFlipByClick = was }
  }, [])
  turnRef.current = turn
  const next = useCallback(() => turn('next'), [turn])
  const prev = useCallback(() => turn('prev'), [turn])

  useEffect(() => {
    const onKey = (e) => {
      if (activeProject || messageOpen || menuOpen) return
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, activeProject, messageOpen, menuOpen])

  const { w, h, portrait, compact, topH } = layout
  // +2px so rounding at odd zoom levels can never make the book think it is too narrow for two pages
  const bookW = portrait ? w : w * 2 + 2
  let shift = 0
  if (orientation === 'landscape') {
    if (pageIndex === 0) shift = -w / 2
    else if (pageIndex >= LAST_PAGE) shift = w / 2
  }
  const open = pageIndex > 0 && pageIndex < LAST_PAGE
  const activeChapter = [...CHAPTERS].reverse().find((c) => pageIndex >= c.page)

  // IMPORTANT: this list must keep the same identity between renders.
  // react-pageflip rebuilds (removes and re-inserts) every page whenever its
  // children list changes, which made pages flash on every turn.
  // Touch swipes are handled here, not by the library: its own swipe logic only accepts
  // gestures under 0.25s and turns the page the wrong way for slower ones. The library's
  // touch start is blocked in the capture phase; mouse dragging is untouched.
  useEffect(() => {
    const el = shellRef.current
    if (!el) return
    let sx = 0, sy = 0, st = 0, active = false
    const onStartCapture = (e) => {
      e.stopPropagation()
      if (e.touches.length !== 1) { active = false; return }
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now(); active = true
    }
    const onEnd = (e) => {
      if (!active) return
      active = false
      const t = e.changedTouches[0]
      const dx = t.clientX - sx, dy = t.clientY - sy
      if (Math.abs(dx) < 40 || Math.abs(dy) > Math.abs(dx) * 0.75 || Date.now() - st > 1400) return
      if (e.cancelable) e.preventDefault() // stop the browser's follow-up mouse events
      turnRef.current(dx < 0 ? 'next' : 'prev')
    }
    el.addEventListener('touchstart', onStartCapture, { capture: true, passive: true })
    el.addEventListener('touchend', onEnd, { passive: false })
    return () => {
      el.removeEventListener('touchstart', onStartCapture, { capture: true })
      el.removeEventListener('touchend', onEnd)
    }
  }, [loading])

  const goPageRef = useRef(goPage)
  goPageRef.current = goPage
  const pages = useMemo(() => [
    <CoverPage key="cover" />,
    <IntroArtPage key="intro" />,
    <AboutPage key="about" />,
    <StackArtPage key="stack-a" />,
    <StackTechPage key="stack-t" />,
    <ExperiencePage key="exp" />,
    <EducationPage key="edu" />,
    ...projects.flatMap((p, i) => [
      <ProjectArtPage key={`${p.slug}-a`} project={p} index={i} total={projects.length} />,
      <ProjectInfoPage key={`${p.slug}-i`} project={p} index={i} onOpen={setActiveProject} />,
    ]),
    <ContactArtPage key="contact-a" onMessage={() => setMessageOpen(true)} />,
    <ContactInfoPage key="contact-i" />,
    <FaqPage key="faq" />,
    <ThanksPage key="thanks" onRestart={() => goPageRef.current(0)} />,
    <BackCoverPage key="back" />,
  ], [])

  return (
    <Scene still={lite}>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <CustomCursor />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <MessageModal open={messageOpen} onClose={() => setMessageOpen(false)} />

      <div className="relative z-10 flex h-full w-full flex-col">
        {/* Top HUD */}
        <header className="flex shrink-0 items-center justify-between px-4 md:px-8" style={{ height: topH }}>
          <button type="button" data-cursor="↺" onClick={() => goPage(0)} className="flex items-baseline gap-2 text-white" aria-label="Back to the cover">
            <span className="font-display text-[20px] font-semibold tracking-tight">Aizen</span>
            <span className="serif hidden text-[18px] text-white/50 sm:inline">portfolio</span>
          </button>
          <div className="flex items-center gap-2">
            <button type="button" data-cursor="→" onClick={() => goPage(CONTACT_PAGE)} className="hud-btn primary">
              Get in touch <ArrowUpRight size={14} className="ml-1" />
            </button>
            <ThemeToggle />
            <button type="button" data-cursor="→" onClick={() => setMenuOpen(true)} aria-label="Open contents" className="hud-btn !px-0">
              <List size={16} />
            </button>
          </div>
        </header>

        {/* Book */}
        <main className="relative flex min-h-0 flex-1 items-center justify-center">
          <div className={loading ? 'opacity-0' : 'book-in'}>
            <div ref={shellRef} className="book-shift relative" style={{ width: bookW, height: h, transform: `translateX(${shift}px)`, opacity: fading ? 0 : 1 }}>
              <div className="book-shadow" />
              <HTMLFlipBook
                key={`${w}x${h}`}
                width={w}
                height={h}
                size="fixed"
                startPage={Math.min(pageRef.current, LAST_PAGE)}
                showCover={true}
                usePortrait={true}
                mobileScrollSupport={false}
                showPageCorners={true}
                disableFlipByClick={true}
                maxShadowOpacity={0.5}
                flippingTime={850}
                swipeDistance={24}
                drawShadow={true}
                autoSize={false}
                className="book-root"
                style={{}}
                ref={bookRef}
                onFlip={onFlip}
                onInit={(e) => setOrientation(e.data.mode)}
                onChangeOrientation={(e) => setOrientation(e.data)}
              >
                {pages}
              </HTMLFlipBook>
              {!portrait && <div className="spine" style={{ opacity: open ? 1 : 0 }} />}
              {!loading && pageIndex > 0 && (
                <button type="button" aria-label="Previous page" data-cursor="←" onClick={prev} className="turn-zone turn-left" />
              )}
              {!loading && pageIndex < LAST_PAGE && (
                <button type="button" aria-label="Next page" data-cursor="→" onClick={next} className="turn-zone turn-right" />
              )}
            </div>
          </div>
        </main>

        {/* Bottom bar */}
        <footer className={`flex shrink-0 flex-col items-center gap-2 px-3 ${compact ? 'pb-3 pt-1' : 'pb-4 pt-3'}`}>
          <div className="flex max-w-full items-center gap-2">
            <button type="button" data-cursor="←" onClick={prev} aria-label="Previous page" className="hud-btn !px-0"><ChevronLeft size={18} /></button>
            <nav className="flex max-w-[calc(100vw-130px)] items-center gap-1 overflow-x-auto rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur" aria-label="Chapters">
              {CHAPTERS.map((c) => (
                <button key={c.label} type="button" data-cursor="→" onClick={() => goPage(c.page)}
                  className={`chip ${activeChapter?.label === c.label ? 'active' : ''}`}>{c.label}</button>
              ))}
            </nav>
            <button type="button" data-cursor="→" onClick={next} aria-label="Next page" className="hud-btn !px-0"><ChevronRight size={18} /></button>
          </div>
          {!compact && <div className="text-[11.5px] tracking-wide text-white/35">
            Drag a page corner, click a page edge, swipe, or use the ← → keys
          </div>}
        </footer>
      </div>

      {toast && (
        <div role="status" className="fixed bottom-24 left-1/2 z-[330] -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-[12.5px] text-white backdrop-blur">
          Animations paused to keep things smooth. Turn them back on in the contents menu.
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[320] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && setMenuOpen(false)}>
          <div className="max-h-[82vh] w-full max-w-sm overflow-y-auto rounded-2xl bg-paper p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="font-display text-lg font-semibold text-ink">Contents</div>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close" className="text-mute hover:text-ink"><X size={18} /></button>
            </div>
            <button type="button" onClick={toggleMotion}
              className="mt-3 flex w-full items-center justify-between rounded-lg border border-line bg-paper-alt px-3 py-2.5 text-left text-[13px] text-ink">
              <span>Animations</span>
              <span className="font-semibold">{lite ? 'Paused' : 'On'}</span>
            </button>
            <div className="mt-2 flex flex-col">
              {TOC.map((item) => (
                <button key={item.label} type="button" onClick={() => goPage(item.page)}
                  className="rounded-lg px-3 py-2.5 text-left text-[14px] text-ink hover:bg-paper-alt">{item.label}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </Scene>
  )
}
