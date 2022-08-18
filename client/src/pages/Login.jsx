import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import login from '../services/user/login'
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      login(credentials)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="login">
      <div className="login__intro">
        <Link to="/">
          <AiOutlineArrowLeft className="login__intro-arrow" />
        </Link>
        <h1 className="login__intro-title">Heureux de vous revoir !</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login__infos">
          <input
            type="email"
            name="email"
            placeholder="Email..."
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe..."
            onChange={handleChange}
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
