import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
const Login = () => {
  return (
    <div className="login">
      <div className="login__intro">
        <Link to="/">
          <AiOutlineArrowLeft className="login__intro-arrow" />
        </Link>
        <h1 className="login__intro-title">Heureux de vous revoir !</h1>
      </div>
      <form>
        <div className="login__infos">
          <input type="email" name="email" placeholder="Email..." />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe..."
          />
        </div>
        <input type="submit" value="Se connecter" className="login__submit" />
      </form>
      <div className="login__signup">
        <p> Pas encore de compte ?</p>
        <Link to="/signup"> Clique ici ! </Link>
      </div>
    </div>
  )
}

export default Login
