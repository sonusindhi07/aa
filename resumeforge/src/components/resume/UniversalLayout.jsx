import React from 'react'
import { getTemplate } from '../../data/templates'

// ─── Utility: Format Date ────────────────────────────────────────────────────
const fmtDate = (dateStr) => {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return month ? `${months[parseInt(month)-1]} ${year}` : year
}

// ─── Spacing scale ────────────────────────────────────────────────────────────
const spacingScale = {
  compact: { section: '10px', item: '6px', inner: '3px', pad: '20px' },
  comfortable: { section: '16px', item: '10px', inner: '5px', pad: '28px' },
  spacious: { section: '24px', item: '16px', inner: '8px', pad: '36px' },
}

const fontSizeScale = {
  small: { name: '20px', title: '13px', section: '9px', body: '11px', label: '9px' },
  medium: { name: '26px', title: '14px', section: '10px', body: '12px', label: '10px' },
  large: { name: '30px', title: '16px', section: '11px', body: '13px', label: '11px' },
}

// ─── Skill Bar Component ─────────────────────────────────────────────────────
const SkillBar = ({ name, level = 80, color }) => (
  <div style={{ marginBottom: '6px' }}>
    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px', fontSize:'11px' }}>
      <span>{name}</span>
    </div>
    <div style={{ height:'4px', background:'rgba(255,255,255,0.2)', borderRadius:'99px', overflow:'hidden' }}>
      <div style={{ width:`${level}%`, height:'100%', background: color, borderRadius:'99px' }} />
    </div>
  </div>
)

// ─── Section Title ────────────────────────────────────────────────────────────
const SectionTitle = ({ children, primary, style = 'line', fs }) => {
  const styles = {
    line: (
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
        <span style={{ fontSize: fs.section, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: primary }}>{children}</span>
        <div style={{ flex:1, height:'1px', background: primary, opacity:0.3 }} />
      </div>
    ),
    subtle: (
      <div style={{ marginBottom:'8px', paddingBottom:'4px', borderBottom:`1px solid #e2e8f0` }}>
        <span style={{ fontSize: fs.section, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: primary }}>{children}</span>
      </div>
    ),
    accent: (
      <div style={{ marginBottom:'10px' }}>
        <div style={{ display:'inline-block', background: primary, color:'white', fontSize: fs.section, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', padding:'3px 12px', borderRadius:'4px' }}>{children}</div>
      </div>
    ),
    dot: (
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
        <div style={{ width:'8px', height:'8px', borderRadius:'50%', background: primary, flexShrink:0 }} />
        <span style={{ fontSize: fs.section, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: primary }}>{children}</span>
        <div style={{ flex:1, height:'1px', background: primary, opacity:0.2 }} />
      </div>
    ),
    none: (
      <div style={{ marginBottom:'8px' }}>
        <span style={{ fontSize: fs.section, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'white', opacity:0.9 }}>{children}</span>
      </div>
    ),
    ornate: (
      <div style={{ textAlign:'center', marginBottom:'12px', position:'relative' }}>
        <span style={{ fontSize: fs.section, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color: primary, fontFamily:'Playfair Display', position:'relative', padding:'0 16px', background:'white' }}>{children}</span>
        <div style={{ position:'absolute', top:'50%', left:0, right:0, height:'1px', background: primary, opacity:0.2, zIndex:-1 }} />
      </div>
    ),
    timeline: (
      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
        <div style={{ width:'12px', height:'12px', borderRadius:'50%', background: primary, flexShrink:0, boxShadow:`0 0 0 4px ${primary}33` }} />
        <span style={{ fontSize: fs.section, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color: primary }}>{children}</span>
      </div>
    ),
  }
  return styles[style] || styles.line
}

// ─── Header Styles ────────────────────────────────────────────────────────────
const HeaderCentered = ({ data, settings, fs, sp, template }) => {
  const { personal } = data
  return (
    <div style={{ textAlign:'center', padding:`${sp.pad} ${sp.pad} 16px`, borderBottom:`2px solid ${settings.primaryColor}` }}>
      {settings.showPhoto && personal.photo && (
        <img src={personal.photo} alt="" style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:`3px solid ${settings.primaryColor}`, marginBottom:'8px' }} />
      )}
      <div style={{ fontSize: fs.name, fontWeight:700, fontFamily: template.layout.fontPrimary, color: settings.primaryColor, lineHeight:1.1 }}>{personal.name || 'Your Name'}</div>
      {personal.title && <div style={{ fontSize: fs.title, color: settings.secondaryColor || '#64748b', marginTop:'4px', fontWeight:500 }}>{personal.title}</div>}
      <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'8px', marginTop:'8px', fontSize: fs.label, color:'#64748b' }}>
        {personal.email && <span>✉ {personal.email}</span>}
        {personal.phone && <span>☏ {personal.phone}</span>}
        {personal.location && <span>⌖ {personal.location}</span>}
        {personal.website && <span>⊕ {personal.website}</span>}
        {personal.linkedin && <span>in {personal.linkedin}</span>}
      </div>
    </div>
  )
}

const HeaderLeftAligned = ({ data, settings, fs, sp, template }) => {
  const { personal } = data
  return (
    <div style={{ padding:`${sp.pad} ${sp.pad} 16px`, display:'flex', alignItems:'flex-start', justifyContent:'space-between', borderBottom:`2px solid ${settings.primaryColor}` }}>
      <div>
        {settings.showPhoto && personal.photo && (
          <img src={personal.photo} alt="" style={{ width:70, height:70, borderRadius:'8px', objectFit:'cover', marginBottom:'8px' }} />
        )}
        <div style={{ fontSize: fs.name, fontWeight:700, fontFamily: template.layout.fontPrimary, color: settings.primaryColor, lineHeight:1.1 }}>{personal.name || 'Your Name'}</div>
        {personal.title && <div style={{ fontSize: fs.title, color: settings.secondaryColor || '#64748b', marginTop:'3px', fontWeight:500 }}>{personal.title}</div>}
      </div>
      <div style={{ textAlign:'right', fontSize: fs.label, color:'#64748b', display:'flex', flexDirection:'column', gap:'3px' }}>
        {personal.email && <span>✉ {personal.email}</span>}
        {personal.phone && <span>☏ {personal.phone}</span>}
        {personal.location && <span>⌖ {personal.location}</span>}
        {personal.website && <span>⊕ {personal.website}</span>}
      </div>
    </div>
  )
}

const HeaderBanner = ({ data, settings, fs, sp, template }) => {
  const { personal } = data
  return (
    <div style={{ background:`linear-gradient(135deg, ${settings.primaryColor}, ${settings.secondaryColor || settings.primaryColor}dd)`, padding:`${sp.pad}`, color:'white', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:-30, top:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />
      <div style={{ position:'absolute', right:20, bottom:-20, width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
      <div style={{ display:'flex', alignItems:'center', gap:'16px', position:'relative' }}>
        {settings.showPhoto && personal.photo && (
          <img src={personal.photo} alt="" style={{ width:80, height:80, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,0.5)', flexShrink:0 }} />
        )}
        <div style={{ flex:1 }}>
          <div style={{ fontSize: fs.name, fontWeight:700, fontFamily: template.layout.fontPrimary, lineHeight:1.1 }}>{personal.name || 'Your Name'}</div>
          {personal.title && <div style={{ fontSize: fs.title, opacity:0.85, marginTop:'3px' }}>{personal.title}</div>}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', marginTop:'8px', fontSize: fs.label, opacity:0.8 }}>
            {personal.email && <span>✉ {personal.email}</span>}
            {personal.phone && <span>☏ {personal.phone}</span>}
            {personal.location && <span>⌖ {personal.location}</span>}
            {personal.linkedin && <span>in {personal.linkedin}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section Renderers ────────────────────────────────────────────────────────
const SectionSummary = ({ data, settings, fs, sp, divider }) => (
  data.personal?.summary ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Summary</SectionTitle>
      <p style={{ fontSize: fs.body, lineHeight:1.6, color:'#374151', margin:0 }}>{data.personal.summary}</p>
    </div>
  ) : null
)

const SectionExperience = ({ data, settings, fs, sp, divider }) => (
  data.experience?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Experience</SectionTitle>
      {data.experience.map((exp) => (
        <div key={exp.id} style={{ marginBottom: sp.item }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize: fs.body, fontWeight:700, color:'#1e293b' }}>{exp.position}</div>
              <div style={{ fontSize: fs.body, fontWeight:600, color: settings.primaryColor }}>{exp.company}{exp.location ? ` · ${exp.location}` : ''}</div>
            </div>
            <div style={{ fontSize: fs.label, color:'#94a3b8', whiteSpace:'nowrap', flexShrink:0, marginLeft:'8px', background:'#f1f5f9', padding:'2px 8px', borderRadius:'4px' }}>
              {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
            </div>
          </div>
          {exp.description && (
            <div style={{ fontSize: fs.body, color:'#4b5563', lineHeight:1.6, marginTop: sp.inner, whiteSpace:'pre-line' }}>{exp.description}</div>
          )}
        </div>
      ))}
    </div>
  ) : null
)

const SectionEducation = ({ data, settings, fs, sp, divider }) => (
  data.education?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Education</SectionTitle>
      {data.education.map((edu) => (
        <div key={edu.id} style={{ marginBottom: sp.item }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize: fs.body, fontWeight:700, color:'#1e293b' }}>{edu.institution}</div>
              <div style={{ fontSize: fs.body, color:'#4b5563' }}>{edu.degree}{edu.field ? ` in ${edu.field}` : ''}</div>
              {edu.honors && <div style={{ fontSize: fs.label, color: settings.primaryColor, fontStyle:'italic' }}>{edu.honors}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>}
            </div>
            <div style={{ fontSize: fs.label, color:'#94a3b8', whiteSpace:'nowrap', flexShrink:0, marginLeft:'8px', background:'#f1f5f9', padding:'2px 8px', borderRadius:'4px' }}>
              {fmtDate(edu.startDate)} — {fmtDate(edu.endDate)}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null
)

const SectionSkills = ({ data, settings, fs, sp, divider }) => (
  data.skills?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Skills</SectionTitle>
      {data.skills.map((sg) => (
        <div key={sg.id} style={{ marginBottom: sp.inner, display:'flex', gap:'8px', flexWrap:'wrap', alignItems:'baseline' }}>
          {sg.category && <span style={{ fontSize: fs.label, fontWeight:700, color: settings.primaryColor, minWidth:'80px' }}>{sg.category}:</span>}
          <span style={{ fontSize: fs.body, color:'#4b5563', flex:1 }}>{sg.skills}</span>
        </div>
      ))}
    </div>
  ) : null
)

const SectionProjects = ({ data, settings, fs, sp, divider }) => (
  data.projects?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Projects</SectionTitle>
      {data.projects.map((p) => (
        <div key={p.id} style={{ marginBottom: sp.item }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div style={{ fontSize: fs.body, fontWeight:700, color:'#1e293b' }}>{p.name}</div>
            {p.url && <div style={{ fontSize: fs.label, color: settings.primaryColor }}>{p.url}</div>}
          </div>
          {p.technologies && <div style={{ fontSize: fs.label, color: settings.primaryColor, fontWeight:600, marginTop:'2px' }}>{p.technologies}</div>}
          {p.description && <div style={{ fontSize: fs.body, color:'#4b5563', lineHeight:1.5, marginTop: sp.inner }}>{p.description}</div>}
        </div>
      ))}
    </div>
  ) : null
)

const SectionCertifications = ({ data, settings, fs, sp, divider }) => (
  data.certifications?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Certifications</SectionTitle>
      {data.certifications.map((c) => (
        <div key={c.id} style={{ marginBottom: sp.inner, display:'flex', justifyContent:'space-between' }}>
          <div>
            <span style={{ fontSize: fs.body, fontWeight:600, color:'#1e293b' }}>{c.name}</span>
            {c.issuer && <span style={{ fontSize: fs.body, color:'#64748b' }}> · {c.issuer}</span>}
          </div>
          {c.date && <span style={{ fontSize: fs.label, color:'#94a3b8', background:'#f1f5f9', padding:'2px 6px', borderRadius:'4px' }}>{fmtDate(c.date)}</span>}
        </div>
      ))}
    </div>
  ) : null
)

const SectionLanguages = ({ data, settings, fs, sp, divider }) => (
  data.languages?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Languages</SectionTitle>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
        {data.languages.map((l) => (
          <div key={l.id} style={{ fontSize: fs.body, background:'#f1f5f9', padding:'3px 10px', borderRadius:'99px', color:'#374151' }}>
            <span style={{ fontWeight:600 }}>{l.language}</span>
            {l.proficiency && <span style={{ color:'#94a3b8', marginLeft:'4px' }}>· {l.proficiency}</span>}
          </div>
        ))}
      </div>
    </div>
  ) : null
)

const SectionAwards = ({ data, settings, fs, sp, divider }) => (
  data.awards?.length ? (
    <div style={{ marginBottom: sp.section }}>
      <SectionTitle primary={settings.primaryColor} style={divider} fs={fs}>Awards & Honors</SectionTitle>
      {data.awards.map((a) => (
        <div key={a.id} style={{ marginBottom: sp.inner, display:'flex', justifyContent:'space-between' }}>
          <div>
            <span style={{ fontSize: fs.body, fontWeight:600, color:'#1e293b' }}>{a.title}</span>
            {a.issuer && <span style={{ fontSize: fs.body, color:'#64748b' }}> · {a.issuer}</span>}
          </div>
          {a.date && <span style={{ fontSize: fs.label, color:'#94a3b8' }}>{fmtDate(a.date)}</span>}
        </div>
      ))}
    </div>
  ) : null
)

// ─── Sidebar Content (for 2-column layouts) ────────────────────────────────
const SidebarContent = ({ data, settings, fs, sp, template, isDark }) => {
  const textColor = isDark ? 'rgba(255,255,255,0.9)' : 'white'
  const mutedColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.7)'
  const divStyle = { marginBottom: sp.section }

  return (
    <div style={{ padding: sp.pad, height:'100%' }}>
      {/* Photo + name in sidebar */}
      {settings.showPhoto && data.personal?.photo ? (
        <div style={{ textAlign:'center', marginBottom:'16px' }}>
          <img src={data.personal.photo} alt="" style={{ width:90, height:90, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,0.4)' }} />
        </div>
      ) : null}
      <div style={{ marginBottom:'16px', textAlign: settings.showPhoto ? 'center' : 'left' }}>
        <div style={{ fontSize: fs.name, fontWeight:700, fontFamily: template.layout.fontPrimary, color: textColor, lineHeight:1.1 }}>{data.personal?.name || 'Your Name'}</div>
        {data.personal?.title && <div style={{ fontSize: fs.title, color: mutedColor, marginTop:'4px' }}>{data.personal.title}</div>}
      </div>
      <div style={{ marginBottom:'16px', fontSize: fs.label, color: mutedColor, display:'flex', flexDirection:'column', gap:'5px' }}>
        {data.personal?.email && <div>✉ {data.personal.email}</div>}
        {data.personal?.phone && <div>☏ {data.personal.phone}</div>}
        {data.personal?.location && <div>⌖ {data.personal.location}</div>}
        {data.personal?.website && <div>⊕ {data.personal.website}</div>}
        {data.personal?.linkedin && <div>in {data.personal.linkedin}</div>}
      </div>
      <div style={{ height:'1px', background:'rgba(255,255,255,0.15)', marginBottom:'14px' }} />
      {/* Skills in sidebar */}
      {data.skills?.length ? (
        <div style={divStyle}>
          <SectionTitle primary={textColor} style="none" fs={fs}>Skills</SectionTitle>
          {data.skills.map((sg) => (
            <div key={sg.id} style={{ marginBottom:'8px' }}>
              {sg.category && <div style={{ fontSize: fs.label, color: mutedColor, marginBottom:'3px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{sg.category}</div>}
              <div style={{ display:'flex', flexWrap:'wrap', gap:'4px' }}>
                {sg.skills.split(',').map((s, i) => (
                  <span key={i} style={{ fontSize: fs.label, background:'rgba(255,255,255,0.12)', color: textColor, padding:'2px 8px', borderRadius:'4px' }}>{s.trim()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {/* Languages in sidebar */}
      {data.languages?.length ? (
        <div style={divStyle}>
          <SectionTitle primary={textColor} style="none" fs={fs}>Languages</SectionTitle>
          {data.languages.map((l) => (
            <div key={l.id} style={{ marginBottom:'4px', fontSize: fs.body, color: textColor, display:'flex', justifyContent:'space-between' }}>
              <span>{l.language}</span>
              <span style={{ color: mutedColor, fontSize: fs.label }}>{l.proficiency}</span>
            </div>
          ))}
        </div>
      ) : null}
      {/* Certifications in sidebar */}
      {data.certifications?.length ? (
        <div style={divStyle}>
          <SectionTitle primary={textColor} style="none" fs={fs}>Certifications</SectionTitle>
          {data.certifications.map((c) => (
            <div key={c.id} style={{ marginBottom:'5px', fontSize: fs.body, color: textColor }}>
              <div style={{ fontWeight:600 }}>{c.name}</div>
              <div style={{ fontSize: fs.label, color: mutedColor }}>{c.issuer} {c.date && `· ${fmtDate(c.date)}`}</div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

// ─── Main Content Sections ─────────────────────────────────────────────────
const MainContent = ({ data, settings, fs, sp, divider, includeHeader, headerStyle, template }) => (
  <div>
    {includeHeader && headerStyle === 'left-aligned' && <HeaderLeftAligned data={data} settings={settings} fs={fs} sp={sp} template={template} />}
    {includeHeader && headerStyle === 'centered' && <HeaderCentered data={data} settings={settings} fs={fs} sp={sp} template={template} />}
    <div style={{ padding: sp.pad }}>
      <SectionSummary data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
      <SectionExperience data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
      <SectionEducation data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
      <SectionProjects data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
      <SectionCertifications data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
      <SectionAwards data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
    </div>
  </div>
)

// ─── Layout Engines ─────────────────────────────────────────────────────────

// SINGLE COLUMN
const SingleColumnLayout = ({ resume, template }) => {
  const { data, settings } = resume
  const fs = fontSizeScale[settings.fontSize || 'medium']
  const sp = spacingScale[settings.spacing || 'comfortable']
  const divider = template.layout.sectionDivider

  return (
    <div style={{ fontFamily: settings.fontFamily || template.layout.fontBody, background:'white', minHeight:'100%' }}>
      {template.layout.headerStyle === 'centered' && <HeaderCentered data={data} settings={settings} fs={fs} sp={sp} template={template} />}
      {template.layout.headerStyle === 'left-aligned' && <HeaderLeftAligned data={data} settings={settings} fs={fs} sp={sp} template={template} />}
      {template.layout.headerStyle === 'banner' && <HeaderBanner data={data} settings={settings} fs={fs} sp={sp} template={template} />}
      <div style={{ padding: `${sp.pad}` }}>
        <SectionSummary data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionExperience data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionEducation data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionSkills data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionProjects data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionCertifications data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionLanguages data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        <SectionAwards data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
      </div>
    </div>
  )
}

// TWO COLUMN SIDEBAR
const TwoColumnSidebarLayout = ({ resume, template }) => {
  const { data, settings } = resume
  const fs = fontSizeScale[settings.fontSize || 'medium']
  const sp = spacingScale[settings.spacing || 'comfortable']
  const divider = template.layout.sectionDivider
  const isDark = template.id === 'executive-dark'
  const sidebarBg = isDark
    ? settings.secondaryColor || '#1a1a2e'
    : settings.primaryColor

  return (
    <div style={{ fontFamily: settings.fontFamily || template.layout.fontBody, background:'white', display:'flex', minHeight:'100%' }}>
      {/* Sidebar */}
      <div style={{ width:'34%', background: sidebarBg, flexShrink:0 }}>
        <SidebarContent data={data} settings={settings} fs={fs} sp={sp} template={template} isDark={isDark} />
      </div>
      {/* Main */}
      <div style={{ flex:1, overflow:'hidden' }}>
        {template.layout.headerStyle === 'banner' && <HeaderBanner data={data} settings={settings} fs={fs} sp={sp} template={template} />}
        <div style={{ padding: sp.pad }}>
          <SectionSummary data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionExperience data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionEducation data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionProjects data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionAwards data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        </div>
      </div>
    </div>
  )
}

// TWO COLUMN EQUAL
const TwoColumnEqualLayout = ({ resume, template }) => {
  const { data, settings } = resume
  const fs = fontSizeScale[settings.fontSize || 'medium']
  const sp = spacingScale[settings.spacing || 'comfortable']
  const divider = template.layout.sectionDivider

  return (
    <div style={{ fontFamily: settings.fontFamily || template.layout.fontBody, background:'white', minHeight:'100%' }}>
      <HeaderLeftAligned data={data} settings={settings} fs={fs} sp={sp} template={template} />
      <div style={{ display:'flex', gap:0 }}>
        <div style={{ flex:'0 0 58%', padding: sp.pad, borderRight:'1px solid #e2e8f0' }}>
          <SectionSummary data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionExperience data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionProjects data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        </div>
        <div style={{ flex:1, padding: sp.pad }}>
          <SectionSkills data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionEducation data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionCertifications data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionLanguages data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
          <SectionAwards data={data} settings={settings} fs={fs} sp={sp} divider={divider} />
        </div>
      </div>
    </div>
  )
}

// TIMELINE LAYOUT
const TimelineLayout = ({ resume, template }) => {
  const { data, settings } = resume
  const fs = fontSizeScale[settings.fontSize || 'medium']
  const sp = spacingScale[settings.spacing || 'comfortable']
  const color = settings.primaryColor

  return (
    <div style={{ fontFamily: settings.fontFamily || template.layout.fontBody, background:'white', minHeight:'100%' }}>
      <HeaderLeftAligned data={data} settings={settings} fs={fs} sp={sp} template={template} />
      <div style={{ padding: sp.pad }}>
        <SectionSummary data={data} settings={settings} fs={fs} sp={sp} divider="line" />
        {/* Timeline experience */}
        {data.experience?.length ? (
          <div style={{ marginBottom: sp.section }}>
            <SectionTitle primary={color} style="timeline" fs={fs}>Experience</SectionTitle>
            <div style={{ paddingLeft:'20px', borderLeft:`2px solid ${color}22`, marginLeft:'6px' }}>
              {data.experience.map((exp) => (
                <div key={exp.id} style={{ marginBottom: sp.item, position:'relative' }}>
                  <div style={{ position:'absolute', left:'-25px', top:'4px', width:'10px', height:'10px', borderRadius:'50%', background: color, border:'2px solid white', boxShadow:`0 0 0 2px ${color}` }} />
                  <div style={{ display:'flex', justifyContent:'space-between' }}>
                    <div>
                      <div style={{ fontSize: fs.body, fontWeight:700, color:'#1e293b' }}>{exp.position}</div>
                      <div style={{ fontSize: fs.body, color: color, fontWeight:500 }}>{exp.company}</div>
                    </div>
                    <div style={{ fontSize: fs.label, color:'#94a3b8', background:'#f8faff', padding:'2px 8px', borderRadius:'4px', height:'fit-content' }}>
                      {fmtDate(exp.startDate)} — {exp.current ? 'Present' : fmtDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && <div style={{ fontSize: fs.body, color:'#4b5563', lineHeight:1.5, marginTop:'4px', whiteSpace:'pre-line' }}>{exp.description}</div>}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div style={{ display:'flex', gap:'24px' }}>
          <div style={{ flex:1 }}><SectionEducation data={data} settings={settings} fs={fs} sp={sp} divider="line" /></div>
          <div style={{ flex:1 }}>
            <SectionSkills data={data} settings={settings} fs={fs} sp={sp} divider="line" />
            <SectionLanguages data={data} settings={settings} fs={fs} sp={sp} divider="line" />
          </div>
        </div>
        <SectionProjects data={data} settings={settings} fs={fs} sp={sp} divider="line" />
        <SectionCertifications data={data} settings={settings} fs={fs} sp={sp} divider="line" />
      </div>
    </div>
  )
}

// ─── UniversalLayout — Dynamic Layout Generation Engine ──────────────────────
const UniversalLayout = ({ resume, scale = 1 }) => {
  if (!resume) return null

  const template = getTemplate(resume.templateId)

  const layoutMap = {
    'single-column': SingleColumnLayout,
    'two-column-sidebar': TwoColumnSidebarLayout,
    'two-column-equal': TwoColumnEqualLayout,
    'timeline': TimelineLayout,
  }

  const LayoutEngine = layoutMap[template.layout.type] || SingleColumnLayout

  return (
    <div
      id="resume-canvas"
      style={{
        width: '794px',
        minHeight: '1123px',
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
        background: 'white',
        fontFamily: resume.settings?.fontFamily || 'DM Sans',
        fontSize: '12px',
        lineHeight: 1.5,
        color: '#1e293b',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <LayoutEngine resume={resume} template={template} />
    </div>
  )
}

export default UniversalLayout
