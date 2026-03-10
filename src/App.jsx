import { useState } from 'react'
import Dashboard from './components/Dashboard'
import FileNewLegModal from './components/FileNewLegModal'
import './App.css'

function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="app">
      <div className="banner">
        <img src="/pineapple-jam-app-header.png" alt="Pineapple Jam — HCF" />
      </div>

      <header className="app-header">
        <div className="header-content">
          <span className="header-tagline">The Hawaiian Island Cargo Challenge!</span>
          <button className="btn-primary" onClick={() => setModalOpen(true)}>
            Pilot Registration
          </button>
        </div>
      </header>

      <main className="app-main">
        <Dashboard />
      </main>

      <FileNewLegModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default App
