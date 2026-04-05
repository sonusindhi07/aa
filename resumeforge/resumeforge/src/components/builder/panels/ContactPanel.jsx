import { Field, Input, Textarea, Row, SectionTitle, AIButton } from './Field'

export default function ContactPanel({ resume, dispatch }) {
  const { contact, summary } = resume

  const update = (key, val) =>
    dispatch({ type: 'UPDATE_CONTACT', payload: { [key]: val } })

  return (
    <div>
      <SectionTitle>Personal Details</SectionTitle>

      <Field label="Full Name">
        <Input value={contact.name} onChange={v => update('name', v)} placeholder="e.g. Alexandra Chen" />
      </Field>

      <Field label="Professional Title">
        <Input value={contact.title} onChange={v => update('title', v)} placeholder="e.g. Senior Product Designer" />
      </Field>

      <Row>
        <Field label="Email">
          <Input value={contact.email} onChange={v => update('email', v)} placeholder="you@email.com" type="email" />
        </Field>
        <Field label="Phone">
          <Input value={contact.phone} onChange={v => update('phone', v)} placeholder="+1 555 000 0000" />
        </Field>
      </Row>

      <Field label="Location">
        <Input value={contact.location} onChange={v => update('location', v)} placeholder="City, State / Country" />
      </Field>

      <Row>
        <Field label="LinkedIn">
          <Input value={contact.linkedin} onChange={v => update('linkedin', v)} placeholder="linkedin.com/in/you" />
        </Field>
        <Field label="Website / Portfolio">
          <Input value={contact.website} onChange={v => update('website', v)} placeholder="yoursite.com" />
        </Field>
      </Row>

      <SectionTitle>Professional Summary</SectionTitle>

      <Field label="Summary" hint="2–4 sentences. Lead with your years of experience and top strength.">
        <Textarea
          value={summary}
          onChange={v => dispatch({ type: 'UPDATE_SUMMARY', payload: v })}
          placeholder="Award-winning designer with 8+ years..."
          rows={5}
        />
      </Field>

      <AIButton
        label="✨ Write Summary with AI"
        onClick={() => alert('In production: call Anthropic API to generate a tailored summary based on your experience.')}
      />
    </div>
  )
}
