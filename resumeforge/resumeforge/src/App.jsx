import { useState } from 'react'
import Landing from './pages/Landing'
import Builder from './pages/Builder'

export default function App() {
  const [page, setPage] = useState('landing')
  const [selectedTemplate, setSelectedTemplate] = useState('midnight')

  const goToBuilder = (template = 'midnight') => {
    setSelectedTemplate(template)
    setPage('builder')
    window.scrollTo(0, 0)
  }

  const goToLanding = () => {
    setPage('landing')
    window.scrollTo(0, 0)
  }

  if (page === 'builder') {
    return <Builder onBack={goToLanding} initialTemplate={selectedTemplate} />
  }

  return <Landing onBuild={goToBuilder} />
}
