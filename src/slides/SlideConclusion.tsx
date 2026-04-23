import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const takeaways = [
  {
    num: '01',
    color: '#E8A020',
    title: 'Prevention is the Foundation',
    text: 'Modern food safety is built on hazard prevention — not reactive recalls. HACCP and prerequisite programs shift the focus to proactive risk management at every stage of the supply chain.',
  },
  {
    num: '02',
    color: '#4AC09A',
    title: 'Regulation Creates the Framework',
    text: 'The EU regulatory framework (EC 178/2002, EC 852/2004, ISO 22000) provides legally binding standards that all food businesses must implement. Croatia\'s accession to the EU in 2013 mandated full compliance.',
  },
  {
    num: '03',
    color: '#7AA8D8',
    title: 'Hospitality Demands Continuous Vigilance',
    text: 'In hotels and restaurants, food safety is not a one-time achievement — it requires consistent daily practices, ongoing staff training, and a genuine food safety culture embedded in organizational values.',
  },
]

const MODALS: ModalContent[] = [
  {
    title: 'Prevention is the Foundation',
    icon: '🛡️',
    color: '#E8A020',
    intro: 'The paradigm shift from reactive food safety (responding to outbreaks) to proactive prevention is the defining achievement of modern food safety science. HACCP, introduced by NASA in the 1960s and codified by Codex Alimentarius in 1993, established that hazards must be controlled at source — not detected at the end of the production chain.',
    sections: [
      { heading: 'HACCP as Preventive Architecture', text: 'HACCP\'s seven principles — hazard analysis, CCP identification, critical limits, monitoring, corrective actions, verification, and documentation — create a structured prevention system. Each principle targets a specific failure point before food reaches the consumer.' },
      { heading: 'Prerequisite Programmes (PRPs)', text: 'PRPs are the foundation beneath HACCP: GMP (Good Manufacturing Practice), GHP (Good Hygiene Practice), pest control, supplier approval, and infrastructure maintenance. Without robust PRPs, HACCP cannot function effectively regardless of how well the written plan is designed.' },
      { heading: 'Regulatory Mandate for Prevention', text: 'EU Regulation EC 852/2004 legally requires all food businesses to implement and maintain procedures based on HACCP principles. The Food Safety Modernisation Act (FSMA) in the USA made hazard prevention the statutory baseline for all food facilities in 2011 — a major global shift.' },
      { heading: 'Cost of Reactive vs Preventive', text: 'A single foodborne illness outbreak can cost a hospitality business €50,000–€500,000+ in legal costs, remediation, and reputational damage. WHO data shows that the global economic burden of unsafe food is estimated at US$110 billion per year in lost productivity and medical expenses. Prevention is not only ethical — it is financially rational.' },
    ],
  },
  {
    title: 'Regulation Creates the Framework',
    icon: '⚖️',
    color: '#4AC09A',
    intro: 'A robust legal framework is essential to ensure that food safety is not optional. The EU\'s comprehensive regulatory architecture — spanning general food law, hygiene rules, traceability requirements, and harmonised enforcement — creates a level playing field across all 27 member states.',
    sections: [
      { heading: 'EC 178/2002 — General Food Law', text: 'Established the fundamental principles of EU food law: food safety as a primary objective, the precautionary principle, traceability ("one step back, one step forward"), and the creation of the European Food Safety Authority (EFSA). All food business operators are legally responsible for the safety of food they place on the market.' },
      { heading: 'EC 852/2004 — Food Hygiene Regulation', text: 'The operational core of EU food safety law. Requires all food businesses to implement HACCP-based procedures, maintain hygiene throughout the supply chain, and ensure staff are trained. Annex II sets out detailed requirements for food premises, equipment, transport, and waste management.' },
      { heading: 'ISO 22000 & FSSC 22000', text: 'ISO 22000 (2005, revised 2018) integrates HACCP with ISO management system principles, adding requirements for communication, emergency preparedness, and continual improvement. FSSC 22000 is a GFSI-recognised certification scheme built on ISO 22000, widely used by hotel groups and contract caterers for third-party audit.' },
      { heading: 'Croatia & EU Accession', text: 'Croatia\'s accession to the EU on 1 July 2013 required full adoption of the EU food safety regulatory framework. The Croatian Food Act (Zakon o hrani) and activities of HAPIH (Croatian Agency for Agriculture and Food) align with EU Regulations. All hospitality businesses in Croatia are subject to the full EU regulatory regime.' },
    ],
  },
  {
    title: 'Hospitality Demands Continuous Vigilance',
    icon: '🏨',
    color: '#7AA8D8',
    intro: 'Hotels and restaurants face uniquely complex food safety challenges: high-volume service, diverse menus, frequent staff turnover, and direct contact with guests who may be immunocompromised. Food safety in hospitality is not a certification to achieve once — it is a culture to sustain every day.',
    sections: [
      { heading: 'Operational Complexity', text: 'A full-service hotel kitchen may prepare hundreds of dishes daily, handle 14+ allergens, source from dozens of suppliers, and serve guests across multiple outlets. Each additional complexity multiplies the risk of failure. Rigorous HACCP documentation, colour-coded systems, and standardised operating procedures are essential to manage this scale.' },
      { heading: 'Staff Turnover Challenge', text: 'The hospitality sector has average annual staff turnover rates of 70–80% in many markets. This means that at any given time, a significant proportion of food handlers may be relatively new. Robust induction training, ongoing refresher programmes, and clear visual workplace reminders are essential to maintain consistent standards despite workforce fluidity.' },
      { heading: 'Food Safety Culture', text: 'EFSA and the Codex Alimentarius Commission have identified food safety culture as a critical success factor. Culture is defined by: management commitment (visible and consistent), employee engagement (ownership of hygiene standards), clear communication, and learning from incidents. A positive food safety culture reduces violations even when formal monitoring is absent.' },
      { heading: 'Looking Forward', text: 'Emerging challenges include: food fraud (adulteration of premium ingredients), climate change impacts on pathogen prevalence and distribution, novel allergens, and the growth of food delivery services extending the supply chain. Future food safety professionals must be analytically skilled, regulation-literate, and culturally aware to navigate these challenges.' },
    ],
  },
]

export default function SlideConclusion({ onNext }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  return (
    <div className="slide-page">
      <p className="chapter-label">Conclusion · Tara Grdinić</p>
      <h2 className="slide-title">Key Takeaways</h2>
      <div className="slide-divider" />

      <div className="stagger" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {takeaways.map((t, i) => (
          <div
            key={t.num}
            className="clickable-card"
            onClick={() => setActiveIdx(i)}
            style={{
              position: 'relative',
              background: 'var(--navy-card)',
              borderRadius: 12,
              padding: '1.2rem 1.4rem',
              display: 'flex',
              gap: '1.2rem',
              alignItems: 'flex-start',
              border: `1px solid ${t.color}22`,
              flex: 1,
            }}
          >
            <span className="click-hint">↗ details</span>
            <span
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: t.color,
                opacity: 0.3,
                lineHeight: 1,
                flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {t.num}
            </span>
            <div>
              <div style={{ fontWeight: 800, fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                {t.title}
              </div>
              <p style={{ fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)', color: 'var(--gray-light)', lineHeight: 1.65 }}>
                {t.text}
              </p>
            </div>
          </div>
        ))}

        {/* CTA to quiz */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onNext}
            style={{
              background: 'rgba(232,160,32,0.12)',
              border: '1px solid rgba(232,160,32,0.4)',
              borderRadius: 8,
              padding: '0.6rem 1.8rem',
              color: '#E8A020',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
            }}
          >
            Proceed to Knowledge Check Quiz →
          </button>
        </div>
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? MODALS[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
