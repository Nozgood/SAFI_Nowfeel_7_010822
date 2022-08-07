import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup__intro">
        <Link to="/">
          <AiOutlineArrowLeft className="signup__intro-arrow" />
        </Link>
        <h1 className="signup__intro-title">Rejoignez-nous !</h1>
      </div>
      <form>
        <input
          type="text"
          name="userSurname"
          placeholder="Prénom..."
          className="signup__info"
        />
        <input
          type="text"
          name="userName"
          placeholder="Nom..."
          className="signup__info"
        />
        <input
          type="email"
          name="email"
          placeholder="Email..."
          className="signup__info"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe..."
          className="signup__info"
        />
        <input
          type="password"
          name="password"
          placeholder="Confirmez..."
          className="signup__info"
        />
        <input
          type="submit"
          value="Créer un compte"
          className="signup__submit"
        />
      </form>
    </div>
  )
}

export default Signup
