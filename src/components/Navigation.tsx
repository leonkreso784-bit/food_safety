interface Props {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
  onJump: (idx: number) => void
}

export default function Navigation({ current, total, onPrev, onNext, onJump }: Props) {
  const isFirst = current === 0
  const isLast  = current === total - 1

  // Progress fill
  const pct = (current / (total - 1)) * 100

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0, left: 0, right: 0,
        background: 'rgba(10,22,40,0.94)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        zIndex: 100,
        /* expand to cover home indicator on iPhone */
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      {/* Progress bar — always at the very top of the nav bar */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0,
          height: 2,
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #E8A020, #F0B840)',
          transition: 'width 0.4s ease',
          borderRadius: '0 1px 1px 0',
        }}
      />

      {/* Content row */}
      <div
        style={{
          height: '4.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'calc(1.5rem + env(safe-area-inset-left, 0px))',
          paddingRight: 'calc(1.5rem + env(safe-area-inset-right, 0px))',
          gap: '1rem',
        }}
      >
        {/* PREV button */}
        <button
          onClick={onPrev}
          disabled={isFirst}
          className="nav-btn"
          style={{
            background: isFirst ? 'rgba(255,255,255,0.05)' : 'rgba(232,160,32,0.12)',
            border: '1px solid',
            borderColor: isFirst ? 'rgba(255,255,255,0.1)' : 'rgba(232,160,32,0.4)',
            color: isFirst ? 'rgba(255,255,255,0.25)' : '#E8A020',
            borderRadius: 8,
            padding: '0.45rem 1.1rem',
            cursor: isFirst ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            fontSize: '0.82rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            minWidth: 80,
            minHeight: '2.5rem',
          }}
        >
          ← <span className="nav-btn-label">PREV</span>
        </button>

        {/* Dot navigation — hidden on very narrow screens */}
        <div className="nav-dots-area" style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onJump(i)}
              title={`Slide ${i + 1}`}
              className="nav-dot-btn"
              style={{
                width: i === current ? 20 : 7,
                height: 7,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                background: i === current
                  ? '#E8A020'
                  : i < current
                    ? 'rgba(232,160,32,0.4)'
                    : 'rgba(255,255,255,0.15)',
                padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Page counter — shown only on very narrow screens (≤480px) */}
        <div
          className="nav-counter"
          style={{
            display: 'none',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: '#E8A020',
            letterSpacing: '0.05em',
            gap: '0.25rem',
          }}
        >
          <span style={{ color: '#E8A020' }}>{current + 1}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>{total}</span>
        </div>

        {/* NEXT button */}
        <button
          onClick={onNext}
          disabled={isLast}
          className="nav-btn"
          style={{
            background: isLast ? 'rgba(255,255,255,0.05)' : '#E8A020',
            border: '1px solid',
            borderColor: isLast ? 'rgba(255,255,255,0.1)' : '#E8A020',
            color: isLast ? 'rgba(255,255,255,0.25)' : '#0A1628',
            borderRadius: 8,
            padding: '0.45rem 1.1rem',
            cursor: isLast ? 'not-allowed' : 'pointer',
            fontFamily: 'inherit',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            minWidth: 80,
            minHeight: '2.5rem',
          }}
        >
          <span className="nav-btn-label">NEXT </span>→
        </button>
      </div>
    </div>
  )
}
