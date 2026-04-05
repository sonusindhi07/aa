import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, useResumeStore } from '../store'
import {
  FileText,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  Clock3,
  LayoutTemplate,
  ScanSearch,
  Star,
  Menu,
  X,
} from 'lucide-react'

const STATS = [
  { number: '2.3M+', label: 'Resumes built' },
  { number: '39%', label: 'More interviews' },
  { number: '15 min', label: 'Average first draft' },
  { number: '4.8/5', label: 'Candidate rating' },
]

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Guided writing that sounds like you',
    desc: 'Turn rough notes into polished achievements with smart suggestions and job-specific wording.',
  },
  {
    icon: ScanSearch,
    title: 'ATS-friendly formatting by default',
    desc: 'Clean structure, readable sections, and keyword guidance to help your resume pass screening systems.',
  },
  {
    icon: LayoutTemplate,
    title: 'Modern templates for every career stage',
    desc: 'Pick from recruiter-approved layouts for students, career switchers, and senior professionals.',
  },
  {
    icon: Shield,
    title: 'Confidence checks before you apply',
    desc: 'Get instant feedback on clarity, impact, and missing details so you submit with confidence.',
  },
]

const STEPS = [
  { title: '1. Choose your target role', text: 'Tell us where you are applying and we tailor guidance to fit.' },
  { title: '2. Build section by section', text: 'Use proven prompts to create strong summaries and bullet points fast.' },
  { title: '3. Download and apply', text: 'Export your resume and submit with confidence in minutes.' },
]

const TESTIMONIALS = [
  {
    quote: 'I rewrote my resume in one evening and got three interview calls the next week.',
    name: 'Arianna M.',
    role: 'Operations Analyst',
  },
  {
    quote: 'The step-by-step flow was perfect. No guessing, just clear guidance and better wording.',
    name: 'Kevin R.',
    role: 'Marketing Specialist',
  },
  {
    quote: 'I finally had a resume I felt proud of. Recruiters started replying again.',
    name: 'Nadia T.',
    role: 'Customer Success Manager',
  },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore()
  const { createResume } = useResumeStore()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStart = () => {
    if (isAuthenticated) {
      const id = createResume('My Resume')
      navigate(`/builder/${id}`)
      return
    }

    navigate('/auth')
  }

  return (
    <div className="lp-page">
      <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : ''}`}>
        <div className="lp-nav-inner">
          <Link to="/" className="lp-brand" onClick={() => setMobileMenuOpen(false)}>
            <span className="lp-brand-icon"><FileText size={16} /></span>
            ResumeForge
          </Link>

          <div className={`lp-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/templates" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
            <Link to="/pricing" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary" onClick={() => setMobileMenuOpen(false)}>
                Dashboard <ArrowRight size={14} />
              </Link>
            ) : (
              <>
                <Link to="/auth" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <button className="btn-primary" onClick={handleStart}>
                  Build for Free <ArrowRight size={14} />
                </button>
              </>
            )}
          </div>

          <button
            className="lp-menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(prev => !prev)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <section className="lp-hero hero-gradient">
        <div className="lp-container lp-hero-grid">
          <div>
            <span className="lp-pill"><Sparkles size={14} /> Build a stronger resume, faster</span>
            <h1 className="lp-title">
              Create a Job-Winning Resume
              <span className="gradient-text"> for Your Next Opportunity</span>
            </h1>
            <p className="lp-subtitle">
              ResumeForge helps you craft clear, professional resumes with guided writing,
              ATS-friendly formatting, and recruiter-approved templates.
            </p>
            <div className="lp-cta-row">
              <button className="btn-primary lp-big-btn" onClick={handleStart}>
                Start My Resume <ArrowRight size={16} />
              </button>
              <Link to="/templates" className="btn-secondary lp-big-btn">Browse Templates</Link>
            </div>
            <div className="lp-checks">
              {['No credit card required', 'Built for ATS scans', 'Edit anytime'].map(item => (
                <span key={item}><Check size={14} /> {item}</span>
              ))}
            </div>
          </div>

          <div className="forge-card lp-preview-card">
            <h3>Professional Resume Snapshot</h3>
            <div className="lp-preview-block">
              <div>
                <strong>Jordan Lee</strong>
                <p>Business Analyst · Chicago, IL</p>
              </div>
              <span className="badge badge-ai">ATS Ready</span>
            </div>

            <div className="lp-preview-section">
              <h4>Summary</h4>
              <p>Data-driven analyst with 6+ years improving operations and reporting for high-growth teams.</p>
            </div>

            <div className="lp-preview-section">
              <h4>Experience Highlights</h4>
              <ul>
                <li>Reduced reporting time by 42% through dashboard automation.</li>
                <li>Supported a $4.1M annual cost optimization project.</li>
                <li>Partnered with cross-functional leaders on strategic planning.</li>
              </ul>
            </div>

            <div className="lp-preview-actions">
              <button>Download PDF</button>
              <button>Share Link</button>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-stats">
        <div className="lp-container lp-stats-grid">
          {STATS.map(item => (
            <div key={item.label}>
              <h3>{item.number}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-center-head">
            <h2>Everything you need to stand out</h2>
            <p>From your first draft to your final export, every step is designed for faster, stronger applications.</p>
          </div>
          <div className="lp-feature-grid">
            {FEATURES.map(feature => (
              <article key={feature.title} className="forge-card lp-feature-card">
                <feature.icon size={20} />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-section-muted">
        <div className="lp-container">
          <div className="lp-center-head">
            <h2>How it works</h2>
            <p>A simple process that helps you move from blank page to interview-ready resume quickly.</p>
          </div>
          <div className="lp-step-grid">
            {STEPS.map(step => (
              <article key={step.title} className="forge-card lp-step-card">
                <Clock3 size={18} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <div className="lp-center-head">
            <h2>What candidates are saying</h2>
          </div>
          <div className="lp-testimonial-grid">
            {TESTIMONIALS.map(item => (
              <article key={item.name} className="forge-card lp-testimonial-card">
                <div className="lp-stars">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p>“{item.quote}”</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-final-cta">
        <div className="lp-container">
          <h2>Ready to apply with confidence?</h2>
          <p>Start your resume today and build a polished version you can send this week.</p>
          <button className="btn-primary lp-big-btn lp-final-btn" onClick={handleStart}>
            Get Started Now <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}
