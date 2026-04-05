// ─── Download Utilities ────────────────────────────────────────────────────
// Real PDF generation using html2canvas + jsPDF
// Real Word generation using docx library

export async function downloadPDF(resumeId = 'resume-canvas') {
  // Dynamically import to keep bundle small
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  const element = document.getElementById(resumeId)
  if (!element) throw new Error('Resume canvas not found')

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: 794,
    width: 794,
  })

  const imgData = canvas.toDataURL('image/png', 1.0)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  })

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  // Handle multi-page if resume is long
  const canvasHeight = canvas.height
  const canvasWidth = canvas.width
  const ratio = canvasWidth / pdfWidth
  const pageHeightPx = pdfHeight * ratio

  let position = 0
  let page = 0

  while (position < canvasHeight) {
    if (page > 0) pdf.addPage()
    
    // Create a slice of the canvas for this page
    const sliceCanvas = document.createElement('canvas')
    sliceCanvas.width = canvasWidth
    sliceCanvas.height = Math.min(pageHeightPx, canvasHeight - position)
    
    const ctx = sliceCanvas.getContext('2d')
    ctx.drawImage(canvas, 0, position, canvasWidth, sliceCanvas.height, 0, 0, canvasWidth, sliceCanvas.height)
    
    const sliceData = sliceCanvas.toDataURL('image/png', 1.0)
    const sliceHeightPdf = (sliceCanvas.height / ratio)
    
    pdf.addImage(sliceData, 'PNG', 0, 0, pdfWidth, sliceHeightPdf)
    position += pageHeightPx
    page++
  }

  pdf.save('resume.pdf')
  return true
}

// Real Word document generation
export async function downloadWord(resume) {
  const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } = await import('docx')

  const { data, settings } = resume
  const { personal, experience, education, skills, projects, certifications, languages, awards } = data

  const primary = settings.primaryColor || '#4361ee'
  const primaryHex = primary.replace('#', '')

  const hr = new Paragraph({
    border: {
      bottom: { color: primaryHex, size: 8, space: 1, style: BorderStyle.SINGLE },
    },
    spacing: { after: 100 },
  })

  const sectionTitle = (text) => new Paragraph({
    children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 24, color: primaryHex, font: 'Calibri' })],
    spacing: { before: 240, after: 80 },
    border: {
      bottom: { color: primaryHex, size: 4, space: 1, style: BorderStyle.SINGLE },
    },
  })

  const children = []

  // ── Header ──────────────────────────────────────────────────────────────────
  children.push(new Paragraph({
    children: [new TextRun({ text: personal.name || 'Your Name', bold: true, size: 48, font: 'Calibri', color: primaryHex })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }))

  if (personal.title) {
    children.push(new Paragraph({
      children: [new TextRun({ text: personal.title, size: 26, color: '666666', font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }))
  }

  const contactParts = [
    personal.email, personal.phone, personal.location, personal.website, personal.linkedin
  ].filter(Boolean)

  if (contactParts.length) {
    children.push(new Paragraph({
      children: contactParts.map((p, i) => [
        new TextRun({ text: p, size: 20, color: '555555', font: 'Calibri' }),
        i < contactParts.length - 1 ? new TextRun({ text: '  |  ', size: 20, color: 'AAAAAA' }) : null,
      ]).flat().filter(Boolean),
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }))
  }

  children.push(hr)

  // ── Summary ──────────────────────────────────────────────────────────────────
  if (personal.summary) {
    children.push(sectionTitle('Summary'))
    children.push(new Paragraph({
      children: [new TextRun({ text: personal.summary, size: 22, font: 'Calibri', color: '333333' })],
      spacing: { after: 120 },
    }))
  }

  // ── Experience ───────────────────────────────────────────────────────────────
  if (experience?.length) {
    children.push(sectionTitle('Experience'))
    experience.forEach(exp => {
      const dateStr = `${fmtDate(exp.startDate)} — ${exp.current ? 'Present' : fmtDate(exp.endDate)}`
      children.push(new Paragraph({
        children: [
          new TextRun({ text: exp.position || '', bold: true, size: 24, font: 'Calibri', color: '1e293b' }),
          new TextRun({ text: `   ${dateStr}`, size: 20, color: '888888', font: 'Calibri', italics: true }),
        ],
        spacing: { before: 100, after: 40 },
      }))
      children.push(new Paragraph({
        children: [new TextRun({ text: `${exp.company || ''}${exp.location ? ' · ' + exp.location : ''}`, size: 22, color: primaryHex, font: 'Calibri', bold: true })],
        spacing: { after: 60 },
      }))
      if (exp.description) {
        exp.description.split('\n').filter(l => l.trim()).forEach(line => {
          children.push(new Paragraph({
            children: [new TextRun({ text: line, size: 21, font: 'Calibri', color: '444444' })],
            spacing: { after: 30 },
            indent: { left: 200 },
          }))
        })
      }
    })
  }

  // ── Education ────────────────────────────────────────────────────────────────
  if (education?.length) {
    children.push(sectionTitle('Education'))
    education.forEach(edu => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: edu.institution || '', bold: true, size: 24, font: 'Calibri', color: '1e293b' }),
          new TextRun({ text: `   ${fmtDate(edu.startDate)} — ${fmtDate(edu.endDate)}`, size: 20, color: '888888', font: 'Calibri', italics: true }),
        ],
        spacing: { before: 100, after: 40 },
      }))
      const degreeText = [edu.degree, edu.field ? `in ${edu.field}` : ''].filter(Boolean).join(' ')
      if (degreeText) {
        children.push(new Paragraph({
          children: [new TextRun({ text: degreeText, size: 22, color: '444444', font: 'Calibri' })],
          spacing: { after: 40 },
        }))
      }
      if (edu.honors || edu.gpa) {
        children.push(new Paragraph({
          children: [new TextRun({ text: [edu.honors, edu.gpa ? `GPA: ${edu.gpa}` : ''].filter(Boolean).join(' · '), size: 20, color: primaryHex, font: 'Calibri', italics: true })],
          spacing: { after: 80 },
        }))
      }
    })
  }

  // ── Skills ───────────────────────────────────────────────────────────────────
  if (skills?.length) {
    children.push(sectionTitle('Skills'))
    skills.forEach(sg => {
      children.push(new Paragraph({
        children: [
          sg.category ? new TextRun({ text: `${sg.category}: `, bold: true, size: 22, font: 'Calibri', color: primaryHex }) : null,
          new TextRun({ text: sg.skills, size: 22, font: 'Calibri', color: '333333' }),
        ].filter(Boolean),
        spacing: { after: 60 },
      }))
    })
  }

  // ── Projects ─────────────────────────────────────────────────────────────────
  if (projects?.length) {
    children.push(sectionTitle('Projects'))
    projects.forEach(p => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: p.name || '', bold: true, size: 24, font: 'Calibri', color: '1e293b' }),
          p.url ? new TextRun({ text: `   ${p.url}`, size: 20, color: primaryHex, font: 'Calibri' }) : null,
        ].filter(Boolean),
        spacing: { before: 100, after: 40 },
      }))
      if (p.technologies) {
        children.push(new Paragraph({
          children: [new TextRun({ text: p.technologies, size: 20, color: primaryHex, font: 'Calibri', italics: true })],
          spacing: { after: 40 },
        }))
      }
      if (p.description) {
        children.push(new Paragraph({
          children: [new TextRun({ text: p.description, size: 21, font: 'Calibri', color: '444444' })],
          spacing: { after: 80 },
        }))
      }
    })
  }

  // ── Certifications ───────────────────────────────────────────────────────────
  if (certifications?.length) {
    children.push(sectionTitle('Certifications'))
    certifications.forEach(c => {
      children.push(new Paragraph({
        children: [
          new TextRun({ text: c.name || '', bold: true, size: 22, font: 'Calibri', color: '1e293b' }),
          c.issuer ? new TextRun({ text: `  ·  ${c.issuer}`, size: 20, color: '666666', font: 'Calibri' }) : null,
          c.date ? new TextRun({ text: `   ${fmtDate(c.date)}`, size: 20, color: '999999', font: 'Calibri', italics: true }) : null,
        ].filter(Boolean),
        spacing: { after: 60 },
      }))
    })
  }

  // ── Languages ────────────────────────────────────────────────────────────────
  if (languages?.length) {
    children.push(sectionTitle('Languages'))
    children.push(new Paragraph({
      children: languages.map((l, i) => [
        new TextRun({ text: l.language, bold: true, size: 22, font: 'Calibri', color: '1e293b' }),
        l.proficiency ? new TextRun({ text: ` (${l.proficiency})`, size: 20, color: '666666', font: 'Calibri' }) : null,
        i < languages.length - 1 ? new TextRun({ text: '   |   ', size: 20, color: 'CCCCCC' }) : null,
      ]).flat().filter(Boolean),
      spacing: { after: 80 },
    }))
  }

  // ── Build doc ────────────────────────────────────────────────────────────────
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
        },
      },
      children,
    }],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${(resume.data?.personal?.name || 'resume').toLowerCase().replace(/\s+/g, '-')}.docx`
  a.click()
  URL.revokeObjectURL(url)
  return true
}

function fmtDate(dateStr) {
  if (!dateStr) return ''
  const [year, month] = dateStr.split('-')
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return month ? `${months[parseInt(month)-1]} ${year}` : year
}
