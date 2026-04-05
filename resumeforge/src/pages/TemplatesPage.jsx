import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TEMPLATES } from '../data/templates'
import { useAuthStore, useResumeStore } from '../store'
import { Crown, Check, FileText, ArrowRight, Filter } from 'lucide-react'

const CATS = ['All', 'Professional', 'Creative', 'Minimal', 'Tech', 'Premium']

export default function TemplatesPage() {
  const [cat, setCat] = useState('All')
  const [hover, setHover] = useState(null)
  const { isAuthenticated, canUseTemplate, subscription } = useAuthStore()
  const { createResume, updateResumeTemplate } = useResumeStore()
  const navigate = useNavigate()

  const filtered = cat === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === cat)

  const useTemplate = (template) => {
    if (!isAuthenticated) { navigate('/auth'); return }
    if (!canUseTemplate(template)) { navigate('/pricing'); return }
    const id = createResume(`${template.name} Resume`)
    updateResumeTemplate && navigate(`/builder/${id}`)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#f8faff', fontFamily:'DM Sans' }}>
      {/* Header */}
      <header style={{ background:'white', borderBottom:'1px solid #e2e8f0', padding:'0 5%' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }}>
            <div style={{ width:28, height:28, background:'linear-gradient(135deg, #4361ee, #f72585)', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <FileText size={14} color="white" />
            </div>
            <span style={{ fontFamily:'Playfair Display', fontSize:'16px', fontWeight:700, color:'#1e293b' }}>ResumeForge</span>
          </Link>
          <div style={{ display:'flex', gap:'8px' }}>
            <Link to="/pricing" className="btn-ghost" style={{ textDecoration:'none' }}>Pricing</Link>
            {isAuthenticated
              ? <Link to="/dashboard" className="btn-primary" style={{ textDecoration:'none' }}>Dashboard</Link>
              : <Link to="/auth" className="btn-primary" style={{ textDecoration:'none' }}>Get Started</Link>}
          </div>
        </div>
      </header>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'48px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <h1 style={{ fontFamily:'Playfair Display', fontSize:'40px', fontWeight:700, color:'#1e293b', marginBottom:'12px' }}>Resume Templates</h1>
          <p style={{ fontSize:'18px', color:'#64748b', maxWidth:'520px', margin:'0 auto' }}>
            {TEMPLATES.length} professionally designed templates — from ATS-friendly minimal to creative infographic styles.
          </p>
        </div>

        {/* Category filter */}
        <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginBottom:'32px', flexWrap:'wrap' }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding:'8px 20px', borderRadius:'99px', border:'1.5px solid', borderColor: cat===c ? '#4361ee' : '#e2e8f0', background: cat===c ? '#4361ee' : 'white', color: cat===c ? 'white' : '#64748b', fontSize:'14px', fontWeight:600, cursor:'pointer', fontFamily:'DM Sans', transition:'all 0.2s' }}>
              {c}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'24px' }}>
          {filtered.map(t => {
            const accessible = !isAuthenticated ? t.access === 'free' : canUseTemplate(t)
            return (
              <div key={t.id} className="forge-card" style={{ overflow:'hidden', transition:'transform 0.2s, box-shadow 0.2s', cursor:'pointer' }}
                onMouseEnter={() => setHover(t.id)}
                onMouseLeave={() => setHover(null)}>
                {/* Preview */}
                <div style={{ height:'160px', background:`linear-gradient(135deg, ${t.defaults.primaryColor}, ${t.defaults.secondaryColor})`, position:'relative', overflow:'hidden' }}>
                  {/* Mini resume mock */}
                  <div style={{ position:'absolute', inset:0, padding:'16px', opacity:0.9 }}>
                    <div style={{ background:'white', borderRadius:'4px', padding:'12px', height:'100%', overflow:'hidden' }}>
                      <div style={{ display:'flex', alignItems:'flex-start', gap:'8px', marginBottom:'8px' }}>
                        {t.layout.type.includes('sidebar') && (
                          <div style={{ width:'35%', background: t.defaults.primaryColor, borderRadius:'3px', height:'100px', flexShrink:0 }} />
                        )}
                        <div style={{ flex:1 }}>
                          <div style={{ height:'10px', background: t.defaults.primaryColor, borderRadius:'2px', marginBottom:'6px', width:'70%' }} />
                          <div style={{ height:'6px', background:'#e2e8f0', borderRadius:'2px', marginBottom:'4px', width:'50%' }} />
                          {['100%','90%','80%','95%'].map((w,i) => (
                            <div key={i} style={{ height:'4px', background:'#f1f5f9', borderRadius:'2px', marginBottom:'3px', width:w }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {!accessible && (
                    <div style={{ position:'absolute', top:'10px', left:'10px', background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', borderRadius:'6px', padding:'4px 8px', display:'flex', alignItems:'center', gap:'4px', color:'white', fontSize:'11px', fontWeight:600 }}>
                      <Crown size={10} /> Pro
                    </div>
                  )}
                  {hover === t.id && (
                    <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                      <button onClick={() => useTemplate(t)} style={{ background:'white', border:'none', borderRadius:'10px', padding:'10px 20px', fontSize:'13px', fontWeight:700, color:'#1e293b', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}>
                        Use Template <ArrowRight size={13} />
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ padding:'16px' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'6px' }}>
                    <h3 style={{ fontSize:'16px', fontWeight:700, color:'#1e293b', margin:0 }}>{t.name}</h3>
                    <span className={`badge ${t.access === 'free' ? 'badge-free' : 'badge-pro'}`}>
                      {t.access === 'free' ? 'FREE' : `$${t.price}`}
                    </span>
                  </div>
                  <p style={{ fontSize:'12px', color:'#64748b', marginBottom:'12px', lineHeight:1.5 }}>{t.description}</p>
                  <div style={{ display:'flex', gap:'4px', flexWrap:'wrap', marginBottom:'12px' }}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{ fontSize:'10px', background:'#f1f5f9', color:'#64748b', padding:'2px 8px', borderRadius:'99px' }}>{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => useTemplate(t)} className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:'13px', padding:'9px' }}>
                    {accessible ? 'Use Template' : <><Crown size={12} /> Upgrade to Use</>}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
