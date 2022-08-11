import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icon-left-font-monochrome-white.svg'
import { AiOutlineSearch } from 'react-icons/ai'

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
      <img src={logo} alt="logo" className="nav__logo" />
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
      <div className="nav__buttons">
        <Link to="/search">
          <AiOutlineSearch className="nav__buttons-search" />
        </Link>
        <button className="nav__burger" onClick={handleBurger}>
          <span className="nav__burger-bar"></span>
        </button>
      </div>
    </nav>
  )
}

export default Nav
