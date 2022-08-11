import React from 'react'
import ReactDOM from 'react-dom/client'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Error from './pages/Error'
import Profile from './pages/profile/Profile'
import Update from './pages/profile/Update'
import Search from './pages/Search'
import './style.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
const token = localStorage.getItem('token')

if (token === null) {
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
} else {
  root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/:userId" element={<Profile />} />
        <Route path="/profile/update" element={<Update />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
