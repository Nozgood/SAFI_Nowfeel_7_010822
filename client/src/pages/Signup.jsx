import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import newUser from '../services/newUser'

const Signup = () => {
  const [userInfos, setUserInfos] = useState({
    userSurname: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfos({
      ...userInfos,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      newUser(userInfos)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="signup">
      <div className="signup__intro">
        <Link to="/">
          <AiOutlineArrowLeft className="signup__intro-arrow" />
        </Link>
        <h1 className="signup__intro-title">Rejoignez-nous !</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userSurname"
          placeholder="Prénom..."
          className="signup__info"
          onChange={handleChange}
        />
        <input
          type="text"
          name="userName"
          placeholder="Nom..."
          className="signup__info"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email..."
          className="signup__info"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe..."
          className="signup__info"
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirmez..."
          className="signup__info"
          onChange={handleChange}
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
