import { useInView } from '../../hooks/useInView'
import styles from './Testimonials.module.css'

const TESTIMONIALS = [
  { name: 'Sneha Mehta', role: 'Software Engineer @ Google', avatar: 'SM', bg: '#6366f1', stars: 5, text: 'I had three interviews within a week of updating my resume. The AI suggestions were spot-on — they made my bullet points sound so much more impactful. Landed Google in 3 weeks.' },
  { name: 'Jordan Blake', role: 'Marketing Director @ Meta', avatar: 'JB', bg: '#ec4899', stars: 5, text: 'The ATS optimizer caught issues I never would have noticed. Got callbacks from 6 out of 8 applications — incredible. My old resume had zero responses for months.' },
  { name: 'Arjun Patel', role: 'Data Analyst @ Deloitte', avatar: 'AP', bg: '#14b8a6', stars: 5, text: 'As a recent grad with limited experience, the templates helped me look professional from day one. The resume builder practically writes itself. First job in 3 weeks!' },
  { name: 'Maya Robinson', role: 'UX Designer @ Figma', avatar: 'MR', bg: '#22c55e', stars: 5, text: 'Switched careers from teaching to UX design. The job match tool helped me frame my transferable skills perfectly. Got my first design role in a competitive market.' },
  { name: 'Kabir Tandon', role: 'VP Finance @ JP Morgan', avatar: 'KT', bg: '#f59e0b', stars: 5, text: 'The live preview editor is a game changer. I could see exactly how my resume would look to a recruiter while typing. Cleaned up my layout in 20 minutes.' },
  { name: 'Laura Nguyen', role: 'CPO @ Stripe', avatar: 'LN', bg: '#a855f7', stars: 5, text: 'Used ResumeForge for my C-suite job search. Templates are elegant and premium. Within 2 months I had 4 executive-level offers. Absolutely worth every penny.' },
]

export default function Testimonials() {
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Success Stories</div>
          <h2 className={styles.h2}>
            Real people, <em>real results</em>
          </h2>
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <strong>4.8 / 5</strong> from 55,000+ Trustpilot reviews
          </div>
        </div>

        <div ref={ref} className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={styles.card} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.author}>
                <div className={styles.avatar} style={{ background: t.bg }}>{t.avatar}</div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
