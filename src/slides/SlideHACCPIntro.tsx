import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODALS: ModalContent[] = [
  {
    title: 'HACCP — History & Origins',
    icon: '🚀',
    color: '#E8A020',
    intro: 'HACCP (Hazard Analysis and Critical Control Points) was born from one of the most demanding food safety challenges imaginable: feeding astronauts in space, where a foodborne illness could be catastrophic and no medical treatment is available.',
    sections: [
      { heading: 'NASA & Pillsbury (1959–1971)', text: 'In 1959, NASA contracted the Pillsbury Company to develop safe food for the US space program. The primary challenge: zero-defect food that would not cause illness in astronauts during missions where no medical care was available and vomiting in a spacesuit could be fatal. Traditional end-product testing was inadequate — it would require consuming most of the food to test it. Pillsbury\'s Howard Bauman developed the HACCP concept, drawing on failure mode and effects analysis (FMEA) used in aerospace engineering. The first HACCP food was for the Mercury program in the early 1960s.' },
      { heading: 'Codex & Regulatory Adoption', text: 'The Codex Alimentarius Commission first published HACCP guidelines in 1993 (Annex to CAC/RCP 1-1969). This gave HACCP international legal standing as the recommended food safety management system. Critical regulatory milestones: EU: Regulation (EC) No 852/2004 (Article 5) mandates HACCP for all food businesses except primary producers. USA: FDA mandated HACCP for seafood (1997), juice (2002); USDA for meat and poultry (1998); FDA Food Safety Modernization Act (FSMA, 2011) extended Hazard Analysis requirements to all food facilities. Croatia: Pravilnik o higijeni hrane (NN 73/2008, implementing EU 852/2004) mandates HACCP for all food business operators (FBOs).' },
      { heading: 'Evolution to Modern Food Safety Systems', text: 'Modern food safety management has evolved beyond the original 7 HACCP principles into integrated food safety management systems (FSMS): ISO 22000:2018 — international standard combining HACCP with ISO management system principles (risk-based thinking, continual improvement). FSSC 22000 (Food Safety System Certification) — combines ISO 22000 with sector-specific PRPs; widely recognized by GFSI (Global Food Safety Initiative). SQF, BRC Global Standard, IFS — retailer-driven standards requiring HACCP as the core. In Croatia and throughout the EU, while ISO 22000 is voluntary, HACCP under Regulation 852/2004 is mandatory for all food businesses. EFSA (European Food Safety Authority) provides scientific guidance to support HACCP implementation across the EU.' },
    ],
  },
  {
    title: 'HACCP — Definition',
    icon: '📋',
    color: '#4AC09A',
    intro: 'HACCP is a systematic, science-based preventive approach to food safety that identifies, evaluates, and controls physical, chemical, and biological hazards throughout the food production process — before they can cause harm to the consumer.',
    sections: [
      { heading: 'The 7 Principles of HACCP', text: '1. Conduct a Hazard Analysis — identify all potential biological, chemical, and physical hazards at each process step. 2. Identify Critical Control Points (CCPs) — steps where control can be applied and is essential to prevent or eliminate a food safety hazard. 3. Establish Critical Limits — maximum/minimum values (temperature, time, pH, water activity) that distinguish safe from unsafe at each CCP. 4. Establish Monitoring Procedures — how and how often each CCP is monitored. 5. Establish Corrective Actions — what to do when a critical limit is exceeded. 6. Establish Verification Procedures — confirm the HACCP system is working effectively (testing, calibration, audits). 7. Establish Record-Keeping & Documentation — written records of the HACCP plan, monitoring, deviations, and verification activities.' },
      { heading: 'CCPs vs. Control Points', text: 'A critical distinction in HACCP: not all process steps are Critical Control Points. A Critical Control Point (CCP) is a specific step at which a control measure can be applied and is essential to prevent, eliminate, or reduce a food safety hazard to an acceptable level — and where failure to control could result in an unacceptable risk to consumers. Example CCPs in hospitality: cooking temperature (kills pathogens), chilling rate (prevents pathogen growth), metal detection (removes physical hazards). A Control Point (CP) is a step where a hazard can be controlled but is not critical — for example, visual inspection of incoming produce. Misidentifying CCPs (too few = insufficient control; too many = unmanageable system) is the most common HACCP implementation error.' },
      { heading: 'HACCP in the Hospitality Context', text: 'For hotels and restaurants, HACCP plans typically focus on the following process flows: 1. Receiving — temperature check of incoming chilled/frozen deliveries (CCP: ≤4°C chilled, ≤-15°C frozen). 2. Storage — cold storage temperature monitoring (CCP). 3. Thawing — controlled thawing in refrigerator (not at room temperature). 4. Preparation — cross-contamination control, personal hygiene. 5. Cooking — core temperature measurement (CCP: ≥74°C poultry). 6. Hot holding — temperature maintenance (CCP: ≥63°C). 7. Cooling — rapid cooling for leftovers (CCP: ≤10°C within 90 min). 8. Service — time controls at buffet. For hotel chains like Amadria Park, Hyatt, or Hilton, HACCP plans must also meet corporate standards that typically exceed local regulatory requirements.' },
    ],
  },
  {
    title: 'Prerequisite Programs (PRPs)',
    icon: '🏗️',
    color: '#7AA8D8',
    intro: 'Prerequisite Programs (PRPs) are the basic operational and environmental conditions necessary to produce safe food. They are the foundation upon which HACCP is built — without effective PRPs, the HACCP system cannot function correctly.',
    sections: [
      { heading: 'What are PRPs?', text: 'The Codex Alimentarius defines PRPs as: "basic conditions and activities that are necessary to maintain a hygienic environment throughout the food chain suitable for the production, handling and provision of safe end products." ISO 22000 divides PRPs into two categories: Infrastructure PRPs (facility design, equipment, utilities) and Operational PRPs (cleaning, pest control, supplier management, traceability). The critical relationship: PRPs address general hygiene conditions, while HACCP addresses specific food safety hazards. If PRPs are weak, HACCP must compensate — but a correctly designed PRP system reduces the number of CCPs needed.' },
      { heading: 'GMP & GHP', text: 'Good Manufacturing Practices (GMP) and Good Hygiene Practices (GHP) are the cornerstones of PRPs. GHP covers: personal hygiene (handwashing, health declarations, protective clothing); premises hygiene (surfaces, equipment, pest control); water quality (potable water standard — EU Directive 98/83/EC); waste management (sealed containers, regular removal, separate from food areas). GMP covers: controlled production processes, equipment calibration and maintenance, packaging integrity, labelling accuracy. In hospitality, the EU Food Hygiene Regulation Annex II (Regulation 852/2004) provides legally binding GHP requirements for kitchen design, equipment, temperature control, and personnel hygiene.' },
      { heading: 'Key PRPs in Hospitality', text: 'Cleaning and Disinfection Programme: documented schedules for all surfaces, equipment, and utensils. Distinguish cleaning (physical removal of soil) from disinfection (killing microorganisms). Two-step process required: clean first, then disinfect. Pest Control Programme: contract with licensed pest control operator; sealed entry points; no standing water; proper waste management; regular monitoring reports retained as HACCP records. Supplier Approval Programme: verify that all food suppliers have their own HACCP/food safety management systems; collect food safety certificates; conduct annual supplier assessments. Water Safety: if hotel has its own water supply or storage tanks (rooftop), a Legionella and potable water management programme is required — separate from food HACCP but equally critical. Calibration Programme: thermometers used at CCPs must be calibrated regularly and records kept.' },
    ],
  },
]

const prereqs = [
  'Good Manufacturing Practices (GMP)',
  'Good Hygiene Practices (GHP)',
  'Premises design and sanitation programs',
  'Pest control and waste management',
  'Supplier approval and traceability systems',
]

export default function SlideHACCPIntro({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 3 · Tara Grdinić</p>
      <h2 className="slide-title">What is HACCP?</h2>
      <div className="slide-divider" />

      <div className="two-col two-col-wide stagger" style={{ flex: 1 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {/* History */}
          <div
            className="clickable-card"
            onClick={() => setActiveIdx(0)}
            style={{ position: 'relative', background: 'var(--navy-card)', borderRadius: 10, padding: '1rem' }}
          >
            <span className="click-hint">↗ details</span>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              History &amp; Origins
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-light)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              HACCP — <em style={{ color: '#E8A020' }}>Hazard Analysis and Critical Control Points</em> — was developed in the{' '}
              <strong>1960s by NASA and Pillsbury Corporation</strong> to ensure the safety of food for astronauts.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-light)', lineHeight: 1.6 }}>
              It was formalized by the Codex Alimentarius Commission in 1993 and mandated by EU Regulation 852/2004 for all food businesses.
            </p>
          </div>

          {/* Definition box */}
          <div
            className="clickable-card"
            onClick={() => setActiveIdx(1)}
            style={{ position: 'relative', background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.3)', borderRadius: 10, padding: '1rem' }}
          >
            <span className="click-hint">↗ details</span>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#E8A020', marginBottom: '0.4rem' }}>
              Definition
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--gray-light)', lineHeight: 1.6 }}>
              A <strong>systematic preventive approach</strong> to food safety that identifies, evaluates, and controls physical, chemical, and biological hazards through the food production process — before they pose a risk to the consumer.
            </p>
          </div>

          {/* Prerequisite programs */}
          <div
            className="clickable-card"
            onClick={() => setActiveIdx(2)}
            style={{ position: 'relative', background: 'var(--navy-card)', borderRadius: 10, padding: '1rem' }}
          >
            <span className="click-hint">↗ details</span>
            <div style={{ fontWeight: 700, fontSize: '0.7rem', color: '#4AC09A', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Prerequisite Programs (PRPs)
            </div>
            <ul className="bullet-list">
              {prereqs.map((p, i) => <li key={i} style={{ fontSize: '0.77rem' }}>{p}</li>)}
            </ul>
          </div>
        </div>

        {/* Right — image */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/wash-separate.jpg"
            alt="HACCP food safety"
            className="slide-img"
            style={{ borderRadius: 12, maxHeight: 'calc(100vh - 14rem)' }}
          />
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

