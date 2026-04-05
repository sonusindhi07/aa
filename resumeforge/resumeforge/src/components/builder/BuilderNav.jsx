import styles from './BuilderNav.module.css'

const STEPS = ['Contact', 'Experience', 'Education', 'Skills', 'Design']

export default function BuilderNav({ onBack, onDownload }) {
  return (
    <div className={styles.nav}>
      <div className={styles.left}>
        <button className={styles.backBtn} onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Home
        </button>
        <span className={styles.logo}>Resume<em>Forge</em></span>
        <div className={styles.stepDots}>
          {STEPS.map((s, i) => (
            <div key={s} className={styles.stepDot} title={s}>
              <span className={i <= 1 ? styles.dotDone : i === 2 ? styles.dotActive : styles.dotEmpty} />
              <span className={styles.dotLabel}>{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.btnOutline}>Share Link</button>
        <button className={styles.btnOutline} onClick={() => alert('DOCX export — integrate with docx.js in production')}>
          ⬇ DOCX
        </button>
        <button className={styles.btnPrimary} onClick={onDownload}>
          ⬇ Download PDF
        </button>
      </div>
    </div>
  )
}
