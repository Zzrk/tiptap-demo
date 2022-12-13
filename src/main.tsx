import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.css'
import WikiContent from './pages/EditorTest/components/WikiContent'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WikiContent />
  </React.StrictMode>,
)
