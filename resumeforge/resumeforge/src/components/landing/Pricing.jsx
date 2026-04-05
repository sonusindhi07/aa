import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import styles from './Pricing.module.css'

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    price: { monthly: '0', annual: '0' },
    period: 'Forever free',
    features: [
      { text: '1 resume (Vancouver template)', ok: true },
      { text: 'PDF download', ok: true },
      { text: 'Live preview editor', ok: true },
      { text: 'Basic ATS check', ok: true },
      { text: 'AI writing assistant', ok: false },
      { text: 'All 180+ templates', ok: false },
      { text: 'Cover letter builder', ok: false },
      { text: 'Job match analysis', ok: false },
    ],
    cta: 'Get Started Free',
    style: 'outline',
  },
  {
    id: 'pro',
    name: 'Professional',
    price: { monthly: '7', annual: '4' },
    period: 'per month',
    featured: true,
    badge: '⭐ Most Popular',
    features: [
      { text: 'Unlimited resumes', ok: true },
      { text: 'PDF + DOCX download', ok: true },
      { text: 'Full ATS optimizer (30+ checks)', ok: true },
      { text: 'Live preview editor', ok: true },
      { text: 'AI writing assistant', ok: true },
      { text: 'All 180+ templates', ok: true },
      { text: 'Cover letter builder', ok: true },
      { text: 'Job match analysis', ok: true },
    ],
    cta: 'Start 7-Day Free Trial',
    style: 'gold',
  },
  {
    id: 'suite',
    name: 'Career Suite',
    price: { monthly: '15', annual: '9' },
    period: 'per month',
    features: [
      { text: 'Everything in Professional', ok: true },
      { text: 'GPT-4 powered AI assistant', ok: true },
      { text: 'LinkedIn profile optimizer', ok: true },
      { text: 'Interview preparation AI', ok: true },
      { text: 'Salary negotiation guide', ok: true },
      { text: 'Job application tracker', ok: true },
      { text: '2hr career coaching session', ok: true },
      { text: 'White-glove resume review', ok: true },
    ],
    cta: 'Get Career Suite',
    style: 'outline',
  },
]

export default function Pricing({ onBuild }) {
  const [annual, setAnnual] = useState(false)
  const [ref, inView] = useInView()

  return (
    <section className={styles.section} id="pricing">
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className={styles.label}>Simple Pricing</div>
          <h2 className={styles.h2}>
            Start <em>free</em>, upgrade when ready
          </h2>
          <p className={styles.sub}>No hidden fees. Cancel anytime. Every plan includes our live editor and basic ATS check.</p>

          <div className={styles.toggle}>
            <span className={!annual ? styles.toggleActive : ''}>Monthly</span>
            <button
              className={`${styles.toggleBtn} ${annual ? styles.toggleOn : ''}`}
              onClick={() => setAnnual(a => !a)}
              aria-label="Toggle annual billing"
            >
              <span className={styles.toggleThumb} />
            </button>
            <span className={annual ? styles.toggleActive : ''}>
              Annual <em className={styles.save}>Save 40%</em>
            </span>
          </div>
        </div>

        <div ref={ref} className={`${styles.grid} ${inView ? styles.visible : ''}`}>
          {PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`${styles.card} ${plan.featured ? styles.featured : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {plan.badge && <div className={styles.badge}>{plan.badge}</div>}
              <div className={styles.planName}>{plan.name}</div>
              <div className={styles.priceRow}>
                <span className={styles.currency}>$</span>
                <span className={styles.price}>{annual ? plan.price.annual : plan.price.monthly}</span>
                {plan.id !== 'free' && <span className={styles.per}>/mo</span>}
              </div>
              <div className={styles.period}>
                {plan.id === 'free' ? plan.period : annual ? 'billed annually' : plan.period}
              </div>
              {plan.featured && annual && (
                <div className={styles.savings}>You save $36/year</div>
              )}
              <div className={styles.divider} />
              <ul className={styles.features}>
                {plan.features.map(f => (
                  <li key={f.text} className={`${styles.feature} ${!f.ok ? styles.featureOff : ''}`}>
                    <span className={styles.check}>{f.ok ? '✓' : '✗'}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
              <button
                className={`${styles.cta} ${styles[plan.style]}`}
                onClick={() => onBuild()}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className={styles.guarantee}>
          🔒 30-day money-back guarantee &nbsp;·&nbsp; No credit card required for free plan &nbsp;·&nbsp; Cancel anytime
        </p>
      </div>
    </section>
  )
}
