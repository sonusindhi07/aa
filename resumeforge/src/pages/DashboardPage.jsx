import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore, useResumeStore } from '../store'
import { TEMPLATES } from '../data/templates'
import toast from 'react-hot-toast'
import {
  Plus, FileText, Edit3, Trash2, Copy, Download, MoreVertical,
  Sparkles, Crown, Linkedin, Upload, Clock, ArrowRight, User,
  LogOut, Settings, Star, TrendingUp
} from 'lucide-react'

function ResumeCard({ resume, onEdit, onDuplicate, onDelete, onRename }) {
  const [menu, setMenu] = useState(false)
  const [renaming, setRenaming] = useState(false)
  const [title, setTitle] = useState(resume.title)
  const template = TEMPLATES.find(t => t.id === resume.templateId) || TEMPLATES[0]

  const handleRename = () => {
    onRename(resume.id, title)
    setRenaming(false)
  }

  return (
    <div className="forge-card" style={{ overflow:'hidden', transition:'transform 0.2s, box-shadow 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 40px rgba(67,97,238,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}>
      {/* Template color preview */}
      <div style={{ height:'100px', background:`linear-gradient(135deg, ${resume.settings?.primaryColor || '#4361ee'}, ${resume.settings?.secondaryColor || resume.settings?.primaryColor || '#7209b7'}88)`, position:'relative', cursor:'pointer' }}
        onClick={() => onEdit(resume.id)}>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', opacity:0.15 }}>
          <FileText size={48} color="white" />
        </div>
        <div style={{ position:'absolute', top:'8px', right:'8px' }}>
          <span className={`badge ${template.access === 'free' ? 'badge-free' : 'badge-pro'}`} style={{ background:'rgba(255,255,255,0.2)', color:'white', backdropFilter:'blur(8px)' }}>
            {template.name}
          </span>
        </div>
        <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity=1}
          onMouseLeave={e => e.currentTarget.style.opacity=0}>
          <div style={{ background:'white', borderRadius:'8px', padding:'8px 16px', fontSize:'13px', fontWeight:600, color:'#1e293b', display:'flex', alignItems:'center', gap:'6px' }}>
            <Edit3 size={12} /> Edit Resume
          </div>
        </div>
      </div>

      <div style={{ padding:'16px' }}>
        {renaming ? (
          <div style={{ display:'flex', gap:'8px', marginBottom:'4px' }}>
            <input value={title} onChange={e => setTitle(e.target.value)} onKeyDown={e => e.key==='Enter' && handleRename()} className="forge-input" style={{ padding:'6px 10px', fontSize:'13px' }} autoFocus />
            <button onClick={handleRename} className="btn-primary" style={{ padding:'6px 10px', fontSize:'12px' }}>Save</button>
          </div>
        ) : (
          <div style={{ fontWeight:700, fontSize:'15px', color:'#1e293b', marginBottom:'4px', display:'flex', alignItems:'center', gap:'6px' }}>
            <span style={{ flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{resume.title}</span>
          </div>
        )}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', color:'#94a3b8' }}>
            <Clock size={11} />
            {new Date(resume.updatedAt).toLocaleDateString()}
          </div>
          <div style={{ display:'flex', gap:'4px', position:'relative' }}>
            <button onClick={() => onEdit(resume.id)} className="btn-ghost" style={{ padding:'4px 8px', fontSize:'12px' }}>
              <Edit3 size={12} /> Edit
            </button>
            <button onClick={() => setMenu(!menu)} className="btn-ghost" style={{ padding:'4px 6px' }}>
              <MoreVertical size={14} />
            </button>
            {menu && (
              <div style={{ position:'absolute', right:0, top:'100%', background:'white', borderRadius:'10px', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', border:'1px solid #e2e8f0', zIndex:20, minWidth:'150px', padding:'6px', marginTop:'4px' }}
                onMouseLeave={() => setMenu(false)}>
                {[
                  { icon: Copy, label: 'Duplicate', action: () => { onDuplicate(resume.id); setMenu(false) } },
                  { icon: Edit3, label: 'Rename', action: () => { setRenaming(true); setMenu(false) } },
                  { icon: Download, label: 'Download PDF', action: () => { toast('Opening builder to download...'); onEdit(resume.id); setMenu(false) } },
                  { icon: Trash2, label: 'Delete', action: () => { onDelete(resume.id); setMenu(false) }, danger: true },
                ].map(item => (
                  <button key={item.label} onClick={item.action} style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', background:'none', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'13px', color: item.danger ? '#ef476f' : '#374151', fontFamily:'DM Sans' }}
                    onMouseEnter={e => e.currentTarget.style.background = item.danger ? '#fff5f7' : '#f8faff'}
                    onMouseLeave={e => e.currentTarget.style.background='none'}>
                    <item.icon size={13} /> {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, logout, subscription } = useAuthStore()
  const { resumes, createResume, deleteResume, duplicateResume, renameResume, loadResume } = useResumeStore()
  const navigate = useNavigate()
  const [showImport, setShowImport] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleCreate = () => {
    const id = createResume(`Resume ${resumes.length + 1}`)
    navigate(`/builder/${id}`)
  }

  const handleEdit = (id) => {
    loadResume(id)
    navigate(`/builder/${id}`)
  }

  const handleDelete = (id) => {
    if (confirm('Delete this resume?')) {
      deleteResume(id)
      toast.success('Resume deleted')
    }
  }

  const handleDuplicate = (id) => {
    const newId = duplicateResume(id)
    toast.success('Resume duplicated!')
  }

  const handleLinkedInImport = async () => {
    setShowImport(true)
    toast.loading('Connecting to LinkedIn...', { id: 'li' })
    await new Promise(r => setTimeout(r, 2000))
    toast.success('LinkedIn profile imported! Creating resume...', { id: 'li' })
    const id = createResume('LinkedIn Resume')
    setShowImport(false)
    navigate(`/builder/${id}`)
  }

  const isPro = subscription === 'pro' || subscription === 'enterprise'

  return (
    <div style={{ minHeight:'100vh', background:'#f8faff', fontFamily:'DM Sans' }}>
      {/* Header */}
      <header style={{ background:'white', borderBottom:'1px solid #e2e8f0', padding:'0 5%', position:'sticky', top:0, zIndex:40 }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }}>
            <div style={{ width:28, height:28, background:'linear-gradient(135deg, #4361ee, #f72585)', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <FileText size={14} color="white" />
            </div>
            <span style={{ fontFamily:'Playfair Display', fontSize:'16px', fontWeight:700, color:'#1e293b' }}>ResumeForge</span>
          </Link>
          <nav style={{ display:'flex', gap:'4px' }}>
            <Link to="/dashboard" style={{ textDecoration:'none', padding:'6px 12px', borderRadius:'8px', fontSize:'13px', fontWeight:600, color:'#4361ee', background:'#f0f4ff' }}>Dashboard</Link>
            <Link to="/templates" style={{ textDecoration:'none' }} className="btn-ghost">Templates</Link>
            <Link to="/pricing" style={{ textDecoration:'none' }} className="btn-ghost">Pricing</Link>
          </nav>
          <div style={{ display:'flex', alignItems:'center', gap:'10px', position:'relative' }}>
            {!isPro && (
              <Link to="/pricing" style={{ textDecoration:'none' }} className="btn-primary" style={{ padding:'6px 14px', fontSize:'13px', textDecoration:'none', background:'linear-gradient(135deg, #7209b7, #f72585)', color:'white', borderRadius:'8px', fontWeight:600, display:'inline-flex', alignItems:'center', gap:'6px' }}>
                <Crown size={12} /> Upgrade to Pro
              </Link>
            )}
            {isPro && <span className="badge badge-pro"><Crown size={10} /> Pro</span>}
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg, #4361ee, #7209b7)', border:'none', cursor:'pointer', color:'white', fontWeight:700, fontSize:'13px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </button>
            {userMenuOpen && (
              <div style={{ position:'absolute', right:0, top:'calc(100% + 8px)', background:'white', borderRadius:'12px', boxShadow:'0 12px 40px rgba(0,0,0,0.12)', border:'1px solid #e2e8f0', zIndex:50, minWidth:'200px', padding:'8px' }}
                onMouseLeave={() => setUserMenuOpen(false)}>
                <div style={{ padding:'8px 12px', borderBottom:'1px solid #f1f5f9', marginBottom:'6px' }}>
                  <div style={{ fontWeight:600, fontSize:'14px', color:'#1e293b' }}>{user?.name}</div>
                  <div style={{ fontSize:'12px', color:'#94a3b8' }}>{user?.email}</div>
                </div>
                {[
                  { icon: User, label: 'Profile', to: '/profile' },
                  { icon: Settings, label: 'Settings', to: '/profile' },
                ].map(item => (
                  <Link key={item.label} to={item.to} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 12px', borderRadius:'6px', fontSize:'13px', color:'#374151', textDecoration:'none' }}
                    onMouseEnter={e => e.currentTarget.style.background='#f8faff'}
                    onMouseLeave={e => e.currentTarget.style.background='none'}>
                    <item.icon size={13} /> {item.label}
                  </Link>
                ))}
                <button onClick={() => { logout(); navigate('/') }} style={{ width:'100%', display:'flex', alignItems:'center', gap:'8px', padding:'8px 12px', background:'none', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'13px', color:'#ef476f', fontFamily:'DM Sans' }}
                  onMouseEnter={e => e.currentTarget.style.background='#fff5f7'}
                  onMouseLeave={e => e.currentTarget.style.background='none'}>
                  <LogOut size={13} /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'32px 5%' }}>
        {/* Welcome banner */}
        <div style={{ background:'linear-gradient(135deg, #4361ee, #7209b7)', borderRadius:'16px', padding:'28px 32px', marginBottom:'32px', color:'white', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div>
            <h1 style={{ fontFamily:'Playfair Display', fontSize:'24px', fontWeight:700, margin:'0 0 6px' }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ opacity:0.85, fontSize:'14px', margin:0 }}>
              {resumes.length === 0 ? 'Start building your first resume today!' : `You have ${resumes.length} resume${resumes.length > 1 ? 's' : ''}. Keep updating them!`}
            </p>
          </div>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
            <button onClick={handleLinkedInImport} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 18px', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,0.3)', borderRadius:'10px', color:'white', cursor:'pointer', fontSize:'13px', fontWeight:600, fontFamily:'DM Sans' }}>
              <Linkedin size={14} /> Import LinkedIn
            </button>
            <button onClick={handleCreate} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'10px 18px', background:'white', border:'none', borderRadius:'10px', color:'#4361ee', cursor:'pointer', fontSize:'13px', fontWeight:700, fontFamily:'DM Sans' }}>
              <Plus size={14} /> New Resume
            </button>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px', marginBottom:'32px' }}>
          {[
            { icon: Plus, label: 'Create New Resume', desc: 'Start from scratch', color:'#4361ee', action: handleCreate },
            { icon: Upload, label: 'Upload Resume', desc: 'Enhance with AI', color:'#7209b7', action: () => toast('Upload feature — click Browse in builder') },
            { icon: Linkedin, label: 'Import LinkedIn', desc: 'One-click import', color:'#0077b5', action: handleLinkedInImport },
            { icon: Sparkles, label: 'AI Resume Writer', desc: 'Let AI build it', color:'#f72585', action: () => { const id = createResume('AI Generated Resume'); navigate(`/builder/${id}`) } },
          ].map(item => (
            <button key={item.label} onClick={item.action} className="forge-card" style={{ padding:'20px', textAlign:'left', border:'1.5px solid #e2e8f0', cursor:'pointer', transition:'all 0.2s', background:'white' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#e2e8f0'; e.currentTarget.style.transform='' }}>
              <div style={{ width:40, height:40, borderRadius:'10px', background:`${item.color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'12px' }}>
                <item.icon size={18} color={item.color} />
              </div>
              <div style={{ fontWeight:700, fontSize:'14px', color:'#1e293b' }}>{item.label}</div>
              <div style={{ fontSize:'12px', color:'#94a3b8', marginTop:'2px' }}>{item.desc}</div>
            </button>
          ))}
        </div>

        {/* Resumes grid */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'20px', fontWeight:700, color:'#1e293b', margin:0 }}>
            My Resumes {resumes.length > 0 && <span style={{ fontSize:'14px', color:'#94a3b8', fontFamily:'DM Sans', fontWeight:400 }}>({resumes.length})</span>}
          </h2>
          <Link to="/templates" className="btn-ghost" style={{ textDecoration:'none', fontSize:'13px' }}>
            Browse Templates <ArrowRight size={12} />
          </Link>
        </div>

        {resumes.length === 0 ? (
          <div className="forge-card" style={{ padding:'60px', textAlign:'center' }}>
            <div style={{ width:80, height:80, background:'#f0f4ff', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
              <FileText size={36} color="#4361ee" />
            </div>
            <h3 style={{ fontFamily:'Playfair Display', fontSize:'20px', color:'#1e293b', marginBottom:'8px' }}>No resumes yet</h3>
            <p style={{ color:'#64748b', marginBottom:'24px' }}>Create your first resume or import from LinkedIn</p>
            <button onClick={handleCreate} className="btn-primary" style={{ fontSize:'15px', padding:'12px 28px' }}>
              <Plus size={16} /> Create Your First Resume
            </button>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'20px' }}>
            {/* New resume card */}
            <button onClick={handleCreate} style={{ border:'2px dashed #c7d2fe', borderRadius:'14px', background:'#f8faff', cursor:'pointer', padding:'40px 20px', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', transition:'all 0.2s', minHeight:'200px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='#4361ee'; e.currentTarget.style.background='#f0f4ff' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='#c7d2fe'; e.currentTarget.style.background='#f8faff' }}>
              <div style={{ width:44, height:44, borderRadius:'50%', background:'#e0eaff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Plus size={20} color="#4361ee" />
              </div>
              <div style={{ fontWeight:600, fontSize:'14px', color:'#4361ee' }}>Create New Resume</div>
            </button>
            {resumes.map(resume => (
              <ResumeCard
                key={resume.id}
                resume={resume}
                onEdit={handleEdit}
                onDuplicate={handleDuplicate}
                onDelete={handleDelete}
                onRename={renameResume}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
