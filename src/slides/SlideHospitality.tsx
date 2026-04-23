import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODAL_DATA: ModalContent[] = [
  {
    title: 'High Volume Operations — Managing Food Safety at Scale',
    icon: '🍽️',
    color: '#E8A020',
    intro: 'Hotels and large restaurants routinely prepare hundreds to thousands of meals per service. At this scale, a single process failure can expose hundreds of guests to food safety risk simultaneously.',
    sections: [
      { heading: 'The Scale Challenge', text: 'A large hotel buffet breakfast may serve 400–800 covers in 2 hours. A banqueting event may require 500+ identical meals to be plated within a 30-minute window. Each of these operations involves dozens of raw ingredients from multiple suppliers, multiple preparation steps, and numerous food handlers — each representing a potential hazard introduction or amplification point. The risk is not just individual errors but systemic failures that affect many portions simultaneously.' },
      { heading: 'Batch Production Systems', text: 'Standardized recipes with built-in HACCP controls are essential at scale. A standardized recipe defines not just ingredients and quantities but: preparation methods (e.g., specific washing procedures for salad leaves), cooking time and temperature (minimum internal temperature, measured at the geometric centre of the thickest portion), holding conditions (hot-held above 63°C, cold-held below 5°C), maximum batch size (to ensure even cooking), and maximum shelf life after preparation. All deviation from the standardized recipe must require management authorization.' },
      { heading: 'Temperature Management at Scale', text: 'Cooking kills pathogens — but inadequate cooling after cooking can allow rapid regrowth of surviving organisms or recontamination. The UK Food Standards Agency 2-hour/4-hour rule: food held between 5°C and 63°C must not exceed 4 hours total cumulative time. For cook-chill operations, food must be cooled from 63°C to below 8°C within 90 minutes using blast chillers. Core temperature monitoring logs must be maintained at every cooking and service stage. Probes must be sanitized between uses and calibrated regularly.' },
      { heading: 'Allergen Management at Scale', text: 'At volume, allergen cross-contact risk increases significantly. Best practice for large hospitality operations: full allergen matrix for every dish, updated whenever recipes change; dedicated allergen-free preparation areas and equipment (colour-coded utensils, boards, and bowls); advanced guest notifications — at booking stage for large events; written pre-service allergen briefings for all service staff at start of each shift; documented allergen management procedure included in the HACCP plan. Every allergen-related customer complaint must trigger a root cause investigation.' },
    ],
  },
  {
    title: 'Diverse Workforce — Training Consistency at High Turnover',
    icon: '👥',
    color: '#4AC09A',
    intro: 'Annual staff turnover in hospitality is among the highest of any industry — consistently 70–80% in many markets. This creates a perpetual training challenge and makes food safety culture maintenance especially difficult.',
    sections: [
      { heading: 'The Turnover Challenge', text: 'When a significant portion of the workforce is replaced every year — and when seasonal hospitality operations may turn over nearly 100% of seasonal staff — the traditional model of annual food safety training is inadequate. The challenge is compounded by: diverse nationalities and languages (especially in tourist destinations); temporary and agency workers with no prior food safety training; peak-season pressure to get new staff operational quickly; and a predominance of young workers who may have no prior food service experience.' },
      { heading: 'Multilingual Training Approaches', text: 'Effective training must reach all staff regardless of language background. Practical tools: illustrated SOPs (pictogram-based instructions showing correct procedures visually, without requiring text literacy); translated training materials in the primary languages of the workforce; short video training modules (which can be subtitled in multiple languages); trained bilingual supervisors or "food safety champions" from within the workforce; multilingual allergen awareness posters at all food preparation stations. All training must be documented with the trainee\'s name, date, topics covered, and trainer\'s signature.' },
      { heading: 'Onboarding & Competency Assessment', text: 'No food handler should work unsupervised until they have demonstrated basic food safety competence. A minimum onboarding standard should include: day 1 — personal hygiene, handwashing procedure, allergen awareness basics, illness reporting rules; day 3 — temperature monitoring, cleaning schedules, cross-contamination prevention; week 1 sign-off — practical competency assessment (observed handwashing, temperature probe use). Buddy/mentor system pairs new starters with experienced staff for the first 2–4 weeks. A skills matrix (spreadsheet tracking each employee\'s training status against each required competency) enables managers to identify gaps.' },
      { heading: 'Maintaining Competence Long-Term', text: 'Food safety knowledge degrades over time without reinforcement. Annual refresher training is a minimum — but effective programs go further: monthly team briefings with a specific food safety topic (5-10 minutes, pre-service or post-service); visible food safety culture — managers and head chefs who model correct behaviour constantly; internal food safety audits that include observation of staff practices (not just documentation checks); inclusion of food safety behaviour in staff performance appraisals; recognition of good practice ("thank you for following the allergen procedure correctly" is more effective than focusing only on failures).' },
    ],
  },
  {
    title: 'Complex Supply Chains — Supplier Control & Traceability',
    icon: '🔄',
    color: '#A070D0',
    intro: 'A large hotel may purchase ingredients from 80–150 different suppliers, spanning fresh produce, meat, fish, dairy, dry goods, beverages, and non-food items. Managing the food safety risk across this supply chain requires a structured Approved Supplier Programme.',
    sections: [
      { heading: 'Approved Supplier Programme', text: 'No food should be purchased from a supplier who has not been formally approved. An Approved Supplier Programme (ASP) typically requires: completion of a supplier questionnaire (covering food safety management, HACCP, allergen management, traceability); provision of third-party food safety certification (BRCGS, IFS, SQF, or ISO 22000 preferred; minimum annual audit results required); on-site supplier audits for high-risk or high-volume suppliers; regular review of supplier performance against specification, complaints, and test results. An approved supplier list must be maintained and reviewed at least annually. Unapproved suppliers must not be used, except under emergency conditions with documented management authorization.' },
      { heading: 'Goods Inward Reception Controls', text: 'The goods inward stage is the first point at which the hotel takes ownership of the food safety risk associated with purchased ingredients. Minimum reception controls: temperature check for all chilled deliveries (record product temperature and ambient temperature); visual inspection — packaging integrity, condition, date codes, labelling accuracy; vehicle condition check — hygiene, temperature (cold chain vehicles should arrive at ≤3°C for chilled, ≤-18°C for frozen); rejection procedure — clear criteria for refusing deliveries (e.g., broken cold chain, damaged packaging, out-of-date product), with signed delivery note documentation of each rejection. All reception monitoring must be recorded and retained.' },
      { heading: 'Traceability & Batch Control', text: 'EU Regulation 178/2002 Article 18 requires one-step-back (supplier) and one-step-forward (customer) traceability for all food products. In practice, effective traceability requires: retention of delivery notes and invoices (minimum 2 years); labelling of opened bulk containers with the original product information and opening date; tracking of ingredients used in dishes (especially for allergen management and in the event of a recall); a documented product withdrawal/recall procedure specifying: who triggers it, who decides, how affected customers are contacted, how products are retrieved and disposed of. GFSI standards (BRCGS/IFS) require a mock recall exercise at least annually.' },
      { heading: '24-Hour Withdrawal Capability', text: 'GFSI-benchmarked standards require that food businesses must be able to withdraw or recall all affected products within 24 hours of identifying a food safety issue. This capability must be tested annually through a mock recall. A mock recall selects a raw material from the approved supplier list, traces it through delivery records, storage logs, and production records to identify all finished products or dishes in which it was used, and confirms that all affected product could be withdrawn or any affected guests notified within the required time. The mock recall result — time taken, percentage of product traceable, and corrective actions from gaps identified — must be documented.' },
    ],
  },
  {
    title: 'Time Pressure — Food Safety During Peak Service',
    icon: '⏱️',
    color: '#7AA8D8',
    intro: 'Peak service periods in hospitality create acute time pressure. This is when food safety shortcuts are most tempting and most dangerous — the combination of high volume, time pressure, and exhausted staff creates the highest-risk environment.',
    sections: [
      { heading: 'The Peak Service Risk Profile', text: 'Research in hospitality food safety consistently identifies peak service as the highest-risk period for food safety failures. The most common failure modes during peak service: inadequate handwashing frequency (especially between allergen handling and other tasks); temperature shortcuts (food held too long in the danger zone 5°C–63°C); cross-contamination between raw and ready-to-eat foods due to rushed changeovers; allergen cross-contact from sharing equipment without adequate cleaning; inadequate cooking of high-volume products (cooking time reduced to keep up with orders). All of these are foreseeable, manageable risks — the key is preparation before service begins.' },
      { heading: 'Mise en Place as a Safety Tool', text: 'Mise en place ("everything in its place") is a fundamental concept in professional kitchens that is also a powerful food safety tool. By completing all safe preparation before service begins — portioning, pre-cooking, pre-chilling, pre-labelling, pre-setting temperatures — the time pressure during service itself is significantly reduced. Specifically: pre-portion allergen-sensitive items and label them clearly; pre-heat hot-holding equipment to service temperature before loading food; pre-chill cold displays before placing food; verify all refrigeration temperatures before service; confirm the allergen matrix is current and accessible at the service point.' },
      { heading: 'Pre-Service Safety Checklist', text: 'A brief, structured pre-service safety checklist (2–3 minutes, completed by the head chef or shift supervisor before each service) dramatically reduces food safety failures during service. Key checklist items: all hot-held food temperatures checked and recorded (≥63°C); all cold display temperatures verified (≤5°C); allergen matrix reviewed for the day\'s menu (especially any menu changes or substitutions); sufficient colour-coded boards and clean utensils at each preparation station; handwashing stations stocked with soap and paper towels; all food handlers briefed on any allergen-related guest requests or special dietary requirements booked for the service. The checklist must be completed and signed before the first order is placed.' },
      { heading: 'Surge Planning for Large Events', text: 'Banqueting events, large conferences, and special occasions create predictable surges in food production volume. Effective surge planning: calculate the maximum number of simultaneous meals that can be safely produced given kitchen capacity, equipment capacity (oven space, blast chiller capacity), and available trained staff; create a plating plan that defines the maximum safe time between plating and service (and ensures chilled items are not left at room temperature beyond acceptable limits); conduct a pre-event briefing with all kitchen and service staff covering the allergen matrix, any VIP or special dietary requirements, and emergency procedures; assign a dedicated food safety supervisor for the event whose role is to monitor compliance, not to cook.' },
    ],
  },
]

const challenges = [
  { icon: '🍽️', title: 'High Volume Operations',     desc: 'Hotels and restaurants prepare thousands of meals daily — each represents a potential hazard point if protocols are not rigorously followed.' },
  { icon: '👥', title: 'Diverse Workforce',            desc: 'Staff turnover in hospitality is among the highest of any industry, creating ongoing challenges for training consistency and food safety culture.' },
  { icon: '🔄', title: 'Complex Supply Chains',        desc: 'Multiple suppliers, seasonal menus, and just-in-time delivery require robust supplier approval and traceability systems.' },
  { icon: '⏱️', title: 'Time Pressure & Service Speed', desc: 'Peak service periods increase the risk of shortcuts in food preparation, temperature management, and hygiene compliance.' },
]

export default function SlideHospitality({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 4 · Tara Grdinić</p>
      <h2 className="slide-title">Food Safety in the Hospitality Industry</h2>
      <div className="slide-divider" />

      <div className="two-col two-col-wide stagger" style={{ flex: 1 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', minHeight: 0 }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray-light)', lineHeight: 1.7, marginBottom: '0.3rem' }}>
            The hospitality sector faces unique food safety challenges due to the scale, speed, and diversity of food service operations. Compliance is not merely a legal requirement — it is a fundamental component of guest trust and brand reputation.
          </p>

          {challenges.map((c, idx) => (
            <div
              key={c.title}
              className="clickable-card"
              onClick={() => setActiveIdx(idx)}
              style={{
                background: 'var(--navy-card)',
                borderRadius: 8,
                padding: '0.7rem 0.9rem',
                display: 'flex',
                gap: '0.7rem',
                alignItems: 'flex-start',
                position: 'relative',
              }}
            >
              <span className="click-hint">↗ details</span>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>{c.title}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--gray-light)', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right — image */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/hotel-kitchen.jpg"
            alt="Hotel kitchen"
            className="slide-img"
            style={{ borderRadius: 12, maxHeight: 'calc(100vh - 14rem)', objectPosition: 'center top' }}
          />
        </div>
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? MODAL_DATA[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
