import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import { UIProvider } from './contexts/UIContext'

function App() {
  return (
    <UIProvider>
      <Router>
        <div data-testid="app-container" className="min-h-screen bg-background">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UIProvider>
  )
}

export default App 