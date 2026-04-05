import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

// ─── Auth Store ────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      subscription: 'free', // 'free' | 'pro' | 'enterprise'
      purchasedTemplates: [],

      login: (userData) => set({
        user: userData,
        isAuthenticated: true,
        isAdmin: userData.role === 'admin',
        subscription: userData.subscription || 'free',
        purchasedTemplates: userData.purchasedTemplates || [],
      }),

      logout: () => set({ user: null, isAuthenticated: false, isAdmin: false, subscription: 'free' }),

      updateSubscription: (plan) => set({ subscription: plan }),

      purchaseTemplate: (templateId) => set(s => ({
        purchasedTemplates: [...s.purchasedTemplates, templateId]
      })),

      canUseTemplate: (template) => {
        const { subscription, purchasedTemplates, isAdmin } = get()
        if (isAdmin) return true
        if (template.access === 'free') return true
        if (subscription === 'pro' || subscription === 'enterprise') return true
        return purchasedTemplates.includes(template.id)
      },
    }),
    { name: 'rf-auth', version: 1 }
  )
)

// ─── Default Resume Data ────────────────────────────────────────────────────
export const defaultResume = {
  personal: {
    name: 'Your Full Name',
    title: 'Professional Title',
    email: 'email@example.com',
    phone: '+1 (555) 000-0000',
    location: 'City, State',
    website: 'yourwebsite.com',
    linkedin: 'linkedin.com/in/yourname',
    github: '',
    summary: 'Results-driven professional with expertise in delivering impactful solutions. Passionate about creating meaningful experiences and driving organizational growth through innovation and collaboration.',
    photo: '',
  },
  experience: [
    {
      id: uuidv4(),
      company: 'Company Name',
      position: 'Job Title',
      location: 'City, State',
      startDate: '2022-01',
      endDate: '',
      current: true,
      description: '• Led cross-functional team of 8 engineers to deliver product features on schedule\n• Increased system performance by 40% through architectural improvements\n• Collaborated with stakeholders to define product roadmap and OKRs',
    }
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'University Name',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'City, State',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8',
      honors: 'Cum Laude',
      description: '',
    }
  ],
  skills: [
    { id: uuidv4(), category: 'Technical', skills: 'JavaScript, React, Node.js, Python, SQL' },
    { id: uuidv4(), category: 'Tools', skills: 'Git, Docker, AWS, Figma, JIRA' },
    { id: uuidv4(), category: 'Soft Skills', skills: 'Leadership, Communication, Problem Solving' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'Project Name',
      url: 'github.com/yourproject',
      technologies: 'React, Node.js, MongoDB',
      description: 'Built a full-stack web application that solved a real-world problem, resulting in 500+ users.',
    }
  ],
  certifications: [
    { id: uuidv4(), name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2023-06', url: '' }
  ],
  languages: [
    { id: uuidv4(), language: 'English', proficiency: 'Native' },
    { id: uuidv4(), language: 'Spanish', proficiency: 'Intermediate' },
  ],
  awards: [],
  volunteer: [],
  publications: [],
  references: [],
  customSections: [],
}

// ─── Resume Store ────────────────────────────────────────────────────────────
export const useResumeStore = create(
  persist(
    (set, get) => ({
      resumes: [],
      activeResumeId: null,
      activeResume: null,

      createResume: (title = 'Untitled Resume') => {
        const id = uuidv4()
        const resume = {
          id,
          title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          templateId: 'classic-executive',
          data: { ...defaultResume },
          settings: {
            primaryColor: '#4361ee',
            secondaryColor: '#f72585',
            accentColor: '#4cc9f0',
            fontFamily: 'DM Sans',
            fontSize: 'medium',
            spacing: 'comfortable',
            showPhoto: true,
            showIcons: true,
            columns: 1,
            sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards'],
            customColors: {},
          }
        }
        set(s => ({ resumes: [resume, ...s.resumes], activeResumeId: id, activeResume: resume }))
        return id
      },

      loadResume: (id) => {
        const { resumes } = get()
        const resume = resumes.find(r => r.id === id)
        if (resume) set({ activeResumeId: id, activeResume: resume })
      },

      updateResumeData: (section, value) => {
        set(s => {
          if (!s.activeResume) return s
          const updated = {
            ...s.activeResume,
            data: { ...s.activeResume.data, [section]: value },
            updatedAt: new Date().toISOString()
          }
          return {
            activeResume: updated,
            resumes: s.resumes.map(r => r.id === updated.id ? updated : r)
          }
        })
      },

      updateResumeSettings: (settings) => {
        set(s => {
          if (!s.activeResume) return s
          const updated = {
            ...s.activeResume,
            settings: { ...s.activeResume.settings, ...settings },
            updatedAt: new Date().toISOString()
          }
          return {
            activeResume: updated,
            resumes: s.resumes.map(r => r.id === updated.id ? updated : r)
          }
        })
      },

      updateResumeTemplate: (templateId) => {
        set(s => {
          if (!s.activeResume) return s
          const updated = { ...s.activeResume, templateId, updatedAt: new Date().toISOString() }
          return {
            activeResume: updated,
            resumes: s.resumes.map(r => r.id === updated.id ? updated : r)
          }
        })
      },

      deleteResume: (id) => {
        set(s => ({
          resumes: s.resumes.filter(r => r.id !== id),
          activeResumeId: s.activeResumeId === id ? null : s.activeResumeId,
          activeResume: s.activeResumeId === id ? null : s.activeResume,
        }))
      },

      duplicateResume: (id) => {
        const { resumes } = get()
        const original = resumes.find(r => r.id === id)
        if (!original) return
        const newId = uuidv4()
        const copy = { ...original, id: newId, title: `${original.title} (Copy)`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        set(s => ({ resumes: [copy, ...s.resumes] }))
        return newId
      },

      renameResume: (id, title) => {
        set(s => ({
          resumes: s.resumes.map(r => r.id === id ? { ...r, title, updatedAt: new Date().toISOString() } : r),
          activeResume: s.activeResume?.id === id ? { ...s.activeResume, title } : s.activeResume,
        }))
      },

      addSectionItem: (section, item) => {
        const { activeResume } = get()
        if (!activeResume) return
        const current = activeResume.data[section] || []
        const newItem = { ...item, id: uuidv4() }
        get().updateResumeData(section, [...current, newItem])
        return newItem.id
      },

      updateSectionItem: (section, id, updates) => {
        const { activeResume } = get()
        if (!activeResume) return
        const updated = (activeResume.data[section] || []).map(item =>
          item.id === id ? { ...item, ...updates } : item
        )
        get().updateResumeData(section, updated)
      },

      deleteSectionItem: (section, id) => {
        const { activeResume } = get()
        if (!activeResume) return
        const updated = (activeResume.data[section] || []).filter(item => item.id !== id)
        get().updateResumeData(section, updated)
      },

      reorderSectionItems: (section, fromIndex, toIndex) => {
        const { activeResume } = get()
        if (!activeResume) return
        const items = [...(activeResume.data[section] || [])]
        const [removed] = items.splice(fromIndex, 1)
        items.splice(toIndex, 0, removed)
        get().updateResumeData(section, items)
      },
    }),
    { name: 'rf-resumes', version: 1 }
  )
)

// ─── UI Store ──────────────────────────────────────────────────────────────
export const useUIStore = create((set) => ({
  sidebarOpen: true,
  sidebarTab: 'content', // 'content' | 'design' | 'templates'
  activeSection: 'personal',
  previewMode: false,
  zoom: 80,
  showAIPanel: false,
  notifications: [],

  setSidebarTab: (tab) => set({ sidebarTab: tab }),
  setActiveSection: (section) => set({ activeSection: section }),
  togglePreview: () => set(s => ({ previewMode: !s.previewMode })),
  setZoom: (zoom) => set({ zoom }),
  toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
  toggleAIPanel: () => set(s => ({ showAIPanel: !s.showAIPanel })),
  addNotification: (n) => set(s => ({ notifications: [{ ...n, id: uuidv4() }, ...s.notifications] })),
}))

// ─── Admin Store ────────────────────────────────────────────────────────────
export const useAdminStore = create(
  persist(
    (set, get) => ({
      templates: [],
      users: [],
      transactions: [],
      plans: [
        { id: 'free', name: 'Free', price: 0, features: ['3 resumes', '5 free templates', 'PDF download', 'Basic AI'] },
        { id: 'pro', name: 'Pro', price: 9.99, features: ['Unlimited resumes', 'All templates', 'Word & PDF', 'Advanced AI', 'LinkedIn import', 'Custom domain'] },
        { id: 'enterprise', name: 'Enterprise', price: 29.99, features: ['Everything in Pro', 'Team workspace', 'Priority support', 'API access', 'White-label'] },
      ],
      settings: {
        siteName: 'ResumeForge',
        allowFreeAccess: true,
        maxFreeResumes: 3,
        aiEnabled: true,
        linkedinEnabled: true,
        paymentGateway: 'stripe',
        stripeKey: '',
        razorpayKey: '',
      },

      updateSettings: (updates) => set(s => ({ settings: { ...s.settings, ...updates } })),
      updatePlan: (id, updates) => set(s => ({
        plans: s.plans.map(p => p.id === id ? { ...p, ...updates } : p)
      })),
      addTransaction: (tx) => set(s => ({ transactions: [{ ...tx, id: uuidv4(), date: new Date().toISOString() }, ...s.transactions] })),
    }),
    { name: 'rf-admin', version: 1 }
  )
)
