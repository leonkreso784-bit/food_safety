interface Props {
  onNext: () => void
  onJump: (idx: number) => void
}

const chapters = [
  { idx: 2,  num: '00', label: 'Introduction',                 desc: 'Why Food Safety Matters — Global Statistics',    color: '#E8A020' },
  { idx: 3,  num: '01', label: 'Concept & Importance',         desc: 'Definition, Scope & EU Regulatory Framework',    color: '#4AC09A' },
  { idx: 5,  num: '02', label: 'Types of Food Hazards',        desc: 'Biological, Chemical, and Physical Hazards',     color: '#7AA8D8' },
  { idx: 9,  num: '03', label: 'HACCP Systems',                desc: '7 Principles, ISO 22000 & International Standards', color: '#E05C5C' },
  { idx: 12, num: '04', label: 'Food Safety in Hospitality',   desc: 'Implementation, Training & Food Safety Culture', color: '#A070D0' },
  { idx: 15, num: '05', label: 'Conclusion & Quiz',            desc: 'Key Takeaways and Knowledge Check',              color: '#E8A020' },
]

export default function SlideAgenda({ onJump }: Props) {
  return (
    <div className="slide-page">
      <p className="chapter-label">Overview</p>
      <h2 className="slide-title">Presentation Agenda</h2>
      <div className="slide-divider" />

      <div
        className="stagger"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0.9rem',
          flex: 1,
        }}
      >
        {chapters.map((ch) => (
          <button
            key={ch.idx}
            onClick={() => onJump(ch.idx)}
            style={{
              background: 'var(--navy-card)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '1rem 1.2rem',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s',
              fontFamily: 'inherit',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = ch.color
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = `0 6px 24px ${ch.color}22`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'rgba(255,255,255,0.08)'
              el.style.transform = ''
              el.style.boxShadow = ''
            }}
          >
            <span
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 900,
                color: ch.color,
                opacity: 0.35,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {ch.num}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FFFFFF', marginBottom: 3 }}>
                {ch.label}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#8090A4', lineHeight: 1.4 }}>
                {ch.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
