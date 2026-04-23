import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODAL_DATA: ModalContent[] = [
  {
    title: 'Biological Hazards — In Depth',
    icon: '🦠',
    color: '#E8A020',
    intro: 'Biological hazards are the leading cause of foodborne illness globally, responsible for over 90% of all outbreak cases. They include living organisms and their toxic byproducts.',
    sections: [
      {
        heading: 'Bacteria — Most Common Cause',
        text: 'Gram-negative bacteria such as Salmonella and Campylobacter are the most frequent cause of foodborne illness. They multiply rapidly in the danger zone (5–63°C), doubling in number every 20 minutes under ideal conditions. Key species: Salmonella spp. (poultry, eggs) — ~93M cases/year globally; E. coli O157:H7 (beef, leafy greens) — produces Shiga toxin causing HUS; Listeria monocytogenes (deli meats, soft cheese) — 20–30% case fatality rate, dangerous in pregnancy; Campylobacter jejuni (raw poultry) — leading cause in the EU; Staphylococcus aureus — produces heat-stable toxins that survive cooking; Clostridium botulinum — produces the most toxic substance known, thrives in anaerobic canned/vacuum-packed foods.',
      },
      {
        heading: 'Viruses',
        text: 'Norovirus is the single largest cause of food-related gastroenteritis outbreaks in hospitality settings. It is highly contagious (infectious dose: as few as 18 viral particles), survives freezing, and can persist on surfaces for up to 2 weeks. It is frequently spread by infected food handlers before symptoms appear. Hepatitis A virus transmits via contaminated shellfish and infected handlers. Key control: strict hand hygiene and mandatory exclusion of ill staff for 48–72 hours after symptom resolution.',
      },
      {
        heading: 'Parasites & Prions',
        text: 'Toxoplasma gondii infects up to 30% of the global population (usually subclinical); dangerous in pregnancy — can cause miscarriage or foetal neurological damage. Trichinella spiralis from undercooked pork/wild game; eliminated by thorough cooking (≥71°C internal) or validated freezing. Prions cause BSE (mad cow disease) — abnormally folded proteins that are resistant to all normal cooking, irradiation, and chemical sterilization. Controlled through feed restrictions (no ruminant protein) and national surveillance programs.',
      },
      {
        heading: 'Control Measures',
        text: 'Temperature control is the primary barrier: keep cold food ≤5°C and hot food ≥63°C. Cook to ≥75°C internal temperature (or equivalent time/temperature combination). Strict cross-contamination prevention: separate raw and ready-to-eat foods, dedicated equipment, color-coded surfaces. Personal hygiene: 20-second handwash after handling raw food, using the toilet, or touching the face. Exclude ill staff for minimum 48 hours after symptoms cease. Validate all thermal processes through challenge testing or published scientific data.',
      },
    ],
  },
  {
    title: 'Chemical Hazards — In Depth',
    icon: '⚗️',
    color: '#4AC09A',
    intro: 'Chemical hazards can enter food at any stage of the supply chain. Unlike biological hazards, they are typically invisible, odourless, and tasteless — making systematic controls essential.',
    sections: [
      {
        heading: 'Naturally Occurring Chemicals',
        text: 'Mycotoxins are secondary metabolites produced by moulds growing on cereals, nuts, dried fruits, and spices. Aflatoxin B1 is the most potent natural carcinogen known — regulated in the EU at ≤2 μg/kg in foods for direct human consumption (EC 1881/2006). Ochratoxin A affects kidneys; deoxynivalenol (DON) causes vomiting. Marine biotoxins (PSP, DSP, ASP, AZP) accumulate in filter-feeding shellfish and cause rapid, potentially lethal poisoning — controlled through official production area monitoring and closure programs. Solanine in green/sprouted potatoes: toxic at high concentrations — discard green areas and sprouts.',
      },
      {
        heading: 'Agricultural Chemicals',
        text: 'Pesticide Maximum Residue Levels (MRLs) in the EU are set under Regulation (EC) 396/2005 — one of the strictest frameworks globally, covering over 700 pesticides across hundreds of food commodities. Veterinary drug residues (antibiotics, hormones, antiparasitics) in meat, milk, and eggs are regulated under Regulation (EU) 2019/6. Illegal use of growth hormones (e.g., in beef) remains an active monitoring priority for EU member states. Nitrates naturally concentrate in leafy vegetables (spinach, rocket, lettuce) — EU limits: up to 5,000 mg/kg depending on species and season.',
      },
      {
        heading: 'Processing Contaminants',
        text: 'Acrylamide forms spontaneously in starchy foods cooked above 120°C (Maillard reaction). EU Regulation 2017/2158 sets benchmark levels and requires food businesses to apply mitigation measures. Furans form during heat treatment of canned and jarred foods — EFSA assessed as potentially carcinogenic; ALARA principle applies. Heterocyclic Amines (HCAs) and Polycyclic Aromatic Hydrocarbons (PAHs) form during grilling/barbecuing/smoking; PAHs regulated under EC 1881/2006. Trans fatty acids from partial hydrogenation of vegetable oils — EU mandated maximum 2g/100g total fat in food products from 2021.',
      },
      {
        heading: 'Heavy Metals & Environmental Contaminants',
        text: 'Lead, cadmium, mercury, and arsenic are regulated under EC 1881/2006 with strict maximum limits. Methylmercury bioaccumulates in predatory fish (tuna, swordfish, shark) — pregnant women advised to limit to 1–2 portions/week. Cadmium concentrates in shellfish, offal, and root vegetables grown in contaminated soils. Dioxins and PCBs (persistent organic pollutants) bioaccumulate in fatty fish and animal fats. EFSA sets Tolerable Weekly Intakes (TWIs) for each metal; national monitoring programs sample food products annually.',
      },
    ],
  },
  {
    title: 'Physical Hazards — In Depth',
    icon: '🔩',
    color: '#7AA8D8',
    intro: 'Physical hazards are foreign objects in food that can cause serious injury including cuts, choking, broken teeth, and internal lacerations. They are largely preventable with proper facility management.',
    sections: [
      {
        heading: 'Equipment-Related Hazards',
        text: 'Metal shavings from grinders, blenders, slicing equipment, and can openers are among the highest-risk physical hazards due to their small size and potential to cause internal injury. A Planned Preventive Maintenance (PPM) schedule is essential — all moving/cutting parts must be inspected before each production run. Equipment wear must be documented; equipment taken out of service when components are damaged. Metal-detectable maintenance tools (blue and/or detectable) eliminate the risk of missing tool fragments.',
      },
      {
        heading: 'Glass, Packaging & Facility Hazards',
        text: 'Glass is classified as a critical physical hazard in all food safety standards. A formal Glass and Brittle Plastic Policy must: document all glass items (lights, instruments, windows) in each production area; specify inspection frequency; and define the full decontamination procedure for any glass breakage incident (quarantine all affected product, document the event, verify by line supervisor). Pest control bait stations and traps — if not managed correctly — are a source of rodenticide pellets and trap fragments.',
      },
      {
        heading: 'Raw Material Hazards',
        text: 'Bone fragments in mechanically recovered meat, minced products, and fish products — particularly relevant for sushi, pâtés, and burgers. Pit stones in fruit products (prunes, olives, cherries). Grit, stones, and soil in root vegetables and leafy greens. Shell fragments in nut and shellfish products. Incoming material specifications must define acceptable physical limits; supplier COAs and audit certificates should confirm physical hazard controls. Goods-inward visual inspection must check for contamination.',
      },
      {
        heading: 'Detection & Control Methods',
        text: 'Metal detectors detect ferrous metals (≥1.5mm), non-ferrous metals (≥2.0mm), and stainless steel (≥2.5mm, affected by product effect). Detection thresholds are defined as CCPs with critical limits. X-ray inspection systems detect glass (>3mm), high-density plastics, bone, and stone — more versatile but more expensive. Both must be challenged at the start of each production run with certified HACCP test pieces. Visual inspection, sieves, and filters are used for earlier-stage hazard reduction but cannot replace end-of-line detection.',
      },
    ],
  },
]

const hazardTypes = [
  {
    color: '#E8A020',
    icon: '🦠',
    title: 'Biological Hazards',
    desc: 'Bacteria, viruses, parasites, and fungi that cause foodborne illness.',
    examples: 'Salmonella, E. coli O157:H7, Listeria, Campylobacter, Norovirus',
    severity: 'HIGH',
    sevColor: '#E05C5C',
  },
  {
    color: '#4AC09A',
    icon: '⚗️',
    title: 'Chemical Hazards',
    desc: 'Toxic substances from natural sources, food processing, or contamination.',
    examples: 'Pesticides, aflatoxins, heavy metals, cleaning agents, allergens',
    severity: 'MEDIUM–HIGH',
    sevColor: '#E8A020',
  },
  {
    color: '#7AA8D8',
    icon: '🔩',
    title: 'Physical Hazards',
    desc: 'Foreign objects that can cause injury when consumed.',
    examples: 'Glass, metal fragments, bone, plastic, stones, wood',
    severity: 'MEDIUM',
    sevColor: '#7AA8D8',
  },
]

export default function SlideHazards({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 2 · Leon Kreso</p>
      <h2 className="slide-title">Types of Food Hazards</h2>
      <div className="slide-divider" />

      <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
        {hazardTypes.map((h, idx) => (
          <div
            key={h.title}
            className="clickable-card"
            onClick={() => setActiveIdx(idx)}
            style={{
              background: 'var(--navy-card)',
              borderRadius: 10,
              padding: '1rem 1.2rem',
              borderLeft: `4px solid ${h.color}`,
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              position: 'relative',
            }}
          >
            <span className="click-hint">↗ details</span>
            <span style={{ fontSize: '2rem', flexShrink: 0, lineHeight: 1.1 }}>{h.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>{h.title}</span>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
                  color: h.sevColor, background: `${h.sevColor}18`,
                  borderRadius: 4, padding: '0.15rem 0.5rem',
                }}>
                  RISK: {h.severity}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray-light)', lineHeight: 1.5, marginBottom: '0.4rem' }}>
                {h.desc}
              </p>
              <p style={{ fontSize: '0.76rem', color: h.color }}>
                <strong>Examples:</strong> {h.examples}
              </p>
            </div>
          </div>
        ))}

        {/* Image banner */}
        <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', height: 90, flexShrink: 0 }}>
          <img src="/images/six-classes.jpg" alt="Food hazard classes" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.3) 100%)',
            display: 'flex', alignItems: 'center', padding: '0 1.5rem',
          }}>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#E8A020' }}>
              All three hazard types must be systematically controlled throughout the entire supply chain
            </span>
          </div>
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
