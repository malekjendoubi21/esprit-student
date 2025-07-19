import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👉 Import nécessaire
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👉 Encapsule l'app ici */}
      <App />
    </BrowserRouter>
  </StrictMode>
)
