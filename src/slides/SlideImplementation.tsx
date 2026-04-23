import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODALS: ModalContent[] = [
  {
    title: 'Kitchen Layout & Workflow',
    icon: '🏗️',
    color: '#E8A020',
    intro: 'The physical design of a professional kitchen directly determines food safety risk. EU Regulation 852/2004 requires kitchen design to support hygienic work flows and prevent cross-contamination between raw and ready-to-eat foods.',
    sections: [
      { heading: 'The One-Way Flow Principle', text: 'Food must flow in one direction: delivery → dry/cold storage → preparation (raw) → cooking → plating/cooling → service. Backtracking of food through raw food areas creates cross-contamination risks. Annex II Chapter I of Regulation 852/2004 requires food business premises to permit good hygiene practices including protection against contamination. In practice, raw meat, cooked food, and fish preparation must be physically separated — either by separate rooms or defined clean/dirty zones with timed separation. The layout must also provide adequate space to prevent crowding, with clearly identified routes for waste removal that do not cross food preparation paths.' },
      { heading: 'Colour-Coded Equipment', text: 'The international standard colour-coding system: Red — raw meat (beef, pork, lamb); Yellow — raw poultry; Blue — raw fish; Green — raw vegetables/fruit; White — dairy products, bread, cooked food; Purple/Brown — allergen-controlled preparation. This must be actively enforced, trained, and documented in the HACCP plan. In a hotel operating multiple food outlets (room service, restaurant, staff canteen), colour coding must be consistent across all kitchens. Worn or damaged boards must be replaced immediately — worn surfaces harbour bacteria in scratches and cuts.' },
      { heading: 'Handwashing Infrastructure', text: 'EU Regulation 852/2004 Annex II Chapter I requires dedicated handwashing basins separate from food preparation sinks and ware-washing sinks. Requirements: hot and cold running water; soap (antibacterial, in dispenser); single-use paper towels or hand dryer; located at every food handling workstation; NOT used for any other purpose. A common error in hotel kitchen remodels: combining handwashing and food preparation sinks to save space — this directly violates 852/2004 and creates cross-contamination risk. Health inspection auditors specifically check for this.' },
    ],
  },
  {
    title: 'Temperature Control Systems',
    icon: '🌡️',
    color: '#4AC09A',
    intro: 'Temperature control is the most critical tool in food safety. Every professional kitchen must have documented temperature monitoring systems with calibrated equipment and written records retained as HACCP evidence.',
    sections: [
      { heading: 'Cold Chain Management', text: 'Storage temperatures: walk-in cold rooms ≤4°C; display refrigerators ≤4°C; deep freeze ≤-18°C (EU Directive 89/108/EEC). Temperature must be monitored every 4 hours minimum with calibrated probe thermometers. If a refrigerator fails and temperature rises above 8°C: move temperature-sensitive products to alternate cold storage immediately; log the deviation with time and duration; assess product safety — any product above 8°C for more than 4 hours cumulative total must be discarded; report for urgent repair. Probe thermometers must be calibrated monthly against ice water (0°C) and boiling water (100°C), with calibration records retained.' },
      { heading: 'Cooking & Hot Holding', text: 'Minimum cooking temperatures: poultry 74°C core for 15 seconds; minced/ground meat 70°C throughout; whole beef/pork/lamb steaks 63°C with 3-minute rest; fish 63°C; reheated food 75°C throughout (Croatian Pravilnik). Hot holding: ≥63°C at all times, monitored every 2 hours on buffet. Products below 63°C must be discarded after 2 hours in service or reheated once to 75°C. Blast chilling for rapid cooling: cooked food must reach ≤10°C within 90 minutes (≤3°C within 4 hours for extended storage). A blast chiller is mandatory in hotels with cook-chill operations — conventional refrigerators cool too slowly and allow pathogen growth in the danger zone.' },
      { heading: 'Temperature Logging & Records', text: 'HACCP monitoring records form part of the legally required documentation under EU Regulation 852/2004. Records must be retained for at least 2 years (3 years recommended). Modern best practice: continuous digital dataloggers with automated alarm systems (email/SMS alert when temperature thresholds are breached) are required by many retailer and hotel chain standards (IFS, BRC, Hilton, Hyatt brand standards). Automated systems eliminate human recording errors, provide timestamp verification, and generate audit-ready reports instantly. For hotel groups like Amadria Park with multiple properties, centralized digital FSMS provides group-level food safety compliance visibility.' },
    ],
  },
  {
    title: 'Allergen Management',
    icon: '⚠️',
    color: '#7AA8D8',
    intro: 'Allergen management has become one of the most critical food safety obligations in hospitality. Allergen-induced anaphylaxis can be fatal within minutes. EU Regulation 1169/2011 and Croatian Pravilnik impose specific legal obligations on all food service operators.',
    sections: [
      { heading: 'The 14 EU-Mandated Allergens', text: 'Regulation (EU) No 1169/2011 requires mandatory declaration of: cereals containing gluten (wheat, rye, barley, oats), crustaceans, eggs, fish, peanuts, soybeans, milk, tree nuts (almonds, hazelnuts, walnuts, cashews, pecans, pistachios, macadamia), celery, mustard, sesame seeds, sulphur dioxide and sulphites (>10 mg/kg), lupin, and molluscs. Allergen information for ALL menu items must be available in written form on request. Displaying "ask our staff about allergens" is only permitted if comprehensive written allergen records exist and staff are trained to consult them accurately.' },
      { heading: 'Cross-Contact Prevention', text: 'Cross-contact is the accidental transfer of allergen proteins to a food represented as allergen-free. Unlike microbial cross-contamination, allergen cross-contact can cause a severe reaction from microgram quantities. Prevention: dedicated preparation areas, equipment, and utensils for allergen-free dishes; thorough cleaning and sanitising between allergen and allergen-free preparation; separate oil for frying allergen-free products; clearly labelled storage containers; staff trained to change gloves and aprons before handling allergen-free orders. The "may contain" advisory statement is NOT a substitute for proper cross-contact controls in food service.' },
      { heading: 'Legal Liability in Croatia', text: 'Under Croatian law (Zakon o hrani, NN 81/2013 and EU Regulation 1169/2011), food service operators have a positive duty to: know the ingredients of every dish; provide accurate allergen information on request; and take reasonable steps to prevent allergen cross-contact. Failure is a criminal offence under Zakon o hrani, with fines up to 100,000 HRK. If a guest suffers anaphylaxis due to undeclared allergen, the business faces civil liability, health authority prosecution, and potential permanent closure. Allergen matrices must be updated with every menu change — a hotel with seasonal menus must re-validate allergen information at each rotation.' },
    ],
  },
  {
    title: 'Traceability & Records',
    icon: '📝',
    color: '#A070D0',
    intro: 'Food traceability — the ability to track food at all stages of production, processing, and distribution — is a legal requirement under EU Regulation (EC) No 178/2002 Article 18, the EU\'s General Food Law.',
    sections: [
      { heading: 'One Step Back, One Step Forward', text: 'Every food business operator must identify: (1) from whom they received the food — supplier, batch/lot numbers, use-by dates; and (2) to whom they supplied it — the immediate recipient. In hospitality: keep delivery notes, invoices, and batch certificates for all received ingredients; record use-by dates when products are opened or transferred to kitchen containers; maintain a log of which supplier batches were used on which date. If a RASFF rapid alert is issued for a specific ingredient and lot number, the system must allow the hotel to determine within hours whether that batch was received and used.' },
      { heading: 'HACCP Documentation', text: 'Required HACCP records: temperature monitoring logs (cold storage, hot holding, cooking); delivery inspection records (temperature on arrival, visual condition, batch numbers); cleaning and disinfection records; pest control visit reports; staff training records; corrective action logs (deviation description, corrective action taken, who authorized disposal); calibration records for probe thermometers. Retention period: EU minimum 2 years for perishable products; Croatian Pravilnik recommends 3 years. In the event of a foodborne illness complaint or outbreak investigation, these records are the primary legal evidence. Missing or falsified records significantly worsen legal exposure.' },
      { heading: 'Digital Traceability Systems', text: 'Modern hospitality groups increasingly use digital food safety management systems: Checkit, Navitas Safety, MeazureUp. These replace paper temperature logs with automated IoT sensors, digital cleaning checklists, and cloud-stored records accessible to auditors and corporate food safety teams. Benefits: eliminate human recording errors; provide timestamp verification; automated alerts for critical failures; instant audit-ready reports. For hotel chains like Amadria Park with multiple hotels, a centralized digital FSMS ensures consistent standards across all outlets. Implementation cost is typically offset by reduced audit preparation time, lower insurance premiums, and reduced risk of regulatory fines.' },
    ],
  },
]

const areas = [
  {
    color: '#E8A020',
    title: 'Kitchen Layout & Workflow',
    items: [
      'Segregation of raw and cooked food areas to prevent cross-contamination',
      'Separate preparation surfaces with color-coded cutting boards per food type',
      'Logical flow: delivery → storage → prep → cooking → plating → service',
      'Adequate handwashing facilities at every preparation station',
    ],
  },
  {
    color: '#4AC09A',
    title: 'Temperature Control',
    items: [
      'Cold storage below 5°C; hot holding above 63°C at all times',
      'Daily temperature logs for all refrigeration and hot-holding units',
      'Core temperature checks ≥75°C for all cooked proteins',
      'Blast chilling for rapid cooling of prepared dishes to below 5°C within 90 min',
    ],
  },
  {
    color: '#7AA8D8',
    title: 'Allergen Management',
    items: [
      'Full ingredient declaration per EU Reg. 1169/2011 (14 major allergens)',
      'Dedicated allergen-free preparation areas and dedicated utensils',
      'Staff required to communicate allergen queries to kitchen management',
      'Allergen matrices updated with each menu change',
    ],
  },
  {
    color: '#A070D0',
    title: 'Traceability & Records',
    items: [
      '"One step back, one step forward" traceability per EC 178/2002',
      'Delivery records: supplier, batch number, use-by date for every product',
      'Waste and portioning logs for stock verification',
      'HACCP monitoring records retained for minimum 2 years',
    ],
  },
]

export default function SlideImplementation({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 4 · Tara Grdinić</p>
      <h2 className="slide-title">Implementation in Hotels & Restaurants</h2>
      <div className="slide-divider" />

      <div className="grid-2 stagger" style={{ flex: 1 }}>
        {areas.map((a, idx) => (
          <div
            key={a.title}
            className="clickable-card"
            onClick={() => setActiveIdx(idx)}
            style={{
              position: 'relative',
              background: 'var(--navy-card)',
              borderRadius: 10,
              padding: '0.9rem 1rem',
              borderTop: `3px solid ${a.color}`,
            }}
          >
            <span className="click-hint">↗ details</span>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#FFFFFF', marginBottom: '0.6rem' }}>
              {a.title}
            </div>
            <ul className="bullet-list">
              {a.items.map((item, i) => (
                <li key={i} style={{ fontSize: '0.77rem' }}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? MODALS[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
