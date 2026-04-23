import { useState } from 'react'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const questions = [
  {
    q: 'According to the WHO (2022), approximately how many people fall ill from contaminated food each year?',
    options: ['60 million', '200 million', '600 million', '1 billion'],
    answer: 2,
  },
  {
    q: 'What is the "danger zone" temperature range for bacterial growth in food?',
    options: ['0°C to 40°C', '5°C to 63°C', '10°C to 70°C', '20°C to 80°C'],
    answer: 1,
  },
  {
    q: 'Which EU Regulation mandates HACCP implementation for all food businesses?',
    options: ['EC 178/2002', 'EC 1169/2011', 'EC 852/2004', 'ISO 22000'],
    answer: 2,
  },
  {
    q: 'HACCP was originally developed in the 1960s for which organisation?',
    options: ['WHO', 'NASA', 'European Commission', 'Codex Alimentarius'],
    answer: 1,
  },
  {
    q: 'How many major allergens must be declared under EU Regulation 1169/2011?',
    options: ['8', '10', '12', '14'],
    answer: 3,
  },
  {
    q: 'Which of the following is a BIOLOGICAL food hazard?',
    options: ['Metal fragment from equipment', 'Pesticide residues', 'Salmonella bacteria', 'Aflatoxin from mould'],
    answer: 2,
  },
]

export default function SlideQuiz({ onNext }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const q = questions[current]

  function pick(idx: number) {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.answer) setScore((s) => s + 1)
  }

  function next() {
    if (current + 1 >= questions.length) {
      setDone(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const pct = Math.round((score / questions.length) * 100)

  if (done) {
    const grade = pct >= 83 ? '🏆 Excellent!' : pct >= 66 ? '✅ Good' : pct >= 50 ? '📚 Needs Review' : '❌ Study More'
    return (
      <div className="slide-page" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{grade.split(' ')[0]}</div>
        <h2 className="slide-title" style={{ marginBottom: '0.3rem' }}>Quiz Complete!</h2>
        <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)', color: '#E8A020', fontWeight: 800, marginBottom: '0.5rem' }}>
          {score} / {questions.length} correct ({pct}%)
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--gray-light)', marginBottom: '2rem' }}>{grade.split(' ').slice(1).join(' ')}</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setDone(false) }}
            style={{ background: 'var(--navy-card)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 1.4rem', color: 'var(--gray-light)', fontFamily: 'inherit', fontSize: '0.85rem', cursor: 'pointer' }}>
            Retry Quiz
          </button>
          <button onClick={onNext}
            style={{ background: '#E8A020', border: 'none', borderRadius: 8, padding: '0.6rem 1.4rem', color: '#0A1628', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
            Finish Presentation →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="slide-page">
      <p className="chapter-label">Knowledge Check — Question {current + 1} of {questions.length}</p>
      <h2 className="slide-title">Quiz</h2>
      <div className="slide-divider" />

      {/* Progress */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: '1.2rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', background: '#E8A020', width: `${((current) / questions.length) * 100}%`, transition: 'width 0.4s' }} />
      </div>

      {/* Score */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.8rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#E8A020', fontWeight: 700 }}>Score: {score}/{current}</span>
      </div>

      {/* Question */}
      <div
        style={{
          background: 'var(--navy-card)',
          borderRadius: 10,
          padding: '1rem 1.2rem',
          marginBottom: '1rem',
          fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
          color: '#FFFFFF',
          lineHeight: 1.6,
          fontWeight: 500,
        }}
      >
        {q.q}
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
        {q.options.map((opt, i) => {
          let cls = 'quiz-option'
          if (answered) {
            if (i === q.answer) cls += ' correct'
            else if (i === selected && i !== q.answer) cls += ' wrong'
          }
          return (
            <button key={i} className={cls} onClick={() => pick(i)} disabled={answered}>
              <span style={{ color: 'var(--amber)', fontWeight: 700, marginRight: '0.6rem' }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {opt}
            </button>
          )
        })}
      </div>

      {/* Next */}
      {answered && (
        <button
          onClick={next}
          style={{
            marginTop: '1rem',
            alignSelf: 'flex-end',
            background: '#E8A020',
            border: 'none',
            borderRadius: 8,
            padding: '0.6rem 1.6rem',
            color: '#0A1628',
            fontFamily: 'inherit',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {current + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
