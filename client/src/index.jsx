import React from 'react'
import ReactDOM from 'react-dom/client'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import './style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
)
