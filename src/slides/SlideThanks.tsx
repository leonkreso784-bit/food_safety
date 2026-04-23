interface Props { onNext: () => void; onJump?: (idx: number) => void }

export default function SlideThanks({ onJump }: Props) {
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
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/food-writing.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          zIndex: -1,
        }}
      />

      <div
        style={{
          animation: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both',
          maxWidth: 700,
          width: '100%',
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
          }}
        >
          Food Safety Seminar · FTHM Opatija
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 900,
            color: '#E8A020',
            marginBottom: '0.5rem',
            lineHeight: 1,
          }}
        >
          Thank You
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            color: '#D0D8E4',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Questions & Discussion
        </p>

        {/* Authors */}
        <div style={{ display: 'flex', gap: '3rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Leon Kreso',     role: 'Chapters 1–2 · Introduction' },
            { name: 'Tara Grdinić',  role: 'Chapters 3–4 · Conclusion' },
          ].map((a) => (
            <div key={a.name}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{a.name}</div>
              <div style={{ fontSize: '0.72rem', color: '#8090A4', marginTop: 3 }}>{a.role}</div>
            </div>
          ))}
        </div>

        {/* Course info */}
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 10,
            padding: '1rem 1.5rem',
            display: 'inline-block',
            marginBottom: '2rem',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--gray-mid)', marginBottom: 4 }}>Academic Year 2025/2026</div>
          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#FFFFFF' }}>
            Faculty of Tourism and Hospitality Management, Opatija
          </div>
          <div style={{ fontSize: '0.78rem', color: '#E8A020', marginTop: 4 }}>
            Hospitality Management — English Programme
          </div>
        </div>

        {/* Restart button */}
        <div>
          <button
            onClick={() => onJump?.(0)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '0.55rem 1.4rem',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'inherit',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#E8A020'; e.currentTarget.style.color = '#E8A020' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
          >
            ↩ Restart Presentation
          </button>
        </div>
      </div>
    </div>
  )
}
