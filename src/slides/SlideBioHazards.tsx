import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const MODALS: ModalContent[] = [
  {
    title: 'Bacterial Hazards',
    icon: '🦠',
    color: '#E05C5C',
    intro: 'Bacteria are the most common cause of foodborne illness worldwide. Key pathogens include Salmonella, E. coli O157:H7, Listeria monocytogenes, Campylobacter jejuni, Staphylococcus aureus, and Clostridium botulinum.',
    sections: [
      { heading: 'Salmonella', text: 'Non-typhoidal Salmonella causes approximately 94 million cases and 155,000 deaths globally per year (WHO). It colonizes the intestines of warm-blooded animals. Primary vehicles: raw poultry (70–80% of broiler flocks in EU are Salmonella-positive), eggs, raw meat, unpasteurized dairy. Infective dose: as low as 15–20 cells for vulnerable individuals. Symptoms (8–72h onset): diarrhoea, fever, abdominal cramps, vomiting. Duration: 4–7 days. Control: Cook poultry to ≥74°C core; separate raw/cooked surfaces; refrigerate at ≤4°C.' },
      { heading: 'E. coli O157:H7 (STEC)', text: 'Shiga toxin-producing E. coli produces potent Shiga toxins that destroy intestinal tissue. Particularly dangerous in children — can progress to Haemolytic Uraemic Syndrome (HUS), causing kidney failure with 3–5% mortality. Infective dose: fewer than 100 organisms. Primary vehicles: undercooked beef (hamburgers, minced meat), raw milk, contaminated raw vegetables (leafy greens, sprouts). The 2011 German outbreak (contaminated fenugreek sprouts) caused 53 deaths — Europe\'s deadliest outbreak in decades. Control: cook minced beef to ≥70°C throughout; avoid cross-contamination.' },
      { heading: 'Listeria monocytogenes', text: 'Unlike most foodborne pathogens, Listeria grows at refrigerator temperatures (0–4°C), making it uniquely dangerous in ready-to-eat (RTE) foods. Case fatality rate ~20–30% — among the highest of any foodborne pathogen. High-risk foods: cold cuts, smoked fish, soft cheeses (brie, camembert, blue cheese), pre-cut fruit, refrigerated pâtés. Particularly dangerous for pregnant women (can cause miscarriage), neonates, immunocompromised, elderly. EU regulations set a zero-tolerance policy: Listeria must not exceed 100 CFU/g in RTE foods at point of consumption. Many hotels have voluntarily eliminated high-risk Listeria foods from buffets targeting pregnant guests.' },
      { heading: 'Campylobacter & Staph aureus', text: 'Campylobacter is the most reported zoonosis in the EU with >120,000 confirmed human cases annually (likely 9 million estimated). Reservoir: poultry intestines. A single infected chicken carcass can contaminate a whole cutting board. Incubation 2–5 days. Sequel: Guillain-Barré syndrome (rare ascending paralysis) in 1:1000 cases. Staphylococcus aureus is unique — it contaminates food via infected food handlers (skin, nasal passages). It produces heat-STABLE enterotoxins during growth that remain toxic even after cooking kills the bacteria. Control for Staph: strict personal hygiene, excluding infected workers from food handling, keeping food out of the danger zone during preparation.' },
    ],
  },
  {
    title: 'Viral Hazards',
    icon: '🔬',
    color: '#7AA8D8',
    intro: 'Viruses are the second most common cause of foodborne illness. Unlike bacteria, they cannot reproduce in food — they only need a very small number of particles to cause infection. The two most important are Norovirus and Hepatitis A virus.',
    sections: [
      { heading: 'Norovirus', text: 'Norovirus (also called "winter vomiting bug") is the single most common cause of foodborne illness globally — approximately 125 million cases per year. Extremely contagious: infective dose is as few as 18 viral particles. It is NOT killed by hand sanitiser — only soap and water physically remove it. Resistant to chlorine at levels used in swimming pools. Primary transmission: infected food handlers, contaminated water, raw shellfish (oysters bioconcentrate the virus). Symptoms (12–48h onset): sudden vomiting, diarrhoea, nausea, stomach cramps. Duration 1–3 days but highly contagious for 48h after symptoms resolve. Hospitality risk: a single infected kitchen worker can cause an entire hotel floor outbreak.' },
      { heading: 'Hepatitis A', text: 'Hepatitis A virus (HAV) causes liver inflammation, jaundice, and fatigue. Unlike Norovirus, HAV has a long incubation period: 15–50 days (average 28 days), meaning victims often cannot identify the source of infection. It can survive for months in water and on surfaces. Primary vehicles: contaminated water, shellfish (especially oysters), raw produce irrigated with contaminated water, infected food handlers. In hospitality, HAV is particularly dangerous because a contaminated food handler may infect hundreds of guests before symptoms appear. EU requires vaccination for food handlers in high-risk areas. HAV is also vaccine-preventable — the WHO recommends HAV vaccination in endemic regions.' },
      { heading: 'Control Measures for Viruses', text: 'Since viruses cannot grow in food, controls focus on: 1. Hand hygiene — vigorous soap and water washing (20 seconds minimum) after toilet use, before food handling; 2. Exclusion of ill workers — food handlers must not work for 48 hours after vomiting/diarrhoea stops (legal requirement in most EU jurisdictions); 3. Temperature — cooking food to ≥90°C destroys Norovirus and HAV; 4. Shellfish sourcing — purchase only from approved classified harvesting areas (EU Regulation 854/2004); 5. Water safety — use only potable water for food preparation; 6. Environmental disinfection — chlorine-based disinfectants at 1000+ ppm effective against Norovirus on surfaces.' },
    ],
  },
  {
    title: 'Parasitic Hazards',
    icon: '🪱',
    color: '#A070D0',
    intro: 'Parasites are organisms that live in or on a host and cause disease. In food safety, the most relevant parasites are Toxoplasma gondii, Trichinella spiralis, Cryptosporidium, Anisakis, and Giardia.',
    sections: [
      { heading: 'Toxoplasma gondii', text: 'Toxoplasma is one of the most successful parasites in the world — estimated to infect one-third of all humans globally. In healthy adults, infection is usually asymptomatic. However, congenital toxoplasmosis (infection during pregnancy) can cause blindness, brain damage, or stillbirth in the developing foetus. Primary source: raw or undercooked meat (especially lamb and pork), unwashed raw produce, cat faeces. The EU requires pregnant women to be informed about Toxoplasma risk. In hospitality: pregnant guests must be warned about undercooked meat dishes, raw salads from potentially contaminated sources, and steak tartare.' },
      { heading: 'Trichinella & Anisakis', text: 'Trichinella spiralis is a nematode found in raw/undercooked pork, wild boar, and horsemeat. Larvae encyst in muscle tissue; when eaten, they cause trichinosis — severe muscle pain, fever, facial oedema, and in heavy infections, cardiac or neurological complications. EU Regulation 2015/1375 requires Trichinella testing of all pork and horsemeat for sale. Control: cook to ≥60°C core (63°C recommended) or freeze at -15°C for 20 days. Anisakis is a marine nematode found in fish (herring, salmon, mackerel, cod, squid). Can cause anisakiasis (severe stomach pain, vomiting) or allergic reactions. High relevance for sushi/sashimi service. EU Regulation 853/2004 requires all fish intended for raw consumption to be frozen at -20°C for 24 hours to kill Anisakis larvae.' },
      { heading: 'Cryptosporidium & Control', text: 'Cryptosporidium is a waterborne and foodborne protozoan. It is extremely resistant to chlorine disinfection — not killed by normal water treatment. Infective dose: as few as 10 oocysts. Causes profuse watery diarrhoea that can be life-threatening in immunocompromised individuals. Primary vehicles: contaminated water, raw produce, unpasteurised juice. Control measures for all parasites: thorough cooking (≥63°C for fish, ≥70°C for pork); freezing (kills Trichinella and Anisakis, not Toxoplasma); washing produce; using potable water; sourcing fish from reputable, tested suppliers; EU-regulated Trichinella testing at slaughter.' },
    ],
  },
  {
    title: 'Fungi & Mycotoxins',
    icon: '🍄',
    color: '#E8A020',
    intro: 'Fungi (moulds and yeasts) can grow on food and produce mycotoxins — secondary metabolites that are toxic, carcinogenic, or immunosuppressive. Unlike bacteria, mycotoxins are not destroyed by normal cooking temperatures.',
    sections: [
      { heading: 'Aflatoxins — the Most Important Mycotoxin', text: 'Aflatoxins are produced primarily by Aspergillus flavus and A. parasiticus molds growing on nuts (peanuts, almonds, pistachios), cereals (maize, wheat), and spices. Aflatoxin B1 is the most potent naturally occurring carcinogen known — classified as IARC Group 1 (definite human carcinogen). Long-term exposure causes hepatocellular carcinoma (liver cancer). The EU sets maximum levels: Aflatoxin B1 ≤2 μg/kg in cereals for direct human consumption; total aflatoxins ≤4 μg/kg. The EU RASFF rapid alert system rejects numerous shipments annually for aflatoxin exceedances. Africa and Asia have the highest human exposure and associated liver cancer rates.' },
      { heading: 'Other Important Mycotoxins', text: 'Ochratoxin A (produced by Penicillium and Aspergillus on cereals, coffee, dried fruit, wine): nephrotoxic (damages kidneys), possible carcinogen. EU limit: 3 μg/kg in cereals. Deoxynivalenol (DON, "vomitoxin") produced by Fusarium on wheat and maize: causes nausea, vomiting, and immune suppression. EU limit: 750 μg/kg in bread. Fumonisins (Fusarium on maize): associated with oesophageal cancer in high-exposure populations. Patulin (Penicillium in rotting apples): used as indicator of poor raw material quality; EU limit 50 μg/kg in apple juice.' },
      { heading: 'Mycotoxin Control', text: 'Because mycotoxins are heat-stable (aflatoxin B1 survives 150°C for hours), PREVENTION of mould growth is the only effective control. Key prevention measures: Harvest crops at correct moisture content (maize <14% moisture to prevent Aspergillus). Dry storage conditions — most moulds require >70% relative humidity. Visual inspection and rejection of mouldy raw materials. The "HACCP principle for mycotoxins" — control starts at supplier (Good Agricultural Practices, maximum residue level certificates), not at the processing stage. In hospitality: always discard mouldy fruit/bread/vegetables entirely — the visible mould is only the tip; mycotoxins have already diffused throughout the food.' },
    ],
  },
  {
    title: 'Prions (BSE)',
    icon: '🧬',
    color: '#4AC09A',
    intro: 'Prions are misfolded proteins that cause fatal neurodegenerative diseases. Unlike bacteria and viruses, prions contain no DNA or RNA — they propagate by inducing normal proteins to misfold. They are extraordinarily resistant to heat, UV, and chemical disinfection.',
    sections: [
      { heading: 'BSE (Mad Cow Disease) and vCJD', text: 'Bovine Spongiform Encephalopathy (BSE) became a major food safety crisis in the UK in the 1990s. Caused by feeding cattle meat-and-bone meal (MBM) from infected animals (an amplification of the prion through the food chain). Human consumption of BSE-infected beef causes variant Creutzfeldt-Jakob disease (vCJD) — a fatal, incurable progressive brain disease. Incubation period: potentially 10–30 years, making surveillance and case counting extremely difficult. Total confirmed vCJD deaths in UK: ~180 (as of 2023), but epidemiologists estimate thousands may have been silently infected. EU response: immediate ban on MBM in ruminant feed (Regulation 999/2001); mandatory BSE testing of all cattle over 30 months at slaughter; removal of specified risk materials (SRM — brain, spinal cord, eyes) from the food chain.' },
      { heading: 'Why Prions are Uniquely Challenging', text: 'Normal food safety controls DO NOT inactivate prions: Boiling (100°C) — ineffective; Autoclaving (134°C, 18 bar, 18 min) — partially effective only; Formaldehyde — does NOT inactivate prions; UV irradiation — ineffective; Chemical disinfectants (bleach, alcohols) — ineffective at normal concentrations. WHO and ECDC recommend incineration at >800°C as the only reliable method to destroy prion-contaminated material. In surgical settings, single-use instruments are recommended when prion disease is suspected.' },
      { heading: 'Current EU Status and Ongoing Risks', text: 'The EU BSE epidemic has largely been controlled through the 2001 feed ban and active surveillance. EU BSE cases fell from over 2,000/year in the late 1990s to fewer than 10/year since 2015. However: surveillance must continue as prions have incubation periods exceeding decades; Scrapie (sheep prion disease) is still endemic in many EU flocks; Chronic Wasting Disease (CWD) in North American deer poses an emerging risk if infected venison enters trade; BSE feed bans have now been partially lifted for non-ruminant species (pigs, poultry) in specific processed forms, controversial due to monitoring challenges. In hospitality: specified risk materials (brain, spinal cord, tonsils) must NOT be served under EU law. This is automatically ensured by purchasing from licensed EU abattoirs.' },
    ],
  },
  {
    title: '🔑 Key Biological Hazard Controls',
    icon: '✅',
    color: '#4AC09A',
    intro: 'The five core control strategies that address the majority of biological hazard risks in food service operations, all embedded in a HACCP-based food safety management system.',
    sections: [
      { heading: '1. Temperature Control', text: 'The single most effective biological hazard control. Keep cold food cold (≤4°C), hot food hot (≥63°C), and minimize time in the danger zone (5–63°C). Specific requirements: hot holding display ≥63°C (check every 2 hours with calibrated probe); refrigerated storage ≤4°C (log every 4 hours); cooking minimums: poultry 74°C, minced meat 70°C, fish 63°C; rapid cooling: cooked food must reach ≤10°C within 90 minutes (blast chilling). Temperature logs are legal records — retain for a minimum of 3 years under EU traceability rules.' },
      { heading: '2. Personal Hygiene', text: 'Food handlers are the primary contamination vector for many pathogens (Norovirus, Staph aureus, Hepatitis A, Salmonella). Key practices: Handwashing — 20 seconds with soap and water (not hand sanitiser alone); after toilet use; after handling raw meat; after touching face/hair. Exclusion of ill workers — mandatory exclusion for 48 hours after last vomiting or diarrhoea episode (Croatian Pravilnik requirement). Clean uniform, hair restrained, no jewellery on hands/wrists. Regular health screening for food handlers (annual medical certificate required in Croatia).' },
      { heading: '3. Cross-Contamination Prevention', text: 'Cross-contamination transfers pathogens from contaminated sources to ready-to-eat food. Critical prevention measures: Separate raw meat, poultry, fish from RTE food — physical separation in refrigerators (raw on bottom), colour-coded cutting boards (red for raw meat, yellow for poultry, blue for fish, green for vegetables, white for dairy/bread). Dedicated utensils — never use the same knife for raw meat and salads without washing and sanitising. No raw meat near ready-to-eat food during preparation. Sanitise surfaces (300ppm chlorine or equivalent) between different food types.' },
      { heading: '4. Cooking & Verification', text: 'Thorough cooking remains the most reliable way to destroy vegetative bacteria, viruses, and parasites. A calibrated probe thermometer is essential — checking the core (thickest part) of the food. Minimum EU-recommended core temperatures for hospitality: Whole poultry (turkey, chicken): 82°C; Minced/stuffed meat: 74°C; Pork/beef/lamb steaks: 63°C (3 min rest); Fish: 63°C; Reheated dishes: 75°C throughout. Thermometers must be calibrated regularly (ice water = 0°C, boiling = 100°C checks). Calibration records are part of HACCP documentation.' },
    ],
  },
]

const bullets = [
  { pathogen: 'Bacteria',      detail: 'Most common cause — Salmonella, E. coli O157:H7, Listeria monocytogenes, Campylobacter jejuni, Staphylococcus aureus, Clostridium botulinum' },
  { pathogen: 'Viruses',       detail: 'Norovirus and Hepatitis A — transmitted via contaminated water, raw shellfish, infected food handlers' },
  { pathogen: 'Parasites',     detail: 'Toxoplasma gondii, Trichinella, Cryptosporidium — often from raw or undercooked meat and untreated water' },
  { pathogen: 'Fungi & Mycotoxins', detail: 'Mold on grains/nuts produces aflatoxins (carcinogenic). Aspergillus, Penicillium, Fusarium are key genera' },
  { pathogen: 'Prions',        detail: 'Misfolded proteins causing BSE (mad cow disease) — resistant to normal cooking temperatures' },
  { pathogen: 'Key Controls',  detail: 'Temperature control (below 5°C or above 63°C), personal hygiene, cross-contamination prevention, proper cooking' },
]

export default function SlideBioHazards({ onNext: _n }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Chapter 2 · Leon Kreso</p>
      <h2 className="slide-title">Biological Hazards</h2>
      <div className="slide-divider" />

      <div className="two-col two-col-wide" style={{ flex: 1 }}>
        {/* Left */}
        <div className="stagger scroll-area">
          {bullets.map((b, i) => (
            <div
              key={i}
              className="clickable-card"
              onClick={() => setActiveIdx(i)}
              style={{
                position: 'relative',
                background: i === 5 ? 'rgba(232,160,32,0.08)' : 'var(--navy-card)',
                borderRadius: 8,
                padding: '0.75rem 1rem',
                marginBottom: '0.6rem',
                borderLeft: `3px solid ${i === 5 ? '#E8A020' : 'rgba(232,160,32,0.35)'}`,
              }}
            >
              <span className="click-hint">↗ details</span>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: i === 5 ? '#E8A020' : '#FFFFFF', marginBottom: '0.25rem' }}>
                {b.pathogen}
              </div>
              <div style={{ fontSize: '0.77rem', color: 'var(--gray-light)', lineHeight: 1.5 }}>
                {b.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Right — image + callout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <img
            src="/images/pathogen.jpg"
            alt="Pathogens"
            className="slide-img"
            style={{ borderRadius: 10, flex: 1, objectPosition: 'center', maxHeight: 'calc(100vh - 18rem)' }}
          />
          <div className="callout" style={{ fontSize: '0.78rem' }}>
            Biological hazards account for over 90% of all foodborne illness outbreaks globally (WHO, 2022)
          </div>
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
