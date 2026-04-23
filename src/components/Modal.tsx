import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export interface ModalSection {
  heading: string
  text: string
}

export interface ModalContent {
  title: string
  icon?: string
  color?: string
  intro?: string
  sections: ModalSection[]
}

interface Props {
  open: boolean
  content: ModalContent | null
  onClose: () => void
}

export default function Modal({ open, content, onClose }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open || !content) return null

  const accent = content.color ?? '#E8A020'

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 600,
        background: 'rgba(5,12,25,0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        /* respect safe areas inside the modal overlay */
        padding: 'calc(1.5rem + env(safe-area-inset-top, 0px)) calc(1rem + env(safe-area-inset-right, 0px)) calc(1.5rem + env(safe-area-inset-bottom, 0px)) calc(1rem + env(safe-area-inset-left, 0px))',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#0F1F3D',
          border: `1px solid ${accent}44`,
          borderRadius: 14,
          maxWidth: 680,
          width: '100%',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: `0 0 80px ${accent}22, 0 24px 80px rgba(0,0,0,0.6)`,
          animation: 'modalIn 0.35s cubic-bezier(0.22,1,0.36,1) both',
          fontFamily: 'inherit',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — sticky */}
        <div
          style={{
            padding: '1rem 1.2rem',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', gap: '0.8rem', alignItems: 'center',
            flexShrink: 0,
          }}
        >
          {content.icon && (
            <span style={{ fontSize: '1.7rem', flexShrink: 0, lineHeight: 1 }}>{content.icon}</span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontWeight: 800, fontSize: 'clamp(0.88rem, 2.5vw, 1rem)', color: '#FFFFFF', margin: 0, lineHeight: 1.3 }}>
              {content.title}
            </h3>
          </div>
          {/* Close button — min 44×44px touch target */}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '1rem',
              lineHeight: 1,
              padding: '0.6rem 0.8rem',
              borderRadius: 8,
              transition: 'all 0.2s',
              flexShrink: 0,
              fontFamily: 'inherit',
              minWidth: '2.75rem',
              minHeight: '2.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}22`; e.currentTarget.style.color = accent }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
          >
            ✕
          </button>
        </div>

        {/* Scrollable body */}
        <div
          style={{
            padding: '1.2rem 1.4rem',
            overflowY: 'auto',
            flex: 1,
          }}
          className="scroll-area"
        >
          {content.intro && (
            <p style={{ fontSize: '0.88rem', color: '#D0D8E4', lineHeight: 1.72, marginBottom: '1.2rem' }}>
              {content.intro}
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.sections.map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: 8,
                  padding: '0.85rem 1rem',
                  borderLeft: `3px solid ${accent}`,
                }}
              >
                <div
                  style={{
                    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.11em',
                    textTransform: 'uppercase', color: accent, marginBottom: '0.4rem',
                  }}
                >
                  {s.heading}
                </div>
                <p style={{ fontSize: '0.83rem', color: '#D0D8E4', lineHeight: 1.68, margin: 0 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '0.65rem 1.4rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.22)' }}>
            ESC or click outside to close
          </span>
          <button
            onClick={onClose}
            style={{
              background: accent,
              border: 'none',
              borderRadius: 8,
              padding: '0.6rem 1.4rem',
              color: '#0A1628',
              fontFamily: 'inherit',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: '2.75rem',
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
