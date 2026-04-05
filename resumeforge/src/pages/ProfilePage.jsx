import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store'
import toast from 'react-hot-toast'
import {
  User, Mail, Lock, Shield, CreditCard, Bell, Linkedin,
  Check, Edit2, Camera, ArrowLeft, Crown, Zap, Star,
  ExternalLink, Trash2, Download, Globe
} from 'lucide-react'

const PLAN_COLORS = { free: '#64748b', pro: '#4361ee', enterprise: '#d97706' }
const PLAN_BG = { free: '#f1f5f9', pro: '#e0eaff', enterprise: '#fef3c7' }

export default function ProfilePage() {
  const { user, subscription, logout } = useAuthStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('account')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' })

  const handleSave = () => {
    setEditing(false)
    toast.success('Profile updated!')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Signed out successfully')
  }

  const TABS = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8faff', fontFamily: 'DM Sans' }}>
      {/* Top bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '0 5%' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', height: '64px', gap: '16px' }}>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none', color: '#64748b', fontSize: '14px' }}>
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span style={{ color: '#e2e8f0' }}>|</span>
          <span style={{ fontFamily: 'Playfair Display', fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Account Settings</span>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 5%', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '28px' }}>
        {/* Sidebar */}
        <div>
          <div className="forge-card" style={{ padding: '24px', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #4361ee, #f72585)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 700 }}>
                {(user?.name || 'U').charAt(0)}
              </div>
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: '50%', background: '#4361ee', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                onClick={() => toast('Photo upload available in full version', { icon: '📷' })}>
                <Camera size={10} color="white" />
              </button>
            </div>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#1e293b' }}>{user?.name}</div>
            <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>{user?.email}</div>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px', background: PLAN_BG[subscription], color: PLAN_COLORS[subscription] }}>
              <Crown size={10} style={{ display: 'inline', marginRight: 4 }} />{subscription?.toUpperCase()} PLAN
            </span>
          </div>

          <div className="forge-card" style={{ padding: '8px 0', overflow: 'hidden' }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', background: activeTab === id ? '#f0f4ff' : 'transparent', border: 'none', cursor: 'pointer', color: activeTab === id ? '#4361ee' : '#64748b', fontSize: '14px', fontWeight: activeTab === id ? 600 : 400, fontFamily: 'DM Sans', textAlign: 'left', transition: 'all 0.15s' }}>
                <Icon size={15} />{label}
              </button>
            ))}
            <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
            <button onClick={handleLogout}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '14px', fontFamily: 'DM Sans', textAlign: 'left' }}>
              <ArrowLeft size={15} />Sign Out
            </button>
          </div>
        </div>

        {/* Main Panel */}
        <div>
          {/* Account */}
          {activeTab === 'account' && (
            <div className="forge-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Account Information</h2>
                {!editing && (
                  <button className="btn-secondary" onClick={() => setEditing(true)} style={{ fontSize: '13px' }}>
                    <Edit2 size={13} /> Edit Profile
                  </button>
                )}
              </div>

              {editing ? (
                <div>
                  {[
                    { key: 'name', label: 'Full Name', icon: User, type: 'text' },
                    { key: 'email', label: 'Email Address', icon: Mail, type: 'email' },
                  ].map(({ key, label, icon: Icon, type }) => (
                    <div key={key} style={{ marginBottom: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>{label}</label>
                      <div style={{ position: 'relative' }}>
                        <Icon size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                          className="forge-input" style={{ paddingLeft: 36, fontSize: '14px' }} />
                      </div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" onClick={handleSave}><Check size={14} /> Save Changes</button>
                    <button className="btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  {[
                    { label: 'Full Name', value: user?.name, icon: User },
                    { label: 'Email', value: user?.email, icon: Mail },
                    { label: 'Account Type', value: subscription, icon: Crown },
                    { label: 'Member Since', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }), icon: Star },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '8px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={15} color="#4361ee" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{label}</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', textTransform: label === 'Account Type' ? 'capitalize' : 'none' }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div>
              <div className="forge-card" style={{ padding: '28px', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>Current Plan</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: '#f0f4ff', borderRadius: '12px', border: '1.5px solid #c7d7ff', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', textTransform: 'capitalize' }}>{subscription} Plan</div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                      {subscription === 'free' ? 'Free forever with limited features' : `$${subscription === 'pro' ? '9.99' : '29.99'}/month`}
                    </div>
                  </div>
                  {subscription === 'free' && (
                    <Link to="/pricing" className="btn-primary" style={{ textDecoration: 'none', fontSize: '14px' }}>
                      <Crown size={14} /> Upgrade to Pro
                    </Link>
                  )}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>Payment Method</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', background: '#f8faff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div style={{ width: 40, height: 28, background: '#1e293b', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 700 }}>VISA</div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>•••• •••• •••• 4242</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Expires 12/27</div>
                  </div>
                  <button className="btn-secondary" style={{ marginLeft: 'auto', fontSize: '12px' }} onClick={() => toast('Card management in full version')}>Update</button>
                </div>
              </div>

              <div className="forge-card" style={{ padding: '28px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '16px' }}>Billing History</h3>
                {[
                  { date: '2025-01-01', desc: 'Pro Plan - Monthly', amount: '$9.99', status: 'Paid' },
                  { date: '2024-12-01', desc: 'Pro Plan - Monthly', amount: '$9.99', status: 'Paid' },
                  { date: '2024-11-01', desc: 'Pro Plan - Monthly', amount: '$9.99', status: 'Paid' },
                ].map((inv, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{inv.desc}</div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>{inv.date}</div>
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{inv.amount}</div>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#065f46', background: '#d1fae5', padding: '3px 8px', borderRadius: '99px' }}>{inv.status}</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }} onClick={() => toast('Invoice download in full version')}>
                      <Download size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="forge-card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Connected Accounts</h2>
              {[
                { name: 'LinkedIn', desc: 'Import your LinkedIn profile to auto-fill resume data', icon: '🔗', color: '#0077b5', connected: false },
                { name: 'Google', desc: 'Sign in with your Google account', icon: 'G', color: '#ea4335', connected: true },
                { name: 'GitHub', desc: 'Showcase your repositories and contributions', icon: '⌥', color: '#333', connected: false },
              ].map(({ name, desc, icon, color, connected }) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '10px', background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700, color }}>
                    {icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>{desc}</div>
                  </div>
                  <button
                    className={connected ? 'btn-secondary' : 'btn-primary'}
                    style={{ fontSize: '13px' }}
                    onClick={() => connected ? toast.success(`${name} disconnected`) : toast.success(`${name} connected! (demo)`)}>
                    {connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="forge-card" style={{ padding: '28px' }}>
              <h2 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '24px' }}>Notification Preferences</h2>
              {[
                { label: 'Resume views', desc: 'Get notified when your resume link is viewed', on: true },
                { label: 'Job match alerts', desc: 'Receive alerts for jobs matching your resume', on: true },
                { label: 'AI writing tips', desc: 'Weekly tips to improve your resume with AI', on: false },
                { label: 'Product updates', desc: 'New features and template announcements', on: true },
                { label: 'Billing reminders', desc: 'Payment and subscription reminders', on: true },
              ].map(({ label, desc, on }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{label}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{desc}</div>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: '99px', background: on ? '#4361ee' : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}
                    onClick={() => toast('Toggle saved (demo)')}>
                    <div style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left 0.2s' }} />
                  </div>
                </div>
              ))}
              <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => toast.success('Preferences saved')}>Save Preferences</button>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div>
              <div className="forge-card" style={{ padding: '28px', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: '#1e293b', marginBottom: '20px' }}>Change Password</h2>
                {['Current Password', 'New Password', 'Confirm New Password'].map((label, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>{label}</label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                      <input type="password" className="forge-input" style={{ paddingLeft: 36, fontSize: '14px' }} placeholder="••••••••" />
                    </div>
                  </div>
                ))}
                <button className="btn-primary" onClick={() => toast.success('Password updated!')}>Update Password</button>
              </div>

              <div className="forge-card" style={{ padding: '28px', border: '1.5px solid #fee2e2' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trash2 size={16} /> Danger Zone
                </h3>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>Permanently delete your account and all your data. This cannot be undone.</p>
                <button style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'DM Sans' }}
                  onClick={() => toast.error('Account deletion requires email confirmation')}>
                  Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
