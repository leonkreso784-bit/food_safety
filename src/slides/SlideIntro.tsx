import { useState } from 'react'
import Modal, { ModalContent } from '../components/Modal'

interface Props { onNext: () => void; onJump?: (idx: number) => void }

const STAT_MODALS: ModalContent[] = [
  {
    title: '600 Million People Fall Ill Annually',
    icon: '🍽️',
    color: '#E8A020',
    intro: 'According to the World Health Organization\'s 2022 global estimates, approximately 600 million people — nearly 1 in 10 people on Earth — fall ill after eating contaminated food each year.',
    sections: [
      { heading: 'Scale & Context', text: 'The 600 million figure represents confirmed foodborne illness cases across 31 specific agents (bacteria, viruses, parasites, toxins, and chemicals). The actual burden is believed to be significantly higher as most foodborne illnesses go unreported, especially in low-income countries with limited surveillance infrastructure. The majority of cases occur in low- and middle-income countries in Africa and South-East Asia.' },
      { heading: 'Most Common Pathogens by Case Count', text: 'Diarrhoeal disease agents account for the greatest share: Norovirus (125 million cases/year), non-typhoidal Salmonella (94 million), Campylobacter (96 million), Shiga toxin-producing E. coli STEC (2.8 million). Together these four agents cause over 300 million of the 600 million total annual cases. Contaminated water, undercooked poultry, and raw produce are the primary vehicles.' },
      { heading: 'Economic Burden', text: 'The World Bank estimates the annual economic burden of unsafe food in low- and middle-income countries at US$110 billion in lost productivity and medical expenses alone. This does not include litigation costs, brand damage, and regulatory penalties in high-income countries. The 2011 E. coli O104:H4 outbreak in Germany caused approximately €1.3 billion in economic losses from agricultural trade disruption alone.' },
      { heading: 'Food Safety as a Public Health Priority', text: 'In 2015, the WHO Director-General declared food safety "a public health priority" — the first such declaration in the organization\'s history. Sustainable Development Goal 2 (Zero Hunger) and SDG 3 (Good Health and Well-being) both explicitly reference the need for safe food systems. The WHO estimates that achieving global safe food targets would prevent over 420,000 deaths annually.' },
    ],
  },
  {
    title: '420,000 Annual Deaths from Foodborne Disease',
    icon: '⚠️',
    color: '#E05C5C',
    intro: 'The WHO estimates 420,000 people die every year from contaminated food, with children under 5 years accounting for 125,000 of these deaths — 30% of the total burden despite representing only 9% of the global population.',
    sections: [
      { heading: 'Leading Fatal Pathogens', text: 'The five agents responsible for the greatest number of foodborne deaths globally: Salmonella (non-typhoidal) — 59,000 deaths/year; Hepatitis A virus — 35,900 deaths/year; Shiga toxin-producing E. coli — 26,000 deaths/year; Campylobacter — 23,000 deaths/year; Mycotoxins (aflatoxin) — 25,000 deaths/year. Clostridium botulinum causes fewer cases but has a case fatality rate of up to 5% in treated cases and up to 65% in untreated cases.' },
      { heading: 'Vulnerable Populations', text: 'Mortality is disproportionately concentrated in: young children (immature immune system, smaller infective dose required); elderly (waning immunity, chronic conditions); pregnant women (Listeria monocytogenes causes miscarriage, premature birth, neonatal meningitis — mortality rate in infected newborns approaches 20–30%); immunocompromised individuals (HIV/AIDS, chemotherapy patients, organ transplant recipients). These groups require special attention in allergen and pathogen risk communication.' },
      { heading: 'Regional Distribution', text: 'Africa has the highest burden per capita: 137 deaths per 100,000 people annually from foodborne diseases, compared to 5 per 100,000 in Europe. Factors driving the African burden: limited access to safe water, inadequate refrigeration infrastructure, high rates of open-market food purchasing without cold chain, and limited food safety regulatory capacity. However, foodborne illness outbreaks occur in all regions including high-income EU member states.' },
    ],
  },
  {
    title: '1 in 10 People Affected Globally Each Year',
    icon: '🌍',
    color: '#4AC09A',
    intro: 'One in every ten people on Earth experiences a foodborne illness each year. This makes foodborne disease one of the most prevalent health challenges globally — comparable in frequency to respiratory infections.',
    sections: [
      { heading: 'Why the Burden is Underestimated', text: 'The 1 in 10 figure captures only reported and diagnosed cases. Studies consistently show that for every reported foodborne illness: approximately 30–40 cases go unreported due to mild symptoms (people do not seek medical attention); 3–5 cases present to a GP but are not laboratory confirmed; 1 case is laboratory confirmed and officially reported. The true incidence may therefore be 30–40 times higher than official data suggests. This underreporting makes surveillance and intervention prioritization extremely challenging.' },
      { heading: 'The EU Situation', text: 'The European Food Safety Authority (EFSA) Annual Report on Zoonoses and Foodborne Outbreaks documents approximately 5,000 foodborne outbreaks in the EU per year, resulting in approximately 45,000 hospitalizations and 30 deaths annually. Campylobacter remains the most reported zoonotic disease (132 cases per 100,000 EU population). Salmonella is the most common cause of foodborne outbreaks. Croatia reports approximately 1,200 confirmed foodborne illness cases per year via the national EPIS surveillance system.' },
      { heading: 'Impact Beyond Health', text: 'The social and economic consequences of foodborne illness extend well beyond direct healthcare costs. Post-infectious conditions (IBS, reactive arthritis, Guillain-Barré syndrome following Campylobacter infection, HUS following STEC infection) affect millions of survivors with long-term quality of life impacts. From a hospitality industry perspective: a single identified foodborne outbreak at a hotel or restaurant results in an average 25–30% revenue decline in the following quarter and potential permanent reputational damage in the age of online reviews.' },
    ],
  },
]

const stats = [
  { value: '600M',     label: 'People fall ill each year\nfrom contaminated food',     color: '#E8A020' },
  { value: '420K',     label: 'Deaths annually worldwide\nfrom foodborne diseases',     color: '#E05C5C' },
  { value: '1 in 10',  label: 'People globally affected\nby a foodborne illness',       color: '#4AC09A' },
]

const bullets = [
  'Food safety ensures food is free from biological, chemical, and physical hazards throughout the entire supply chain',
  'Seminar covers: EU regulatory framework, HACCP systems, hazard types, and hospitality implementation',
  'Authored jointly — Leon Kreso covers Chapters 1–2, Tara Grdinić covers Chapters 3–4',
  'Primary source: WHO Global Estimates of Foodborne Diseases (2022)',
]

export default function SlideIntro({ onNext }: Props) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  return (
    <div className="slide-page">
      <p className="chapter-label">Introduction · Leon Kreso</p>
      <h2 className="slide-title">Why Does Food Safety Matter?</h2>
      <div className="slide-divider" />

      {/* Stats row */}
      <div className="grid-3 stagger" style={{ marginBottom: '1.4rem' }}>
        {stats.map((s, idx) => (
          <div
            key={s.value}
            className="clickable-card stat-box"
            onClick={() => setActiveIdx(idx)}
            style={{ position: 'relative' }}
          >
            <span className="click-hint">↗ details</span>
            <div className="stat-number" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label" style={{ whiteSpace: 'pre-line' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* WHO badge */}
      <div
        className="callout stagger"
        style={{ marginBottom: '1.4rem', fontSize: '0.8rem' }}
      >
        Source: WHO Global Estimates of Foodborne Disease Burden, 2022
      </div>

      {/* Scope bullets */}
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.7rem' }}>
          Seminar Scope
        </p>
        <ul className="bullet-list stagger">
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      <Modal
        open={activeIdx !== null}
        content={activeIdx !== null ? STAT_MODALS[activeIdx] : null}
        onClose={() => setActiveIdx(null)}
      />
    </div>
  )
}
