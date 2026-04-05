import { useState } from 'react'
import { Field, Input, SectionTitle } from './Field'
import styles from './ListPanel.module.css'

const LEVEL_LABELS = { 25: 'Beginner', 50: 'Intermediate', 75: 'Advanced', 100: 'Expert' }

function getLevelLabel(val) {
  if (val <= 30) return 'Beginner'
  if (val <= 55) return 'Intermediate'
  if (val <= 80) return 'Advanced'
  return 'Expert'
}

function SkillForm({ item, onSave, onCancel }) {
  const [data, setData] = useState({ ...item })

  return (
    <div className={styles.form}>
      <Field label="Skill Name">
        <Input value={data.name} onChange={v => setData(d => ({ ...d, name: v }))} placeholder="e.g. React, Python, Leadership..." />
      </Field>
      <Field label={`Proficiency: ${getLevelLabel(data.level)} (${data.level}%)`}>
        <input
          className={styles.rangeInput}
          type="range" min={10} max={100} step={5}
          value={data.level}
          onChange={e => setData(d => ({ ...d, level: Number(e.target.value) }))}
        />
        <div className={styles.skillBarWrap} style={{ width: '100%', marginTop: 6 }}>
          <div className={styles.skillBar}>
            <div className={styles.skillFill} style={{ width: `${data.level}%` }} />
          </div>
        </div>
      </Field>
      <div className={styles.formActions}>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        <button className={styles.saveBtn} onClick={() => onSave(data)}>Save</button>
      </div>
    </div>
  )
}

const SUGGESTED = ['JavaScript', 'React', 'Python', 'SQL', 'Figma', 'Project Management', 'Communication', 'Node.js', 'Leadership', 'Data Analysis']

export default function SkillsPanel({ resume, dispatch, showToast }) {
  const [editing, setEditing] = useState(null)

  const startNew = (name = '') =>
    setEditing({ id: `sk-${Date.now()}`, name, level: 75 })

  const handleSave = (data) => {
    if (resume.skills.find(s => s.id === data.id)) {
      dispatch({ type: 'UPDATE_SKILL', payload: data })
      showToast('Skill updated')
    } else {
      dispatch({ type: 'ADD_SKILL', payload: data })
      showToast('Skill added')
    }
    setEditing(null)
  }

  const existingNames = resume.skills.map(s => s.name.toLowerCase())
  const suggestions = SUGGESTED.filter(s => !existingNames.includes(s.toLowerCase()))

  return (
    <div>
      <SectionTitle>Skills</SectionTitle>

      {!editing ? (
        <>
          <div className={styles.list}>
            {resume.skills.map(sk => (
              <div key={sk.id} className={styles.skillItem}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className={styles.skillName}>{sk.name}</div>
                  <div className={styles.skillBarWrap}>
                    <div className={styles.skillBar}>
                      <div className={styles.skillFill} style={{ width: `${sk.level}%` }} />
                    </div>
                  </div>
                  <div className={styles.skillLevel}>{getLevelLabel(sk.level)} · {sk.level}%</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.iconBtn} onClick={() => setEditing(sk)} title="Edit">✎</button>
                  <button className={styles.iconBtn} onClick={() => { dispatch({ type: 'REMOVE_SKILL', payload: sk.id }); showToast('Skill removed') }} title="Delete">✕</button>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.addBtn} onClick={() => startNew()}>
            <span>+</span> Add Skill
          </button>

          {suggestions.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>Suggested Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {suggestions.slice(0, 8).map(s => (
                  <button
                    key={s}
                    onClick={() => startNew(s)}
                    style={{
                      padding: '5px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700,
                      border: '1.5px solid var(--border)', background: 'var(--paper)', color: 'var(--slate)', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.target.style.borderColor = 'var(--accent-mid)'; e.target.style.color = 'var(--accent-mid)' }}
                    onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--slate)' }}
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <SkillForm item={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      )}
    </div>
  )
}
