const utm = (url) =>
  `${url}${url.includes('?') ? '&' : '?'}utm_source=portfolio&utm_medium=referral&utm_campaign=aizen_site`

export const PROFILE = {
  name: 'Aizen',
  alias: 'Aung Myo',
  email: 'rpgaungmyo31@gmail.com',
  github: utm('https://github.com/SugMadic32'),
  linkedin: utm('https://www.linkedin.com/in/aung-myo-15a5a6435'),
  githubLabel: 'github.com/SugMadic32',
  linkedinLabel: 'linkedin.com/in/aung-myo-15a5a6435',
  location: 'Pathum Thani, Bangkok, Thailand',
  gpa: '3.78',
}

export const ABOUT = [
  "I'm Aizen (also Aung Myo), an IT student at Rangsit University International College. Most of what I've built has come from pushing past what a course asks for and finishing the full product anyway.",
  'I was Technical Lead for the RSU Symposium, "Generative AI and the Future of ICT Learning": I shipped the event website on GitHub Pages and wrote the final ICT 401 seminar report. It is the clearest example of what I do best, owning a system end to end.',
  'I also work as a freelance programming instructor, teaching Python, Java, HTML, CSS, JavaScript, databases and UI/UX design, in Burmese and English.',
]

export const EXPERIENCE = [
  {
    when: 'ICT 401',
    title: 'Technical Lead, RSU Symposium',
    org: '"Generative AI and the Future of ICT Learning"',
    detail: 'Owned the technical build end to end: the event website on GitHub Pages and the final seminar report.',
  },
  {
    when: 'Ongoing',
    title: 'Freelance Programming Instructor',
    org: 'Independent',
    detail: 'Teaching Python, Java, HTML, CSS, JavaScript, databases and UI/UX design, one-on-one and in small groups.',
  },
  {
    when: 'Research',
    title: 'ASGR1 Aptamer Discovery Pipeline',
    org: 'Independent research',
    detail: "Docking plus ML classification for virtual screening, heading toward Elsevier's Healthcare Analytics.",
  },
  {
    when: 'IRS151 · ICT305',
    title: 'Piti Care, RetailSense, EcoSort, WireLab',
    org: 'Course builds',
    detail: 'Four full-stack systems: AI safety, computer vision, applied AI, and a UI/UX learning platform.',
  },
  {
    when: 'ICT 324',
    title: 'GG Gears — Team Lead',
    org: 'Business Challenge',
    detail: 'Led a three-person team through an association-rule-mining retail simulation.',
  },
]

export const NOW_BUILDING = [
  { name: 'DailySpend', color: '#F0A202', text: 'A Flutter expense tracker backed by Firebase.' },
  { name: 'Learnexa', color: '#D6449D', text: 'An online learning platform on React and Supabase with the Claude API in the learning flow.' },
  { name: 'Restaurant POS + ERP', color: '#0EA5A0', text: 'Freelance system for a restaurant client: live sales dashboard, ingredient-level stock, and stock-out prediction. Currently at demo stage.' },
]

export const FAQS = [
  { q: 'What kind of work are you looking for?', a: 'Internships, research collaborations, and freelance or contract work where I can own a system end to end.' },
  { q: 'Are you available for remote work?', a: 'Yes. I am based in Pathum Thani, Bangkok, and comfortable working across time zones in Burmese or English.' },
  { q: 'Can I see the code?', a: 'Some of it is public on my GitHub and some is course-restricted. Ask about a specific project by email.' },
  { q: 'What is the status of the ASGR1 research?', a: "In progress, being formatted for submission to Elsevier's Healthcare Analytics." },
  { q: 'Do you take on team projects?', a: 'Yes. I have led both solo and team builds, including the RSU Symposium website and a three-person data-mining team.' },
]
