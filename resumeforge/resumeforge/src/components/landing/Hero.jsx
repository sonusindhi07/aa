import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

const WORDS = ['dream job', 'next chapter', 'career leap', 'big break']

export default function Hero({ onBuild }) {
  const [wordIdx, setWordIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 350)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg} />
      <div className={styles.dots} />
      <div className={styles.grain} />

      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Trusted by 2M+ professionals worldwide
          </div>

          <h1 className={styles.heading}>
            Land your{' '}
            <span className={`${styles.word} ${visible ? styles.in : styles.out}`}>
              {WORDS[wordIdx]}
            </span>
            <br />with a{' '}
            <em className={styles.italic}>stellar resume</em>
          </h1>

          <p className={styles.sub}>
            Professional templates, AI-powered suggestions, and a live editor.
            Create a beautiful, ATS-ready resume in minutes — not hours.
          </p>

          <div className={styles.actions}>
            <button className={styles.btnPrimary} onClick={() => onBuild()}>
              <span>✦</span> Build My Resume Free
            </button>
            <a href="#templates" className={styles.btnOutline}>
              Browse Templates
            </a>
          </div>

          <div className={styles.stats}>
            {[
              { num: '2M+', label: 'Resumes created' },
              { num: '85%', label: 'Interview rate' },
              { num: '180+', label: 'Pro templates' },
              { num: '4.8★', label: 'Trustpilot rating' },
            ].map(({ num, label }) => (
              <div key={label} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <FloatingBadge className={styles.badge1} icon="✓" iconBg="#d1fae5" iconColor="#065f46" title="ATS Optimized" sub="Passes all scanners" />
          <div className={styles.resumeCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardName}>Alexandra Chen</div>
              <div className={styles.cardTitle}>Senior Product Designer</div>
              <div className={styles.cardContact}>
                <span>📧 alex@email.com</span>
                <span>📍 San Francisco</span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.cardLeft}>
                <div className={styles.cardSectionLabel}>SKILLS</div>
                {['Figma & Prototyping', 'User Research', 'Design Systems', 'Product Strategy'].map((s, i) => (
                  <div key={s} className={styles.cardSkill}>
                    <div className={styles.cardSkillName}>{s}</div>
                    <div className={styles.cardSkillBar}>
                      <div className={styles.cardSkillFill} style={{ width: `${[92, 85, 80, 72][i]}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.cardRight}>
                <div className={styles.cardSectionLabel}>EXPERIENCE</div>
                {[
                  { title: 'Lead Designer', co: 'Figma Inc.' },
                  { title: 'Senior UX Designer', co: 'Airbnb' },
                  { title: 'UX Designer', co: 'Google' },
                ].map(({ title, co }) => (
                  <div key={co} className={styles.cardExpItem}>
                    <div className={styles.cardExpTitle}>{title}</div>
                    <div className={styles.cardExpCo}>{co}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FloatingBadge className={styles.badge2} icon="⬇" iconBg="#dbeafe" iconColor="#1e40af" title="Download Ready" sub="PDF & DOCX" />
          <div className={styles.badge3}>
            <div className={styles.avatarRow}>
              {['#6366f1','#ec4899','#14b8a6'].map((c, i) => (
                <div key={i} className={styles.miniAvatar} style={{ background: c, marginLeft: i ? '-8px' : 0 }} />
              ))}
            </div>
            <span>+12k hired this month</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FloatingBadge({ className, icon, iconBg, iconColor, title, sub }) {
  return (
    <div className={`${styles.floatingBadge} ${className}`}>
      <div className={styles.badgeIcon} style={{ background: iconBg, color: iconColor }}>{icon}</div>
      <div>
        <div className={styles.badgeTitle}>{title}</div>
        <div className={styles.badgeSub}>{sub}</div>
      </div>
    </div>
  )
}
