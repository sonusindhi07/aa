// ─── Template Registry ──────────────────────────────────────────────────────
// Each template defines its layout, sections, and visual identity

export const TEMPLATES = [
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    category: 'Professional',
    access: 'free',
    price: 0,
    preview: null,
    description: 'Timeless single-column layout for senior professionals',
    tags: ['minimal', 'traditional', 'ATS-friendly'],
    layout: {
      type: 'single-column',
      headerStyle: 'centered',
      sectionDivider: 'line',
      fontPrimary: 'Playfair Display',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#1a2566',
      secondaryColor: '#4361ee',
      accentColor: '#4cc9f0',
    }
  },
  {
    id: 'modern-sidebar',
    name: 'Modern Sidebar',
    category: 'Creative',
    access: 'free',
    price: 0,
    preview: null,
    description: 'Two-column with bold left sidebar — eye-catching and modern',
    tags: ['two-column', 'sidebar', 'colorful'],
    layout: {
      type: 'two-column-sidebar',
      headerStyle: 'sidebar',
      sectionDivider: 'none',
      fontPrimary: 'DM Sans',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#4361ee',
      secondaryColor: '#ffffff',
      accentColor: '#f72585',
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    category: 'Minimal',
    access: 'free',
    price: 0,
    preview: null,
    description: 'Ultra-clean whitespace-driven design — ATS optimized',
    tags: ['minimal', 'clean', 'ATS-friendly', 'whitespace'],
    layout: {
      type: 'single-column',
      headerStyle: 'left-aligned',
      sectionDivider: 'subtle',
      fontPrimary: 'DM Sans',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#0f172a',
      secondaryColor: '#334155',
      accentColor: '#3b82f6',
    }
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    category: 'Creative',
    access: 'pro',
    price: 4.99,
    preview: null,
    description: 'High-contrast design with strong typography for standout resumes',
    tags: ['bold', 'creative', 'colorful', 'design'],
    layout: {
      type: 'single-column',
      headerStyle: 'banner',
      sectionDivider: 'accent',
      fontPrimary: 'Playfair Display',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#7209b7',
      secondaryColor: '#f72585',
      accentColor: '#4cc9f0',
    }
  },
  {
    id: 'tech-grid',
    name: 'Tech Grid',
    category: 'Tech',
    access: 'pro',
    price: 4.99,
    preview: null,
    description: 'Developer-focused with skills grid and clean information hierarchy',
    tags: ['tech', 'developer', 'two-column', 'grid'],
    layout: {
      type: 'two-column-equal',
      headerStyle: 'left-aligned',
      sectionDivider: 'dot',
      fontPrimary: 'DM Sans',
      fontBody: 'JetBrains Mono',
    },
    defaults: {
      primaryColor: '#06d6a0',
      secondaryColor: '#0f172a',
      accentColor: '#4cc9f0',
    }
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    category: 'Professional',
    access: 'pro',
    price: 4.99,
    preview: null,
    description: 'Sophisticated serif typography for legal, finance, academia',
    tags: ['elegant', 'serif', 'professional', 'formal'],
    layout: {
      type: 'single-column',
      headerStyle: 'centered',
      sectionDivider: 'ornate',
      fontPrimary: 'Playfair Display',
      fontBody: 'Playfair Display',
    },
    defaults: {
      primaryColor: '#78350f',
      secondaryColor: '#92400e',
      accentColor: '#d97706',
    }
  },
  {
    id: 'infographic',
    name: 'Infographic Pro',
    category: 'Creative',
    access: 'pro',
    price: 7.99,
    preview: null,
    description: 'Visual skill bars, timeline experience, and photo-forward design',
    tags: ['creative', 'visual', 'infographic', 'sidebar'],
    layout: {
      type: 'two-column-sidebar',
      headerStyle: 'photo-center',
      sectionDivider: 'none',
      fontPrimary: 'DM Sans',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#4361ee',
      secondaryColor: '#1e293b',
      accentColor: '#f72585',
    }
  },
  {
    id: 'executive-dark',
    name: 'Executive Dark',
    category: 'Premium',
    access: 'pro',
    price: 7.99,
    preview: null,
    description: 'Dark luxe theme for creative executives and directors',
    tags: ['dark', 'premium', 'luxury', 'executive'],
    layout: {
      type: 'two-column-sidebar',
      headerStyle: 'sidebar',
      sectionDivider: 'none',
      fontPrimary: 'Playfair Display',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#d4af37',
      secondaryColor: '#1a1a2e',
      accentColor: '#e8c547',
    }
  },
  {
    id: 'timeline-pro',
    name: 'Timeline Pro',
    category: 'Creative',
    access: 'pro',
    price: 4.99,
    preview: null,
    description: 'Visual timeline layout that tells your career story beautifully',
    tags: ['timeline', 'visual', 'creative', 'story'],
    layout: {
      type: 'timeline',
      headerStyle: 'left-aligned',
      sectionDivider: 'timeline',
      fontPrimary: 'DM Sans',
      fontBody: 'DM Sans',
    },
    defaults: {
      primaryColor: '#4361ee',
      secondaryColor: '#f0f4ff',
      accentColor: '#4cc9f0',
    }
  },
]

export const TEMPLATE_CATEGORIES = ['All', 'Professional', 'Creative', 'Minimal', 'Tech', 'Premium']

export const getTemplate = (id) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0]

// ─── Section Config ─────────────────────────────────────────────────────────
export const SECTIONS = {
  personal: { label: 'Personal Info', icon: 'User', required: true },
  summary: { label: 'Summary', icon: 'FileText' },
  experience: { label: 'Experience', icon: 'Briefcase' },
  education: { label: 'Education', icon: 'GraduationCap' },
  skills: { label: 'Skills', icon: 'Zap' },
  projects: { label: 'Projects', icon: 'Code' },
  certifications: { label: 'Certifications', icon: 'Award' },
  languages: { label: 'Languages', icon: 'Globe' },
  awards: { label: 'Awards', icon: 'Trophy' },
  volunteer: { label: 'Volunteer', icon: 'Heart' },
  publications: { label: 'Publications', icon: 'BookOpen' },
  references: { label: 'References', icon: 'Users' },
}

// ─── Font Options ────────────────────────────────────────────────────────────
export const FONTS = [
  { label: 'DM Sans', value: 'DM Sans', style: 'Modern' },
  { label: 'Playfair Display', value: 'Playfair Display', style: 'Classic' },
  { label: 'JetBrains Mono', value: 'JetBrains Mono', style: 'Tech' },
  { label: 'Georgia', value: 'Georgia', style: 'Traditional' },
]

export const SPACING_OPTIONS = [
  { label: 'Compact', value: 'compact' },
  { label: 'Comfortable', value: 'comfortable' },
  { label: 'Spacious', value: 'spacious' },
]

export const PROFICIENCY_LEVELS = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']
