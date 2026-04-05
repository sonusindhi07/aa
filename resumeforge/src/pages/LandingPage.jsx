import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, useResumeStore } from '../store'
import {
  FileText, Zap, Globe, Download, Star, ArrowRight, Check,
  ChevronRight, Sparkles, Shield, Users, TrendingUp, Play,
  Award, Clock, Linkedin, Upload
} from 'lucide-react'

const STATS = [
  { number: '2M+', label: 'Resumes Created' },
  { number: '98%', label: 'ATS Pass Rate' },
  { number: '4.9★', label: 'User Rating' },
  { number: '150+', label: 'Countries' },
]

const FEATURES = [
  { icon: Zap, title: 'AI-Powered Writing', desc: 'Let AI craft compelling bullet points, summaries, and cover letters tailored to your role.', color: '#4361ee', badge: 'AI' },
  { icon: Globe, title: 'LinkedIn Import', desc: 'Import your LinkedIn profile in one click — no manual re-entry of your career history.', color: '#0077b5', badge: 'New' },
  { icon: Download, title: 'PDF & Word Export', desc: 'Download pixel-perfect PDFs or editable Word documents. Print-ready, ATS-optimized.', color: '#06d6a0', badge: null },
  { icon: Shield, title: 'ATS Optimized', desc: 'Every template is tested against major ATS systems. Beat the bots, get to interviews.', color: '#f72585', badge: null },
  { icon: Sparkles, title: 'Dynamic Templates', desc: 'Universal Layout Engine adapts your content to any of our 9+ beautiful templates instantly.', color: '#7209b7', badge: 'Core' },
  { icon: Upload, title: 'Upload & Enhance', desc: 'Have an existing resume? Upload it and let AI enhance, reformat, and optimize it.', color: '#ffd166', badge: null },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Software Engineer at Google', text: 'Got my dream job in 3 weeks using ResumeForge. The AI suggestions were incredibly accurate.', avatar: 'PS', stars: 5 },
  { name: 'Marcus Johnson', role: 'Product Manager at Meta', text: 'Switched from a $300/hr consultant to ResumeForge. The results were honestly better.', avatar: 'MJ', stars: 5 },
  { name: 'Aisha Patel', role: 'Data Scientist at Amazon', text: 'LinkedIn import + AI rewrite took 10 minutes. I had 8 interviews in the first week.', avatar: 'AP', stars: 5 },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuthStore()
  const { createResume } = useResumeStore()
  const navigate = useNavigate()
  const [heroTab, setHeroTab] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStart = () => {
    if (isAuthenticated) {
      const id = createResume('My Resume')
      navigate(`/builder/${id}`)
    } else {
      navigate('/auth')
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:'white', fontFamily:'DM Sans' }}>
      {/* Nav */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:50,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #e2e8f0' : 'none',
        transition:'all 0.3s',
        padding:'0 5%',
      }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'64px', maxWidth:'1200px', margin:'0 auto' }}>
          <Link to="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:32, height:32, background:'linear-gradient(135deg, #4361ee, #f72585)', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <FileText size={18} color="white" />
            </div>
            <span style={{ fontFamily:'Playfair Display', fontSize:'18px', fontWeight:700, color:'#1e293b' }}>ResumeForge</span>
          </Link>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <Link to="/templates" className="btn-ghost" style={{ textDecoration:'none' }}>Templates</Link>
            <Link to="/pricing" className="btn-ghost" style={{ textDecoration:'none' }}>Pricing</Link>
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-primary" style={{ textDecoration:'none' }}>Dashboard <ArrowRight size={14} /></Link>
            ) : (
              <>
                <Link to="/auth" className="btn-ghost" style={{ textDecoration:'none' }}>Sign In</Link>
                <button className="btn-primary" onClick={handleStart}>Get Started Free <ArrowRight size={14} /></button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient" style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'80px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'60px 5%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'60px', alignItems:'center' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'#e0eaff', color:'#4361ee', padding:'6px 14px', borderRadius:'99px', fontSize:'13px', fontWeight:600, marginBottom:'24px' }}>
              <Sparkles size={14} /> AI-Powered Resume Builder
            </div>
            <h1 style={{ fontFamily:'Playfair Display', fontSize:'clamp(36px, 5vw, 58px)', fontWeight:700, lineHeight:1.1, color:'#1e293b', margin:'0 0 20px' }}>
              Build Resumes That<br />
              <span className="gradient-text">Land Interviews</span>
            </h1>
            <p style={{ fontSize:'18px', color:'#64748b', lineHeight:1.7, marginBottom:'32px', maxWidth:'480px' }}>
              Create stunning, ATS-optimized resumes in minutes using AI. Import from LinkedIn, choose from 9+ templates, and download in PDF or Word.
            </p>
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'40px' }}>
              <button className="btn-primary" onClick={handleStart} style={{ fontSize:'16px', padding:'14px 28px' }}>
                Build My Resume Free <ArrowRight size={16} />
              </button>
              <Link to="/templates" className="btn-secondary" style={{ fontSize:'16px', padding:'14px 28px', textDecoration:'none' }}>
                <Play size={16} /> View Templates
              </Link>
            </div>
            <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
              {['No credit card', 'ATS optimized', 'PDF & Word export'].map(f => (
                <span key={f} style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'13px', color:'#64748b' }}>
                  <Check size={14} color="#06d6a0" strokeWidth={3} /> {f}
                </span>
              ))}
            </div>
          </div>
          {/* Hero preview card */}
          <div style={{ position:'relative' }}>
            <div className="forge-card" style={{ padding:'32px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:-20, right:-20, width:120, height:120, borderRadius:'50%', background:'linear-gradient(135deg, #4361ee22, #f7258522)', filter:'blur(20px)' }} />
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
                <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg, #4361ee, #7209b7)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:700 }}>JD</div>
                <div>
                  <div style={{ fontFamily:'Playfair Display', fontSize:'16px', fontWeight:700, color:'#1e293b' }}>Jane Doe</div>
                  <div style={{ fontSize:'12px', color:'#4361ee', fontWeight:500 }}>Senior Product Manager</div>
                </div>
                <div style={{ marginLeft:'auto' }}>
                  <span className="badge badge-ai">AI Enhanced</span>
                </div>
              </div>
              {/* Mini resume preview */}
              {[
                { label: 'Summary', content: 'Results-driven PM with 8+ years building B2B SaaS products...', color:'#4361ee' },
                { label: 'Experience', content: 'Meta · Senior PM · 2021–Present\n• Led 0→1 product launch reaching 2M users', color:'#7209b7' },
                { label: 'Skills', content: 'Product Strategy, Data Analytics, Agile, Figma, SQL', color:'#06d6a0' },
              ].map(sec => (
                <div key={sec.label} style={{ marginBottom:'12px', padding:'10px 12px', background:'#f8faff', borderRadius:'8px', borderLeft:`3px solid ${sec.color}` }}>
                  <div style={{ fontSize:'10px', fontWeight:700, color: sec.color, textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:'4px' }}>{sec.label}</div>
                  <div style={{ fontSize:'12px', color:'#374151', lineHeight:1.5, whiteSpace:'pre-line' }}>{sec.content}</div>
                </div>
              ))}
              <div style={{ display:'flex', gap:'8px', marginTop:'16px' }}>
                <button style={{ flex:1, background:'#4361ee', color:'white', border:'none', borderRadius:'8px', padding:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer' }}>
                  Download PDF
                </button>
                <button style={{ flex:1, background:'#f0f4ff', color:'#4361ee', border:'none', borderRadius:'8px', padding:'8px', fontSize:'12px', fontWeight:600, cursor:'pointer' }}>
                  Word Export
                </button>
              </div>
            </div>
            {/* Floating badges */}
            <div style={{ position:'absolute', top:-12, right:-12, background:'white', borderRadius:'10px', padding:'8px 12px', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', fontSize:'12px', fontWeight:600, color:'#1e293b', display:'flex', alignItems:'center', gap:'6px' }}>
              <Zap size={12} color="#f59e0b" fill="#f59e0b" /> AI Writing Active
            </div>
            <div style={{ position:'absolute', bottom:-8, left:-8, background:'white', borderRadius:'10px', padding:'8px 12px', boxShadow:'0 8px 24px rgba(0,0,0,0.1)', fontSize:'12px', fontWeight:600, color:'#1e293b', display:'flex', alignItems:'center', gap:'6px' }}>
              <Check size={12} color="#06d6a0" strokeWidth={3} /> ATS Score: 97/100
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:'#1e293b', padding:'40px 5%' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'20px', textAlign:'center' }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize:'36px', fontWeight:700, color:'white', fontFamily:'Playfair Display' }}>{s.number}</div>
              <div style={{ fontSize:'14px', color:'#94a3b8', marginTop:'4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'80px 5%', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'36px', fontWeight:700, color:'#1e293b', marginBottom:'12px' }}>Everything You Need to Land the Job</h2>
          <p style={{ fontSize:'18px', color:'#64748b', maxWidth:'560px', margin:'0 auto' }}>From AI writing to LinkedIn import — all the tools in one beautiful platform.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px' }}>
          {FEATURES.map(f => (
            <div key={f.title} className="forge-card" style={{ padding:'28px', transition:'transform 0.2s, box-shadow 0.2s', cursor:'default' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(67,97,238,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'16px' }}>
                <div style={{ width:44, height:44, borderRadius:'10px', background:`${f.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <f.icon size={20} color={f.color} />
                </div>
                {f.badge && <span className={`badge badge-${f.badge === 'AI' ? 'ai' : f.badge === 'New' ? 'new' : 'pro'}`}>{f.badge}</span>}
              </div>
              <h3 style={{ fontSize:'18px', fontWeight:700, color:'#1e293b', marginBottom:'8px' }}>{f.title}</h3>
              <p style={{ fontSize:'14px', color:'#64748b', lineHeight:1.6, margin:0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ background:'#f8faff', padding:'80px 5%' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <h2 style={{ fontFamily:'Playfair Display', fontSize:'36px', fontWeight:700, color:'#1e293b', marginBottom:'12px' }}>Loved by Job Seekers Worldwide</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:'24px' }}>
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="forge-card" style={{ padding:'28px' }}>
                <div style={{ display:'flex', gap:'2px', marginBottom:'16px' }}>
                  {Array(t.stars).fill(0).map((_, i) => <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" />)}
                </div>
                <p style={{ fontSize:'15px', color:'#374151', lineHeight:1.7, marginBottom:'20px' }}>"{t.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg, #4361ee, #f72585)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontSize:'12px', fontWeight:700 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'14px', color:'#1e293b' }}>{t.name}</div>
                    <div style={{ fontSize:'12px', color:'#64748b' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 5%', textAlign:'center', background:'linear-gradient(135deg, #4361ee, #7209b7)', color:'white' }}>
        <h2 style={{ fontFamily:'Playfair Display', fontSize:'40px', fontWeight:700, marginBottom:'16px' }}>Ready to Build Your Dream Resume?</h2>
        <p style={{ fontSize:'18px', opacity:0.85, marginBottom:'32px', maxWidth:'480px', margin:'0 auto 32px' }}>Join 2 million professionals. Start free, upgrade when you're ready.</p>
        <button className="btn-primary" onClick={handleStart} style={{ background:'white', color:'#4361ee', fontSize:'16px', padding:'14px 32px' }}>
          Start Building Free <ArrowRight size={16} />
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background:'#1e293b', color:'#94a3b8', padding:'40px 5%', textAlign:'center', fontSize:'14px' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', marginBottom:'16px' }}>
          <div style={{ width:24, height:24, background:'linear-gradient(135deg, #4361ee, #f72585)', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <FileText size={12} color="white" />
          </div>
          <span style={{ fontFamily:'Playfair Display', color:'white', fontWeight:700 }}>ResumeForge</span>
        </div>
        <div style={{ display:'flex', justifyContent:'center', gap:'24px', marginBottom:'16px', flexWrap:'wrap' }}>
          {['Templates', 'Pricing', 'Privacy', 'Terms', 'Contact'].map(l => (
            <a key={l} href="#" style={{ color:'#94a3b8', textDecoration:'none' }}>{l}</a>
          ))}
        </div>
        <div>© 2025 ResumeForge. All rights reserved.</div>
      </footer>
    </div>
  )
}
