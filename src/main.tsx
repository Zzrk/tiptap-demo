import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import Editor from './pages/editor'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Editor />
  </React.StrictMode>,
)
