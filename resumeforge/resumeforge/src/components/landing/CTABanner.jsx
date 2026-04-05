import styles from './CTABanner.module.css'

export default function CTABanner({ onBuild }) {
  return (
    <section className={styles.banner}>
      <div className={styles.glow} />
      <div className={styles.content}>
        <div className={styles.label}>Get Started Today</div>
        <h2 className={styles.h2}>
          Your next interview is one <em>great resume</em> away
        </h2>
        <p className={styles.sub}>
          Join 2 million professionals who've accelerated their careers with ResumeForge.
          Free to start, no credit card required.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={() => onBuild()}>
            ✦ Build My Resume — It's Free
          </button>
          <a href="#templates" className={styles.btnSecondary}>Browse Templates</a>
        </div>
        <div className={styles.logos}>
          <span>Trusted by people at</span>
          {['Google', 'Meta', 'Apple', 'Amazon', 'Microsoft', 'Stripe'].map(c => (
            <span key={c} className={styles.company}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
