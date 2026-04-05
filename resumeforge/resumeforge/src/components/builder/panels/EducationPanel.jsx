import { useState } from 'react'
import { Field, Input, Row, SectionTitle } from './Field'
import styles from './ListPanel.module.css'

function EduForm({ item, onSave, onCancel }) {
  const [data, setData] = useState({ ...item })
  const set = (k, v) => setData(d => ({ ...d, [k]: v }))

  return (
    <div className={styles.form}>
      <Field label="Degree & Field of Study">
        <Input value={data.degree} onChange={v => set('degree', v)} placeholder="e.g. B.S. Computer Science" />
      </Field>
      <Field label="School / University">
        <Input value={data.school} onChange={v => set('school', v)} placeholder="e.g. MIT" />
      </Field>
      <Row>
        <Field label="Location">
          <Input value={data.location} onChange={v => set('location', v)} placeholder="City, State" />
        </Field>
        <Field label="Graduation Year">
          <Input value={data.year} onChange={v => set('year', v)} placeholder="2024" />
        </Field>
      </Row>
      <Field label="GPA (optional)">
        <Input value={data.gpa} onChange={v => set('gpa', v)} placeholder="3.9 / 4.0" />
      </Field>
      <div className={styles.formActions}>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        <button className={styles.saveBtn} onClick={() => onSave(data)}>Save</button>
      </div>
    </div>
  )
}

export default function EducationPanel({ resume, dispatch, showToast }) {
  const [editing, setEditing] = useState(null)

  const startNew = () =>
    setEditing({ id: `edu-${Date.now()}`, degree: '', school: '', location: '', year: '', gpa: '' })

  const handleSave = (data) => {
    if (resume.education.find(e => e.id === data.id)) {
      dispatch({ type: 'UPDATE_EDUCATION', payload: data })
      showToast('Education updated')
    } else {
      dispatch({ type: 'ADD_EDUCATION', payload: data })
      showToast('Education added')
    }
    setEditing(null)
  }

  return (
    <div>
      <SectionTitle>Education</SectionTitle>

      {!editing ? (
        <>
          <div className={styles.list}>
            {resume.education.map(edu => (
              <div key={edu.id} className={styles.item}>
                <div className={styles.itemDot} />
                <div className={styles.itemBody}>
                  <div className={styles.itemTitle}>{edu.degree || 'Untitled Degree'}</div>
                  <div className={styles.itemSub}>{edu.school}{edu.year ? ` · ${edu.year}` : ''}</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.iconBtn} onClick={() => setEditing(edu)} title="Edit">✎</button>
                  <button className={styles.iconBtn} onClick={() => { dispatch({ type: 'REMOVE_EDUCATION', payload: edu.id }); showToast('Entry removed') }} title="Delete">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addBtn} onClick={startNew}>
            <span>+</span> Add Education
          </button>
        </>
      ) : (
        <EduForm item={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      )}
    </div>
  )
}
