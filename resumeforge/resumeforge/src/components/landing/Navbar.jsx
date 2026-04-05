import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar({ onBuild }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#home" className={styles.logo}>
        Resume<span>Forge</span>
      </a>

      <ul className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
        <li><a href="#templates" onClick={() => setMobileOpen(false)}>Templates</a></li>
        <li><a href="#features" onClick={() => setMobileOpen(false)}>Features</a></li>
        <li><a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a></li>
        <li><a href="#testimonials" onClick={() => setMobileOpen(false)}>Reviews</a></li>
        <li>
          <button className={styles.cta} onClick={() => { onBuild(); setMobileOpen(false) }}>
            Build My Resume →
          </button>
        </li>
      </ul>

      <button className={styles.burger} onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
