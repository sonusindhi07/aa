import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8faff', fontFamily: 'DM Sans', textAlign: 'center', padding: '5%' }}>
      <div>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(80px, 15vw, 160px)', fontWeight: 700, color: '#e2e8f0', lineHeight: 1, marginBottom: '8px' }}>404</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #4361ee, #f72585)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={16} color="white" />
          </div>
          <span style={{ fontFamily: 'Playfair Display', fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>ResumeForge</span>
        </div>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '28px', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
            <Home size={16} /> Go Home
          </Link>
          <button className="btn-secondary" onClick={() => window.history.back()}>
            <ArrowLeft size={16} /> Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
