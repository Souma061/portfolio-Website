import AOS from 'aos'
import 'aos/dist/aos.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Initialize AOS with optimized settings
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 100,
      disable: false,
      easing: 'ease-in-out',
    })
  })
} else {
  AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 100,
    disable: false,
    easing: 'ease-in-out',
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
