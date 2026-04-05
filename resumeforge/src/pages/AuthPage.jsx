import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store'
import toast from 'react-hot-toast'
import { FileText, Mail, Lock, User, Eye, EyeOff, Linkedin, ArrowLeft, Sparkles } from 'lucide-react'

// Demo users for prototype
const DEMO_USERS = {
  'demo@resumeforge.com': { id: 'demo-1', name: 'Demo User', email: 'demo@resumeforge.com', role: 'user', subscription: 'pro', purchasedTemplates: [] },
  'admin@resumeforge.com': { id: 'admin-1', name: 'Admin User', email: 'admin@resumeforge.com', role: 'admin', subscription: 'enterprise', purchasedTemplates: [] },
}

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'forgot'
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))

    if (mode === 'login') {
      const user = DEMO_USERS[form.email]
      if (user || form.email.includes('@')) {
        login(user || { id: `user-${Date.now()}`, name: form.email.split('@')[0], email: form.email, role: 'user', subscription: 'free', purchasedTemplates: [] })
        toast.success('Welcome back! 🎉')
        navigate('/dashboard')
      } else {
        toast.error('Invalid credentials')
      }
    } else if (mode === 'register') {
      if (!form.name || !form.email || !form.password) { toast.error('All fields required'); setLoading(false); return }
      login({ id: `user-${Date.now()}`, name: form.name, email: form.email, role: 'user', subscription: 'free', purchasedTemplates: [] })
      toast.success('Account created! Welcome to ResumeForge 🚀')
      navigate('/dashboard')
    } else {
      toast.success('Password reset link sent!')
      setMode('login')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    login({ id: `google-${Date.now()}`, name: 'Google User', email: 'googleuser@gmail.com', role: 'user', subscription: 'free', purchasedTemplates: [], avatar: 'G' })
    toast.success('Signed in with Google!')
    navigate('/dashboard')
    setLoading(false)
  }

  const handleLinkedIn = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    login({ id: `li-${Date.now()}`, name: 'LinkedIn User', email: 'liuser@linkedin.com', role: 'user', subscription: 'free', purchasedTemplates: [], linkedinData: { imported: true } })
    toast.success('Signed in with LinkedIn! Resume data imported.')
    navigate('/dashboard')
    setLoading(false)
  }

  const handleDemo = (role = 'user') => {
    const user = role === 'admin' ? DEMO_USERS['admin@resumeforge.com'] : DEMO_USERS['demo@resumeforge.com']
    login(user)
    toast.success(`Logged in as ${role === 'admin' ? 'Admin' : 'Pro User'} Demo`)
    navigate(role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(135deg, #f0f4ff 0%, #fdf2ff 50%, #f0faff 100%)', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }}>
      {/* Background shapes */}
      <div style={{ position:'fixed', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'10%', left:'5%', width:300, height:300, borderRadius:'50%', background:'linear-gradient(135deg, #4361ee22, #7209b722)', filter:'blur(60px)' }} />
        <div style={{ position:'absolute', bottom:'10%', right:'5%', width:250, height:250, borderRadius:'50%', background:'linear-gradient(135deg, #f7258522, #4cc9f022)', filter:'blur(60px)' }} />
      </div>

      <div style={{ width:'100%', maxWidth:'440px', position:'relative' }}>
        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', justifyContent:'center', marginBottom:'32px', textDecoration:'none' }}>
          <div style={{ width:40, height:40, background:'linear-gradient(135deg, #4361ee, #f72585)', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <FileText size={20} color="white" />
          </div>
          <span style={{ fontFamily:'Playfair Display', fontSize:'22px', fontWeight:700, color:'#1e293b' }}>ResumeForge</span>
        </Link>

        <div className="forge-card" style={{ padding:'36px' }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'24px', fontWeight:700, color:'#1e293b', textAlign:'center', marginBottom:'4px' }}>
            {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create account' : 'Reset password'}
          </h2>
          <p style={{ textAlign:'center', color:'#64748b', fontSize:'14px', marginBottom:'24px' }}>
            {mode === 'login' ? 'Sign in to continue building' : mode === 'register' ? 'Start building for free today' : "We'll send you a reset link"}
          </p>

          {mode !== 'forgot' && (
            <>
              {/* Social logins */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'20px' }}>
                <button onClick={handleGoogle} disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'10px', border:'1.5px solid #e2e8f0', borderRadius:'8px', background:'white', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#1e293b', transition:'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f8faff'}
                  onMouseLeave={e => e.currentTarget.style.background='white'}>
                  <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button onClick={handleLinkedIn} disabled={loading} style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'10px', border:'1.5px solid #e2e8f0', borderRadius:'8px', background:'white', cursor:'pointer', fontSize:'13px', fontWeight:600, color:'#0077b5', transition:'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f0f7fc'}
                  onMouseLeave={e => e.currentTarget.style.background='white'}>
                  <Linkedin size={16} fill="#0077b5" color="#0077b5" />
                  LinkedIn
                </button>
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
                <div style={{ flex:1, height:'1px', background:'#e2e8f0' }} />
                <span style={{ fontSize:'12px', color:'#94a3b8', whiteSpace:'nowrap' }}>or continue with email</span>
                <div style={{ flex:1, height:'1px', background:'#e2e8f0' }} />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div style={{ marginBottom:'14px' }}>
                <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>Full Name</label>
                <div style={{ position:'relative' }}>
                  <User size={14} color="#94a3b8" style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)' }} />
                  <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" className="forge-input" style={{ paddingLeft:'36px' }} />
                </div>
              </div>
            )}
            <div style={{ marginBottom:'14px' }}>
              <label style={{ display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'6px' }}>Email Address</label>
              <div style={{ position:'relative' }}>
                <Mail size={14} color="#94a3b8" style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)' }} />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="forge-input" style={{ paddingLeft:'36px' }} />
              </div>
            </div>
            {mode !== 'forgot' && (
              <div style={{ marginBottom:'20px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                  <label style={{ fontSize:'13px', fontWeight:600, color:'#374151' }}>Password</label>
                  {mode === 'login' && <button type="button" onClick={() => setMode('forgot')} style={{ fontSize:'12px', color:'#4361ee', background:'none', border:'none', cursor:'pointer', padding:0 }}>Forgot password?</button>}
                </div>
                <div style={{ position:'relative' }}>
                  <Lock size={14} color="#94a3b8" style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)' }} />
                  <input name="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="••••••••" className="forge-input" style={{ paddingLeft:'36px', paddingRight:'40px' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#94a3b8' }}>
                    {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary" style={{ width:'100%', justifyContent:'center', fontSize:'15px', padding:'12px' }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          <p style={{ textAlign:'center', marginTop:'16px', fontSize:'13px', color:'#64748b' }}>
            {mode === 'login' ? (
              <>Don't have an account? <button onClick={() => setMode('register')} style={{ color:'#4361ee', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Sign up</button></>
            ) : (
              <>Already have an account? <button onClick={() => setMode('login')} style={{ color:'#4361ee', background:'none', border:'none', cursor:'pointer', fontWeight:600 }}>Sign in</button></>
            )}
          </p>
        </div>

        {/* Demo shortcuts */}
        <div className="forge-card" style={{ padding:'16px', marginTop:'16px' }}>
          <div style={{ fontSize:'12px', fontWeight:600, color:'#64748b', textAlign:'center', marginBottom:'10px', textTransform:'uppercase', letterSpacing:'0.05em' }}>
            <Sparkles size={12} style={{ marginRight:'4px', verticalAlign:'middle' }} /> Quick Demo Access
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
            <button onClick={() => handleDemo('user')} style={{ padding:'8px', background:'#f0f4ff', border:'1px solid #e0eaff', borderRadius:'8px', fontSize:'12px', fontWeight:600, color:'#4361ee', cursor:'pointer' }}>
              👤 Pro User Demo
            </button>
            <button onClick={() => handleDemo('admin')} style={{ padding:'8px', background:'#fff0f7', border:'1px solid #fce7f3', borderRadius:'8px', fontSize:'12px', fontWeight:600, color:'#f72585', cursor:'pointer' }}>
              ⚙️ Admin Demo
            </button>
          </div>
          <p style={{ textAlign:'center', fontSize:'11px', color:'#94a3b8', marginTop:'8px', marginBottom:0 }}>No account needed — explore all features instantly</p>
        </div>
      </div>
    </div>
  )
}
