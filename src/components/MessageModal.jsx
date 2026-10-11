import { useEffect, useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { PROFILE } from '../data/profile.js'

export default function MessageModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n—\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
  }
  const field = 'mt-1.5 w-full rounded-lg border border-line bg-paper-alt px-3.5 py-2.5 text-[14px] text-ink outline-none focus:border-accent'

  return (
    <div className="fixed inset-0 z-[360] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl bg-paper p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-[26px] font-semibold leading-tight text-ink">Write me a message</h2>
            <p className="mt-1 text-[13px] text-mute">Opens your email app with this filled in.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-mute hover:text-ink"><X size={16} /></button>
        </div>
        <label className="mt-5 block text-[12px] font-semibold uppercase tracking-wider text-mute">Name
          <input name="name" required value={form.name} onChange={onChange} className={field} />
        </label>
        <label className="mt-4 block text-[12px] font-semibold uppercase tracking-wider text-mute">Your email
          <input name="email" type="email" required value={form.email} onChange={onChange} className={field} />
        </label>
        <label className="mt-4 block text-[12px] font-semibold uppercase tracking-wider text-mute">Message
          <textarea name="message" required rows={4} value={form.message} onChange={onChange} className={`${field} resize-none`} />
        </label>
        <button type="submit" className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper">
          Open in my email app <ArrowUpRight size={15} />
        </button>
        <p className="mt-3 text-[11.5px] text-mute">Nothing is sent from this page itself, so there is no hidden server collecting your message.</p>
      </form>
    </div>
  )
}
