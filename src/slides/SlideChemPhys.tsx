import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODALS: ModalContent[] = [
  {
    title: 'Chemical Hazards in Food',
    icon: '⚗️',
    color: '#4AC09A',
    intro: 'Chemical hazards are substances that can cause illness or injury when consumed at levels above established safety thresholds. They are particularly challenging because they are invisible, odourless, and tasteless — and cannot be detected without laboratory analysis.',
    sections: [
      { heading: 'Naturally Occurring Chemical Hazards', text: 'These are produced by plants, animals, or microorganisms as natural defence mechanisms or metabolic by-products. Mycotoxins: aflatoxin B1 (carcinogen in nuts/cereals), ochratoxin A (nephrotoxin in cereals/wine), patulin (in rotting apples). Marine biotoxins: Paralytic Shellfish Poisoning (PSP/saxitoxin), Amnesic Shellfish Poisoning (ASP/domoic acid), Diarrhetic Shellfish Poisoning (DSP/okadaic acid) — these toxins accumulate in filter-feeding bivalve molluscs and are NOT destroyed by cooking. Solanine: produced in green/sprouting potatoes — causes nausea, vomiting, neurological symptoms. Cyanogenic glycosides: in cassava (requires proper preparation to remove). EU sets Maximum Residue Levels (MRLs) for mycotoxins and marine biotoxins in Regulations 1881/2006 and 853/2004.' },
      { heading: 'Agri-Chemical Residues', text: 'Pesticide residues: the EU enforces over 500 individual pesticide MRLs under Regulation (EC) No 396/2005. Products exceeding MRLs are removed from market via RASFF. The EU "farm-to-fork" strategy targets a 50% reduction in chemical pesticide use by 2030. Veterinary drug residues: antibiotics and hormones used in livestock production may leave residues in meat, milk, and eggs. EU Regulation 37/2010 sets Maximum Residue Limits. Nitrates: used as fertilizers, accumulate in spinach, lettuce, rocket — regulated under Regulation 1881/2006. Heavy metals: arsenic accumulates in rice; mercury in fish (especially large predatory fish like tuna, swordfish); lead and cadmium in certain vegetables.' },
      { heading: 'Processing & Environmental Contaminants', text: 'Acrylamide: formed when starchy foods are heated above 120°C (frying, baking, roasting). Classified as probable human carcinogen (IARC 2A). EU Regulation 2017/2158 requires food businesses to implement mitigation measures (cook potato products to golden, not brown; reduce cooking temperatures; use lower-acrylamide potato varieties). Dioxins/PCBs: industrial pollutants that bioaccumulate in the food chain — highest in fish, meat, dairy. The 2008 Irish dioxin contamination crisis (recalled pork products from 54 countries) was caused by contaminated recycled cooking oil in pig feed. Cleaning/sanitizing residues: improper rinsing after CIP (Clean-In-Place) or surface sanitisation can leave chemical residues — a hazard especially relevant in hospitality kitchens where chlorine-based sanitisers are widely used.' },
      { heading: 'Allergens as Chemical Hazards', text: 'EU Regulation (EU) No 1169/2011 mandates mandatory declaration of 14 major allergens: cereals containing gluten, crustaceans, eggs, fish, peanuts, soybeans, milk, tree nuts (almonds, hazelnuts, walnuts, cashews, pecans, pistachios, macadamia), celery, mustard, sesame seeds, sulphur dioxide/sulphites (>10mg/kg), lupin, molluscs. In hospitality: allergen information for ALL menu items must be available in written form on request (Croatian Pravilnik requirement). Cross-contact (allergen transfer to "free-from" dishes via shared equipment/surfaces) can cause severe reactions including anaphylaxis. A single hospitality allergen incident can result in criminal prosecution and unlimited civil liability under Croatian consumer protection law.' },
    ],
  },
  {
    title: 'Physical Hazards in Food',
    icon: '🔩',
    color: '#7AA8D8',
    intro: 'Physical hazards are foreign materials or objects that, when present in food, cause injury or illness. They include hard, sharp, or choking-hazard objects that contaminate food during production, processing, or preparation.',
    sections: [
      { heading: 'From Raw Ingredients', text: 'Bone fragments: particularly in mechanically separated meat (MDM), fish products, and poultry. EU Regulation 853/2004 requires bone particle detection in MDM. In hospitality: always check fish fillets for pin bones with fingertip inspection before serving. Stone/grit/extraneous matter: in vegetables, pulses, spices, dried fruit. Always wash and inspect bulk-purchased produce. Pit/stone fragments: from stone fruit processing (cherry pits in cherry products, olive pits in olive products). Particularly important for pediatric menus and elderly guests with dental implants. Glass fragments: from broken containers during raw material handling.' },
      { heading: 'From Equipment', text: 'Metal shavings and fragments: from worn or damaged cutting equipment, mincers, slicers. A comprehensive equipment maintenance schedule and regular physical inspection are required under HACCP. Metal detection: commercial food processing facilities use inline metal detectors or X-ray systems; restaurants should visually inspect equipment before use and report any unusual wear/damage. Glass breakage policy: all glass breakages in the kitchen require immediate halt of production in the affected area, complete disposal of all open food within a defined radius (typically 2 metres), and documented incident report. Plastic fragments: from packaging material, container damage, or equipment wear.' },
      { heading: 'From Personnel', text: 'Jewellery: rings, bracelets, earrings, watches can fall into food or harbour bacteria. EU Food Hygiene Regulation (EC) 852/2004 requires food handlers to remove jewellery before handling food. Only plain wedding bands are permitted in some jurisdictions, but food businesses can prohibit all jewellery as a stricter control. Hair: food handlers must wear hair restraints (net, hat, or equivalent). Short sleeves or sleeves rolled up to prevent falling into food. Fingernails: must be short, clean, unvarnished. Nail varnish and nail extensions are prohibited in food handling. Bandage and plaster policy: visible blue waterproof plasters must be worn over cuts and checked at end of shift to confirm presence. Blue colour enables visual detection if lost in food.' },
      { heading: 'Detection and Control', text: 'Prevention is the primary strategy for physical hazards: 1. Supplier controls — specifications prohibit foreign material, certificates of analysis required. 2. Raw material inspection — visual check on receipt. 3. Equipment maintenance programme — documented inspections of cutting equipment, sieves, grids. 4. Glass and brittle plastic register — all glass containers in production areas registered; breakage protocol activated if any damage occurs. 5. Pest control — evidence of rodent activity (gnawed packaging, droppings) is a physical and biological hazard trigger requiring immediate pest control contractor notification. 6. Metal detection — required by many retailer codes of practice (BRC, IFS) for manufactured products. 7. Staff awareness training — reporting of foreign body complaints from customers is mandatory; any customer complaint of physical hazard must be documented and investigated as a potential HACCP deviation.' },
    ],
  },
]

const chemical = {
  title: 'Chemical Hazards',
  color: '#4AC09A',
  icon: '⚗️',
  groups: [
    { label: 'Naturally occurring', items: ['Mycotoxins (aflatoxins, ochratoxin)', 'Marine biotoxins (saxitoxin, ciguatoxin)', 'Solanine in green potatoes', 'Cyanogenic glycosides in cassava'] },
    { label: 'Agri-chemical', items: ['Pesticide residues', 'Veterinary drug residues (antibiotics)', 'Fertilizer contamination (nitrates)'] },
    { label: 'Processing / Environmental', items: ['Heavy metals: lead, mercury, cadmium, arsenic', 'Acrylamide (from high-temperature cooking)', 'Dioxins and PCBs', 'Cleaning/sanitizing agent residues'] },
  ],
}

const physical = {
  title: 'Physical Hazards',
  color: '#7AA8D8',
  icon: '🔩',
  groups: [
    { label: 'From raw ingredients', items: ['Bone fragments in meat/fish', 'Stones/grit in vegetables', 'Pit fragments in fruit products'] },
    { label: 'From equipment', items: ['Metal shavings from grinders', 'Glass from broken containers', 'Plastic packaging fragments'] },
    { label: 'From personnel', items: ['Jewelry, hair, fingernails', 'Broken staples, pins, clips', 'Bandage material'] },
  ],
}

function HazardPanel({ data, onClick }: { data: typeof chemical; onClick: () => void }) {
  return (
    <div
      className="clickable-card"
      onClick={onClick}
      style={{ position: 'relative', background: 'var(--navy-card)', borderRadius: 10, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', borderTop: `4px solid ${data.color}` }}
    >
      <span className="click-hint">↗ details</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{ fontSize: '1.5rem' }}>{data.icon}</span>
        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#FFFFFF' }}>{data.title}</span>
      </div>
      {data.groups.map((g) => (
        <div key={g.label}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: data.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
            {g.label}
          </div>
          <ul className="bullet-list">
            {g.items.map((item, i) => (
              <li key={i} style={{ fontSize: '0.78rem' }}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function SlideChemPhys({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 2 · Leon Kreso</p>
      <h2 className="slide-title">Chemical and Physical Hazards</h2>
      <div className="slide-divider" />

      <div className="two-col stagger" style={{ flex: 1 }}>
        <HazardPanel data={chemical} onClick={() => setActiveIdx(0)} />
        <HazardPanel data={physical} onClick={() => setActiveIdx(1)} />
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? MODALS[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
