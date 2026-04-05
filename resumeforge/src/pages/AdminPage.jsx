import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAdminStore, useAuthStore, useResumeStore } from '../store'
import toast from 'react-hot-toast'
import {
  FileText, Users, CreditCard, Settings, BarChart2, Shield,
  Package, DollarSign, Eye, Edit2, Trash2, Plus, Check, X,
  ChevronRight, TrendingUp, ArrowLeft, Zap, Crown, Lock, Unlock,
  ToggleLeft, ToggleRight, Star, Globe, Cpu, Database
} from 'lucide-react'
import { TEMPLATES } from '../data/templates'

const NAV = [
  { id: 'overview', label: 'Overview', icon: BarChart2 },
  { id: 'templates', label: 'Templates', icon: Package },
  { id: 'plans', label: 'Plans & Pricing', icon: CreditCard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'transactions', label: 'Transactions', icon: DollarSign },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const MOCK_STATS = [
  { label: 'Total Users', value: '12,847', change: '+8.2%', color: '#4361ee', icon: Users },
  { label: 'Monthly Revenue', value: '$42,190', change: '+14.5%', color: '#06d6a0', icon: DollarSign },
  { label: 'Resumes Created', value: '94,302', change: '+22.1%', color: '#f72585', icon: FileText },
  { label: 'Active Templates', value: '9', change: '+1', color: '#ffd166', icon: Package },
]

const MOCK_USERS = [
  { id: 1, name: 'Priya Sharma', email: 'priya@example.com', plan: 'pro', resumes: 8, joined: '2024-11-02', status: 'active' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus@example.com', plan: 'free', resumes: 2, joined: '2024-12-15', status: 'active' },
  { id: 3, name: 'Aisha Patel', email: 'aisha@example.com', plan: 'enterprise', resumes: 24, joined: '2024-10-01', status: 'active' },
  { id: 4, name: 'John Smith', email: 'john@example.com', plan: 'free', resumes: 1, joined: '2025-01-08', status: 'inactive' },
  { id: 5, name: 'Li Wei', email: 'li@example.com', plan: 'pro', resumes: 5, joined: '2025-01-20', status: 'active' },
]

const MOCK_TRANSACTIONS = [
  { id: 'TXN-001', user: 'Priya Sharma', plan: 'Pro', amount: 9.99, date: '2025-01-25', status: 'success' },
  { id: 'TXN-002', user: 'Aisha Patel', plan: 'Enterprise', amount: 29.99, date: '2025-01-24', status: 'success' },
  { id: 'TXN-003', user: 'Li Wei', plan: 'Pro', amount: 9.99, date: '2025-01-24', status: 'success' },
  { id: 'TXN-004', user: 'James Brown', plan: 'Bold Impact (Template)', amount: 4.99, date: '2025-01-23', status: 'failed' },
  { id: 'TXN-005', user: 'Sara Lee', plan: 'Pro', amount: 9.99, date: '2025-01-22', status: 'success' },
]

function Stat({ label, value, change, color, icon: Icon }) {
  return (
    <div className="forge-card" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: 44, height: 44, borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} color={color} />
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#06d6a0', background: '#06d6a015', padding: '4px 8px', borderRadius: '99px' }}>
          {change}
        </span>
      </div>
      <div style={{ fontFamily: 'Playfair Display', fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#64748b' }}>{label}</div>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState('overview')
  const { plans, settings, updateSettings, updatePlan } = useAdminStore()
  const { user } = useAuthStore()
  const [templateAccess, setTemplateAccess] = useState(
    TEMPLATES.reduce((acc, t) => ({ ...acc, [t.id]: t.access }), {})
  )
  const [templatePrices, setTemplatePrices] = useState(
    TEMPLATES.reduce((acc, t) => ({ ...acc, [t.id]: t.price }), {})
  )
  const [editingPlan, setEditingPlan] = useState(null)
  const [planEdits, setPlanEdits] = useState({})
  const [siteSettings, setSiteSettings] = useState({ ...settings })

  const toggleTemplateAccess = (id) => {
    setTemplateAccess(prev => ({ ...prev, [id]: prev[id] === 'free' ? 'pro' : 'free' }))
    toast.success('Template access updated')
  }

  const saveSettings = () => {
    updateSettings(siteSettings)
    toast.success('Settings saved successfully!')
  }

  const savePlan = (id) => {
    updatePlan(id, planEdits)
    setEditingPlan(null)
    toast.success('Plan updated!')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff', fontFamily: 'DM Sans', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: '#1e293b', minHeight: '100vh', padding: '0', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40 }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #4361ee, #f72585)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={16} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: '14px', fontWeight: 700, color: 'white' }}>ResumeForge</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '1px' }}>Admin Panel</div>
            </div>
          </Link>
        </div>

        <nav style={{ padding: '12px 0' }}>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 20px', background: tab === id ? 'rgba(67,97,238,0.15)' : 'transparent', border: 'none', cursor: 'pointer', color: tab === id ? '#7c9dff' : '#94a3b8', fontSize: '14px', fontWeight: tab === id ? 600 : 400, fontFamily: 'DM Sans', borderLeft: tab === id ? '3px solid #4361ee' : '3px solid transparent', transition: 'all 0.15s', textAlign: 'left' }}>
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4361ee, #f72585)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 700 }}>
              {(user?.name || 'A').charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{user?.name || 'Admin'}</div>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Administrator</div>
            </div>
          </div>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '12px', color: '#64748b', textDecoration: 'none' }}>
            <ArrowLeft size={12} /> Back to App
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 240, flex: 1, padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'Playfair Display', fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
            {NAV.find(n => n.id === tab)?.label}
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b' }}>Manage your ResumeForge platform</p>
        </div>

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
              {MOCK_STATS.map(s => <Stat key={s.label} {...s} />)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {/* Recent users */}
              <div className="forge-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Recent Users</h3>
                {MOCK_USERS.slice(0, 4).map(u => (
                  <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4361ee, #7209b7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                      {u.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{u.email}</div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: u.plan === 'free' ? '#f1f5f9' : u.plan === 'pro' ? '#e0eaff' : '#fef3c7', color: u.plan === 'free' ? '#64748b' : u.plan === 'pro' ? '#4361ee' : '#d97706' }}>
                      {u.plan}
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent transactions */}
              <div className="forge-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Recent Transactions</h3>
                {MOCK_TRANSACTIONS.slice(0, 4).map(tx => (
                  <div key={tx.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>{tx.user}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{tx.plan} · {tx.id}</div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>${tx.amount}</div>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '99px', background: tx.status === 'success' ? '#d1fae5' : '#fee2e2', color: tx.status === 'success' ? '#065f46' : '#991b1b' }}>
                      {tx.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TEMPLATES */}
        {tab === 'templates' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', background: '#fff', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <Shield size={16} color="#4361ee" />
              <span style={{ fontSize: '14px', color: '#374151' }}>Set each template as <strong>Free</strong> or <strong>Paid</strong>. Paid templates require purchase or Pro subscription.</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {TEMPLATES.map(t => (
                <div key={t.id} className="forge-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#1e293b' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{t.category} · {t.tags.slice(0, 2).join(', ')}</div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '99px', background: templateAccess[t.id] === 'free' ? '#d1fae5' : '#fef3c7', color: templateAccess[t.id] === 'free' ? '#065f46' : '#d97706' }}>
                      {templateAccess[t.id] === 'free' ? 'FREE' : 'PAID'}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', lineHeight: 1.5 }}>{t.description}</p>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {templateAccess[t.id] !== 'free' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <label style={{ fontSize: '12px', color: '#64748b' }}>Price $</label>
                        <input
                          type="number"
                          value={templatePrices[t.id] || 0}
                          onChange={e => setTemplatePrices(prev => ({ ...prev, [t.id]: parseFloat(e.target.value) }))}
                          style={{ width: '70px', padding: '4px 8px', border: '1.5px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', fontFamily: 'DM Sans' }}
                          min="0"
                          step="0.99"
                        />
                      </div>
                    )}
                    <button onClick={() => toggleTemplateAccess(t.id)}
                      style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: templateAccess[t.id] === 'free' ? '#fef3c7' : '#d1fae5', color: templateAccess[t.id] === 'free' ? '#d97706' : '#065f46', fontSize: '13px', fontWeight: 600, fontFamily: 'DM Sans' }}>
                      {templateAccess[t.id] === 'free' ? <><Lock size={12} /> Make Paid</> : <><Unlock size={12} /> Make Free</>}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLANS */}
        {tab === 'plans' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
              {plans.map(plan => (
                <div key={plan.id} className="forge-card" style={{ padding: '24px', position: 'relative' }}>
                  {plan.id === 'pro' && (
                    <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #4361ee, #7209b7)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '4px 14px', borderRadius: '99px' }}>MOST POPULAR</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>{plan.name}</h3>
                    <Crown size={18} color={plan.id === 'enterprise' ? '#d97706' : plan.id === 'pro' ? '#4361ee' : '#64748b'} />
                  </div>
                  {editingPlan === plan.id ? (
                    <div>
                      <input
                        type="number"
                        defaultValue={plan.price}
                        onChange={e => setPlanEdits(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #4361ee', borderRadius: '8px', fontSize: '20px', fontWeight: 700, fontFamily: 'DM Sans', marginBottom: '12px' }}
                      />
                      <textarea
                        defaultValue={plan.features.join('\n')}
                        onChange={e => setPlanEdits(prev => ({ ...prev, features: e.target.value.split('\n').filter(Boolean) }))}
                        style={{ width: '100%', padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontFamily: 'DM Sans', resize: 'vertical', minHeight: '80px', marginBottom: '12px' }}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => savePlan(plan.id)} className="btn-primary" style={{ flex: 1, fontSize: '13px', padding: '8px' }}><Check size={14} /> Save</button>
                        <button onClick={() => setEditingPlan(null)} className="btn-secondary" style={{ flex: 1, fontSize: '13px', padding: '8px' }}><X size={14} /> Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', marginBottom: '4px' }}>
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                        {plan.price > 0 && <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 400 }}>/mo</span>}
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
                        {plan.features.map(f => (
                          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#374151', marginBottom: '8px' }}>
                            <Check size={14} color="#06d6a0" strokeWidth={3} /> {f}
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => { setEditingPlan(plan.id); setPlanEdits({ price: plan.price, features: plan.features }) }}
                        className="btn-secondary" style={{ width: '100%', fontSize: '13px' }}>
                        <Edit2 size={14} /> Edit Plan
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
          <div className="forge-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>All Users ({MOCK_USERS.length})</h3>
              <input placeholder="Search users..." className="forge-input" style={{ width: '220px', fontSize: '13px' }} />
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['Name', 'Email', 'Plan', 'Resumes', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map(u => (
                  <tr key={u.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4361ee, #7209b7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                          {u.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>{u.email}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', background: u.plan === 'free' ? '#f1f5f9' : u.plan === 'pro' ? '#e0eaff' : '#fef3c7', color: u.plan === 'free' ? '#64748b' : u.plan === 'pro' ? '#4361ee' : '#d97706' }}>
                        {u.plan}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#374151' }}>{u.resumes}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>{u.joined}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', background: u.status === 'active' ? '#d1fae5' : '#fee2e2', color: u.status === 'active' ? '#065f46' : '#991b1b' }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ padding: '5px 10px', background: '#f0f4ff', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#4361ee' }} onClick={() => toast.success('View user profile')}>
                          <Eye size={14} />
                        </button>
                        <button style={{ padding: '5px 10px', background: '#fff1f2', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }} onClick={() => toast.error('User removed (demo)')}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TRANSACTIONS */}
        {tab === 'transactions' && (
          <div className="forge-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>All Transactions</h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#06d6a0' }}>Total: $62.95</span>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8faff' }}>
                  {['ID', 'User', 'Plan/Item', 'Amount', 'Date', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_TRANSACTIONS.map(tx => (
                  <tr key={tx.id} style={{ borderTop: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 20px', fontSize: '12px', fontFamily: 'JetBrains Mono', color: '#64748b' }}>{tx.id}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{tx.user}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#374151' }}>{tx.plan}</td>
                    <td style={{ padding: '14px 20px', fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>${tx.amount}</td>
                    <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b' }}>{tx.date}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 10px', borderRadius: '99px', background: tx.status === 'success' ? '#d1fae5' : '#fee2e2', color: tx.status === 'success' ? '#065f46' : '#991b1b' }}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SETTINGS */}
        {tab === 'settings' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* General */}
            <div className="forge-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color="#4361ee" /> General Settings
              </h3>
              {[
                { key: 'siteName', label: 'Site Name', type: 'text' },
                { key: 'maxFreeResumes', label: 'Max Free Resumes', type: 'number' },
              ].map(({ key, label, type }) => (
                <div key={key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>{label}</label>
                  <input type={type} value={siteSettings[key] || ''} onChange={e => setSiteSettings(s => ({ ...s, [key]: type === 'number' ? parseInt(e.target.value) : e.target.value }))}
                    className="forge-input" style={{ fontSize: '14px' }} />
                </div>
              ))}
              {[
                { key: 'aiEnabled', label: 'AI Features Enabled', icon: Cpu },
                { key: 'linkedinEnabled', label: 'LinkedIn Import', icon: Globe },
                { key: 'allowFreeAccess', label: 'Allow Free Tier Access', icon: Unlock },
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
                    <Icon size={14} color="#64748b" /> {label}
                  </div>
                  <button onClick={() => setSiteSettings(s => ({ ...s, [key]: !s[key] }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {siteSettings[key]
                      ? <ToggleRight size={28} color="#4361ee" />
                      : <ToggleLeft size={28} color="#94a3b8" />}
                  </button>
                </div>
              ))}
            </div>

            {/* Payment */}
            <div className="forge-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={16} color="#4361ee" /> Payment Gateway
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Gateway Provider</label>
                <select value={siteSettings.paymentGateway || 'stripe'} onChange={e => setSiteSettings(s => ({ ...s, paymentGateway: e.target.value }))}
                  className="forge-input" style={{ fontSize: '14px' }}>
                  <option value="stripe">Stripe</option>
                  <option value="razorpay">Razorpay</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              {[
                { key: 'stripeKey', label: 'Stripe Public Key', placeholder: 'pk_live_...' },
                { key: 'razorpayKey', label: 'Razorpay Key ID', placeholder: 'rzp_live_...' },
              ].map(({ key, label, placeholder }) => (
                <div key={key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>{label}</label>
                  <input type="text" value={siteSettings[key] || ''} onChange={e => setSiteSettings(s => ({ ...s, [key]: e.target.value }))}
                    className="forge-input" placeholder={placeholder} style={{ fontSize: '13px', fontFamily: 'JetBrains Mono' }} />
                </div>
              ))}
              <div className="forge-card" style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '12px', marginTop: '8px' }}>
                <p style={{ fontSize: '12px', color: '#92400e', margin: 0 }}>
                  ⚠️ This is a demo. In production, connect to your payment gateway's SDK and never expose secret keys on the frontend.
                </p>
              </div>
            </div>

            {/* AI Settings */}
            <div className="forge-card" style={{ padding: '24px', gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={16} color="#4361ee" /> AI Configuration
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Anthropic API Key</label>
                  <input type="password" className="forge-input" placeholder="sk-ant-..." style={{ fontSize: '13px', fontFamily: 'JetBrains Mono' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>AI Model</label>
                  <select className="forge-input" style={{ fontSize: '14px' }}>
                    <option>claude-sonnet-4-20250514</option>
                    <option>claude-haiku-4-5-20251001</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" onClick={saveSettings} style={{ padding: '12px 28px' }}>
                <Check size={16} /> Save All Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
