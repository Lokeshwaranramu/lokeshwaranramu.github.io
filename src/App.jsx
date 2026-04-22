import { Routes, Route } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Stats from './components/Stats'
import CaseStudies from './components/CaseStudies'
import OpenSource from './components/OpenSource'
import AppExchange from './components/AppExchange'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ConvertCasePage from './pages/ConvertCasePage'

function Portfolio() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Skills />
        <Projects />
        <Stats />
        <CaseStudies />
        <OpenSource />
        <AppExchange />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/convert-case-emails-to-pdf" element={<ConvertCasePage />} />
    </Routes>
  )
}
