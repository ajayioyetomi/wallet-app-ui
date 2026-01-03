import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import PopUpProvider from './contexts/PopUpContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopUpProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </PopUpProvider>
  </StrictMode>,
)
