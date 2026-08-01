import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import '@xyflow/react/dist/style.css'

import { GraphStoreProvider } from './store/graphStore'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GraphStoreProvider>
        <App />
      </GraphStoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)