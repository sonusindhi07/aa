import { useState } from 'react'
import ContactPanel from './panels/ContactPanel'
import ExperiencePanel from './panels/ExperiencePanel'
import EducationPanel from './panels/EducationPanel'
import SkillsPanel from './panels/SkillsPanel'
import DesignPanel from './panels/DesignPanel'
import styles from './Sidebar.module.css'

const CONTENT_TABS = [
  { id: 'contact',    label: '👤 Contact',    icon: '👤' },
  { id: 'experience', label: '💼 Experience', icon: '💼' },
  { id: 'education',  label: '🎓 Education',  icon: '🎓' },
  { id: 'skills',     label: '⚡ Skills',     icon: '⚡' },
]

export default function Sidebar({
  resume, dispatch,
  theme, setTheme,
  font, setFont,
  activeTab, setActiveTab,
  showToast,
}) {
  const [contentSection, setContentSection] = useState('contact')

  return (
    <aside className={styles.sidebar}>
      {/* Top-level tabs: Content / Design */}
      <div className={styles.modeTabs}>
        {['content', 'design'].map(t => (
          <button
            key={t}
            className={`${styles.modeTab} ${activeTab === t ? styles.modeTabActive : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t === 'content' ? '✏️ Content' : '🎨 Design'}
          </button>
        ))}
      </div>

      {activeTab === 'content' && (
        <>
          {/* Section nav pills */}
          <div className={styles.sectionNav}>
            {CONTENT_TABS.map(tab => (
              <button
                key={tab.id}
                className={`${styles.sectionBtn} ${contentSection === tab.id ? styles.sectionBtnActive : ''}`}
                onClick={() => setContentSection(tab.id)}
              >
                <span className={styles.sectionIcon}>{tab.icon}</span>
                <span className={styles.sectionLabel}>{tab.id.charAt(0).toUpperCase() + tab.id.slice(1)}</span>
              </button>
            ))}
          </div>

          <div className={styles.panelBody}>
            {contentSection === 'contact'    && <ContactPanel    resume={resume} dispatch={dispatch} />}
            {contentSection === 'experience' && <ExperiencePanel resume={resume} dispatch={dispatch} showToast={showToast} />}
            {contentSection === 'education'  && <EducationPanel  resume={resume} dispatch={dispatch} showToast={showToast} />}
            {contentSection === 'skills'     && <SkillsPanel     resume={resume} dispatch={dispatch} showToast={showToast} />}
          </div>
        </>
      )}

      {activeTab === 'design' && (
        <div className={styles.panelBody}>
          <DesignPanel theme={theme} setTheme={setTheme} font={font} setFont={setFont} />
        </div>
      )}
    </aside>
  )
}
