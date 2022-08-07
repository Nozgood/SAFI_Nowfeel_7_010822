import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div className="welcome">
      <h1 className="welcome__title">Bienvenue chez Groupomania !</h1>
      <button className="welcome__login-btn">
        <Link to="/login" className="welcome__login-link">
          Se connecter
        </Link>
      </button>
      <button className="welcome__signup-btn">
        <Link to="/signup" className="welcome__signup-link">
          Créer un compte
        </Link>
      </button>
    </div>
  )
}

export default Welcome
