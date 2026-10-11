import React from 'react'

/**
 * One physical page of the book. Styling lives in CSS classes (never inline
 * styles on the root) because react-pageflip rewrites the root element's
 * inline style, which is what made the earlier cover invisible.
 *
 * Content is authored on a fixed 440x640 canvas (.pg-inner) that is scaled
 * with --page-scale, so layouts are identical on every screen size.
 */
const Page = React.forwardRef(({ children, side = 'right', variant = 'paper', hard = false, color, className = '' }, ref) => (
  <div
    ref={ref}
    data-density={hard ? 'hard' : 'soft'}
    className={`pg pg-${side} ${variant === 'art' ? 'pg-art' : variant === 'cover' ? 'pg-cover' : ''} ${className}`}
  >
    <div className="pg-inner" style={color ? { '--c': color } : undefined}>{children}</div>
  </div>
))

export default Page
