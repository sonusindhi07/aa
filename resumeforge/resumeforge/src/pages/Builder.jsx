import { useState, useReducer } from 'react'
import BuilderNav from '../components/builder/BuilderNav'
import Sidebar from '../components/builder/Sidebar'
import ResumePreview from '../components/builder/preview/ResumePreview'
import { defaultResume, THEMES, FONTS } from '../data/defaultResume'
import styles from './Builder.module.css'

function resumeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_CONTACT':
      return { ...state, contact: { ...state.contact, ...action.payload } }
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload }
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      }
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter(e => e.id !== action.payload) }
    case 'REORDER_EXPERIENCE':
      return { ...state, experience: action.payload }
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map(e =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      }
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter(e => e.id !== action.payload) }
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] }
    case 'UPDATE_SKILL':
      return {
        ...state,
        skills: state.skills.map(s =>
          s.id === action.payload.id ? { ...s, ...action.payload } : s
        ),
      }
    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter(s => s.id !== action.payload) }
    default:
      return state
  }
}

export default function Builder({ onBack, initialTemplate }) {
  const [resume, dispatch] = useReducer(resumeReducer, defaultResume)
  const [theme, setTheme] = useState(initialTemplate in THEMES ? initialTemplate : 'midnight')
  const [font, setFont] = useState('playfair')
  const [zoom, setZoom] = useState(85)
  const [activeTab, setActiveTab] = useState('content')
  const [toast, setToast] = useState(null)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className={styles.builder}>
      <BuilderNav onBack={onBack} onDownload={() => showToast('PDF export ready! (Connect jsPDF in production)', 'info')} />
      <div className={styles.layout}>
        <Sidebar
          resume={resume}
          dispatch={dispatch}
          theme={theme}
          setTheme={setTheme}
          font={font}
          setFont={setFont}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showToast={showToast}
        />
        <div className={styles.previewPane}>
          <div className={styles.previewToolbar}>
            <span className={styles.previewLabel}>Live Preview</span>
            <div className={styles.zoomControls}>
              <button className={styles.zoomBtn} onClick={() => setZoom(z => Math.max(50, z - 10))}>−</button>
              <span className={styles.zoomVal}>{zoom}%</span>
              <button className={styles.zoomBtn} onClick={() => setZoom(z => Math.min(130, z + 10))}>+</button>
              <button className={styles.zoomBtn} onClick={() => setZoom(85)} title="Reset zoom">↺</button>
            </div>
          </div>
          <div className={styles.previewScroll}>
            <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', marginBottom: `${(zoom - 100) * 6}px` }}>
              <ResumePreview resume={resume} theme={THEMES[theme]} fontConfig={FONTS[font]} />
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.type === 'success' ? '✓' : 'ℹ'} {toast.msg}
        </div>
      )}
    </div>
  )
}
