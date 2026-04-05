import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore, useAdminStore } from '../store'
import toast from 'react-hot-toast'
import { Check, Crown, Zap, Shield, FileText, ArrowRight, Star } from 'lucide-react'

export default function PricingPage() {
  const { isAuthenticated, subscription, updateSubscription } = useAuthStore()
  const { plans } = useAdminStore()
  const navigate = useNavigate()
  const [billing, setBilling] = useState('monthly') // monthly | annual
  const [processing, setProcessing] = useState(null)

  const handleUpgrade = async (plan) => {
    if (!isAuthenticated) { navigate('/auth'); return }
    if (plan.id === 'free') return
    setProcessing(plan.id)
    // Simulate payment
    toast.loading(`Processing payment for ${plan.name}...`, { id: 'pay' })
    await new Promise(r => setTimeout(r, 2000))
    updateSubscription(plan.id)
    toast.success(`🎉 Welcome to ${plan.name}! All features unlocked.`, { id: 'pay' })
    setProcessing(null)
    navigate('/dashboard')
  }

  const planIcons = { free: FileText, pro: Zap, enterprise: Crown }
  const planColors = { free: '#64748b', pro: '#4361ee', enterprise: '#7209b7' }

  return (
    <div style={{ minHeight:'100vh', background:'#f8faff', fontFamily:'DM Sans' }}>
      {/* Header */}
      <header style={{ background:'white', borderBottom:'1px solid #e2e8f0', padding:'0 5%' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:'60px' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none' }}>
            <div style={{ width:28, height:28, background:'linear-gradient(135deg, #4361ee, #f72585)', borderRadius:'7px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <FileText size={14} color="white" />
            </div>
            <span style={{ fontFamily:'Playfair Display', fontSize:'16px', fontWeight:700, color:'#1e293b' }}>ResumeForge</span>
          </Link>
          {isAuthenticated
            ? <Link to="/dashboard" className="btn-ghost" style={{ textDecoration:'none' }}>Dashboard</Link>
            : <Link to="/auth" className="btn-primary" style={{ textDecoration:'none' }}>Get Started</Link>}
        </div>
      </header>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'60px 5%' }}>
        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <h1 style={{ fontFamily:'Playfair Display', fontSize:'40px', fontWeight:700, color:'#1e293b', marginBottom:'12px' }}>Simple, Transparent Pricing</h1>
          <p style={{ fontSize:'18px', color:'#64748b', marginBottom:'24px' }}>Start free. Upgrade when you're ready to supercharge your job search.</p>

          {/* Billing toggle */}
          <div style={{ display:'inline-flex', background:'#f1f5f9', borderRadius:'10px', padding:'4px', gap:'4px' }}>
            {['monthly', 'annual'].map(b => (
              <button key={b} onClick={() => setBilling(b)} style={{ padding:'8px 20px', borderRadius:'7px', border:'none', background: billing===b ? 'white' : 'transparent', color: billing===b ? '#1e293b' : '#64748b', fontFamily:'DM Sans', fontSize:'14px', fontWeight:600, cursor:'pointer', boxShadow: billing===b ? '0 1px 4px rgba(0,0,0,0.08)' : 'none', textTransform:'capitalize' }}>
                {b} {b === 'annual' && <span style={{ color:'#06d6a0', fontSize:'11px' }}>Save 20%</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Plans grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'24px', marginBottom:'60px' }}>
          {plans.map(plan => {
            const Icon = planIcons[plan.id] || Zap
            const color = planColors[plan.id] || '#4361ee'
            const price = billing === 'annual' ? (plan.price * 0.8).toFixed(2) : plan.price
            const isCurrent = subscription === plan.id
            const isPro = plan.id === 'pro'

            return (
              <div key={plan.id} className="forge-card" style={{ padding:'32px', position:'relative', border: isPro ? `2px solid #4361ee` : '1px solid #e2e8f0', overflow:'hidden', transform: isPro ? 'scale(1.02)' : 'none' }}>
                {isPro && (
                  <div style={{ position:'absolute', top:'16px', right:'16px' }}>
                    <span className="badge badge-new"><Star size={9} /> Most Popular</span>
                  </div>
                )}
                {isCurrent && (
                  <div style={{ position:'absolute', top:'16px', left:'16px' }}>
                    <span className="badge badge-ai"><Check size={9} /> Current Plan</span>
                  </div>
                )}

                <div style={{ width:44, height:44, borderRadius:'12px', background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px' }}>
                  <Icon size={20} color={color} />
                </div>

                <h3 style={{ fontFamily:'Playfair Display', fontSize:'22px', fontWeight:700, color:'#1e293b', marginBottom:'4px' }}>{plan.name}</h3>

                <div style={{ display:'flex', alignItems:'baseline', gap:'4px', marginBottom:'20px' }}>
                  <span style={{ fontSize:'36px', fontWeight:700, color: color, fontFamily:'Playfair Display' }}>
                    ${price}
                  </span>
                  {plan.price > 0 && <span style={{ fontSize:'14px', color:'#94a3b8' }}>/ month</span>}
                </div>

                <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px', display:'flex', flexDirection:'column', gap:'10px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'14px', color:'#374151' }}>
                      <div style={{ width:20, height:20, borderRadius:'50%', background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <Check size={11} color={color} strokeWidth={3} />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan)}
                  disabled={isCurrent || processing === plan.id}
                  style={{
                    width:'100%', padding:'12px', borderRadius:'10px', border:'none',
                    background: isCurrent ? '#f1f5f9' : isPro ? `linear-gradient(135deg, #4361ee, #7209b7)` : `${color}18`,
                    color: isCurrent ? '#94a3b8' : isPro ? 'white' : color,
                    fontSize:'15px', fontWeight:700, cursor: isCurrent ? 'default' : 'pointer',
                    fontFamily:'DM Sans', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                    transition:'all 0.2s',
                  }}>
                  {processing === plan.id ? 'Processing...' : isCurrent ? 'Current Plan' : plan.id === 'free' ? 'Get Started Free' : `Upgrade to ${plan.name}`}
                  {!isCurrent && plan.id !== 'free' && <ArrowRight size={14} />}
                </button>
              </div>
            )
          })}
        </div>

        {/* Individual template purchase */}
        <div className="forge-card" style={{ padding:'32px', background:'linear-gradient(135deg, #f0f4ff, #fdf2ff)', border:'1px solid #e0eaff', marginBottom:'40px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'24px', flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:'200px' }}>
              <h3 style={{ fontFamily:'Playfair Display', fontSize:'20px', color:'#1e293b', marginBottom:'6px' }}>Buy Individual Templates</h3>
              <p style={{ color:'#64748b', fontSize:'14px', margin:0 }}>Don't want a subscription? Purchase individual premium templates for a one-time fee of $4.99–$7.99.</p>
            </div>
            <Link to="/templates" className="btn-secondary" style={{ textDecoration:'none', whiteSpace:'nowrap' }}>
              Browse Templates <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ maxWidth:'640px', margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Playfair Display', fontSize:'28px', fontWeight:700, color:'#1e293b', textAlign:'center', marginBottom:'32px' }}>Frequently Asked Questions</h2>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes! Cancel anytime from your account settings. You keep access until the end of your billing period.' },
            { q: 'Is my data saved securely?', a: 'All resume data is encrypted and saved to your account. We never share or sell your personal information.' },
            { q: 'Does ResumeForge work for any industry?', a: 'Absolutely. Our templates and AI cover tech, finance, healthcare, creative, legal, academia, and more.' },
            { q: 'How does LinkedIn import work?', a: 'Connect your LinkedIn account and we automatically pull your work experience, education, and skills — no manual typing needed.' },
          ].map(faq => (
            <div key={faq.q} style={{ marginBottom:'16px', padding:'20px', background:'white', borderRadius:'12px', border:'1px solid #e2e8f0' }}>
              <h4 style={{ fontSize:'15px', fontWeight:700, color:'#1e293b', marginBottom:'6px' }}>{faq.q}</h4>
              <p style={{ fontSize:'14px', color:'#64748b', margin:0, lineHeight:1.6 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
