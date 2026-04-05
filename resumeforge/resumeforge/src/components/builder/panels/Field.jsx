import styles from './Field.module.css'

export function Field({ label, children, hint }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}

export function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )
}

export function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

export function Row({ children }) {
  return <div className={styles.row}>{children}</div>
}

export function SectionTitle({ children }) {
  return <div className={styles.sectionTitle}>{children}</div>
}

export function AIButton({ onClick, label = 'Improve with AI ✨' }) {
  return (
    <button className={styles.aiBtn} onClick={onClick} type="button">
      {label}
    </button>
  )
}
