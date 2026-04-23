import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODAL_DATA: ModalContent[] = [
  {
    title: 'ISO 22000:2018 — Structure & Requirements',
    icon: '📋',
    color: '#E8A020',
    intro: 'ISO 22000 is the international standard for Food Safety Management Systems (FSMS). The 2018 revision introduced the High-Level Structure and formally embedded food safety culture as a requirement.',
    sections: [
      { heading: 'High-Level Structure (Annex SL)', text: 'ISO 22000:2018 follows the High-Level Structure (HLS) used by all recent ISO management standards (ISO 9001:2015 Quality, ISO 14001:2015 Environmental, ISO 45001:2018 Occupational Health). This common framework enables integrated management systems — organizations can implement a single integrated system covering quality, food safety, environmental, and OH&S management without redundant documentation. The structure: 1. Scope; 2. Normative references; 3. Terms; 4. Context; 5. Leadership; 6. Planning; 7. Support; 8. Operation; 9. Performance evaluation; 10. Improvement.' },
      { heading: 'Two-Layer Approach to Hazard Control', text: 'ISO 22000 uses a two-layer approach to controlling food safety hazards: (1) Prerequisite Programs (PRPs) — basic hygiene conditions that apply across the whole facility (GMP, GHP, cleaning and disinfection, pest control, personnel hygiene, traceability); (2) The Hazard Control Plan — which may include HACCP CCPs, Operational PRPs (OPRPs), or a combination. This is more sophisticated than the traditional Codex HACCP approach and explicitly recognizes that not all hazard controls need to be managed as CCPs.' },
      { heading: 'Food Safety Culture — New in 2018', text: 'ISO 22000:2018 explicitly requires top management to demonstrate commitment to establishing, maintaining, and improving a food safety culture. Requirements include: communication of the importance of food safety; leadership behaviour aligned with food safety values; clear food safety roles and responsibilities; provision of adequate resources; and measurement/monitoring of food safety culture performance. This is a significant evolution from a purely procedural/documentation-based approach.' },
      { heading: 'Certification Process', text: 'ISO 22000 certification is conducted by accredited third-party certification bodies (e.g., SGS, Bureau Veritas, Lloyd\'s Register Quality Assurance, DNV). The process: Stage 1 audit (off-site documentation review, approximately 1 day); Stage 2 audit (on-site, full system assessment against all requirements — typically 1–3 days depending on site size and complexity); certification granted if no major non-conformances remain open. Annual surveillance audits confirm ongoing compliance. Full re-certification audit every 3 years.' },
    ],
  },
  {
    title: 'BRCGS / IFS / SQF — GFSI Schemes Compared',
    icon: '🏆',
    color: '#4AC09A',
    intro: 'GFSI-benchmarked schemes are private-sector food safety standards that are widely required by global retailers and food service companies as a condition of supply.',
    sections: [
      { heading: 'What is GFSI?', text: 'The Global Food Safety Initiative (GFSI) is a private-sector initiative managed by The Consumer Goods Forum. It benchmarks food safety schemes against a common framework (the GFSI Benchmarking Requirements). GFSI recognition confirms that a scheme is equivalent in scope and rigour to other GFSI-recognized schemes — which is why a BRCGS certificate is accepted by retailers that require IFS, and vice versa. GFSI does not itself certify food businesses — it recognizes the certification schemes that do.' },
      { heading: 'BRCGS — British Retail Consortium', text: 'The BRCGS Global Standard for Food Safety is one of the most widely recognized standards globally, particularly for products sold into UK retail (Tesco, Sainsbury\'s, Marks & Spencer, ASDA). Grades awarded: AA (exceptional, unannounced audit), A, B, C, D (minimum required for most retailer supply chain acceptance). Over 32,000 sites certified in 130+ countries. BRCGS also covers: Packaging Materials, Storage & Distribution, Agents & Brokers, Consumer Products, and Retail & Wholesale.' },
      { heading: 'IFS — International Featured Standards', text: 'IFS Food is widely required by German and French retailers (Aldi, Lidl, Carrefour, E.Leclerc, Rewe, Edeka). Uses a percentage-based scoring system: Higher Level (≥95% score), Foundation Level (75–94.99%), with Major and Critical non-conformances requiring immediate closure. The IFS scheme family also covers: IFS Logistics, IFS Broker, IFS Cash & Carry/Wholesale, and IFS PACsecure (packaging). Mandates an unannounced audit component once per certification cycle.' },
      { heading: 'SQF — Safe Quality Food', text: 'Developed in Australia, now managed by the Safe Quality Food Institute (SQFI) in Washington D.C. Widely recognized by North American retailers (Walmart, Costco, Whole Foods). A multi-level system: SQF Food Safety Fundamentals (Level 2 — basic food safety), and SQF Quality (Level 3 — adds quality management). Particularly strong in produce, grain, and beverage sectors. The SQF code aligns closely with GFSI requirements and is particularly well-regarded in the United States and Canada.' },
    ],
  },
  {
    title: 'Building a Food Safety Culture',
    icon: '🌱',
    color: '#7AA8D8',
    intro: 'Food safety culture is the shared values, beliefs, and norms that affect mindset and behaviour toward food safety throughout a food business — at every level, every shift, every day.',
    sections: [
      { heading: 'Why Culture Matters More Than Procedures', text: 'Procedures and documentation are necessary but not sufficient. Research consistently shows that the majority of food safety failures — including major outbreaks — are caused by human behaviour failures, not procedure failures. The procedures existed; they were not followed. Food safety culture determines whether people follow the procedures when no one is watching, when they are busy, when shortcuts are tempting. Strong food safety culture correlates with significantly lower rates of foodborne illness incidents and regulatory non-conformances.' },
      { heading: 'ISO 22000:2018 & GFSI Requirements', text: 'ISO 22000:2018 requires formal food safety culture assessment and improvement planning. The GFSI has published a formal Position Paper on Food Safety Culture (2018) used as the basis for culture requirements in BRCGS Issue 9, IFS Food Version 7, and SQF Edition 9. Key elements assessed: commitment (leadership behaviour); communication (food safety messaging at all levels); awareness (all employees understand their food safety role); accountability (clear responsibility structure); resource provision (time, equipment, training for food safety).' },
      { heading: 'Building Culture in Hospitality', text: 'In hotels and restaurants, culture starts with visible leadership — managers who follow hygiene rules in sight of staff reinforce expectations more powerfully than any poster or procedure. Practical tools: daily pre-service hygiene briefings (2–3 minutes, specific topic each day); kitchen hygiene walks by head chef with immediate verbal feedback; recognition programs ("Food Safety Champion of the Month"); open reporting culture for near-misses without blame; buddy system for new starters. Visual management (food safety posters at point of use in the primary language of the workforce) reinforces culture passively.' },
      { heading: 'Measuring Food Safety Culture', text: 'Tools for measuring food safety culture include: staff perception surveys (anonymous questionnaires assessing attitudes and beliefs — validated tools available from GFSI and BRCGS); behavioural observation audits (a supervisor observes and records actual behaviour during production/service — distinct from compliance audits of documentation); trend analysis of corrective actions, customer complaints, and monitoring deviations over time; mystery shopper programs; and 360° assessment tools combining self-assessment, management assessment, and external auditor assessment.' },
    ],
  },
]

const standards = [
  {
    color: '#E8A020',
    logo: 'ISO',
    title: 'ISO 22000',
    subtitle: 'Food Safety Management Systems',
    year: '2018 (latest)',
    points: [
      'International standard for FSMS applicable to all food chain organizations',
      'Combines HACCP principles with prerequisite programs (PRPs)',
      'Uses risk-based thinking and Plan-Do-Check-Act (PDCA) cycle',
      'Compatible with ISO 9001 Quality Management Systems',
      'Over 40,000 certified organizations worldwide',
    ],
  },
  {
    color: '#4AC09A',
    logo: 'GFSI',
    title: 'BRCGS / IFS / SQF',
    subtitle: 'GFSI-Benchmarked Schemes',
    year: 'Various',
    points: [
      'BRCGS (British Retail Consortium) — required by major UK retailers',
      'IFS (International Featured Standards) — common in German/French retail',
      'SQF (Safe Quality Food) — widely recognized in North America',
      'All exceed minimum legislative requirements',
      'Include unannounced audit provisions',
    ],
  },
  {
    color: '#7AA8D8',
    logo: 'FSC',
    title: 'Food Safety Culture',
    subtitle: 'Organizational Commitment',
    year: 'Continuous',
    points: [
      'ISO 22000:2018 introduces food safety culture as a formal requirement',
      'Leadership commitment and communication are central elements',
      'Includes employee awareness, engagement, and accountability',
      'Integrates with staff training and performance review processes',
      '"Everyone is responsible for food safety" philosophy',
    ],
  },
]

export default function SlideStandards({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 3 · Tara Grdinić</p>
      <h2 className="slide-title">ISO 22000 & Other Standards</h2>
      <div className="slide-divider" />

      <div className="grid-3 stagger" style={{ flex: 1 }}>
        {standards.map((s, idx) => (
          <div
            key={s.title}
            className="clickable-card"
            onClick={() => setActiveIdx(idx)}
            style={{
              background: 'var(--navy-card)',
              borderRadius: 10,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <span className="click-hint">↗ details</span>
            {/* Header */}
            <div style={{ background: `${s.color}22`, padding: '1rem', borderBottom: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 900, fontSize: '1.1rem', color: s.color }}>{s.logo}</span>
                <span style={{ fontSize: '0.65rem', color: 'var(--gray-mid)', fontWeight: 600 }}>{s.year}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#FFFFFF' }}>{s.title}</div>
              <div style={{ fontSize: '0.72rem', color: s.color, marginTop: 2 }}>{s.subtitle}</div>
            </div>
            {/* Body */}
            <div style={{ padding: '0.8rem 1rem', flex: 1 }}>
              <ul className="bullet-list">
                {s.points.map((p, i) => (
                  <li key={i} style={{ fontSize: '0.76rem' }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? MODAL_DATA[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
