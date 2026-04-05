export const defaultResume = {
  contact: {
    name: 'Alexandra Chen',
    title: 'Senior Product Designer',
    email: 'alex.chen@email.com',
    phone: '+1 (415) 555-0192',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexchen',
    website: 'alexchen.design',
  },
  summary:
    'Award-winning product designer with 8+ years crafting human-centered digital experiences for Fortune 500 companies. Expert in translating complex business problems into elegant, accessible solutions that delight users and drive measurable impact.',
  experience: [
    {
      id: 'exp-1',
      title: 'Lead Product Designer',
      company: 'Figma Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description:
        'Led end-to-end design of 6 core product features used by 4M+ designers worldwide. Built and governed the company design system, reducing design-to-dev handoff time by 50%. Mentored a team of 6 designers and drove 40% improvement in user onboarding completion.',
    },
    {
      id: 'exp-2',
      title: 'Senior UX Designer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      description:
        'Redesigned the host onboarding experience, reducing drop-off by 35% and increasing new host activation by 28%. Conducted 60+ user research sessions to inform strategic decisions across 3 product squads.',
    },
    {
      id: 'exp-3',
      title: 'UX Designer',
      company: 'Google',
      location: 'Mountain View, CA',
      startDate: 'Jul 2016',
      endDate: 'Feb 2018',
      description:
        'Contributed to Google Maps accessibility features, improving experience for 15M+ users with disabilities. Shipped 4 major features across Maps and Search, collaborating with cross-functional teams globally.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. Interaction Design',
      school: 'Carnegie Mellon University',
      location: 'Pittsburgh, PA',
      year: '2016',
      gpa: '3.9 / 4.0',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'Figma & Prototyping', level: 95 },
    { id: 'sk-2', name: 'User Research & Testing', level: 88 },
    { id: 'sk-3', name: 'Design Systems', level: 82 },
    { id: 'sk-4', name: 'Product Strategy', level: 76 },
    { id: 'sk-5', name: 'HTML / CSS', level: 70 },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Native' },
    { id: 'lang-2', name: 'Mandarin', level: 'Fluent' },
  ],
}

export const THEMES = {
  midnight: { primary: '#08090e', accent: '#c8993f', accentLight: '#fdf6e3', label: 'Midnight' },
  navy:     { primary: '#1e3a8a', accent: '#3b82f6', accentLight: '#dbeafe', label: 'Navy' },
  forest:   { primary: '#064e3b', accent: '#10b981', accentLight: '#d1fae5', label: 'Forest' },
  crimson:  { primary: '#7f1d1d', accent: '#ef4444', accentLight: '#fee2e2', label: 'Crimson' },
  violet:   { primary: '#4c1d95', accent: '#8b5cf6', accentLight: '#ede9fe', label: 'Violet' },
  slate:    { primary: '#1e293b', accent: '#64748b', accentLight: '#f1f5f9', label: 'Slate' },
}

export const FONTS = {
  playfair: { display: "'Playfair Display', Georgia, serif", body: "'Syne', system-ui, sans-serif", label: 'Playfair (Elegant)' },
  syne:     { display: "'Syne', system-ui, sans-serif", body: "'Syne', system-ui, sans-serif", label: 'Syne (Modern)' },
  georgia:  { display: "Georgia, 'Times New Roman', serif", body: "Georgia, serif", label: 'Georgia (Classic)' },
  courier:  { display: "'Courier New', monospace", body: "'Courier New', monospace", label: 'Courier (Technical)' },
}
