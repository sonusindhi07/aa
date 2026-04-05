import Navbar from '../components/landing/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import Templates from '../components/landing/Templates'
import HowItWorks from '../components/landing/HowItWorks'
import Testimonials from '../components/landing/Testimonials'
import Pricing from '../components/landing/Pricing'
import CTABanner from '../components/landing/CTABanner'
import Footer from '../components/landing/Footer'

export default function Landing({ onBuild }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar onBuild={onBuild} />
      <Hero onBuild={onBuild} />
      <Features />
      <Templates onBuild={onBuild} />
      <HowItWorks />
      <Testimonials />
      <Pricing onBuild={onBuild} />
      <CTABanner onBuild={onBuild} />
      <Footer />
    </div>
  )
}
