const { cos, sin, PI } = Math

/* ---------- Symposium: broadcast rings + browser window ---------- */
export function SymposiumArt({ c }) {
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      {[40, 80, 120, 160, 200].map((r, i) => (
        <circle key={r} cx="220" cy="200" r={r} fill="none" stroke={c} strokeWidth="1.2"
          className="ring" style={{ animationDelay: `${i * -0.85}s` }} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} className="spin" style={{ transformOrigin: '220px 200px', animationDuration: `${16 + i * 7}s`, animationDirection: i % 2 ? 'reverse' : 'normal' }}>
          <circle cx={220 + 92 + i * 38} cy="200" r={5 - i} fill={c} />
        </g>
      ))}
      <g transform="translate(130 140)"><g className="floaty">
        <rect width="180" height="124" rx="12" fill="#0c0d12" stroke={c} strokeWidth="1.6" />
        <line x1="0" y1="26" x2="180" y2="26" stroke={c} opacity=".45" />
        <circle cx="14" cy="13" r="3.4" fill={c} /><circle cx="27" cy="13" r="3.4" fill={c} opacity=".6" /><circle cx="40" cy="13" r="3.4" fill={c} opacity=".3" />
        <rect x="16" y="42" width="104" height="12" rx="4" fill={c} />
        <rect x="16" y="64" width="146" height="7" rx="3.5" fill="#fff" opacity=".22" />
        <rect x="16" y="78" width="124" height="7" rx="3.5" fill="#fff" opacity=".22" />
        <rect x="16" y="96" width="54" height="16" rx="8" fill={c} opacity=".9" />
      </g></g>
    </svg>
  )
}

/* ---------- ASGR1: animated double helix (CSS, not SMIL) ---------- */
export function AsgrArt({ c }) {
  const rungs = 21
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      {Array.from({ length: rungs }).map((_, i) => {
        const y = 22 + i * 17.8
        const ph = i * 0.56
        return (
          <g key={i} className="rung" style={{ transformOrigin: '220px 0px', transform: `scaleX(${cos(ph).toFixed(3)})`, animationDelay: `${(-(ph % (2 * PI)) / PI * 3.5).toFixed(2)}s` }}>
            <line x1="116" y1={y} x2="324" y2={y} stroke={c} strokeOpacity=".38" strokeWidth="1.6" />
            <circle cx="116" cy={y} r="5.6" fill={c} />
            <circle cx="324" cy={y} r="5.6" fill="#fff" fillOpacity=".88" />
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Piti Care: shield + heartbeat ---------- */
const SHIELD = 'M220 34 L354 84 V206 C354 294 298 352 220 382 C142 352 86 294 86 206 V84 Z'
const ECG = 'M108 210 H166 L188 168 L212 266 L240 138 L262 228 L278 210 H332'
export function PitiArt({ c }) {
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      {[0, 1].map((i) => (
        <circle key={i} cx="220" cy="210" r="66" fill="none" stroke={c} strokeWidth="1.4" className="ring" style={{ animationDelay: `${i * -2.1}s` }} />
      ))}
      <path d={SHIELD} fill={c} fillOpacity=".09" />
      <path d={SHIELD} fill="none" stroke={c} strokeWidth="2.2" strokeLinejoin="round" />
      <path d={ECG} fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="ecg" />
      <g transform="translate(176 336)">
        <rect width="88" height="18" rx="9" fill="none" stroke={c} strokeWidth="1.6" />
        <circle cx="14" cy="9" r="3.4" fill={c} className="glow" />
        <rect x="26" y="6" width="50" height="6" rx="3" fill="#fff" opacity=".28" />
      </g>
    </svg>
  )
}

/* ---------- RetailSense: shelf detection + checkout QR ---------- */
const SHELVES = [
  { y: 96, items: [[34, 36, 56, '#8EA2FF'], [78, 30, 44, '#FFB86B'], [116, 40, 62, '#6BE0B2'], [164, 28, 40, '#FF8A9E'], [200, 38, 54, '#8EA2FF'], [246, 32, 48, '#F2D16B'], [286, 36, 60, '#6BE0B2']] },
  { y: 196, items: [[34, 30, 46, '#FFB86B'], [72, 38, 60, '#8EA2FF'], [118, 34, 50, '#FF8A9E'], [160, 40, 58, '#6BE0B2'], [208, 30, 42, '#F2D16B'], [246, 36, 56, '#8EA2FF'], [290, 32, 46, '#FFB86B']] },
  { y: 296, items: [[34, 36, 52, '#6BE0B2'], [78, 32, 62, '#FF8A9E'], [118, 38, 46, '#8EA2FF'], [164, 30, 58, '#F2D16B'], [202, 40, 48, '#FFB86B'], [250, 28, 60, '#6BE0B2'], [286, 36, 44, '#FF8A9E']] },
]
const DETECT = [[112, 34, 46, 66, 0], [158, 134, 42, 62, -2], [244, 238, 40, 58, -4]]
function Corners({ x, y, w, h, c }) {
  const L = 9
  return (
    <path d={`M${x} ${y + L} V${y} H${x + L} M${x + w - L} ${y} H${x + w} V${y + L} M${x + w} ${y + h - L} V${y + h} H${x + w - L} M${x + L} ${y + h} H${x} V${y + h - L}`}
      fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
  )
}
export function RetailArt({ c }) {
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      {SHELVES.map((s) => (
        <g key={s.y}>
          {s.items.map(([x, w, h, col], i) => (
            <rect key={i} x={x} y={s.y - h} width={w} height={h} rx="4" fill={col} fillOpacity=".78" />
          ))}
          <rect x="22" y={s.y} width="296" height="6" rx="3" fill="#fff" opacity=".28" />
        </g>
      ))}
      {DETECT.map(([x, y, w, h, d], i) => (
        <g key={i} className="det" style={{ animationDelay: `${d}s` }}>
          <Corners x={x} y={y} w={w} h={h} c={c} />
          <rect x={x} y={y - 16} width="46" height="14" rx="4" fill={c} />
          <rect x={x + 6} y={y - 11} width="26" height="4" rx="2" fill="#0c0d12" opacity=".7" />
        </g>
      ))}
      <g className="scan">
        <rect x="22" y="40" width="296" height="3" rx="1.5" fill={c} />
        <rect x="22" y="43" width="296" height="22" fill={c} opacity=".12" />
      </g>
      <g transform="translate(336 120)"><g className="floaty">
        <rect width="84" height="150" rx="14" fill="#0c0d12" stroke="#fff" strokeOpacity=".5" strokeWidth="1.6" />
        <rect x="31" y="9" width="22" height="4" rx="2" fill="#fff" opacity=".35" />
        {Array.from({ length: 25 }).map((_, i) => {
          const r = Math.floor(i / 5), k = i % 5
          const on = [0, 1, 3, 4, 5, 9, 10, 12, 14, 15, 19, 20, 21, 23, 24].includes(i)
          return on ? <rect key={i} x={16 + k * 10.4} y={40 + r * 10.4} width="8" height="8" rx="1.5" fill="#fff" /> : null
        })}
        <rect x="14" y="112" width="56" height="16" rx="8" fill={c} />
      </g></g>
    </svg>
  )
}

/* ---------- EcoSort: three bins + falling item ---------- */
export function EcoArt({ c }) {
  const bins = [['#2E9E5B', 52], ['#4C8DFF', 168], ['#F0A202', 284]]
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      <g transform="translate(196 18)"><g className="floaty">
        <path d="M24 4 C 52 6, 58 36, 24 56 C -8 40, -4 8, 24 4 Z" fill={c} opacity=".9" />
        <path d="M24 12 V50" stroke="#0c0d12" strokeWidth="2" opacity=".5" />
      </g></g>
      {bins.map(([col, x], i) => (
        <g key={x} className="bin" style={{ animationDelay: `${i * -1.5}s` }}>
          <rect x={x - 6} y="206" width="116" height="14" rx="5" fill={col} />
          <rect x={x} y="222" width="104" height="140" rx="10" fill={col} fillOpacity=".24" stroke={col} strokeWidth="2" />
          <rect x={x + 16} y="248" width="72" height="6" rx="3" fill="#fff" opacity=".35" />
          <rect x={x + 26} y="264" width="52" height="6" rx="3" fill="#fff" opacity=".2" />
        </g>
      ))}
      <g className="eco-item" transform="translate(222 150)">
        <rect x="-12" y="-18" width="24" height="36" rx="6" fill="#fff" />
      </g>
    </svg>
  )
}

/* ---------- WireLab: wireframe + 40 lesson squares ---------- */
export function WireArt({ c }) {
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      <g transform="translate(50 12)">
        <rect width="340" height="236" rx="12" fill="#0c0d12" fillOpacity=".7" stroke="#fff" strokeOpacity=".45" strokeWidth="1.5" />
        <line x1="0" y1="30" x2="340" y2="30" stroke="#fff" strokeOpacity=".3" />
        <circle cx="16" cy="15" r="3.4" fill="#fff" opacity=".6" /><circle cx="29" cy="15" r="3.4" fill="#fff" opacity=".4" /><circle cx="42" cy="15" r="3.4" fill="#fff" opacity=".25" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="16" y={48 + i * 32} width="62" height="18" rx="4" fill="none" stroke="#fff" strokeOpacity=".4" strokeDasharray="4 4" />
        ))}
        <rect x="96" y="46" width="228" height="26" rx="5" fill="none" stroke={c} strokeDasharray="5 4" strokeWidth="1.6" />
        {[0, 1, 2].map((i) => (
          <g key={i} className="det" style={{ animationDelay: `${i * -2}s` }}>
            <rect x={96 + i * 78} y="92" width="70" height="86" rx="7" fill={c} fillOpacity=".3" stroke={c} strokeWidth="1.6" />
            <rect x={106 + i * 78} y="104" width="42" height="6" rx="3" fill="#fff" opacity=".7" />
            <rect x={106 + i * 78} y="118" width="50" height="5" rx="2.5" fill="#fff" opacity=".35" />
          </g>
        ))}
        <rect x="96" y="194" width="228" height="22" rx="11" fill="none" stroke="#fff" strokeOpacity=".3" />
        <g className="wire-cursor" transform="translate(190 130)">
          <path d="M0 0 L0 17 L5 13 L9 21 L12 19.5 L8 12 L14 12 Z" fill="#fff" />
        </g>
      </g>
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} className="lesson" x={86 + (i % 10) * 26} y={278 + Math.floor(i / 10) * 26} width="18" height="18" rx="4" fill={c}
          style={{ animationDelay: `${i * 0.11}s` }} />
      ))}
      <text x="220" y="392" textAnchor="middle" fill="#fff" opacity=".5" fontSize="11" letterSpacing="2.5" fontFamily="Inter, sans-serif">40 LESSONS</text>
    </svg>
  )
}

/* ---------- GG Gears: co-purchase network ---------- */
const PRODUCTS = ['Mouse', 'Keyboard', 'Headset', 'Mousepad', 'Controller', 'Chair', 'Webcam', 'Bungee']
const EDGES = [[0, 3, 3.6], [0, 1, 2.6], [1, 2, 2], [2, 6, 1.6], [4, 2, 1.8], [5, 2, 1.4], [0, 7, 2.2], [3, 7, 1.4], [1, 3, 1.6], [4, 0, 1.2]]
export function DataArt({ c }) {
  const pos = PRODUCTS.map((_, i) => {
    const a = (i / PRODUCTS.length) * 2 * PI - PI / 2
    return [220 + 138 * cos(a), 200 + 138 * sin(a)]
  })
  return (
    <svg viewBox="0 0 440 400" className="art" aria-hidden="true">
      {EDGES.map(([a, b, w], i) => (
        <line key={i} className="edge" x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} stroke={c} strokeWidth={w} strokeOpacity=".75"
          style={{ animationDuration: `${1.2 + (i % 4) * 0.4}s` }} />
      ))}
      {pos.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="22" fill="#0c0d12" stroke={c} strokeWidth="2" />
          <text x={x} y={y + 3.6} textAnchor="middle" fill="#fff" fontSize="8.6" fontFamily="Inter, sans-serif" fontWeight="600">{PRODUCTS[i]}</text>
        </g>
      ))}
      <circle cx="220" cy="200" r="34" fill={c} fillOpacity=".16" className="glow" style={{ transformOrigin: '220px 200px' }} />
      <text x="220" y="197" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">bought</text>
      <text x="220" y="210" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">together</text>
    </svg>
  )
}

export const ART = {
  lead: SymposiumArt, bio: AsgrArt, safety: PitiArt, vision: RetailArt, ai: EcoArt, edtech: WireArt, data: DataArt,
}
