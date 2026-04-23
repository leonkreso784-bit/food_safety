import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODAL_DATA: ModalContent[] = [
  {
    title: 'Codex Alimentarius — In Depth',
    icon: '🌍',
    color: '#E8A020',
    intro: 'The Codex Alimentarius ("Food Code") is the global reference point for food safety standards, established in 1963 by the World Health Organization (WHO) and Food and Agriculture Organization (FAO) of the United Nations.',
    sections: [
      { heading: 'Governance & Structure', text: 'The Codex Alimentarius Commission (CAC) currently has 189 member countries, representing 99% of the world\'s population. The CAC meets every 2 years. It is supported by subsidiary bodies: Codex Committees (on specific subjects or commodities) and Coordinating Committees (by geographic region). The Codex secretariat is based in Rome, Italy.' },
      { heading: 'Standards, Guidelines & Codes of Practice', text: 'Over 200 food standards covering food commodities; 50+ guidelines (including the General Principles of Food Hygiene, which contains the HACCP system); 50+ codes of practice. Codex standards address: food additives (GSFA), contaminants and toxins (GSCTFF), pesticide residues, veterinary drug residues, food labelling, food hygiene, nutrition and foods for special dietary uses, and specific food commodities (meat, fish, dairy, cereals, etc.).' },
      { heading: 'WTO SPS Agreement & International Trade', text: 'The 1995 WTO Agreement on Sanitary and Phytosanitary Measures (SPS Agreement) designates Codex standards as the international reference benchmark for food safety in trade disputes. Countries that maintain food safety measures more stringent than Codex standards must provide scientific justification (risk assessment). This makes Codex central to international food trade, particularly for import/export between the EU, USA, and developing markets.' },
      { heading: 'Relevance to Croatian Food Law', text: 'Croatia adopted EU food law (including Codex-aligned standards) as part of its EU accession process, which was completed on 1 July 2013. EU food law generally meets or exceeds Codex standards. EU representatives actively participate in Codex committees and often lead the development of new international standards. Croatian food businesses must demonstrate compliance with EU law, which in turn aligns with Codex.' },
    ],
  },
  {
    title: 'EC Regulation 178/2002 — General Food Law',
    icon: '⚖️',
    color: '#4AC09A',
    intro: 'EC Regulation 178/2002 is the cornerstone of EU food and feed law. It establishes the general principles and requirements that underpin all EU food safety legislation.',
    sections: [
      { heading: 'Scope & General Principles', text: 'Applies to all stages of food and feed production, processing, and distribution. Key general principles: food law must be based on risk analysis; the precautionary principle may be applied when scientific evidence is uncertain; transparency of risk assessment to the public; right of stakeholders to consult; free movement of food and feed meeting EU food law. Food businesses bear primary responsibility for the safety of the food they produce, process, or distribute.' },
      { heading: 'EFSA — European Food Safety Authority', text: 'EFSA was established in 2002 and is headquartered in Parma, Italy. It provides independent scientific advice and risk assessments to the European Commission, European Parliament, and EU member states. EFSA expert panels cover: food additives; contaminants in the food chain; biological hazards; dietetic products, nutrition and allergies; plant health; pesticides; animal health and welfare; GMOs; and animal feed. EFSA publishes all opinions and supporting data publicly.' },
      { heading: 'Traceability — Article 18', text: 'Article 18 requires all food and feed business operators to be able to identify: (1) any person from whom they have been supplied with food, feed, or food-producing animal (one step back); and (2) any business to which their products have been supplied (one step forward). This information must be available to competent authorities on demand. Traceability enables rapid, targeted withdrawals/recalls limited to affected batches — avoiding the need for broad precautionary recalls.' },
      { heading: 'RASFF — Rapid Alert System for Food and Feed', text: 'RASFF is an EU network enabling rapid exchange of information between national competent authorities when food safety risks are identified. Members include all 27 EU member states plus Iceland, Liechtenstein, Norway, Switzerland, and the UK. In 2022, over 4,000 RASFF notifications were issued. Notification types: Alert (serious, requiring immediate action), Information (not requiring immediate action), Border Rejection (at point of entry to EU), and News. Croatia is a full RASFF member.' },
    ],
  },
  {
    title: 'EC Regulation 852/2004 — Food Hygiene',
    icon: '🏭',
    color: '#7AA8D8',
    intro: 'EC Regulation 852/2004 is the primary food hygiene legislation for all food businesses in the EU. It is the legal instrument that mandates HACCP implementation.',
    sections: [
      { heading: 'Scope & Application', text: 'Applies to all food business operators (FBOs) at all stages of food production, processing, and distribution with the exception of primary production activities (covered by separate national legislation). Applies to all food establishment types from small catering businesses (restaurants, hotels, canteens) to large manufacturing plants, cold stores, and distribution centres. Croatia\'s Competent Authority for enforcement is HAPIH (Croatian Veterinary and Food Safety Directorate).' },
      { heading: 'HACCP Mandate — Article 5', text: 'Article 5 requires all food business operators to "put in place, implement and maintain a permanent procedure or procedures based on the HACCP principles." All 7 Codex HACCP principles must be addressed in the system. The regulation allows for proportionality in implementation — the complexity of the HACCP system must be proportionate to the size and nature of the food business. A written HACCP plan is required; records must be maintained to demonstrate the system is working.' },
      { heading: 'Flexibility for Small Businesses', text: 'Member states may permit certain simplifications for small businesses, particularly primary producers and small retail businesses. They may maintain records in a non-written format where justified; use national guides to good hygiene practice (GHP guides) as an alternative to a full documented HACCP plan; apply traditional methods and artisanal production practices with appropriate controls. The Croatian national GHP guide provides sector-specific guidance for hospitality businesses.' },
      { heading: 'Hygiene Requirements — Annex II', text: 'Annex II specifies detailed general hygiene requirements covering: premises design and layout (to prevent cross-contamination, enable cleaning); surfaces and finishes (food contact surfaces — smooth, impermeable, easy to clean); equipment (suitable for purpose, cleanable, maintained); waste management; water supply (potable water only in contact with food); temperature control (specified for food storage and handling); personal hygiene (protective clothing, handwashing facilities); training of food handlers; and environmental monitoring.' },
    ],
  },
  {
    title: 'EU Regulation 1169/2011 — Food Information',
    icon: '⚠️',
    color: '#A070D0',
    intro: 'EU Regulation 1169/2011 on food information to consumers mandates the declaration of 14 major allergens on all food products and requires their availability in food service settings.',
    sections: [
      { heading: 'The 14 Mandatory Allergens — Full List', text: '1. Cereals containing gluten (wheat, rye, barley, oats, spelt, kamut, and hybridised strains); 2. Crustaceans (shrimp, crab, lobster, crayfish); 3. Eggs; 4. Fish; 5. Peanuts; 6. Soybeans; 7. Milk (including lactose); 8. Nuts (almond, hazelnut, walnut, cashew, pecan nut, Brazil nut, pistachio nut, Queensland nut/macadamia); 9. Celery (stalk, leaves, seeds, celeriac); 10. Mustard (plant, seed, flour, spice — includes yellow mustard, Dijon, wholegrain); 11. Sesame seeds (including sesame oil, tahini); 12. Sulphur dioxide and sulphites at concentrations of more than 10 mg/kg or 10 mg/L; 13. Lupin (flour and seeds — can cause reactions in people with peanut allergy); 14. Molluscs (clams, oysters, mussels, scallops, squid, octopus).' },
      { heading: 'Labelling Requirements', text: 'For pre-packaged foods: allergens must be emphasized within the ingredients list using a distinct format — bold text, italic, underline, or contrasting colour. For non-pre-packaged foods (restaurants, hotels, canteens, deli counters, bakeries): information must be available — either in writing (menu, information card, allergen matrix) or verbally via trained staff. Written documentation is strongly recommended — relying solely on verbal communication increases the risk of miscommunication and is difficult to audit. Updates required whenever recipe changes occur.' },
      { heading: '"May Contain" Declarations', text: '"May contain traces of..." or "Produced in a facility that also handles..." declarations are voluntary and relate to unintentional cross-contact contamination during production — not to intentional use of an allergen as an ingredient. They do not replace proper allergen management and should not be used as a substitute for adequate controls. EFSA and the EU Commission have published guidance on precautionary allergen labelling (PAL). Businesses should only use PAL where there is a genuine, assessed risk of cross-contact that cannot be controlled by other means.' },
      { heading: 'Allergen Management in Hospitality Settings', text: 'Hotels and restaurants must maintain a complete and current allergen matrix for every dish on the menu, updated whenever recipes change. All food handling staff must receive allergen awareness training (minimum annual refresher). Dedicated allergen-free preparation areas, utensils, and equipment are required for guests with severe/anaphylactic allergies. Written allergen procedures should be included in the HACCP plan. Allergen controls should be included in internal audit programs. Allergen incidents and customer complaints must be documented and investigated.' },
    ],
  },
]

const regulations = [
  {
    color: '#E8A020',
    badge: 'International',
    title: 'Codex Alimentarius',
    org: 'WHO/FAO Joint Programme',
    year: '1963',
    points: [
      'Sets global food standards, guidelines, and codes of practice',
      'Basis for WTO agreements on food trade disputes',
      'Covers 200+ food standards across all categories',
    ],
  },
  {
    color: '#4AC09A',
    badge: 'European Union',
    title: 'EC Regulation 178/2002',
    org: 'General Food Law',
    year: '2002',
    points: [
      'Establishes the European Food Safety Authority (EFSA)',
      'Rapid Alert System for Food and Feed (RASFF)',
      'Defines food business operator responsibilities',
      'Requires full traceability — one step back, one step forward',
    ],
  },
  {
    color: '#7AA8D8',
    badge: 'European Union',
    title: 'EC Regulation 852/2004',
    org: 'Food Hygiene Regulation',
    year: '2004',
    points: [
      'Mandates HACCP system implementation for all food businesses',
      'Defines hygiene standards for all stages of production',
      'Requires documentation and record-keeping of critical points',
      'Applies to all EU Member States including Croatia since 2013',
    ],
  },
  {
    color: '#A070D0',
    badge: 'Allergens',
    title: 'EU Regulation 1169/2011',
    org: 'Food Information to Consumers',
    year: '2011',
    points: [
      'Mandatory declaration of 14 major allergens',
      'Cereals, crustaceans, eggs, fish, peanuts, soy, milk, nuts',
      'Sesame, celery, mustard, lupin, molluscs, sulphites',
      'Applies to pre-packaged and non-pre-packaged foods',
    ],
  },
]

export default function SlideRegulation({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 1 · Leon Kreso</p>
      <h2 className="slide-title">EU & International Regulatory Framework</h2>
      <div className="slide-divider" />

      <div className="grid-2 stagger" style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {regulations.map((r, idx) => (
          <div
            key={r.title}
            className="clickable-card card"
            onClick={() => setActiveIdx(idx)}
            style={{ borderTop: `4px solid ${r.color}`, position: 'relative' }}
          >
            <span className="click-hint">↗ details</span>
            <div style={{ padding: '0.9rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: r.color,
                  background: `${r.color}18`, borderRadius: 4,
                  padding: '0.15rem 0.45rem',
                }}>
                  {r.badge}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--gray-mid)', fontWeight: 600 }}>{r.year}</span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#FFFFFF', marginBottom: '0.15rem' }}>{r.title}</div>
              <div style={{ fontSize: '0.72rem', color: r.color, marginBottom: '0.6rem', fontStyle: 'italic' }}>{r.org}</div>
              <ul className="bullet-list">
                {r.points.map((p, i) => <li key={i} style={{ fontSize: '0.76rem' }}>{p}</li>)}
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
