import { useState } from 'react'
import { Field, Input, Textarea, Row, SectionTitle, AIButton } from './Field'
import styles from './ListPanel.module.css'

function ExpForm({ item, onSave, onCancel }) {
  const [data, setData] = useState({ ...item })
  const set = (k, v) => setData(d => ({ ...d, [k]: v }))

  return (
    <div className={styles.form}>
      <Field label="Job Title">
        <Input value={data.title} onChange={v => set('title', v)} placeholder="e.g. Senior Designer" />
      </Field>
      <Row>
        <Field label="Company">
          <Input value={data.company} onChange={v => set('company', v)} placeholder="Company Name" />
        </Field>
        <Field label="Location">
          <Input value={data.location} onChange={v => set('location', v)} placeholder="City, State" />
        </Field>
      </Row>
      <Row>
        <Field label="Start Date">
          <Input value={data.startDate} onChange={v => set('startDate', v)} placeholder="Jan 2021" />
        </Field>
        <Field label="End Date">
          <Input value={data.endDate} onChange={v => set('endDate', v)} placeholder="Present" />
        </Field>
      </Row>
      <Field label="Description" hint="Use bullet-style sentences. Lead with strong action verbs.">
        <Textarea value={data.description} onChange={v => set('description', v)} placeholder="Led design of... resulting in..." rows={5} />
      </Field>
      <AIButton
        label="✨ Improve with AI"
        onClick={() => alert('In production: AI will enhance your bullet points with stronger verbs and quantifiable results.')}
      />
      <div className={styles.formActions}>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancel</button>
        <button className={styles.saveBtn} onClick={() => onSave(data)}>Save</button>
      </div>
    </div>
  )
}

export default function ExperiencePanel({ resume, dispatch, showToast }) {
  const [editing, setEditing] = useState(null) // null | 'new' | id

  const startNew = () =>
    setEditing({
      id: `exp-${Date.now()}`,
      title: '', company: '', location: '',
      startDate: '', endDate: 'Present', description: '',
    })

  const handleSave = (data) => {
    if (resume.experience.find(e => e.id === data.id)) {
      dispatch({ type: 'UPDATE_EXPERIENCE', payload: data })
      showToast('Experience updated')
    } else {
      dispatch({ type: 'ADD_EXPERIENCE', payload: data })
      showToast('Experience added')
    }
    setEditing(null)
  }

  const handleDelete = (id) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: id })
    showToast('Entry removed')
  }

  return (
    <div>
      <SectionTitle>Work Experience</SectionTitle>

      {!editing ? (
        <>
          <div className={styles.list}>
            {resume.experience.map(exp => (
              <div key={exp.id} className={styles.item}>
                <div className={styles.itemDot} />
                <div className={styles.itemBody}>
                  <div className={styles.itemTitle}>{exp.title || 'Untitled Role'}</div>
                  <div className={styles.itemSub}>{exp.company}{exp.startDate ? ` · ${exp.startDate} – ${exp.endDate}` : ''}</div>
                </div>
                <div className={styles.itemActions}>
                  <button className={styles.iconBtn} onClick={() => setEditing(exp)} title="Edit">✎</button>
                  <button className={styles.iconBtn} onClick={() => handleDelete(exp.id)} title="Delete">✕</button>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.addBtn} onClick={startNew}>
            <span>+</span> Add Experience
          </button>
        </>
      ) : (
        <ExpForm
          item={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}
    </div>
  )
}
