import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  const token = localStorage.getItem('token')

  if (token === 'undefined') {
    alert('les informations que vous avez saisis ne sont pas correctes')
  }
  return (
    <div className="welcome">
      <h1 className="welcome__title">Bienvenue chez Groupomania !</h1>
      <Link to="/login" className="welcome__login-link">
        Se connecter
      </Link>
      <Link to="/signup" className="welcome__signup-link">
        Créer un compte
      </Link>
    </div>
  )
}

export default Welcome
