import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODALS: ModalContent[] = [
  {
    title: 'Salmonella spp.',
    icon: '🦠',
    color: '#E05C5C',
    intro: 'Salmonella species cause salmonellosis — one of the most common foodborne diseases globally. WHO estimates 94 million cases and 155,000 deaths annually from non-typhoidal Salmonella.',
    sections: [
      { heading: 'Key Facts', text: 'Incubation: 6–72 hours (usually 12–36 h). Duration: 4–7 days. Infective dose: as few as 15 cells in vulnerable individuals. Sources: raw/undercooked poultry (70–80% of EU broiler flocks test positive), raw eggs (shell surface and yolk contamination), raw meat, unpasteurized dairy. The primary reservoir is the intestinal tracts of warm-blooded animals — the pathogen is naturally present in the gut flora of poultry, reptiles, and cattle.' },
      { heading: 'Prevention', text: 'Cook poultry to ≥74°C core temperature. Keep eggs refrigerated at ≤4°C; cook until yolk is firm. Prevent cross-contamination from raw poultry to RTE food. Wash hands after handling raw meat. Do not wash raw poultry (splashing disperses bacteria). Monitor supplier Salmonella control certificates. EU Regulation 2160/2003 sets targets for reducing Salmonella in poultry flocks — member states must achieve reduction targets or face trade restrictions.' },
    ],
  },
  {
    title: 'E. coli O157:H7 (STEC)',
    icon: '⚡',
    color: '#E8A020',
    intro: 'Shiga toxin-producing E. coli is dangerous even in tiny doses. It produces toxins that can cause Haemolytic Uraemic Syndrome (HUS) — life-threatening kidney failure especially in children.',
    sections: [
      { heading: 'Danger Profile', text: 'Incubation: 3–4 days (range 1–10 days). Infective dose: fewer than 100 cells — among the lowest of all bacterial pathogens. The Shiga toxins damage intestinal cells and vascular endothelium. HUS develops in 5–10% of cases, predominantly children under 5. HUS mortality: 1–5%. Long-term kidney damage occurs in survivors. The 2011 German STEC O104:H4 outbreak (53 deaths, 900+ HUS cases) was Europe\'s worst recorded foodborne outbreak — caused by contaminated fenugreek sprouts.' },
      { heading: 'Control', text: 'Source: Ruminant intestines — beef (especially minced/ground), raw milk, leafy greens contaminated by animal manure. Never serve raw or rare minced beef to vulnerable groups (children, elderly, pregnant, immunocompromised). Cook minced beef to ≥70°C throughout (not just surface — burgers must be well-done). Avoid raw milk and unpasteurized products. Wash leafy greens thoroughly (though water alone cannot eliminate all STEC from leaf surfaces).' },
    ],
  },
  {
    title: 'Listeria monocytogenes',
    icon: '❄️',
    color: '#7AA8D8',
    intro: 'Listeria is uniquely dangerous because it grows at refrigerator temperatures (even below 0°C), making it a threat in ready-to-eat foods that are not subsequently cooked. Case fatality rate: 20–30%.',
    sections: [
      { heading: 'Why Listeria is Unique', text: 'Unlike most foodborne pathogens that are controlled by cold storage, Listeria monocytogenes: Grows at 0–45°C (optimal 30–37°C but active at 4°C); Survives freezing (dormant but viable); Tolerates high salt concentrations (10%+); Is widely distributed in the environment (soil, vegetation, water). Incubation: 1–4 weeks (can be up to 70 days). Primary high-risk foods: cold-smoked fish, cold deli meats, soft and semi-soft cheeses (brie, camembert, blue, mozzarella), pâté, hot dogs, pre-cut melon/salad.' },
      { heading: 'Control in Hospitality', text: 'EU zero tolerance: Listeria must be absent in 25g for RTE foods before the operator\'s control OR must not exceed 100 CFU/g at point of consumption. In hotels: replace high-risk Listeria items (soft cheeses, cold cuts on long buffets) with lower-risk alternatives for pregnant guests; label buffet items clearly; do not hold cold RTE food above 4°C; follow strict FIFO on deli meats and soft cheeses; deep clean all slicing equipment daily (Listeria forms biofilms on slicer blades and guides).' },
    ],
  },
  {
    title: 'Campylobacter jejuni',
    icon: '🐔',
    color: '#4AC09A',
    intro: 'Campylobacter is the most commonly reported zoonosis in the EU, with over 120,000 confirmed cases annually (estimated true incidence: 9 million). The primary reservoir is poultry — particularly broiler chickens.',
    sections: [
      { heading: 'Epidemiology', text: 'Incubation: 2–5 days. Duration: 3–7 days. Symptoms: severe diarrhoea (often bloody), abdominal cramps, fever, nausea. Estimated 1 in 1,000 cases progresses to Guillain-Barré syndrome (acute paralysis). A single Campylobacter-positive broiler carcass can contaminate an entire cutting board and spread to all food prepared on it. Campylobacter is killed by heating to ≥60°C, so it is primarily a problem in undercooked poultry or cross-contamination to RTE foods.' },
      { heading: 'Control', text: 'Never use the same cutting surface for raw chicken and salad/bread. Colour-coded boards mandatory (yellow = raw poultry). Cook chicken to ≥74°C core. Minimize time between defrosting and cooking. Store raw poultry on the bottom shelf of the refrigerator in a sealed container. Wash and sanitise all surfaces after handling raw chicken. Campylobacter has no EU reduction targets equivalent to Salmonella — EFSA has identified this as a significant regulatory gap.' },
    ],
  },
  {
    title: 'Norovirus',
    icon: '🤢',
    color: '#A070D0',
    intro: 'Norovirus is the leading cause of foodborne illness globally (~125 million cases/year). It is highly infectious — as few as 18 particles cause illness. Hand sanitiser does NOT inactivate Norovirus — only soap and water removes it.',
    sections: [
      { heading: 'Why Norovirus is Especially Risky in Hospitality', text: 'Incubation: 12–48 hours. Duration: 1–3 days. Contagious: YES — for 48 hours after symptoms stop. The fundamental challenge: infected food handlers shedding the virus can contaminate food before they feel sick. The virus survives on surfaces for weeks. It is resistant to many cleaning products and to chlorine at typical pool water concentrations. A single outbreak in a hotel can affect hundreds of guests and staff.' },
      { heading: 'Prevention Protocol', text: '1. Mandatory exclusion of all food handlers for 48 hours after last vomiting/diarrhoea episode. 2. Rigorous handwashing with soap and water — 20 seconds — especially after toilet use. Hand sanitisers are an adjunct, not a substitute. 3. Cooking to ≥90°C destroys Norovirus (critical for shellfish). 4. Shellfish: purchase only from EU-approved class A or B harvesting areas (Regulation 854/2004). Class B shellfish must be depurated before sale. 5. Environmental disinfection after a vomiting incident: chlorine-based disinfectant ≥1,000 ppm on all contaminated surfaces.' },
    ],
  },
  {
    title: 'Clostridium botulinum',
    icon: '💀',
    color: '#E05C5C',
    intro: 'Clostridium botulinum produces botulinum toxin — one of the most potent biological substances known. A dose of just 1–2 nanograms per kg of body weight can cause paralysis. Case fatality rate without treatment: up to 65%.',
    sections: [
      { heading: 'How Botulism Occurs', text: 'Clostridium botulinum is an anaerobic spore-forming bacterium. It thrives in low-oxygen (anaerobic) environments — making improperly home-canned or commercially canned foods, vacuum-packed smoked fish, garlic-in-oil preparations, and reduced-oxygen-packaged foods the primary vehicles. The bacteria produce neurotoxin during growth. Incubation: 18–36 hours (range 6 hours to 10 days). Symptoms: descending paralysis starting with cranial nerves (double vision, difficulty swallowing), then respiratory muscles — the cause of death is respiratory failure. Wound and infant botulism are non-foodborne variants.' },
      { heading: 'Control Measures', text: 'Botulinum spores require >120°C for destruction — achieved only in commercial pressure canning (retort processing). Standard boiling (100°C) kills the toxin but NOT the spores. Controls: Commercial canning must achieve Fo ≥3 (equivalent to 121.1°C for 3 minutes at the coldest point). Vacuum-packed and modified-atmosphere smoked fish must be kept at ≤3°C and have a maximum shelf life based on salt/water activity content. Never use bulging, dented, or leaking cans — this indicates gas production from microbial growth. Garlic-in-oil must be acidified (pH <4.6) or refrigerated and used within 7 days. The botulinum toxin is heat-labile: 80°C for 10 minutes destroys the pre-formed toxin.' },
    ],
  },
  {
    title: 'Staphylococcus aureus',
    icon: '⚡',
    color: '#E8A020',
    intro: 'Staphylococcus aureus is unique among foodborne pathogens: it produces heat-stable enterotoxins during growth that SURVIVE cooking. Eliminating the bacteria does not make the food safe — the toxin remains active.',
    sections: [
      { heading: 'The Toxin Problem', text: 'Incubation: 1–6 hours — among the shortest of all foodborne illnesses. This rapid onset is characteristic of pre-formed toxin poisoning (no growth phase needed in the host). Symptoms: sudden, violent vomiting followed by diarrhoea, abdominal cramps, nausea. Duration: 24–48 hours. The toxin is produced when Staph aureus reaches approximately 10⁵–10⁶ CFU/g in food during growth. The critical failure mode: food is prepared by an infected handler → left in the temperature danger zone → Staph grows and produces toxin → food is cooked (killing bacteria) → served — and still causes illness.' },
      { heading: 'Prevention', text: 'The primary control is preventing contamination at source: 30–50% of humans carry Staph aureus in the nasal passages and on skin. Food handlers with infected cuts, boils, or nasal infections must not handle food without protective covering or must be excluded. Key practices: waterproof plasters over cuts (blue coloured — visible if lost in food); no handling of RTE food with bare hands if any skin infection present; exclude workers with active boils/styes/nasal infections from food handling. Temperature control: keep food above 63°C or below 5°C — Staph does not produce toxin below 10°C. Rapid cooling after cooking: cool to ≤10°C within 90 minutes using ice baths or blast chiller.' },
    ],
  },
]

const rows = [
  { pathogen: 'Salmonella spp.',         source: 'Poultry, eggs, dairy',        symptoms: 'Diarrhea, fever, cramps',        onset: '6–72 h' },
  { pathogen: 'E. coli O157:H7',         source: 'Beef, raw produce, water',    symptoms: 'Bloody diarrhea, HUS',           onset: '3–4 days' },
  { pathogen: 'Listeria monocytogenes',  source: 'Deli meats, soft cheese',     symptoms: 'Meningitis, septicemia',         onset: '1–4 weeks' },
  { pathogen: 'Campylobacter jejuni',    source: 'Poultry, raw milk',           symptoms: 'Diarrhea, cramping, fever',      onset: '2–5 days' },
  { pathogen: 'Norovirus',               source: 'Shellfish, ready-to-eat',     symptoms: 'Vomiting, diarrhea, nausea',     onset: '12–48 h' },
  { pathogen: 'Clostridium botulinum',   source: 'Canned/preserved foods',      symptoms: 'Paralysis (potentially fatal)',  onset: '18–36 h' },
  { pathogen: 'Staphylococcus aureus',   source: 'Ready-to-eat, human handler', symptoms: 'Vomiting, nausea (rapid onset)', onset: '1–6 h' },
]

export default function SlideBioTable({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 2 · Leon Kreso</p>
      <h2 className="slide-title">Biological Hazards — Reference Table</h2>
      <div className="slide-divider" />

      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <table className="bio-table">
          <thead>
            <tr>
              <th>Pathogen</th>
              <th>Common Source</th>
              <th>Symptoms</th>
              <th>Onset</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="clickable-row"
                onClick={() => setActiveIdx(i)}
                style={{ cursor: 'pointer' }}
                title="Click for details"
              >
                <td style={{ fontWeight: 700, color: '#FFFFFF', fontStyle: 'italic' }}>{r.pathogen}</td>
                <td>{r.source}</td>
                <td>{r.symptoms}</td>
                <td style={{ color: '#E8A020', fontWeight: 600, whiteSpace: 'nowrap' }}>{r.onset}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="callout" style={{ marginTop: '1rem', fontSize: '0.78rem' }}>
          Click any row for detailed pathogen information · All pathogens are destroyed at ≥75°C internal temperature
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
