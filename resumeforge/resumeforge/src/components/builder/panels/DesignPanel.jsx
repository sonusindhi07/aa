import { THEMES, FONTS } from '../../../data/defaultResume'
import styles from './DesignPanel.module.css'

const LAYOUT_OPTIONS = [
  { id: 'two-col', label: 'Two Column', desc: 'Sidebar + main', icon: '⊟' },
  { id: 'classic', label: 'Classic', desc: 'Single column', icon: '≡' },
]

export default function DesignPanel({ theme, setTheme, font, setFont }) {
  return (
    <div className={styles.panel}>
      {/* Color Themes */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Color Theme</div>
        <div className={styles.swatches}>
          {Object.entries(THEMES).map(([id, t]) => (
            <button
              key={id}
              className={`${styles.swatch} ${theme === id ? styles.swatchActive : ''}`}
              style={{ background: t.primary }}
              onClick={() => setTheme(id)}
              title={t.label}
            >
              {theme === id && <span className={styles.swatchCheck}>✓</span>}
            </button>
          ))}
        </div>
        <div className={styles.themeLabel}>
          Current: <strong>{THEMES[theme]?.label}</strong>
        </div>
      </div>

      {/* Font Family */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Font Style</div>
        <div className={styles.fontOptions}>
          {Object.entries(FONTS).map(([id, f]) => (
            <button
              key={id}
              className={`${styles.fontBtn} ${font === id ? styles.fontBtnActive : ''}`}
              style={{ fontFamily: f.display }}
              onClick={() => setFont(id)}
            >
              <span className={styles.fontName}>{f.label.split(' ')[0]}</span>
              <span className={styles.fontSample} style={{ fontFamily: f.display }}>Aa</span>
            </button>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Layout</div>
        <div className={styles.layoutOptions}>
          {LAYOUT_OPTIONS.map(l => (
            <button key={l.id} className={`${styles.layoutBtn} ${l.id === 'two-col' ? styles.layoutActive : ''}`}>
              <span className={styles.layoutIcon}>{l.icon}</span>
              <span className={styles.layoutLabel}>{l.label}</span>
              <span className={styles.layoutDesc}>{l.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Preview */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Theme Preview</div>
        <div className={styles.themePreview} style={{ borderColor: THEMES[theme]?.accent }}>
          <div className={styles.previewHeader} style={{ background: THEMES[theme]?.primary }}>
            <div className={styles.previewName}>Your Name</div>
            <div className={styles.previewTitle} style={{ color: THEMES[theme]?.accent }}>Your Title</div>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewLine} style={{ background: THEMES[theme]?.accent, width: '70%', opacity: 0.5 }} />
            <div className={styles.previewLine} style={{ width: '90%' }} />
            <div className={styles.previewLine} style={{ width: '60%' }} />
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className={styles.tipBox}>
        <div className={styles.tipTitle}>💡 Design Tips</div>
        <ul className={styles.tipList}>
          <li>Use dark themes for tech & creative roles</li>
          <li>Classic/light themes for law, finance & medicine</li>
          <li>Playfair looks best on modern templates</li>
          <li>Keep font size between 10–12pt for ATS readability</li>
        </ul>
      </div>
    </div>
  )
}
