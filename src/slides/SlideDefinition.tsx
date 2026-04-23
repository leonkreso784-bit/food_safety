import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const CARD_MODALS: ModalContent[] = [
  {
    title: 'Codex Alimentarius Definition',
    icon: '📖',
    color: '#E8A020',
    intro: '"Food safety is the assurance that food will not cause harm to the consumer when it is prepared and eaten according to its intended use." — Codex Alimentarius Commission, FAO/WHO',
    sections: [
      { heading: 'What is the Codex Alimentarius?', text: 'The Codex Alimentarius Commission (CAC) was established in 1963 by FAO and WHO to develop harmonized international food standards. Its standards, guidelines, and codes of practice protect consumer health and ensure fair practices in the food trade. The Codex definition is the internationally accepted legal and scientific basis for food safety legislation in 189 member countries, including all EU member states.' },
      { heading: 'Key Elements of the Definition', text: '"Will not cause harm" — this applies to normal preparation and use, not misuse or excessive consumption. "Consumer" — protection extends to all people including vulnerable groups. "Intended use" — manufacturers must define and communicate the intended use. The definition covers both immediate harm (food poisoning) and long-term harm (cumulative toxin exposure, carcinogenic contamination). It explicitly excludes nutritional adequacy — food safety does not mean nutritional sufficiency.' },
      { heading: 'Why Definitions Matter in Practice', text: 'A precise legal definition enables regulators to distinguish food safety violations (grounds for immediate product withdrawal and prosecution) from food quality issues (commercial disputes, labelling penalties). In EU law, Article 14 of Regulation (EC) No 178/2002 translates the Codex definition into binding law: food is deemed unsafe if it is injurious to health or unfit for human consumption. Disputes about whether a product caused harm reference this precise standard.' },
    ],
  },
  {
    title: 'Farm-to-Fork Principle',
    icon: '🚜',
    color: '#4AC09A',
    intro: 'Food safety must be maintained throughout the entire supply chain — from primary production (planting, raising animals) through processing, distribution, retail, food service, and final consumption by the consumer.',
    sections: [
      { heading: 'The Supply Chain as a Single System', text: 'The farm-to-fork (or "seed-to-seat") principle recognizes that contamination at any single point propagates through all subsequent stages. A contaminated irrigation water source affects crops → those crops are processed → the contamination persists in the final product. This is why EU Regulation (EC) No 178/2002 (General Food Law) applies to all stages including primary production, making even farmers legally liable for food safety within their operations.' },
      { heading: 'Key Control Points Along the Chain', text: 'Primary production: Good Agricultural Practices (GAP), pesticide limits (Maximum Residue Levels), animal feed safety (Regulation 183/2005). Processing: GMP, HACCP plans, allergen control, heat treatment verification. Cold chain logistics: temperature monitoring, vehicle hygiene, time-temperature records. Retail/HoReCa: FIFO stock rotation, cross-contamination prevention, staff hygiene. Consumer: proper storage (refrigerator ≤4°C), reheating to ≥75°C core temperature, separation of raw and cooked foods.' },
      { heading: 'Traceability — the Backbone of Farm-to-Fork', text: 'Article 18 of Regulation 178/2002 requires one-step-back, one-step-forward traceability for all food businesses. This means every operator must be able to identify: where their ingredients came from (one step back), and where their products went (one step forward). The 2011 E. coli O104:H4 outbreak in Germany initially took 10 days to trace the source (fenugreek sprouts from Egypt) — in the interim, Spanish cucumbers were incorrectly blamed, causing €600M in trade losses. Modern digital traceability systems (blockchain, QR coding) aim to reduce source identification time to hours.' },
    ],
  },
  {
    title: 'Preventive vs. Reactive Approach',
    icon: '🛡️',
    color: '#7AA8D8',
    intro: 'Modern food safety science has shifted from reactive end-product testing (testing finished products and removing unsafe batches) to proactive prevention (eliminating hazards before they occur).',
    sections: [
      { heading: 'The Old Reactive Model and Its Failures', text: 'The traditional approach tested a sample of finished product before distribution. Its fundamental flaw: for microbial contamination, statistical sampling cannot provide assurance. If 1% of product is contaminated with Salmonella, a 10-sample batch test has only a 9.6% chance of detecting it. The 1993 Jack in the Box E. coli O157:H7 outbreak (4 children killed, 600+ sick) was a turning point — it exposed how reactive inspection systems fail to prevent widespread harm once a contaminated product has been distributed.' },
      { heading: 'HACCP as the Preventive Paradigm', text: 'Hazard Analysis and Critical Control Points (HACCP) represents the systematic application of preventive food safety management. Rather than testing outputs, HACCP identifies all potential hazards in a process, determines where they can be controlled (Critical Control Points), sets measurable limits, and continuously monitors those limits. The EU mandates HACCP for all food businesses under Regulation (EC) No 852/2004. When correctly implemented, HACCP prevents contamination from occurring rather than detecting it after the fact.' },
      { heading: 'Economic Case for Prevention', text: 'Prevention is significantly more cost-effective than reactive recalls. The average cost of a food recall in the European market exceeds €10 million including: direct costs (product retrieval, destruction, regulatory fines), indirect costs (brand damage, market share loss, increased insurance premiums, management time). By contrast, implementing robust HACCP for a medium-sized food manufacturer typically costs €50,000–€200,000 annually — a fraction of a single recall event. WHO data confirms that every dollar invested in food safety yields €5–€9 in avoided disease burden.' },
    ],
  },
  {
    title: 'Consumer Trust & Economic Value',
    icon: '💼',
    color: '#A070D0',
    intro: 'Safe food is not only a public health requirement — it is a core driver of consumer confidence, brand equity, market access, and long-term economic viability for food businesses.',
    sections: [
      { heading: 'Consumer Confidence as a Business Asset', text: 'Eurobarometer surveys consistently show that over 70% of EU consumers rank food safety as their top concern when purchasing food. After a foodborne illness outbreak linked to a brand, consumer purchase intent drops by an average of 40–60% — even after the cause has been resolved and the product relaunched. This "halo effect" of distrust can persist for 3–5 years. Conversely, brands with strong, publicly communicated food safety records command a 7–12% price premium in consumer goods categories.' },
      { heading: 'Market Access and Export Value', text: 'For food exporters, compliance with international food safety standards is a non-negotiable market access requirement. The EU\'s RASFF (Rapid Alert System for Food and Feed) publicly names countries and products subject to border rejections due to food safety non-compliance. A single RASFF rejection can trigger blanket import bans on an entire product category from a country. Croatia\'s agri-food export sector (valued at approximately €2 billion annually) depends entirely on maintaining EU food safety compliance across all exporting businesses.' },
      { heading: 'The Hospitality Industry Context', text: 'For hotels and restaurants, food safety failures are existentially risky. A single foodborne illness outbreak at a food service establishment results in: immediate closure by health authorities (often 3–7 days minimum), mandatory deep cleaning and re-inspection costs, potential criminal prosecution of the food safety officer under Croatian law (Pravilnik o higijeni hrane — Ordinance on Food Hygiene, NN 73/08), and lasting TripAdvisor/Google review damage. Five-star hotels are held to an even higher standard — a food safety incident damages the entire brand promise. Hotels operating within international chains (Hilton, Hyatt, Marriott) must additionally pass corporate internal audits, typically more stringent than local regulations.' },
    ],
  },
  {
    title: '⚠ The Danger Zone — 5°C to 63°C',
    icon: '🌡️',
    color: '#E05C5C',
    intro: 'Bacteria multiply most rapidly in the temperature range between 5°C and 63°C. This range is called the "Temperature Danger Zone." Food must not be held within this range for more than 2 hours cumulatively.',
    sections: [
      { heading: 'The Science of Bacterial Growth', text: 'Most foodborne pathogens are mesophilic organisms — they thrive at temperatures matching the human body (37°C). At optimal temperatures, bacteria can double every 15–20 minutes. Starting from a small contamination of 100 organisms, after 6 hours in the danger zone: 100 → 200 → 400 → ... → 6.5 billion cells. Many species reach their infective dose (the number of organisms required to cause illness) within 3–4 hours of growth. Staphylococcal food poisoning can occur even after killing the bacteria — because S. aureus produces heat-stable enterotoxins during growth that survive cooking.' },
      { heading: 'Critical Temperatures in Food Safety Practice', text: 'Cold storage: ≤4°C (domestic refrigerator), ≤3°C (commercial chilled food display). Freezing: ≤-18°C (EU standard for frozen food retail). Chilled transport: ≤7°C (Directive 92/2/EEC). Hot holding: ≥63°C (UK Food Safety Act guidance, used in Croatia). Cooking minimum core temperatures: Poultry — 74°C for 15 seconds; Minced meat/pork — 70°C for 15 seconds; Fish — 63°C for 15 seconds; Reheated food — 75°C throughout (Croatian Pravilnik standard). These temperatures are CCPs (Critical Control Points) in any hospitality HACCP plan.' },
      { heading: 'The Two-Hour / Four-Hour Rule', text: 'The internationally recognized time-temperature guideline for food service: Total time in danger zone ≤2 hours → food may be kept or returned to temperature control; Total time 2–4 hours → food must be used immediately, cannot be returned to storage; Total time >4 hours → food must be discarded. Time accumulates across all handling stages: preparation, display, service, and cooling. This rule must be operationalized in hospitality operations through: accurate timing logs for buffet service, probe thermometers for checking core temperatures, FIFO stock rotation records, and chilled display monitoring logs.' },
    ],
  },
]

const left = [
  { title: 'Codex Alimentarius Definition',  text: '"Food safety is the assurance that food will not cause harm to the consumer when it is prepared and eaten according to its intended use."' },
  { title: 'Farm-to-Fork Principle',          text: 'Safety must be maintained throughout the entire supply chain — from primary production to final consumption.' },
  { title: 'Preventive vs. Reactive',         text: 'Modern food safety focuses on prevention of hazards rather than reactive recalls or post-market interventions.' },
  { title: 'Consumer Trust & Economic Value', text: 'Safe food builds consumer confidence and protects the economic viability of food businesses.' },
]

export default function SlideDefinition({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 1 · Leon Kreso</p>
      <h2 className="slide-title">Definition and Scope of Food Safety</h2>
      <div className="slide-divider" />

      <div className="two-col two-col-wide" style={{ flex: 1 }}>
        {/* Left — bullets */}
        <div className="stagger scroll-area">
          {left.map((item, idx) => (
            <div
              key={item.title}
              className="clickable-card"
              onClick={() => setActiveIdx(idx)}
              style={{
                position: 'relative',
                background: 'var(--navy-card)',
                borderRadius: 8,
                padding: '0.85rem 1rem',
                marginBottom: '0.7rem',
                borderLeft: '3px solid var(--amber)',
              }}
            >
              <span className="click-hint">↗ details</span>
              <div style={{ fontWeight: 700, fontSize: '0.83rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#D0D8E4', lineHeight: 1.55 }}>
                {item.text}
              </div>
            </div>
          ))}

          {/* Danger zone */}
          <div
            className="clickable-card"
            onClick={() => setActiveIdx(4)}
            style={{
              position: 'relative',
              background: 'rgba(232,160,32,0.1)',
              border: '1px solid rgba(232,160,32,0.35)',
              borderRadius: 8,
              padding: '0.8rem 1rem',
              marginTop: '0.3rem',
            }}
          >
            <span className="click-hint">↗ details</span>
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#E8A020', marginBottom: '0.3rem' }}>
              ⚠ The Danger Zone
            </div>
            <div style={{ fontSize: '0.78rem', color: '#D0D8E4' }}>
              Bacteria multiply rapidly between <strong style={{ color: '#E8A020' }}>5°C and 63°C</strong> — food must be kept below or above this temperature range at all times.
            </div>
          </div>
        </div>

        {/* Right — image */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/food-safety.jpg"
            alt="Food Safety"
            className="slide-img"
            style={{ borderRadius: 12, maxHeight: 'calc(100vh - 14rem)', objectPosition: 'center' }}
          />
        </div>
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? CARD_MODALS[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
