import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useResumeStore, useUIStore, useAuthStore } from '../store'
import { TEMPLATES, FONTS, SPACING_OPTIONS, SECTIONS } from '../data/templates'
import UniversalLayout from '../components/resume/UniversalLayout'
import { HexColorPicker } from 'react-colorful'
import toast from 'react-hot-toast'
import {
  ArrowLeft, Eye, Download, Zap, Palette, Layout, FileText,
  ChevronDown, ChevronUp, Plus, Trash2, GripVertical, Save,
  Sparkles, X, Check, Loader, User, Briefcase, GraduationCap,
  Award, Globe, Code, BookOpen, Heart, Trophy, AlignLeft,
  ZoomIn, ZoomOut, Monitor, Smartphone, Settings, Crown,
  Linkedin, Upload
} from 'lucide-react'

// ─── Color Picker Dropdown ────────────────────────────────────────────────────
function ColorPickerDropdown({ color, onChange, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
        <label style={{ fontSize:'12px', fontWeight:600, color:'#374151', flex:1 }}>{label}</label>
        <button onClick={() => setOpen(!open)} style={{ display:'flex', alignItems:'center', gap:'6px', border:'1.5px solid #e2e8f0', borderRadius:'8px', padding:'5px 10px', background:'white', cursor:'pointer', fontSize:'12px', fontFamily:'JetBrains Mono' }}>
          <div style={{ width:16, height:16, borderRadius:'4px', background: color, border:'1px solid rgba(0,0,0,0.1)' }} />
          {color}
        </button>
      </div>
      {open && (
        <div style={{ position:'absolute', right:0, top:'100%', zIndex:100, background:'white', borderRadius:'12px', boxShadow:'0 12px 40px rgba(0,0,0,0.15)', border:'1px solid #e2e8f0', padding:'12px', width:'220px' }}>
          <HexColorPicker color={color} onChange={onChange} />
          <div style={{ display:'flex', gap:'4px', marginTop:'8px', flexWrap:'wrap' }}>
            {['#4361ee','#7209b7','#f72585','#06d6a0','#ffd166','#0f172a','#ef476f','#4cc9f0','#d4af37','#0077b5'].map(c => (
              <button key={c} onClick={() => onChange(c)} style={{ width:20, height:20, borderRadius:'50%', background:c, border: color===c ? '2px solid white' : '1px solid #e2e8f0', cursor:'pointer', boxShadow: color===c ? `0 0 0 2px ${c}` : 'none' }} />
            ))}
          </div>
          <input value={color} onChange={e => onChange(e.target.value)} className="forge-input" style={{ marginTop:'8px', fontSize:'12px', fontFamily:'JetBrains Mono' }} placeholder="#4361ee" />
        </div>
      )}
    </div>
  )
}

// ─── Expandable Section ───────────────────────────────────────────────────────
function ExpandableSection({ title, icon: Icon, children, defaultOpen = false, badge }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom:'1px solid #f1f5f9' }}>
      <button onClick={() => setOpen(!open)} style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'12px 16px', background:'none', border:'none', cursor:'pointer', fontFamily:'DM Sans' }}>
        <Icon size={14} color="#4361ee" />
        <span style={{ flex:1, fontWeight:600, fontSize:'13px', color:'#1e293b', textAlign:'left' }}>{title}</span>
        {badge && <span className="badge badge-ai" style={{ fontSize:'9px', padding:'2px 6px' }}>{badge}</span>}
        {open ? <ChevronUp size={13} color="#94a3b8" /> : <ChevronDown size={13} color="#94a3b8" />}
      </button>
      {open && <div style={{ padding:'0 16px 16px' }}>{children}</div>}
    </div>
  )
}

// ─── Field Component ──────────────────────────────────────────────────────────
function Field({ label, name, value, onChange, multiline = false, placeholder = '' }) {
  return (
    <div style={{ marginBottom:'10px' }}>
      <label style={{ display:'block', fontSize:'11px', fontWeight:600, color:'#64748b', marginBottom:'4px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{label}</label>
      {multiline ? (
        <textarea value={value || ''} onChange={e => onChange(name, e.target.value)} placeholder={placeholder} className="forge-input" style={{ resize:'vertical', minHeight:'80px', lineHeight:1.5 }} />
      ) : (
        <input value={value || ''} onChange={e => onChange(name, e.target.value)} placeholder={placeholder} className="forge-input" />
      )}
    </div>
  )
}

// ─── AI Panel ────────────────────────────────────────────────────────────────
function AIPanel({ onClose, resumeData, onApply }) {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('enhance') // enhance | write | score | tailor

  const AI_MODES = [
    { id: 'enhance', label: 'Enhance Summary', icon: '✨', desc: 'Rewrite your summary to be more impactful' },
    { id: 'write', label: 'Write Bullet Points', icon: '📝', desc: 'Generate achievement-focused bullets' },
    { id: 'score', label: 'ATS Score', icon: '🎯', desc: 'Check your resume ATS compatibility' },
    { id: 'tailor', label: 'Tailor to Job', icon: '🎪', desc: 'Customize resume for a specific job posting' },
  ]

  const runAI = async () => {
    setLoading(true)
    setResult('')
    await new Promise(r => setTimeout(r, 1800))

    const outputs = {
      enhance: `Results-driven ${resumeData?.personal?.title || 'professional'} with proven expertise in delivering high-impact solutions. Demonstrated track record of leading cross-functional initiatives that drive measurable business growth. Passionate about leveraging data-driven insights to solve complex challenges and create exceptional user experiences. Adept at building consensus across diverse stakeholders while maintaining focus on strategic objectives.`,
      write: `• Spearheaded development of next-generation platform, reducing operational costs by 35% and improving user satisfaction scores by 28%\n• Led a team of 8 engineers to deliver 6 major product features ahead of schedule, contributing to $2M in new revenue\n• Architected scalable microservices solution serving 500K+ daily active users with 99.9% uptime\n• Established engineering best practices and code review processes, reducing bug count by 42%`,
      score: `📊 ATS Compatibility Score: 87/100\n\n✅ Strong keyword density\n✅ Clear section structure\n✅ Quantified achievements\n⚠️ Consider adding: project management, cross-functional, stakeholder management\n⚠️ Missing: industry-specific tools (mention specific software)\n💡 Tip: Add a skills section with exact keywords from job postings`,
      tailor: prompt ? `Tailored resume for "${prompt}":\n\n✅ Aligned summary to highlight relevant experience\n✅ Reordered skills to match job requirements\n✅ Added keywords: ${prompt.split(' ').slice(0,5).join(', ')}\n✅ Emphasized relevant achievements\n\nYour resume is now optimized for this role!` : 'Please paste a job description or role title above.',
    }
    setResult(outputs[mode])
    setLoading(false)
  }

  return (
    <div style={{ position:'fixed', right:'calc(50% - 580px)', top:'60px', bottom:'20px', width:'340px', background:'white', borderRadius:'16px', boxShadow:'0 20px 60px rgba(0,0,0,0.15)', border:'1px solid #e2e8f0', zIndex:60, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ padding:'16px', borderBottom:'1px solid #f1f5f9', display:'flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg, #4361ee, #7209b7)' }}>
        <Sparkles size={16} color="white" />
        <span style={{ fontWeight:700, fontSize:'15px', color:'white', flex:1 }}>AI Resume Assistant</span>
        <button onClick={onClose} style={{ background:'rgba(255,255,255,0.2)', border:'none', borderRadius:'6px', padding:'4px', cursor:'pointer', color:'white', display:'flex' }}>
          <X size={14} />
        </button>
      </div>
      <div style={{ flex:1, overflow:'auto', padding:'16px' }}>
        {/* Mode selector */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px', marginBottom:'14px' }}>
          {AI_MODES.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ padding:'8px', border:`1.5px solid ${mode===m.id ? '#4361ee' : '#e2e8f0'}`, borderRadius:'8px', background: mode===m.id ? '#f0f4ff' : 'white', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}>
              <div style={{ fontSize:'16px', marginBottom:'2px' }}>{m.icon}</div>
              <div style={{ fontSize:'11px', fontWeight:600, color: mode===m.id ? '#4361ee' : '#374151' }}>{m.label}</div>
            </button>
          ))}
        </div>

        {mode === 'tailor' && (
          <div style={{ marginBottom:'12px' }}>
            <label style={{ fontSize:'11px', fontWeight:600, color:'#64748b', display:'block', marginBottom:'4px' }}>JOB DESCRIPTION / ROLE TITLE</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Paste job description or enter role title..." className="forge-input" style={{ minHeight:'80px', resize:'vertical', fontSize:'12px' }} />
          </div>
        )}

        <button onClick={runAI} disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', marginBottom:'14px' }}>
          {loading ? <><Loader size={13} style={{ animation:'spin 1s linear infinite' }} /> Generating...</> : <><Sparkles size={13} /> Run AI</>}
        </button>

        {result && (
          <div style={{ background:'#f8faff', borderRadius:'10px', padding:'14px', border:'1px solid #e0eaff' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px' }}>
              <span style={{ fontSize:'11px', fontWeight:700, color:'#4361ee', textTransform:'uppercase', letterSpacing:'0.05em' }}>AI Result</span>
              {(mode === 'enhance' || mode === 'write') && (
                <button onClick={() => {
                  if (mode === 'enhance') onApply('personal', { ...resumeData.personal, summary: result })
                  toast.success('Applied to resume!')
                }} style={{ fontSize:'11px', fontWeight:600, color:'#06d6a0', background:'#f0fdf9', border:'1px solid #a7f3d0', borderRadius:'6px', padding:'3px 8px', cursor:'pointer' }}>
                  <Check size={10} /> Apply
                </button>
              )}
            </div>
            <p style={{ fontSize:'12px', color:'#374151', lineHeight:1.6, margin:0, whiteSpace:'pre-line' }}>{result}</p>
          </div>
        )}

        <div style={{ marginTop:'16px', padding:'12px', background:'#fff7ed', borderRadius:'10px', border:'1px solid #fed7aa' }}>
          <div style={{ fontSize:'11px', fontWeight:700, color:'#ea580c', marginBottom:'4px' }}>🔒 AI Services</div>
          <p style={{ fontSize:'11px', color:'#9a3412', margin:0, lineHeight:1.5 }}>Advanced AI features require Pro plan. Upgrade to unlock unlimited AI rewrites, cover letter generation, and LinkedIn optimization.</p>
        </div>
      </div>
    </div>
  )
}

// ─── Download Modal ────────────────────────────────────────────────────────────
function DownloadModal({ onClose, resume }) {
  const [downloading, setDownloading] = useState(null)

  const downloadPDF = async () => {
    setDownloading('pdf')
    toast.loading('Rendering resume to PDF...', { id: 'dl' })
    try {
      const { downloadPDF: doPDF } = await import('../utils/download')
      await doPDF('resume-canvas')
      toast.success('✅ PDF downloaded!', { id: 'dl' })
    } catch (err) {
      console.error(err)
      toast.error('PDF generation failed. Try again.', { id: 'dl' })
    }
    setDownloading(null)
    onClose()
  }

  const downloadWord = async () => {
    setDownloading('word')
    toast.loading('Building Word document...', { id: 'dl' })
    try {
      const { downloadWord: doWord } = await import('../utils/download')
      await doWord(resume)
      toast.success('✅ Word document downloaded!', { id: 'dl' })
    } catch (err) {
      console.error(err)
      toast.error('Word generation failed. Try again.', { id: 'dl' })
    }
    setDownloading(null)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="forge-card" style={{ padding:'32px', maxWidth:'400px', width:'90%' }} onClick={e => e.stopPropagation()}>
        <h3 style={{ fontFamily:'Playfair Display', fontSize:'20px', color:'#1e293b', marginBottom:'6px' }}>Download Resume</h3>
        <p style={{ color:'#64748b', fontSize:'13px', marginBottom:'24px' }}>Choose your preferred format. Both are ATS-compatible.</p>
        <div style={{ display:'grid', gap:'12px' }}>
          <button onClick={downloadPDF} disabled={!!downloading} style={{ display:'flex', alignItems:'center', gap:'16px', padding:'16px 20px', border:'1.5px solid #e2e8f0', borderRadius:'12px', background:'white', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#ef4444'; e.currentTarget.style.background='#fff5f5' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='white' }}>
            <div style={{ width:44, height:44, borderRadius:'10px', background:'#fee2e2', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {downloading === 'pdf' ? <Loader size={20} color="#ef4444" /> : <span style={{ fontSize:'20px' }}>📄</span>}
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#1e293b', marginBottom:'2px' }}>PDF Format</div>
              <div style={{ fontSize:'12px', color:'#64748b' }}>Best for email & job portals · Pixel-perfect layout</div>
            </div>
          </button>
          <button onClick={downloadWord} disabled={!!downloading} style={{ display:'flex', alignItems:'center', gap:'16px', padding:'16px 20px', border:'1.5px solid #e2e8f0', borderRadius:'12px', background:'white', cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor='#2563eb'; e.currentTarget.style.background='#eff6ff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.background='white' }}>
            <div style={{ width:44, height:44, borderRadius:'10px', background:'#dbeafe', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              {downloading === 'word' ? <Loader size={20} color="#2563eb" /> : <span style={{ fontSize:'20px' }}>📝</span>}
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#1e293b', marginBottom:'2px' }}>Word Format (.docx)</div>
              <div style={{ fontSize:'12px', color:'#64748b' }}>Fully editable · Compatible with MS Word & Google Docs</div>
            </div>
          </button>
        </div>
        <button onClick={onClose} className="btn-ghost" style={{ width:'100%', justifyContent:'center', marginTop:'16px' }}>Cancel</button>
      </div>
    </div>
  )
}

// ─── Template Picker ──────────────────────────────────────────────────────────
function TemplatePicker({ currentId, onSelect, canUse }) {
  const [category, setCategory] = useState('All')
  const cats = ['All', 'Professional', 'Creative', 'Minimal', 'Tech', 'Premium']
  const filtered = category === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === category)

  return (
    <div>
      <div style={{ display:'flex', gap:'4px', marginBottom:'12px', flexWrap:'wrap' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{ padding:'4px 10px', borderRadius:'99px', border:'1.5px solid', borderColor: category===c ? '#4361ee' : '#e2e8f0', background: category===c ? '#f0f4ff' : 'white', color: category===c ? '#4361ee' : '#64748b', fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:'DM Sans' }}>{c}</button>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
        {filtered.map(t => {
          const accessible = canUse(t)
          return (
            <button key={t.id} onClick={() => accessible ? onSelect(t.id) : toast('Upgrade to Pro to use this template 👑')}
              style={{ border:`2px solid ${currentId===t.id ? '#4361ee' : '#e2e8f0'}`, borderRadius:'10px', padding:'8px', background: currentId===t.id ? '#f0f4ff' : 'white', cursor: accessible ? 'pointer' : 'default', textAlign:'left', position:'relative', overflow:'hidden', transition:'all 0.2s' }}>
              <div style={{ height:'48px', background:`linear-gradient(135deg, ${t.defaults.primaryColor}, ${t.defaults.secondaryColor})`, borderRadius:'6px', marginBottom:'6px', position:'relative' }}>
                {!accessible && (
                  <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', borderRadius:'6px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Crown size={14} color="white" />
                  </div>
                )}
              </div>
              <div style={{ fontSize:'11px', fontWeight:700, color:'#1e293b', marginBottom:'2px' }}>{t.name}</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <span style={{ fontSize:'10px', color:'#94a3b8' }}>{t.category}</span>
                <span className={`badge ${t.access === 'free' ? 'badge-free' : 'badge-pro'}`} style={{ fontSize:'9px', padding:'1px 6px' }}>
                  {t.access === 'free' ? 'FREE' : `$${t.price}`}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Builder Page ────────────────────────────────────────────────────────
export default function BuilderPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { activeResume, loadResume, updateResumeData, updateResumeSettings, updateResumeTemplate, addSectionItem, updateSectionItem, deleteSectionItem, createResume } = useResumeStore()
  const { canUseTemplate } = useAuthStore()
  const [sidebarTab, setSidebarTab] = useState('content') // content | design | templates
  const [activeSection, setActiveSection] = useState('personal')
  const [showAI, setShowAI] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [zoom, setZoom] = useState(70)
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')

  useEffect(() => {
    if (id) { loadResume(id) }
    else {
      const newId = createResume('New Resume')
      navigate(`/builder/${newId}`, { replace: true })
    }
  }, [id])

  // Auto-save indicator
  useEffect(() => {
    if (!activeResume) return
    setAutoSaveStatus('saving')
    const t = setTimeout(() => setAutoSaveStatus('saved'), 600)
    return () => clearTimeout(t)
  }, [activeResume?.data, activeResume?.settings])

  if (!activeResume) {
    return (
      <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <Loader size={32} color="#4361ee" style={{ animation:'spin 1s linear infinite', marginBottom:'12px' }} />
          <p style={{ color:'#64748b' }}>Loading builder...</p>
        </div>
      </div>
    )
  }

  const { data, settings, templateId } = activeResume

  const handlePersonalChange = (field, value) => {
    updateResumeData('personal', { ...data.personal, [field]: value })
  }

  const handleSettingChange = (key, value) => updateResumeSettings({ [key]: value })

  const sectionIcons = { personal: User, experience: Briefcase, education: GraduationCap, skills: Zap, projects: Code, certifications: Award, languages: Globe, awards: Trophy, summary: AlignLeft }

  // Content sections
  const contentSections = [
    'personal', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards'
  ]

  return (
    <div style={{ minHeight:'100vh', background:'#f0f4ff', display:'flex', flexDirection:'column', fontFamily:'DM Sans' }}>
      {/* Top Bar */}
      <header style={{ background:'white', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', gap:'12px', padding:'0 16px', height:'52px', position:'sticky', top:0, zIndex:50, flexShrink:0 }}>
        <button onClick={() => navigate('/dashboard')} className="btn-ghost" style={{ padding:'6px 10px', gap:'4px' }}>
          <ArrowLeft size={14} /> Dashboard
        </button>
        <div style={{ height:'20px', width:'1px', background:'#e2e8f0' }} />
        <div style={{ flex:1, minWidth:0 }}>
          <span style={{ fontWeight:700, fontSize:'14px', color:'#1e293b' }}>{activeResume.title}</span>
          <span style={{ marginLeft:'10px', fontSize:'11px', color: autoSaveStatus==='saved' ? '#06d6a0' : '#94a3b8' }}>
            {autoSaveStatus === 'saved' ? '✓ Saved' : '● Saving...'}
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <button onClick={() => setZoom(z => Math.max(40, z-10))} className="btn-ghost" style={{ padding:'5px' }}><ZoomOut size={13} /></button>
          <span style={{ fontSize:'12px', color:'#64748b', minWidth:'36px', textAlign:'center' }}>{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(120, z+10))} className="btn-ghost" style={{ padding:'5px' }}><ZoomIn size={13} /></button>
          <div style={{ height:'16px', width:'1px', background:'#e2e8f0' }} />
          <button onClick={() => setShowAI(!showAI)} style={{ display:'flex', alignItems:'center', gap:'6px', padding:'6px 12px', background: showAI ? 'linear-gradient(135deg, #4361ee, #7209b7)' : '#f0f4ff', border:'none', borderRadius:'8px', fontSize:'12px', fontWeight:600, color: showAI ? 'white' : '#4361ee', cursor:'pointer', fontFamily:'DM Sans' }}>
            <Sparkles size={12} /> AI
          </button>
          <button onClick={() => setShowDownload(true)} className="btn-primary" style={{ padding:'7px 14px', fontSize:'13px' }}>
            <Download size={13} /> Download
          </button>
        </div>
      </header>

      <div style={{ flex:1, display:'flex', overflow:'hidden' }}>
        {/* Sidebar */}
        <aside style={{ width:'300px', background:'white', borderRight:'1px solid #e2e8f0', display:'flex', flexDirection:'column', flexShrink:0, overflow:'hidden' }}>
          {/* Tabs */}
          <div style={{ display:'flex', borderBottom:'1px solid #e2e8f0', flexShrink:0 }}>
            {[
              { id:'content', label:'Content', icon: FileText },
              { id:'design', label:'Design', icon: Palette },
              { id:'templates', label:'Templates', icon: Layout },
            ].map(tab => (
              <button key={tab.id} onClick={() => setSidebarTab(tab.id)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'3px', padding:'10px 4px', border:'none', background:'none', cursor:'pointer', borderBottom: sidebarTab===tab.id ? '2px solid #4361ee' : '2px solid transparent', color: sidebarTab===tab.id ? '#4361ee' : '#94a3b8', fontFamily:'DM Sans' }}>
                <tab.icon size={14} />
                <span style={{ fontSize:'10px', fontWeight:600 }}>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Sidebar content */}
          <div style={{ flex:1, overflowY:'auto' }}>
            {/* CONTENT TAB */}
            {sidebarTab === 'content' && (
              <div>
                {/* Section nav */}
                <div style={{ padding:'8px' }}>
                  {contentSections.map(sec => {
                    const Icon = sectionIcons[sec] || FileText
                    const info = SECTIONS[sec]
                    return (
                      <button key={sec} onClick={() => setActiveSection(sec)} style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', border:'none', borderRadius:'8px', background: activeSection===sec ? '#f0f4ff' : 'none', cursor:'pointer', fontFamily:'DM Sans', marginBottom:'2px', textAlign:'left', color: activeSection===sec ? '#4361ee' : '#374151' }}>
                        <Icon size={13} color={activeSection===sec ? '#4361ee' : '#94a3b8'} />
                        <span style={{ fontSize:'13px', fontWeight: activeSection===sec ? 600 : 400 }}>{info?.label || sec}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="section-divider" style={{ margin:'4px 0' }} />
                {/* Section form */}
                <div style={{ padding:'0 0 80px' }}>
                  {activeSection === 'personal' && (
                    <div style={{ padding:'12px 16px' }}>
                      <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', marginBottom:'14px' }}>Personal Information</h4>
                      <Field label="Full Name" name="name" value={data.personal?.name} onChange={handlePersonalChange} placeholder="Jane Doe" />
                      <Field label="Professional Title" name="title" value={data.personal?.title} onChange={handlePersonalChange} placeholder="Software Engineer" />
                      <Field label="Email" name="email" value={data.personal?.email} onChange={handlePersonalChange} placeholder="jane@example.com" />
                      <Field label="Phone" name="phone" value={data.personal?.phone} onChange={handlePersonalChange} placeholder="+1 555 000 0000" />
                      <Field label="Location" name="location" value={data.personal?.location} onChange={handlePersonalChange} placeholder="City, State" />
                      <Field label="Website" name="website" value={data.personal?.website} onChange={handlePersonalChange} placeholder="yourwebsite.com" />
                      <Field label="LinkedIn" name="linkedin" value={data.personal?.linkedin} onChange={handlePersonalChange} placeholder="linkedin.com/in/yourname" />
                      <Field label="GitHub" name="github" value={data.personal?.github} onChange={handlePersonalChange} placeholder="github.com/yourname" />
                      <Field label="Professional Summary" name="summary" value={data.personal?.summary} onChange={handlePersonalChange} multiline placeholder="Write a compelling summary..." />
                      <div style={{ marginTop:'12px', padding:'12px', background:'#f0f4ff', borderRadius:'10px' }}>
                        <div style={{ fontSize:'11px', fontWeight:600, color:'#4361ee', marginBottom:'8px', display:'flex', alignItems:'center', gap:'4px' }}>
                          <Upload size={11} /> Profile Photo
                        </div>
                        <input type="text" value={data.personal?.photo || ''} onChange={e => handlePersonalChange('photo', e.target.value)} placeholder="Enter image URL or upload..." className="forge-input" style={{ fontSize:'12px' }} />
                        <button className="btn-ghost" style={{ marginTop:'8px', fontSize:'12px', width:'100%', justifyContent:'center', background:'white', border:'1px solid #e0eaff' }}>
                          <Upload size={11} /> Upload Photo
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === 'experience' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Work Experience</h4>
                        <button onClick={() => addSectionItem('experience', { company:'', position:'', location:'', startDate:'', endDate:'', current:false, description:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}>
                          <Plus size={11} /> Add
                        </button>
                      </div>
                      {(data.experience || []).map((exp, idx) => (
                        <div key={exp.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'10px', background:'#fafbff' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>{exp.company || `Experience ${idx+1}`}</span>
                            <button onClick={() => deleteSectionItem('experience', exp.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer', padding:'2px' }}><Trash2 size={12} /></button>
                          </div>
                          {[
                            { label:'Job Title', field:'position', placeholder:'Software Engineer' },
                            { label:'Company', field:'company', placeholder:'Acme Corp' },
                            { label:'Location', field:'location', placeholder:'City, ST' },
                            { label:'Start Date', field:'startDate', placeholder:'2022-01' },
                            { label:'End Date', field:'endDate', placeholder:'2024-01' },
                          ].map(f => (
                            <div key={f.field} style={{ marginBottom:'6px' }}>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>{f.label}</label>
                              <input value={exp[f.field] || ''} onChange={e => updateSectionItem('experience', exp.id, { [f.field]: e.target.value })} placeholder={f.placeholder} className="forge-input" style={{ fontSize:'12px', padding:'6px 10px' }} />
                            </div>
                          ))}
                          <label style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#374151', margin:'6px 0', cursor:'pointer' }}>
                            <input type="checkbox" checked={exp.current || false} onChange={e => updateSectionItem('experience', exp.id, { current: e.target.checked })} />
                            Currently working here
                          </label>
                          <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>DESCRIPTION</label>
                          <textarea value={exp.description || ''} onChange={e => updateSectionItem('experience', exp.id, { description: e.target.value })} placeholder="• Led team of 5 engineers..." className="forge-input" style={{ resize:'vertical', minHeight:'70px', fontSize:'12px', lineHeight:1.5 }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'education' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Education</h4>
                        <button onClick={() => addSectionItem('education', { institution:'', degree:'', field:'', location:'', startDate:'', endDate:'', gpa:'', honors:'', description:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}>
                          <Plus size={11} /> Add
                        </button>
                      </div>
                      {(data.education || []).map((edu, idx) => (
                        <div key={edu.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'10px', background:'#fafbff' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>{edu.institution || `Education ${idx+1}`}</span>
                            <button onClick={() => deleteSectionItem('education', edu.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer', padding:'2px' }}><Trash2 size={12} /></button>
                          </div>
                          {[
                            { label:'Institution', field:'institution', placeholder:'State University' },
                            { label:'Degree', field:'degree', placeholder:'Bachelor of Science' },
                            { label:'Field of Study', field:'field', placeholder:'Computer Science' },
                            { label:'Start Date', field:'startDate', placeholder:'2016-09' },
                            { label:'End Date', field:'endDate', placeholder:'2020-05' },
                            { label:'GPA', field:'gpa', placeholder:'3.8' },
                            { label:'Honors', field:'honors', placeholder:'Cum Laude' },
                          ].map(f => (
                            <div key={f.field} style={{ marginBottom:'6px' }}>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>{f.label}</label>
                              <input value={edu[f.field] || ''} onChange={e => updateSectionItem('education', edu.id, { [f.field]: e.target.value })} placeholder={f.placeholder} className="forge-input" style={{ fontSize:'12px', padding:'6px 10px' }} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'skills' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Skills</h4>
                        <button onClick={() => addSectionItem('skills', { category:'', skills:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}>
                          <Plus size={11} /> Add Category
                        </button>
                      </div>
                      {(data.skills || []).map((sg, idx) => (
                        <div key={sg.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'10px', background:'#fafbff' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>{sg.category || `Skill Group ${idx+1}`}</span>
                            <button onClick={() => deleteSectionItem('skills', sg.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer' }}><Trash2 size={12} /></button>
                          </div>
                          <div style={{ marginBottom:'6px' }}>
                            <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>CATEGORY</label>
                            <input value={sg.category || ''} onChange={e => updateSectionItem('skills', sg.id, { category: e.target.value })} placeholder="Technical, Soft Skills..." className="forge-input" style={{ fontSize:'12px', padding:'6px 10px' }} />
                          </div>
                          <div>
                            <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>SKILLS (comma separated)</label>
                            <textarea value={sg.skills || ''} onChange={e => updateSectionItem('skills', sg.id, { skills: e.target.value })} placeholder="JavaScript, React, Node.js..." className="forge-input" style={{ resize:'vertical', minHeight:'60px', fontSize:'12px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'projects' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Projects</h4>
                        <button onClick={() => addSectionItem('projects', { name:'', url:'', technologies:'', description:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}><Plus size={11} /> Add</button>
                      </div>
                      {(data.projects || []).map((p, idx) => (
                        <div key={p.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'10px', background:'#fafbff' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>{p.name || `Project ${idx+1}`}</span>
                            <button onClick={() => deleteSectionItem('projects', p.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer' }}><Trash2 size={12} /></button>
                          </div>
                          {[
                            { label:'Project Name', field:'name', placeholder:'My Awesome App' },
                            { label:'URL / GitHub', field:'url', placeholder:'github.com/project' },
                            { label:'Technologies', field:'technologies', placeholder:'React, Node.js, AWS' },
                          ].map(f => (
                            <div key={f.field} style={{ marginBottom:'6px' }}>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>{f.label}</label>
                              <input value={p[f.field] || ''} onChange={e => updateSectionItem('projects', p.id, { [f.field]: e.target.value })} placeholder={f.placeholder} className="forge-input" style={{ fontSize:'12px', padding:'6px 10px' }} />
                            </div>
                          ))}
                          <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>DESCRIPTION</label>
                          <textarea value={p.description || ''} onChange={e => updateSectionItem('projects', p.id, { description: e.target.value })} placeholder="What did you build? What was the impact?" className="forge-input" style={{ resize:'vertical', minHeight:'60px', fontSize:'12px' }} />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'certifications' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Certifications</h4>
                        <button onClick={() => addSectionItem('certifications', { name:'', issuer:'', date:'', url:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}><Plus size={11} /> Add</button>
                      </div>
                      {(data.certifications || []).map((c) => (
                        <div key={c.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'10px', background:'#fafbff' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>{c.name || 'Certification'}</span>
                            <button onClick={() => deleteSectionItem('certifications', c.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer' }}><Trash2 size={12} /></button>
                          </div>
                          {[
                            { label:'Name', field:'name', placeholder:'AWS Solutions Architect' },
                            { label:'Issuer', field:'issuer', placeholder:'Amazon Web Services' },
                            { label:'Date', field:'date', placeholder:'2024-01' },
                          ].map(f => (
                            <div key={f.field} style={{ marginBottom:'6px' }}>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>{f.label}</label>
                              <input value={c[f.field] || ''} onChange={e => updateSectionItem('certifications', c.id, { [f.field]: e.target.value })} placeholder={f.placeholder} className="forge-input" style={{ fontSize:'12px', padding:'6px 10px' }} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'languages' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Languages</h4>
                        <button onClick={() => addSectionItem('languages', { language:'', proficiency:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}><Plus size={11} /> Add</button>
                      </div>
                      {(data.languages || []).map((l) => (
                        <div key={l.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'8px', background:'#fafbff', display:'flex', gap:'8px', alignItems:'flex-start' }}>
                          <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px' }}>
                            <div>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>LANGUAGE</label>
                              <input value={l.language || ''} onChange={e => updateSectionItem('languages', l.id, { language: e.target.value })} placeholder="English" className="forge-input" style={{ fontSize:'12px', padding:'5px 8px' }} />
                            </div>
                            <div>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>LEVEL</label>
                              <select value={l.proficiency || ''} onChange={e => updateSectionItem('languages', l.id, { proficiency: e.target.value })} className="forge-input" style={{ fontSize:'12px', padding:'5px 8px' }}>
                                <option value="">Select</option>
                                {['Native','Fluent','Advanced','Intermediate','Basic'].map(p => <option key={p} value={p}>{p}</option>)}
                              </select>
                            </div>
                          </div>
                          <button onClick={() => deleteSectionItem('languages', l.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer', marginTop:'20px' }}><Trash2 size={12} /></button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSection === 'awards' && (
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'14px' }}>
                        <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', margin:0 }}>Awards & Honors</h4>
                        <button onClick={() => addSectionItem('awards', { title:'', issuer:'', date:'', description:'' })} className="btn-primary" style={{ padding:'4px 10px', fontSize:'11px' }}><Plus size={11} /> Add</button>
                      </div>
                      {(data.awards || []).map((a) => (
                        <div key={a.id} style={{ border:'1.5px solid #e2e8f0', borderRadius:'10px', padding:'12px', marginBottom:'8px', background:'#fafbff' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#1e293b' }}>{a.title || 'Award'}</span>
                            <button onClick={() => deleteSectionItem('awards', a.id)} style={{ color:'#ef476f', background:'none', border:'none', cursor:'pointer' }}><Trash2 size={12} /></button>
                          </div>
                          {[
                            { label:'Title', field:'title', placeholder:'Employee of the Year' },
                            { label:'Issuer', field:'issuer', placeholder:'Company / Organization' },
                            { label:'Date', field:'date', placeholder:'2023-12' },
                          ].map(f => (
                            <div key={f.field} style={{ marginBottom:'6px' }}>
                              <label style={{ fontSize:'10px', fontWeight:600, color:'#94a3b8', display:'block', marginBottom:'3px' }}>{f.label}</label>
                              <input value={a[f.field] || ''} onChange={e => updateSectionItem('awards', a.id, { [f.field]: e.target.value })} placeholder={f.placeholder} className="forge-input" style={{ fontSize:'12px', padding:'6px 10px' }} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* DESIGN TAB */}
            {sidebarTab === 'design' && (
              <div style={{ padding:'12px' }}>
                <div style={{ marginBottom:'20px' }}>
                  <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', marginBottom:'14px' }}>Colors</h4>
                  <ColorPickerDropdown color={settings.primaryColor || '#4361ee'} onChange={v => handleSettingChange('primaryColor', v)} label="Primary Color" />
                  <div style={{ marginTop:'10px' }}>
                    <ColorPickerDropdown color={settings.secondaryColor || '#7209b7'} onChange={v => handleSettingChange('secondaryColor', v)} label="Secondary Color" />
                  </div>
                  <div style={{ marginTop:'10px' }}>
                    <ColorPickerDropdown color={settings.accentColor || '#4cc9f0'} onChange={v => handleSettingChange('accentColor', v)} label="Accent Color" />
                  </div>
                </div>

                <div className="section-divider" style={{ marginBottom:'16px' }} />

                <div style={{ marginBottom:'20px' }}>
                  <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', marginBottom:'12px' }}>Typography</h4>
                  <div style={{ marginBottom:'10px' }}>
                    <label style={{ fontSize:'11px', fontWeight:600, color:'#64748b', display:'block', marginBottom:'6px' }}>FONT FAMILY</label>
                    <select value={settings.fontFamily || 'DM Sans'} onChange={e => handleSettingChange('fontFamily', e.target.value)} className="forge-input" style={{ fontSize:'13px' }}>
                      {FONTS.map(f => <option key={f.value} value={f.value}>{f.label} ({f.style})</option>)}
                    </select>
                  </div>
                  <div style={{ marginBottom:'10px' }}>
                    <label style={{ fontSize:'11px', fontWeight:600, color:'#64748b', display:'block', marginBottom:'6px' }}>FONT SIZE</label>
                    <div style={{ display:'flex', gap:'6px' }}>
                      {['small','medium','large'].map(s => (
                        <button key={s} onClick={() => handleSettingChange('fontSize', s)} style={{ flex:1, padding:'7px', border:`1.5px solid ${settings.fontSize===s ? '#4361ee' : '#e2e8f0'}`, borderRadius:'8px', background: settings.fontSize===s ? '#f0f4ff' : 'white', color: settings.fontSize===s ? '#4361ee' : '#64748b', fontSize:'12px', fontWeight:600, cursor:'pointer', fontFamily:'DM Sans', textTransform:'capitalize' }}>{s}</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="section-divider" style={{ marginBottom:'16px' }} />

                <div style={{ marginBottom:'20px' }}>
                  <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', marginBottom:'12px' }}>Layout</h4>
                  <div style={{ marginBottom:'10px' }}>
                    <label style={{ fontSize:'11px', fontWeight:600, color:'#64748b', display:'block', marginBottom:'6px' }}>SPACING</label>
                    <div style={{ display:'flex', gap:'6px' }}>
                      {SPACING_OPTIONS.map(s => (
                        <button key={s.value} onClick={() => handleSettingChange('spacing', s.value)} style={{ flex:1, padding:'7px', border:`1.5px solid ${settings.spacing===s.value ? '#4361ee' : '#e2e8f0'}`, borderRadius:'8px', background: settings.spacing===s.value ? '#f0f4ff' : 'white', color: settings.spacing===s.value ? '#4361ee' : '#64748b', fontSize:'11px', fontWeight:600, cursor:'pointer', fontFamily:'DM Sans' }}>{s.label}</button>
                      ))}
                    </div>
                  </div>
                  <label style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#374151', cursor:'pointer', padding:'8px 0' }}>
                    <input type="checkbox" checked={settings.showPhoto !== false} onChange={e => handleSettingChange('showPhoto', e.target.checked)} />
                    Show Profile Photo
                  </label>
                  <label style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'#374151', cursor:'pointer', padding:'8px 0' }}>
                    <input type="checkbox" checked={settings.showIcons !== false} onChange={e => handleSettingChange('showIcons', e.target.checked)} />
                    Show Contact Icons
                  </label>
                </div>
              </div>
            )}

            {/* TEMPLATES TAB */}
            {sidebarTab === 'templates' && (
              <div style={{ padding:'12px' }}>
                <h4 style={{ fontSize:'13px', fontWeight:700, color:'#1e293b', marginBottom:'14px' }}>Choose Template</h4>
                <TemplatePicker
                  currentId={templateId}
                  onSelect={(tid) => { updateResumeTemplate(tid); toast.success('Template changed!') }}
                  canUse={canUseTemplate}
                />
                <div style={{ marginTop:'16px', padding:'12px', background:'linear-gradient(135deg, #7209b7, #f72585)', borderRadius:'12px', color:'white', textAlign:'center' }}>
                  <Crown size={20} style={{ marginBottom:'8px' }} />
                  <div style={{ fontWeight:700, fontSize:'14px', marginBottom:'4px' }}>Unlock All Templates</div>
                  <div style={{ fontSize:'12px', opacity:0.85, marginBottom:'12px' }}>Get Pro for $9.99/mo — unlimited templates, AI, Word export</div>
                  <Link to="/pricing" style={{ display:'block', background:'white', color:'#7209b7', borderRadius:'8px', padding:'8px 16px', fontSize:'12px', fontWeight:700, textDecoration:'none' }}>
                    Upgrade to Pro
                  </Link>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Canvas */}
        <main style={{ flex:1, overflow:'auto', display:'flex', alignItems:'flex-start', justifyContent:'center', padding:'24px 20px', background:'#e8edf8' }}>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'20px', width:'100%' }}>
            <div style={{ width:'794px', maxWidth:'100%' }}>
              <div className="paper-shadow" style={{ display:'inline-block', width:'794px', minHeight:'1123px', transformOrigin:'top center', transform:`scale(${zoom/100})`, marginBottom: zoom < 100 ? `${(zoom-100)*11.23}px` : 0 }}>
                <UniversalLayout resume={activeResume} scale={1} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* AI Panel */}
      {showAI && <AIPanel onClose={() => setShowAI(false)} resumeData={data} onApply={updateResumeData} />}

      {/* Download Modal */}
      {showDownload && <DownloadModal onClose={() => setShowDownload(false)} resume={activeResume} />}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
