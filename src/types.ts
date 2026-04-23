export interface SlideConfig {
  id: number
  chapter: string
  chapterNum: number
  title: string
  author?: 'leon' | 'tara'
}

export const SLIDES: SlideConfig[] = [
  { id: 0,  chapter: '',                             chapterNum: 0, title: 'Food Safety in the Modern Food Industry' },
  { id: 1,  chapter: 'Overview',                     chapterNum: 0, title: 'Agenda' },
  { id: 2,  chapter: 'Introduction',                 chapterNum: 0, title: 'Why Does Food Safety Matter?',                  author: 'leon' },
  { id: 3,  chapter: '1. Concept & Importance',      chapterNum: 1, title: 'Definition and Scope of Food Safety',            author: 'leon' },
  { id: 4,  chapter: '1. Concept & Importance',      chapterNum: 1, title: 'EU & International Regulatory Framework',        author: 'leon' },
  { id: 5,  chapter: '2. Food Hazards',               chapterNum: 2, title: 'Types of Food Hazards',                          author: 'leon' },
  { id: 6,  chapter: '2. Food Hazards',               chapterNum: 2, title: 'Biological Hazards',                             author: 'leon' },
  { id: 7,  chapter: '2. Food Hazards',               chapterNum: 2, title: 'Biological Hazards — Reference Table',           author: 'leon' },
  { id: 8,  chapter: '2. Food Hazards',               chapterNum: 2, title: 'Chemical and Physical Hazards',                  author: 'leon' },
  { id: 9,  chapter: '3. HACCP Systems',              chapterNum: 3, title: 'What is HACCP?',                                 author: 'tara' },
  { id: 10, chapter: '3. HACCP Systems',              chapterNum: 3, title: 'The 7 HACCP Principles',                         author: 'tara' },
  { id: 11, chapter: '3. HACCP Systems',              chapterNum: 3, title: 'ISO 22000 & Other Standards',                    author: 'tara' },
  { id: 12, chapter: '4. Hospitality Industry',       chapterNum: 4, title: 'Food Safety in the Hospitality Industry',        author: 'tara' },
  { id: 13, chapter: '4. Hospitality Industry',       chapterNum: 4, title: 'Implementation in Hotels & Restaurants',         author: 'tara' },
  { id: 14, chapter: '4. Hospitality Industry',       chapterNum: 4, title: 'Staff Training & Food Handler Responsibilities',  author: 'tara' },
  { id: 15, chapter: 'Conclusion',                    chapterNum: 5, title: 'Key Takeaways',                                  author: 'tara' },
  { id: 16, chapter: 'Quiz',                          chapterNum: 6, title: 'Knowledge Check' },
  { id: 17, chapter: 'Thank You',                     chapterNum: 7, title: 'Thank You & Questions' },
]

export const CHAPTER_COLORS: Record<number, string> = {
  0: '#E8A020',
  1: '#E8A020',
  2: '#4AC09A',
  3: '#7AA8D8',
  4: '#E05C5C',
  5: '#E8A020',
  6: '#A070D0',
  7: '#E8A020',
}
