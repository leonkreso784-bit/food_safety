import { SLIDES, CHAPTER_COLORS } from '../types'

interface Props {
  current: number
  total: number
}

export default function TopBar({ current, total }: Props) {
  const slide = SLIDES[current]
  const chapterColor = CHAPTER_COLORS[slide.chapterNum] ?? '#E8A020'

  const chapters = [
    { num: 0, label: 'Intro' },
    { num: 1, label: 'Ch. 1' },
    { num: 2, label: 'Ch. 2' },
    { num: 3, label: 'Ch. 3' },
    { num: 4, label: 'Ch. 4' },
    { num: 5, label: 'Conclusion' },
    { num: 6, label: 'Quiz' },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        background: 'rgba(10,22,40,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        zIndex: 100,
        /* expand to cover notch / Dynamic Island */
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      <div
        style={{
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'calc(1.5rem + env(safe-area-inset-left, 0px))',
          paddingRight: 'calc(1.5rem + env(safe-area-inset-right, 0px))',
        }}
      >
        {/* Chapter dots */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {chapters.map((ch) => {
            const isActive = slide.chapterNum === ch.num
            return (
              <div
                key={ch.num}
                title={ch.label}
                style={{
                  width: isActive ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: isActive ? chapterColor : 'rgba(255,255,255,0.18)',
                  transition: 'all 0.35s ease',
                  cursor: 'default',
                }}
              />
            )
          })}
        </div>

        {/* Chapter name — hidden on small screens via CSS */}
        <span
          className="topbar-chapter-label"
          style={{
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: chapterColor,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: 'clamp(100px, 30vw, 300px)',
          }}
        >
          {slide.chapter || 'Food Safety in the Modern Food Industry'}
        </span>

        {/* Slide counter */}
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 500,
            color: 'rgba(208,216,228,0.55)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}
