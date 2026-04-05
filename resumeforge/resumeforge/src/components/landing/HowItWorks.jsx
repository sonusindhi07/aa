import { useInView } from '../../hooks/useInView'
import styles from './HowItWorks.module.css'

const STEPS = [
  { num: '01', icon: '🎨', title: 'Pick a Template', desc: 'Browse 180+ professionally designed templates. Filter by industry, style, or career level to find your perfect match.' },
  { num: '02', icon: '✍️', title: 'Fill in Your Details', desc: 'Use our smart form and AI assistant to craft compelling content. Watch your resume come alive in real time.' },
  { num: '03', icon: '🤖', title: 'AI Boost (Optional)', desc: 'Let our AI review your content, suggest stronger language, and tailor your resume to a specific job description.' },
  { num: '04', icon: '🚀', title: 'Download & Apply', desc: 'Export a pixel-perfect PDF or DOCX, share your public link, and apply to matched jobs — all in one place.' },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>The Process</div>
          <h2 className={styles.h2}>
            Ready in <em>4 simple steps</em>
          </h2>
          <p className={styles.sub}>
            Most users finish their first resume in under 10 minutes.
            No design skills needed — just bring your career story.
          </p>
        </div>

        <div ref={ref} className={`${styles.steps} ${inView ? styles.visible : ''}`}>
          {STEPS.map((step, i) => (
            <div key={step.num} className={styles.step} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className={styles.stepNum}>{step.num}</div>
              <div className={styles.stepIcon}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
              {i < STEPS.length - 1 && <div className={styles.connector} />}
            </div>
          ))}
        </div>

        <div className={styles.proofBar}>
          {[
            { val: '< 10 min', label: 'Average build time' },
            { val: '94%', label: 'Users satisfied' },
            { val: '3.2×', label: 'More interviews' },
            { val: '50K+', label: 'Hired this year' },
          ].map(({ val, label }) => (
            <div key={label} className={styles.proofItem}>
              <div className={styles.proofVal}>{val}</div>
              <div className={styles.proofLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
