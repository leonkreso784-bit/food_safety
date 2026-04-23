import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import ThreeBackground from './components/ThreeBackground'
import TopBar from './components/TopBar'
import Navigation from './components/Navigation'
import { SLIDES } from './types'

// Lazy-load every slide so initial bundle stays small
const SlideLanding    = lazy(() => import('./slides/SlideLanding'))
const SlideAgenda     = lazy(() => import('./slides/SlideAgenda'))
const SlideIntro      = lazy(() => import('./slides/SlideIntro'))
const SlideDefinition = lazy(() => import('./slides/SlideDefinition'))
const SlideRegulation = lazy(() => import('./slides/SlideRegulation'))
const SlideHazards    = lazy(() => import('./slides/SlideHazards'))
const SlideBioHazards = lazy(() => import('./slides/SlideBioHazards'))
const SlideBioTable   = lazy(() => import('./slides/SlideBioTable'))
const SlideChemPhys   = lazy(() => import('./slides/SlideChemPhys'))
const SlideHACCPIntro = lazy(() => import('./slides/SlideHACCPIntro'))
const SlideHACCPPrinciples = lazy(() => import('./slides/SlideHACCPPrinciples'))
const SlideStandards  = lazy(() => import('./slides/SlideStandards'))
const SlideHospitality = lazy(() => import('./slides/SlideHospitality'))
const SlideImplementation = lazy(() => import('./slides/SlideImplementation'))
const SlideTraining   = lazy(() => import('./slides/SlideTraining'))
const SlideConclusion = lazy(() => import('./slides/SlideConclusion'))
const SlideQuiz       = lazy(() => import('./slides/SlideQuiz'))
const SlideThanks     = lazy(() => import('./slides/SlideThanks'))

const SLIDE_COMPONENTS = [
  SlideLanding, SlideAgenda, SlideIntro, SlideDefinition, SlideRegulation,
  SlideHazards, SlideBioHazards, SlideBioTable, SlideChemPhys,
  SlideHACCPIntro, SlideHACCPPrinciples, SlideStandards,
  SlideHospitality, SlideImplementation, SlideTraining,
  SlideConclusion, SlideQuiz, SlideThanks,
]

function LoadingFallback() {
  return (
    <div style={{
      position: 'absolute', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      color: '#E8A020', fontSize: '0.9rem', letterSpacing: '0.1em'
    }}>
      Loading...
    </div>
  )
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [key, setKey] = useState(0)

  const total = SLIDES.length

  const goTo = useCallback((idx: number, dir?: 'forward' | 'back') => {
    if (idx < 0 || idx >= total) return
    setDirection(dir ?? (idx > current ? 'forward' : 'back'))
    setCurrent(idx)
    setKey((k) => k + 1)
  }, [current, total])

  const goNext = useCallback(() => goTo(current + 1, 'forward'), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1, 'back'),    [current, goTo])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown'  || e.key === ' ')  goNext()
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                       goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev])

  const isLanding = current === 0
  const CurrentSlide = SLIDE_COMPONENTS[current]

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3D canvas always rendered */}
      <ThreeBackground dim={!isLanding} />

      {/* Dark overlay on content slides */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          background: isLanding
            ? 'rgba(10,22,40,0)'
            : 'rgba(10,22,40,0.78)',
          transition: 'background 1.2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Top bar */}
      {!isLanding && (
        <TopBar current={current} total={total} />
      )}

      {/* Slide content */}
      <div
        key={key}
        className={`slide-page${direction === 'back' ? ' reverse' : ''}`}
        style={{ zIndex: 2 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <CurrentSlide onNext={goNext} onJump={goTo} />
        </Suspense>
      </div>

      {/* Bottom navigation */}
      {!isLanding && (
        <Navigation
          current={current}
          total={total}
          onPrev={goPrev}
          onNext={goNext}
          onJump={goTo}
        />
      )}
    </div>
  )
}
