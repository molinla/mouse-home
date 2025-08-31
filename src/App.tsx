import Features from './components/features.tsx'
import Footer from './components/footer.tsx'
import Header from './components/header.tsx'
import Hero from './components/hero.tsx'

function App() {
  return (
    <article className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </article>
  )
}

export default App
