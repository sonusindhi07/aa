import { useInView } from '../../hooks/useInView'
import styles from './Features.module.css'

const FEATURES = [
  { icon: '🤖', title: 'AI Writing Assistant', desc: 'Generate polished bullet points, executive summaries, and cover letters tailored to your role. Trained on 10M+ successful resumes.', tag: 'AI Powered' },
  { icon: '⚡', title: 'Real-Time Preview', desc: 'Every keystroke updates your resume instantly. See exactly what recruiters will see before you hit download.', tag: 'Live Editor' },
  { icon: '🎨', title: '180+ Pro Templates', desc: 'Designed by typographers, approved by Fortune 500 recruiters. Modern, classic, creative, and industry-specific styles.', tag: 'Design' },
  { icon: '✅', title: 'ATS Optimizer', desc: 'Our scanner checks against 30+ ATS criteria — keyword density, formatting, section headers — and tells you exactly what to fix.', tag: 'Smart' },
  { icon: '🎯', title: 'Job Match Analysis', desc: 'Paste any job description. We score your resume against it and auto-suggest missing keywords and improvements.', tag: 'Analysis' },
  { icon: '📄', title: 'Export Anywhere', desc: 'Download as pixel-perfect PDF or editable DOCX. Share with a public link. Import directly into LinkedIn.', tag: 'Export' },
  { icon: '💬', title: 'Interview Prep', desc: 'Practice with AI-generated interview questions based on your specific resume and target role. Arrive prepared.', tag: 'Coaching' },
  { icon: '📊', title: 'Analytics Dashboard', desc: 'See who viewed your resume, which sections they spent time on, and when they shared it with the team.', tag: 'Insights' },
  { icon: '🌐', title: 'Multi-Language', desc: 'Create resumes in 25+ languages. Auto-translate your existing content while preserving formatting and tone.', tag: 'Global' },
]

export default function Features() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="features">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Why ResumeForge</div>
          <h2 className={styles.h2}>
            Everything you need to <em>get hired faster</em>
          </h2>
          <p className={styles.sub}>
            Built by recruiters who've screened 500K+ resumes. Every feature
            solves a real reason candidates get rejected.
          </p>
        </div>

        <div ref={ref} className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={styles.card} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className={styles.cardTop}>
                <span className={styles.icon}>{f.icon}</span>
                <span className={styles.tag}>{f.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
