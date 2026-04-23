import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const training = [
  { title: 'Induction Training', desc: 'All new food handlers must receive basic food hygiene training before working unsupervised with food. Covers personal hygiene, cross-contamination, temperature control.' },
  { title: 'Level 2 Food Safety', desc: 'Industry-standard qualification (RSPH / CIEH) for all food handlers. Must be renewed every 3 years. Covers all hazard types, HACCP awareness, allergen management.' },
  { title: 'Refresher & Ongoing', desc: 'Annual refreshers, toolbox talks, and updates when procedures change. Daily pre-shift briefings reinforce key hygiene messages.' },
  { title: 'Supervisor / Manager Level', desc: 'Level 3 or Level 4 HACCP certification for kitchen managers and head chefs responsible for food safety management.' },
]

const MODALS: ModalContent[] = [
  {
    title: 'Induction Training',
    icon: '🆕',
    color: '#E8A020',
    intro: 'Every new food handler must complete induction training before working unsupervised. This is a legal requirement under EU Regulation EC 852/2004 and forms the first line of defence against foodborne illness in any hospitality operation.',
    sections: [
      { heading: 'Legal Basis', text: 'EU Regulation EC 852/2004 Annex II, Chapter XII requires that food business operators ensure food handlers are supervised and trained in food hygiene matters commensurate with their work activity. UK Food Safety Act 1990 and Food Hygiene Regulations 2006 similarly mandate training.' },
      { heading: 'Core Topics Covered', text: 'Personal hygiene (handwashing technique, PPE, illness reporting), cross-contamination prevention (colour-coded equipment, separation of raw and ready-to-eat foods), temperature control awareness (danger zone 5–63 °C), waste management, and cleaning and disinfection basics.' },
      { heading: 'Delivery Methods', text: 'Can be delivered as in-house orientation sessions, e-learning modules, or through accredited providers. Must be documented with signed records kept on file. Many hotels integrate induction with HACCP plan orientation specific to their kitchen layout.' },
      { heading: 'Assessment', text: 'Trainees typically complete a short written or verbal assessment. Competence must be confirmed before the employee handles open food products independently. Records of induction training support due diligence in the event of an enforcement inspection.' },
    ],
  },
  {
    title: 'Level 2 Food Safety Certificate',
    icon: '📜',
    color: '#4AC09A',
    intro: 'The Level 2 Award in Food Safety is the industry-standard qualification for all food handlers in the UK and widely recognised across EU hospitality operations. It provides formal certification of competence in food hygiene principles.',
    sections: [
      { heading: 'Awarding Bodies', text: 'Qualifications are issued by RSPH (Royal Society for Public Health), CIEH (Chartered Institute of Environmental Health), Highfield, and similar awarding organisations. All are regulated by Ofqual in England and align with EU Regulation EC 852/2004 training requirements.' },
      { heading: 'Curriculum Overview', text: 'Covers microbiological hazards (bacteria, viruses, parasites), chemical and physical hazards, personal hygiene, food storage and temperature control, cleaning and disinfection, pest control awareness, allergen management fundamentals, and an introduction to HACCP.' },
      { heading: 'Validity & Renewal', text: 'The certificate is valid for 3 years, after which renewal is required. Many employers require renewal every 2 years as internal policy. Continuous employment in food handling without a valid certificate exposes the business to legal liability.' },
      { heading: 'Allergen Awareness', text: 'Since 2014 (EU FIC Regulation 1169/2011 and Natasha\'s Law 2021 in the UK), allergen awareness has become a mandatory component. Staff must be able to identify the 14 major allergens, understand cross-contact risks, and communicate allergen information accurately to guests.' },
    ],
  },
  {
    title: 'Refresher & Ongoing Training',
    icon: '🔄',
    color: '#7AA8D8',
    intro: 'Food safety knowledge must be continuously reinforced. Refresher training ensures staff remain current with evolving regulations, new procedures, and changing menus — and that initial training does not fade over time.',
    sections: [
      { heading: 'Annual Refresher Sessions', text: 'At minimum, food handlers should attend a formal refresher annually. These sessions review key hygiene principles, address any incidents or near-misses from the past year, and update staff on any changes to legislation, HACCP plans, or supplier ingredients.' },
      { heading: 'Toolbox Talks', text: 'Short (5–10 minute) focused briefings held during pre-service meetings. Topics might include: correct glove use, allergen alert for a new menu item, new cleaning chemical, or a reminder about chiller temperature logging. High frequency, low formality — highly effective for reinforcing culture.' },
      { heading: 'Procedure Change Updates', text: 'Any time a HACCP plan is updated — new menu, new supplier, new equipment, or following a food safety incident — all affected staff must receive documented briefing. This is a mandatory HACCP requirement under Codex Alimentarius principles.' },
      { heading: 'Food Safety Culture', text: 'The FSA (Food Standards Agency) and EFSA both identify food safety culture as the most powerful predictor of compliance in food businesses. Culture is built through consistent leadership behaviour, clear communication, recognition of good practice, and visible management commitment.' },
    ],
  },
  {
    title: 'Supervisor & Manager Level Training',
    icon: '👩‍💼',
    color: '#C47ED8',
    intro: 'Kitchen managers, head chefs, and food safety officers require advanced qualifications to design, implement, and audit HACCP-based management systems. Level 3 and Level 4 certifications prepare them for this responsibility.',
    sections: [
      { heading: 'Level 3 Award in Food Safety Supervision', text: 'Designed for supervisors who oversee food handlers. Covers advanced HACCP principles, temperature monitoring procedures, allergen management systems, cleaning schedule design, and supplier approval. Typically a 2–3 day course assessed by written examination and practical portfolio.' },
      { heading: 'Level 4 HACCP Certificate', text: 'The highest food safety qualification for operational managers. Covers full HACCP system development, prerequisite programme design, audit and verification techniques, microbiological risk assessment, and regulatory compliance. Required for anyone signing off a food safety management system.' },
      { heading: 'ISO 22000 & FSSC 22000', text: 'Large hotel groups and contract caterers often pursue ISO 22000 certification, which requires that management representatives hold formal Food Safety Management System training. FSSC 22000 adds additional requirements around food fraud, allergen management, and environmental monitoring.' },
      { heading: 'Management Responsibilities', text: 'Managers are legally responsible under EU Regulation EC 178/2002 (General Food Law) and must be able to demonstrate due diligence. This means maintaining training records, conducting internal audits, managing corrective actions, and liaising with enforcement authorities during inspections.' },
    ],
  },
]

export default function SlideTraining({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 4 · Tara Grdinić</p>
      <h2 className="slide-title">Staff Training & Food Handler Responsibilities</h2>
      <div className="slide-divider" />

      <div className="two-col stagger" style={{ flex: 1 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', minHeight: 0 }}>
          {training.map((t, i) => (
            <div
              key={i}
              className="clickable-card"
              onClick={() => setActiveIdx(i)}
              style={{
                position: 'relative',
                background: 'var(--navy-card)',
                borderRadius: 8,
                padding: '0.8rem 1rem',
                borderLeft: '3px solid var(--amber)',
              }}
            >
              <span className="click-hint">↗ details</span>
              <div style={{ fontWeight: 700, fontSize: '0.83rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>{t.title}</div>
              <div style={{ fontSize: '0.77rem', color: 'var(--gray-light)', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}

          {/* Quote */}
          <div
            style={{
              background: 'rgba(232,160,32,0.07)',
              borderRadius: 8,
              padding: '0.9rem 1rem',
              borderLeft: '3px solid var(--amber)',
              marginTop: '0.2rem',
            }}
          >
            <p style={{ fontSize: '0.8rem', color: '#E8A020', fontStyle: 'italic', lineHeight: 1.6 }}>
              "Food safety culture is not a programme — it is the daily behaviour of every person involved in food production and service."
            </p>
          </div>
        </div>

        {/* Right — image */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/training.jpg"
            alt="Food safety training"
            className="slide-img"
            style={{ borderRadius: 12, maxHeight: 'calc(100vh - 14rem)', objectPosition: 'center' }}
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
