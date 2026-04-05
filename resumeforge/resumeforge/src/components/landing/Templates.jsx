import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import { TEMPLATES } from '../../data/templates'
import styles from './Templates.module.css'

const CATEGORIES = ['all', 'modern', 'classic', 'creative', 'simple']

const PREVIEW_COLORS = {
  midnight: { headerBg: '#08090e', headerText: '#fff', accentColor: '#c8993f', bodyBg: '#fff' },
  ivory:    { headerBg: '#f8f4ed', headerText: '#08090e', accentColor: '#c8993f', bodyBg: '#fff' },
  ocean:    { headerBg: '#1e3a5f', headerText: '#fff', accentColor: '#3b82f6', bodyBg: '#fff' },
  cardinal: { headerBg: '#fff', headerText: '#08090e', accentColor: '#dc2626', bodyBg: '#fff' },
  slate:    { headerBg: '#1e293b', headerText: '#fff', accentColor: '#64748b', bodyBg: '#fff' },
  sky:      { headerBg: '#f0f4ff', headerText: '#1e40af', accentColor: '#2563eb', bodyBg: '#fff' },
  forest:   { headerBg: '#065f46', headerText: '#fff', accentColor: '#10b981', bodyBg: '#fff' },
  neon:     { headerBg: '#1a1a2e', headerText: '#fff', accentColor: '#7c3aed', bodyBg: '#1a1a2e' },
  rose:     { headerBg: '#fff5f5', headerText: '#9f1239', accentColor: '#f43f5e', bodyBg: '#fff' },
  minimal:  { headerBg: '#fff', headerText: '#08090e', accentColor: '#08090e', bodyBg: '#fff' },
  amber:    { headerBg: '#78350f', headerText: '#fff', accentColor: '#d97706', bodyBg: '#fef3c7' },
  nordic:   { headerBg: '#f8fafc', headerText: '#0f172a', accentColor: '#0ea5e9', bodyBg: '#fff' },
}

function TemplateCard({ tpl, onBuild }) {
  const [hovered, setHovered] = useState(false)
  const c = PREVIEW_COLORS[tpl.id] || PREVIEW_COLORS.midnight

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Mini resume preview */}
      <div className={styles.preview} style={{ background: c.bodyBg }}>
        <div className={styles.previewHeader} style={{ background: c.headerBg, borderLeft: tpl.id === 'cardinal' ? `5px solid ${c.accentColor}` : 'none' }}>
          <div className={styles.previewName} style={{ color: c.headerText }}>{tpl.id === 'neon' ? 'ZOE CHEN' : 'J. Morrison'}</div>
          <div className={styles.previewRole} style={{ color: c.accentColor, opacity: tpl.id === 'midnight' || tpl.id === 'neon' || tpl.id === 'slate' || tpl.id === 'forest' || tpl.id === 'ocean' || tpl.id === 'amber' ? 0.7 : 1 }}>
            Software Engineer
          </div>
          <div className={styles.previewLine} style={{ background: c.accentColor, opacity: 0.3 }} />
          <div className={styles.previewLine} style={{ background: c.accentColor, opacity: 0.2, width: '65%' }} />
        </div>
        <div className={styles.previewBody}>
          <div className={styles.previewSection}>
            <div className={styles.previewSectionTitle} style={{ color: c.accentColor }}>EXPERIENCE</div>
            <div className={styles.previewBodyLine} />
            <div className={styles.previewBodyLine} style={{ width: '80%' }} />
            <div className={styles.previewBodyLine} style={{ width: '65%' }} />
          </div>
          <div className={styles.previewSection}>
            <div className={styles.previewSectionTitle} style={{ color: c.accentColor }}>SKILLS</div>
            {[90, 75, 60].map((w, i) => (
              <div key={i} className={styles.skillBarWrap}>
                <div className={styles.skillBar}>
                  <div className={styles.skillFill} style={{ width: `${w}%`, background: c.accentColor }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {hovered && (
          <div className={styles.overlay}>
            <button className={styles.overlayBtn} onClick={() => onBuild(tpl.id)}>
              Use Template →
            </button>
            <button className={styles.previewBtn}>Preview</button>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div>
          <div className={styles.tplName}>{tpl.name}</div>
          <div className={styles.tplDesc}>{tpl.description}</div>
        </div>
        <span className={`${styles.tag} ${tpl.tag === 'FREE' ? styles.free : styles.pro}`}>
          {tpl.tag}
        </span>
      </div>
    </div>
  )
}

export default function Templates({ onBuild }) {
  const [active, setActive] = useState('all')
  const [ref, inView] = useInView()

  const filtered = active === 'all' ? TEMPLATES : TEMPLATES.filter(t => t.category === active)

  return (
    <section className={styles.section} id="templates">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Template Library</div>
          <h2 className={styles.h2}>
            Designs that get <em>noticed</em>
          </h2>
          <p className={styles.sub}>
            Every template is ATS-tested, recruiter-approved, and crafted to make your
            experience stand out from the stack.
          </p>
        </div>

        <div className={styles.tabs}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`${styles.tab} ${active === cat ? styles.tabActive : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              {cat === 'all' && <span className={styles.tabCount}>{TEMPLATES.length}</span>}
            </button>
          ))}
        </div>

        <div ref={ref} className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {filtered.map((tpl, i) => (
            <div key={tpl.id} style={{ transitionDelay: `${i * 50}ms` }} className={styles.cardWrap}>
              <TemplateCard tpl={tpl} onBuild={onBuild} />
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <button className={styles.ctaBtn} onClick={() => onBuild()}>
            View All 180+ Templates →
          </button>
        </div>
      </div>
    </section>
  )
}
