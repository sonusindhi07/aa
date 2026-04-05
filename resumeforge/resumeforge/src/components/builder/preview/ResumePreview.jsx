import styles from './ResumePreview.module.css'

export default function ResumePreview({ resume, theme, fontConfig }) {
  const { contact, summary, experience, education, skills } = resume
  const primary = theme?.primary || '#08090e'
  const accent  = theme?.accent  || '#c8993f'
  const accentLight = theme?.accentLight || '#fdf6e3'
  const bodyFont  = fontConfig?.body    || "'Syne', sans-serif"
  const dispFont  = fontConfig?.display || "'Playfair Display', serif"

  return (
    <div
      className={styles.paper}
      style={{ fontFamily: bodyFont }}
    >
      {/* Top accent bar */}
      <div className={styles.accentBar} style={{ background: accent }} />

      {/* Header */}
      <div className={styles.header} style={{ background: primary }}>
        <div className={styles.headerLeft}>
          <h1 className={styles.name} style={{ fontFamily: dispFont }}>
            {contact.name || 'Your Name'}
          </h1>
          <div className={styles.jobTitle} style={{ color: accent }}>
            {contact.title || 'Your Professional Title'}
          </div>
          {summary && (
            <p className={styles.summary}>{summary}</p>
          )}
        </div>
        <div className={styles.headerRight} style={{ background: `${primary}dd`, borderLeft: `1px solid rgba(255,255,255,0.1)` }}>
          <div className={styles.contactLabel} style={{ color: accent }}>CONTACT</div>
          {contact.email && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✉</span>
              <span>{contact.email}</span>
            </div>
          )}
          {contact.phone && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>✆</span>
              <span>{contact.phone}</span>
            </div>
          )}
          {contact.location && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>⊙</span>
              <span>{contact.location}</span>
            </div>
          )}
          {contact.linkedin && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>in</span>
              <span>{contact.linkedin}</span>
            </div>
          )}
          {contact.website && (
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>⌘</span>
              <span>{contact.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Main column */}
        <div className={styles.main}>
          {/* Experience */}
          {experience.length > 0 && (
            <section className={styles.section}>
              <div className={styles.sectionTitle} style={{ color: accent, borderBottomColor: accent }}>
                Work Experience
              </div>
              {experience.map((exp, i) => (
                <div key={exp.id} className={styles.expItem} style={{ borderLeftColor: i === 0 ? accent : 'var(--border)' }}>
                  <div className={styles.expHeader}>
                    <div>
                      <div className={styles.expTitle} style={{ fontFamily: dispFont }}>
                        {exp.title}
                      </div>
                      <div className={styles.expCompany} style={{ color: accent }}>
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ''}
                      </div>
                    </div>
                    <div className={styles.expDate}>
                      {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                    </div>
                  </div>
                  {exp.description && (
                    <p className={styles.expDesc}>{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Aside column */}
        <div className={styles.aside} style={{ background: accentLight }}>
          {/* Education */}
          {education.length > 0 && (
            <section className={styles.asideSection}>
              <div className={styles.asideSectionTitle} style={{ color: accent }}>
                Education
              </div>
              {education.map(edu => (
                <div key={edu.id} className={styles.eduItem}>
                  <div className={styles.eduDegree}>{edu.degree}</div>
                  <div className={styles.eduSchool} style={{ color: accent }}>{edu.school}</div>
                  {edu.location && <div className={styles.eduMeta}>{edu.location}</div>}
                  {(edu.year || edu.gpa) && (
                    <div className={styles.eduMeta}>
                      {edu.year}{edu.year && edu.gpa ? ' · ' : ''}{edu.gpa && `GPA ${edu.gpa}`}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className={styles.asideSection}>
              <div className={styles.asideSectionTitle} style={{ color: accent }}>
                Skills
              </div>
              {skills.map(sk => (
                <div key={sk.id} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{sk.name}</span>
                    <span className={styles.skillPct}>{sk.level}%</span>
                  </div>
                  <div className={styles.skillBarTrack}>
                    <div
                      className={styles.skillBarFill}
                      style={{ width: `${sk.level}%`, background: accent }}
                    />
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
