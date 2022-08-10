import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  const [burger, setBurger] = useState(false)

  const handleBurger = () => {
    setBurger(!burger)
  }

  const logout = () => {
    localStorage.clear()
    window.location.href('http://localhost:3000')
  }

  return (
    <nav className={burger === true ? 'nav open' : 'nav'}>
      <ul className={burger === true ? 'nav__list open' : 'nav__list'}>
        <li className="nav__item">
          <Link to="/" className="nav__link">
            Accueil
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/profile" className="nav__link">
            Profil
          </Link>
        </li>
        <li className="nav__item">
          <Link to="/" className="nav__link" onClick={logout}>
            Se déconnecter
          </Link>
        </li>
      </ul>
      <button className="nav__burger" onClick={handleBurger}>
        <span className="nav__burger-bar"></span>
      </button>
    </nav>
  )
}

export default Nav
