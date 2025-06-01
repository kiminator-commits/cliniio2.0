import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { UIProvider } from './contexts/UIContext'

function AppContainer() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  return (
    <div
      data-testid="app-container"
      className={
        isLogin
          ? 'min-h-screen bg-background'
          : 'min-h-screen bg-gradient-to-br from-blue-50 to-teal-50'
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <UIProvider>
      <Router>
        <AppContainer />
      </Router>
    </UIProvider>
  )
}

export default App 