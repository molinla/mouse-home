import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/react'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </StrictMode>
  )
}
