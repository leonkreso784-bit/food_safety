import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODAL_DATA: ModalContent[] = [
  {
    title: 'Principle 1 — Conduct Hazard Analysis',
    icon: '🔍',
    color: '#E8A020',
    intro: 'Hazard analysis is the scientific foundation of the entire HACCP system. It must be systematic, documented, and conducted by a multidisciplinary team.',
    sections: [
      { heading: 'Assembling the HACCP Team', text: 'The team must be multidisciplinary: production/operations, quality assurance, engineering/maintenance, and purchasing. Team members need documented food safety competence. An external consultant may supplement in-house expertise for complex products. Team members must have access to technical literature, regulatory guidance, and supplier information.' },
      { heading: 'Product Description & Intended Use', text: 'Document full product composition, packaging type and materials, shelf life (shelf-stable, chilled, frozen), storage and distribution conditions, and the intended consumer. Critically — identify vulnerable groups (elderly, infants, pregnant women, immunocompromised individuals) who may be particularly susceptible to specific hazards.' },
      { heading: 'Constructing the Process Flow Diagram', text: 'A detailed flow diagram covering all steps from receipt of raw materials through to dispatch. Must be verified by the team physically walking the production line (not just drawn from memory). All inputs (ingredients, packaging, water, air), outputs (product, waste, rework), rework loops, and holding steps must be included.' },
      { heading: 'Listing Hazards & Significance Assessment', text: 'For each step in the flow diagram, list all plausible biological, chemical, and physical hazards. Assess the significance of each hazard based on two factors: likelihood of occurrence (considering good practice controls) and severity of harm if the hazard reaches the consumer. Only hazards assessed as significant proceed to the CCP determination step.' },
    ],
  },
  {
    title: 'Principle 2 — Identify Critical Control Points',
    icon: '🎯',
    color: '#4AC09A',
    intro: 'A Critical Control Point (CCP) is a step in the process where a control measure can be applied to prevent, eliminate, or reduce a food safety hazard to an acceptable level.',
    sections: [
      { heading: 'The CCP Decision Tree', text: 'The Codex Alimentarius decision tree uses 4 sequential questions: Q1 — Is there a control measure for the hazard? Q2 — Does this step specifically eliminate or reduce the hazard to an acceptable level? Q3 — Could contamination with the hazard exceed acceptable levels at this step or in subsequent steps? Q4 — Will a subsequent step eliminate or reduce the hazard to an acceptable level? If yes to Q1 and Q2, or yes to Q1, Q3, and no to Q4 — it is a CCP.' },
      { heading: 'Common Examples of CCPs', text: 'Cooking (thermal kill step for pathogens — most common CCP in food service); metal detection (physical hazard control at end of line); pasteurization/UHT treatment; controlled atmosphere and refrigerated storage (for growth-inhibiting CCPs); acidification (pH reduction to ≤4.6); chlorinated wash water for fresh produce; allergen segregation controls at changeover points.' },
      { heading: 'Operational Prerequisite Programs (OPRPs)', text: 'ISO 22000 introduced the OPRPs concept — steps that manage food safety hazards but do not fully meet the CCP definition (i.e., loss of control does not necessarily result in an unsafe product). OPRPs include: temperature-controlled storage, cleaning and disinfection, personal hygiene, and pest control. They are managed with monitoring and corrective actions but with less stringent documentation than CCPs.' },
    ],
  },
  {
    title: 'Principle 3 — Establish Critical Limits',
    icon: '📏',
    color: '#7AA8D8',
    intro: 'A critical limit is the maximum or minimum value to which a biological, chemical, or physical parameter must be controlled to prevent, eliminate, or reduce the occurrence of a food safety hazard.',
    sections: [
      { heading: 'Requirements for Critical Limits', text: 'Must be measurable and specific — not subjective (e.g., "thoroughly cooked" is not acceptable; "≥75°C internal core temperature for ≥2 minutes" is). Must be based on scientific evidence: regulatory standards (UK FSA, EFSA, Codex), peer-reviewed published studies, challenge testing data, or validated predictive microbiology tools (e.g., ComBase). Examples: internal cook temperature ≥75°C; pH ≤4.6 for ambient-stable acid products; water activity (aw) ≤0.85; metal detection sensitivity per certified test piece specification.' },
      { heading: 'Operational vs. Critical Limits', text: 'An operational limit (action limit) is set more conservatively than the critical limit to trigger a corrective action before the critical limit is breached. For example: if the critical limit is 75°C internal temperature, the operational limit might be set at 78°C. When the operational limit is not met, the operator takes immediate corrective action on the process. If the critical limit itself is breached, full corrective action including product hold and assessment is required.' },
      { heading: 'Validation of Critical Limits', text: 'Critical limits must be scientifically validated either through: published scientific literature and regulatory guidance documents; in-house challenge studies (inoculated pack studies); third-party laboratory testing; or validated predictive microbiology software. Validation must be performed initially and repeated whenever there is a change in the product, process, or raw materials that could affect the effectiveness of the critical limit. Validation records are distinct from monitoring records and must be maintained separately.' },
    ],
  },
  {
    title: 'Principle 4 — Establish Monitoring Procedures',
    icon: '📊',
    color: '#A070D0',
    intro: 'Monitoring provides the evidence that each CCP is under control. Without a robust monitoring procedure, there is no assurance that the critical limit is being met.',
    sections: [
      { heading: 'Monitoring Procedure Requirements', text: 'Each monitoring procedure must define: WHAT is being monitored (the physical/chemical parameter — e.g., internal temperature, pH value, metal detector sensitivity); HOW it is measured (instrument type and model, measurement method); WHO is responsible (named role, with backup); WHEN / HOW OFTEN (frequency — must be sufficient to detect loss of control in a timely manner). All monitoring must be documented and records signed/dated.' },
      { heading: 'Continuous vs. Discrete Monitoring', text: 'Continuous monitoring (e.g., chart recorders, data loggers, inline sensors for pasteurization temperature) is preferred as it provides a complete audit trail. Discrete monitoring (spot-checks at defined frequency) is more common in catering and general food manufacturing. The frequency for discrete monitoring must be validated: what interval provides sufficient confidence that the CCP remained under control between checks? Statistical guidance or scientific justification should support the frequency.' },
      { heading: 'Calibration of Monitoring Equipment', text: 'All instruments used for CCP monitoring must be calibrated against traceable national or international standards. Calibration records must document: instrument ID, calibration date, method used, result, tolerance, and calibration due date. Out-of-tolerance instruments must trigger a recall of records going back to the previous successful calibration — a full assessment of product safety during the period of non-calibration is required.' },
    ],
  },
  {
    title: 'Principle 5 — Establish Corrective Actions',
    icon: '🔧',
    color: '#E05C5C',
    intro: 'Corrective actions are the predefined responses taken when monitoring indicates a CCP is not under control. They must be specific, immediate, and documented.',
    sections: [
      { heading: 'Two Components of Corrective Actions', text: 'Every corrective action must address two separate components: (1) PRODUCT DISPOSITION — what to do with the food produced while the CCP was out of control: quarantine and hold, assess safety (is the product safe to release, can it be reworked/reprocessed to make it safe, or must it be destroyed?); (2) PROCESS CORRECTION — restore the CCP to control (fix the equipment, adjust the process parameter, retrain the operator) and determine why the deviation occurred to prevent recurrence.' },
      { heading: 'Non-Conforming Product Management', text: 'Product produced during a CCP deviation must immediately be placed on hold and clearly segregated from conforming product. A written risk assessment by the HACCP team or designated QA manager must determine the disposition. If there is any doubt about safety, the product must be destroyed. All decisions must be documented with clear justification. If affected product has already left the facility, the food safety incident and potential recall procedure must be activated.' },
      { heading: 'Root Cause Analysis', text: 'Simply fixing the immediate problem is not sufficient — HACCP Principle 5 requires identifying WHY the deviation occurred and implementing measures to prevent recurrence. Effective root cause analysis tools: the "5 Whys" technique (repeatedly ask "why" until the root cause is identified), fishbone/Ishikawa diagrams, fault tree analysis. The corrective action must be verified as effective — did it actually prevent recurrence? This verification is documented.' },
    ],
  },
  {
    title: 'Principle 6 — Establish Verification Procedures',
    icon: '✅',
    color: '#4AC09A',
    intro: 'Verification confirms that the HACCP system is working as intended. It is distinct from monitoring — monitoring tells you the CCP is under control right now; verification tells you the whole system is working over time.',
    sections: [
      { heading: 'Validation vs. Verification — Key Distinction', text: 'VALIDATION (done before implementation and when process changes occur): confirms that the HACCP plan is scientifically capable of controlling the hazards — i.e., do the chosen CCPs and critical limits actually work? Evidence: challenge studies, literature review, scientific testing. VERIFICATION (ongoing): confirms that the HACCP plan is actually being implemented correctly in practice. Evidence: record review, audits, product testing, customer complaint analysis. Both are legally required under EU food safety law.' },
      { heading: 'Verification Activities', text: 'Regular review of CCP monitoring records and corrective action logs — looking for trends or recurring deviations. Calibration checks on all monitoring equipment. Scheduled microbiological and chemical end-product testing — results compared against specifications. Internal HACCP audits (minimum annually, or after any significant process change). Customer complaint review for food safety trends. Supplier audit results. Verification activities must be documented and assigned to responsible individuals.' },
      { heading: 'External Verification & Regulatory Inspections', text: 'Third-party GFSI certification audits (BRCGS, IFS, SQF, ISO 22000) constitute external verification of the HACCP system and are increasingly required by retail customers. EU competent authority inspections (in Croatia: Croatian Veterinary and Food Safety Directorate — HAPIH) provide regulatory verification. Both types of external verification assess HACCP documentation, monitoring records, and corrective actions, and may include unannounced inspections. Non-conformances must be corrected within defined timescales.' },
    ],
  },
  {
    title: 'Principle 7 — Record-Keeping & Documentation',
    icon: '📁',
    color: '#7AA8D8',
    intro: 'Comprehensive documentation is the proof that the HACCP system exists and is functioning. Without records, the system cannot be verified, audited, or defended in the event of a food safety incident.',
    sections: [
      { heading: 'Required HACCP Documents', text: 'The HACCP plan document itself: scope, product description and intended use, verified process flow diagram, hazard analysis worksheets (for each step — hazard, significance assessment, justification), CCP determination (with decision tree evidence), critical limits and scientific justification, monitoring procedures, corrective action procedures, and verification procedures. Supporting PRPs must also be documented. Validation records must be maintained separately from monitoring records.' },
      { heading: 'Operational Records', text: 'CCP monitoring records: completed forms showing parameter measured, value recorded, date/time, name of person monitoring, signature. Corrective action records: description of deviation, product disposition decision with justification, root cause analysis, corrective measure taken, name of person responsible, verification that the corrective action was effective. Equipment calibration records. Supplier approval and audit records. Staff training and competency assessment records.' },
      { heading: 'Record Retention & Legal Requirements', text: 'EU Regulation 852/2004 requires records to be kept for an appropriate period — minimum 2 years for chilled products, longer for ambient/frozen products with extended shelf life. BRCGS requires a minimum of 1 year beyond the product shelf life. Records must be legible, indelible (not erasable), stored in a controlled environment, and accessible for inspection by competent authorities at any time. Electronic records are acceptable if they have appropriate access controls, audit trail functionality, and a validated backup procedure.' },
    ],
  },
]

const principles = [
  {
    num: 1,
    title: 'Conduct Hazard Analysis',
    desc: 'Identify all potential biological, chemical, and physical hazards at each step of the production process and determine preventive measures.',
  },
  {
    num: 2,
    title: 'Identify Critical Control Points (CCPs)',
    desc: 'Determine the specific process steps where control can be applied to prevent, eliminate, or reduce hazards to acceptable levels.',
  },
  {
    num: 3,
    title: 'Establish Critical Limits',
    desc: 'Set measurable criteria (e.g., minimum temperature, maximum pH) that distinguish safe from unsafe conditions at each CCP.',
  },
  {
    num: 4,
    title: 'Establish Monitoring Procedures',
    desc: 'Define how each CCP will be monitored, what instruments will be used, and the frequency of measurement.',
  },
  {
    num: 5,
    title: 'Establish Corrective Actions',
    desc: 'Define actions to be taken when a critical limit is not met — including product disposition and process correction.',
  },
  {
    num: 6,
    title: 'Establish Verification Procedures',
    desc: 'Confirm that the HACCP system is working effectively through audits, additional testing, and review of monitoring records.',
  },
  {
    num: 7,
    title: 'Record-Keeping and Documentation',
    desc: 'Maintain complete documentation of the HACCP plan, monitoring data, corrective actions taken, and verification activities.',
  },
]

export default function SlideHACCPPrinciples({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 3 · Tara Grdinić</p>
      <h2 className="slide-title">The 7 HACCP Principles</h2>
      <div className="slide-divider" />

      <div className="scroll-area stagger" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {principles.map((p, idx) => (
          <div
            key={p.num}
            className="clickable-card"
            onClick={() => setActiveIdx(idx)}
            style={{
              display: 'flex',
              gap: '0.9rem',
              alignItems: 'flex-start',
              background: 'var(--navy-card)',
              borderRadius: 8,
              padding: '0.7rem 0.9rem',
              position: 'relative',
            }}
          >
            <span className="click-hint">↗ details</span>
            <div
              style={{
                width: '2rem', height: '2rem',
                borderRadius: '50%',
                background: '#E8A020',
                color: '#0A1628',
                fontWeight: 900,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {p.num}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                {p.title}
              </div>
              <div style={{ fontSize: '0.77rem', color: 'var(--gray-light)', lineHeight: 1.5 }}>
                {p.desc}
              </div>
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
