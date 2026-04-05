import styles from './Footer.module.css'

const LINKS = {
  Product: ['Resume Builder', 'CV Builder', 'Cover Letter', 'Templates', 'AI Assistant', 'ATS Checker'],
  Resources: ['Resume Examples', 'Career Blog', 'Interview Tips', 'Salary Guide', 'Job Search', 'Resume Guide'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact Us'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Accessibility'],
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>Resume<em>Forge</em></span>
            <p className={styles.desc}>
              Professional resume builder trusted by 2M+ job seekers. Create, optimize, and land your dream role faster.
            </p>
            <div className={styles.social}>
              {['𝕏', 'in', 'f', '▶'].map((icon, i) => (
                <a key={i} href="#" className={styles.socialLink} aria-label={`Social ${i}`}>{icon}</a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group} className={styles.col}>
              <h4 className={styles.colTitle}>{group}</h4>
              <ul>
                {links.map(link => (
                  <li key={link}><a href="#" className={styles.link}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} ResumeForge. All rights reserved.</span>
          <span>Made with ♥ for job seekers everywhere</span>
        </div>
      </div>
    </footer>
  )
}
