interface Props {
  onNext: () => void
  onJump?: (idx: number) => void
}

export default function SlideLanding({ onNext }: Props) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
        zIndex: 2,
        animation: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
      }}
    >
      {/* Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(232,160,32,0.12)',
          border: '1px solid rgba(232,160,32,0.35)',
          borderRadius: 999,
          padding: '0.35rem 1rem',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#E8A020',
          marginBottom: '2rem',
          animation: 'fadeUp 0.7s 0.1s both',
        }}
      >
        <span>◆</span>
        Faculty of Tourism and Hospitality Management, Opatija — 2025/2026
      </div>

      {/* Main title */}
      <h1
        style={{
          fontSize: 'clamp(2.2rem, 6vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          maxWidth: 820,
          marginBottom: '1.2rem',
          animation: 'fadeUp 0.7s 0.2s both',
          textShadow: '0 2px 40px rgba(0,0,0,0.7)',
        }}
      >
        Food Safety{' '}
        <span style={{ color: '#E8A020' }}>in the Modern</span>
        <br />Food Industry
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
          color: '#D0D8E4',
          maxWidth: 580,
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          animation: 'fadeUp 0.7s 0.3s both',
        }}
      >
        A comprehensive seminar on hazard identification, regulatory frameworks,
        HACCP systems, and food safety culture in the hospitality industry.
      </p>

      {/* Authors */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          marginBottom: '2.8rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeUp 0.7s 0.4s both',
        }}
      >
        {[
          { name: 'Leon Kreso', role: 'Chapters 1–2 · Introduction' },
          { name: 'Tara Grdinić', role: 'Chapters 3–4 · Conclusion' },
        ].map((a) => (
          <div key={a.name} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'rgba(232,160,32,0.18)',
                border: '2px solid rgba(232,160,32,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', margin: '0 auto 0.5rem',
              }}
            >
              {a.name[0]}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{a.name}</div>
            <div style={{ fontSize: '0.72rem', color: '#8090A4', marginTop: 2 }}>{a.role}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onNext}
        style={{
          background: '#E8A020',
          border: 'none',
          borderRadius: 10,
          padding: '0.85rem 2.4rem',
          color: '#0A1628',
          fontSize: '1rem',
          fontWeight: 800,
          fontFamily: 'inherit',
          cursor: 'pointer',
          letterSpacing: '0.06em',
          animation: 'fadeUp 0.7s 0.5s both',
          boxShadow: '0 0 40px rgba(232,160,32,0.35)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = '#F0B840'
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 60px rgba(232,160,32,0.5)'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLButtonElement).style.background = '#E8A020'
          ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
          ;(e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(232,160,32,0.35)'
        }}
      >
        Begin Presentation →
      </button>

      {/* Scroll hint */}
      <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', marginTop: '1.5rem', animation: 'fadeUp 0.7s 0.8s both' }}>
        Use arrow keys or navigation buttons to advance
      </p>
    </div>
  )
}
