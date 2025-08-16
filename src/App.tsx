import Features from './components/features.tsx'
import Footer from './components/footer.tsx'
import Hero from './components/hero.tsx'
import Header from './components/header.tsx'
function App() {
  return (
    <article className="min-h-screen select-none">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </article>
  )
}

export default App
