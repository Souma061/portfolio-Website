import AOS from 'aos'
import 'aos/dist/aos.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { I18nProvider } from './i18n/I18nProvider.jsx'
import './index.css'
import { applyCatppuccinTheme, getStoredCatppuccinFlavor } from './theme/catppuccinMocha.js'

applyCatppuccinTheme(getStoredCatppuccinFlavor() ?? 'mocha')

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: false,
      offset: 100,
      disable: false,
      easing: 'ease-in-out',
    })
  })
} else {
  AOS.init({
    duration: 800,
    once: false,
    mirror: false,
    offset: 100,
    disable: false,
    easing: 'ease-in-out',
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </StrictMode>,
)
