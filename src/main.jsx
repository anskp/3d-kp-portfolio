import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppMUI from './AppMUI.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppMUI />
  </StrictMode>
)
