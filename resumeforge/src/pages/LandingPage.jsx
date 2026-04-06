import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, useResumeStore } from '../store'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Clock,
  FileText,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

const METRICS = [
  { value: '2.3M+', label: 'Resumes started' },
  { value: '42%', label: 'More interview invites' },
  { value: '18 min', label: 'Average first draft time' },
  { value: '4.8 / 5', label: 'Average builder rating' },
]

const STEPS = [
  {
    title: 'Pick a role-ready template',
    text: 'Start with modern layouts designed to stay readable for humans and applicant tracking software.',
  },
  {
    title: 'Customize with guided prompts',
    text: 'Rewrite bullets with stronger action words and measurable outcomes in one click.',
  },
  {
    title: 'Download and apply today',
    text: 'Export high-quality PDF versions and keep editing anytime as your career grows.',
  },
]

const BENEFITS = [
  'HR-tested sections and formatting',
  'Smart wording suggestions by role',
  'Built-in spelling and clarity checks',
  'Shareable link and print-friendly exports',
]

const FAQ = [
  {
    q: 'Can I build a resume for free?',
    a: 'Yes. You can create and edit your resume for free, then decide when you want premium exports and advanced tools.',
  },
  {
    q: 'Will it work for internships and first jobs?',
    a: 'Absolutely. The builder includes student-friendly examples and entry-level phrasing tips for first-time applicants.',
  },
  {
    q: 'Can I edit my resume later?',
    a: 'Yes, all resumes stay saved in your dashboard so you can quickly tailor versions for each role.',
  },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore()
  const { createResume } = useResumeStore()
  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 14)
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
            <span className="lp-brand-icon"><FileText size={16} color="white" /></span>
            <span>ResumeForge</span>
          </Link>

          <button
            className="lp-menu-btn"
            onClick={() => setMobileMenuOpen((s) => !s)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className={`lp-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link to="/templates" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
            <Link to="/pricing" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link to="/auth" className="btn-ghost" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
            <button className="btn-primary" onClick={handleStart}>Build now <ArrowRight size={14} /></button>
          </div>
        </div>
      </nav>

      <section className="lp-hero hero-gradient">
        <div className="lp-container lp-hero-grid">
          <div>
            <p className="lp-eyebrow"><Sparkles size={14} /> Resume builder for modern job seekers</p>
            <h1 className="lp-title">Create a job-winning resume that feels made for you.</h1>
            <p className="lp-subtitle">
              Skip blank pages and formatting stress. Build a polished resume with guided writing help,
              recruiter-inspired sections, and clean templates that look great on every screen.
            </p>

            <div className="lp-actions">
              <button className="btn-primary lp-btn-large" onClick={handleStart}>
                Create my resume <ArrowRight size={16} />
              </button>
              <Link to="/templates" className="btn-secondary lp-btn-large">Browse templates</Link>
            </div>

            <div className="lp-bullets">
              {['No design skills needed', 'Optimized for ATS readability', 'Resume saved automatically'].map((item) => (
                <span key={item}><Check size={14} color="#06d6a0" strokeWidth={3} /> {item}</span>
              ))}
            </div>
          </div>

          <div className="forge-card lp-preview-card">
            <div className="lp-preview-header">
              <div>
                <strong>Project Coordinator Resume</strong>
                <p>Tailored for Operations Specialist</p>
              </div>
              <span className="badge badge-ai">Quality score 94</span>
            </div>

            <div className="lp-score-row">
              <span><BadgeCheck size={14} color="#4361ee" /> Strong action verbs</span>
              <span><ShieldCheck size={14} color="#4361ee" /> ATS-safe formatting</span>
              <span><Clock size={14} color="#4361ee" /> 2 min to finalize</span>
            </div>

            {[
              'Coordinated a 12-member cross-functional rollout and reduced onboarding time by 28%.',
              'Built weekly KPI reporting dashboards used by operations and leadership teams.',
              'Improved vendor response SLA from 72 hours to 24 hours through workflow changes.',
            ].map((line) => (
              <div key={line} className="lp-preview-line">{line}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-metrics">
        <div className="lp-container lp-metric-grid">
          {METRICS.map((metric) => (
            <article key={metric.label}>
              <h3>{metric.value}</h3>
              <p>{metric.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <header className="lp-section-head">
            <h2>How ResumeForge helps you move faster</h2>
            <p>From first draft to final export, every step is simple and mobile-friendly.</p>
          </header>

          <div className="lp-steps-grid">
            {STEPS.map((step, index) => (
              <article className="forge-card lp-step-card" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-section lp-alt-section">
        <div className="lp-container lp-split">
          <div>
            <h2>Built to be clear, confident, and interview-ready</h2>
            <p>
              Our editor guides you with practical suggestions so you can focus on your achievements,
              not fighting layout issues.
            </p>
            <ul className="lp-benefit-list">
              {BENEFITS.map((benefit) => (
                <li key={benefit}><Check size={15} color="#06d6a0" strokeWidth={3} /> {benefit}</li>
              ))}
            </ul>
          </div>

          <div className="forge-card lp-quote-card">
            <div className="lp-stars">{Array.from({ length: 5 }).map((_, i) => <Star size={14} key={i} color="#f59e0b" fill="#f59e0b" />)}</div>
            <p>
              “I updated my resume in one evening and got two recruiter calls that same week.
              The writing prompts made my experience sound stronger without exaggerating.”
            </p>
            <strong>— Jordan T., Customer Success Lead</strong>
          </div>
        </div>
      </section>

      <section className="lp-section">
        <div className="lp-container">
          <header className="lp-section-head">
            <h2>Frequently asked questions</h2>
          </header>

          <div className="lp-faq-grid">
            {FAQ.map((item) => (
              <article key={item.q} className="forge-card lp-faq-item">
                <h3><CircleHelp size={16} /> {item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-cta">
        <div className="lp-container lp-cta-box">
          <h2>Ready to apply with more confidence?</h2>
          <p>Start your resume now and tailor each version in minutes.</p>
          <button className="btn-primary lp-btn-large" onClick={handleStart}>
            Start for free <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <p>© 2026 ResumeForge. Built for smarter job searching.</p>
          <div>
            <Link to="/templates">Templates</Link>
            <Link to="/pricing">Pricing</Link>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
