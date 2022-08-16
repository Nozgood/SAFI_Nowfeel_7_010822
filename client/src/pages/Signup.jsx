import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import newUser from '../services/newUser'

const Signup = () => {
  const formData = new FormData()

  const [userInfos, setUserInfos] = useState({
    userSurname: '',
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    coverPhotoUrl: '',
    profilePhotoUrl: '',
  })

  const [loadCover, setLoadCover] = useState(false)
  const [loadProfile, setLoadProfile] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfos({
      ...userInfos,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    formData.append('credentials', {
      userSurname: userInfos.userSurname,
      userName: userInfos.userName,
      email: userInfos.email,
      password: userInfos.password,
      passwordConfirm: userInfos.passwordConfirm,
    })
    formData.append('photos', userInfos.coverPhotoUrl)
    formData.append('photos', userInfos.profilePhotoUrl)
    try {
      newUser(formData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCover = () => {
    const coverChange = document.getElementById('cover').files
    setUserInfos({
      ...userInfos,
      coverPhotoUrl: coverChange[0],
    })

    if (coverChange.length > 0) {
      const fileReader = new FileReader()

      fileReader.onload = function (event) {
        document
          .getElementById('coverImg')
          .setAttribute('src', event.target.result)
        setLoadCover(true)
      }
      fileReader.readAsDataURL(coverChange[0])
    }
  }

  // DISPLAY THE NEW PROFILE PHOTO
  const handleProfile = () => {
    const profileChange = document.getElementById('profile').files
    setUserInfos({
      ...userInfos,
      profilePhotoUrl: profileChange[0],
    })

    if (profileChange.length > 0) {
      const test = new FileReader()

      test.onload = function (event) {
        document
          .getElementById('profileImg')
          .setAttribute('src', event.target.result)
        setLoadProfile(true)
      }
      test.readAsDataURL(profileChange[0])
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
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
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
        <div className="signup__form-cover">
          <input
            type="file"
            name="photos"
            className="signup__form-cover-input"
            id="cover"
            accept="image/*"
            onChange={handleCover}
          />
          <div className="signup__form-cover-button">
            Choisir ma photo de couverture
          </div>
        </div>
        <div
          className={
            loadCover === true
              ? 'signup__form-cover-img'
              : 'signup__form-cover-img--close'
          }
        >
          <img id="coverImg" alt="ok" />
        </div>
        <div className="signup__form-profile">
          <input
            type="file"
            name="photos"
            className="signup__form-profile-input"
            id="profile"
            accept="image/*"
            onChange={handleProfile}
          />
          <div className="signup__form-profile-button">
            Choisir ma photo de profil
          </div>
        </div>
        <div
          className={
            loadProfile === true
              ? 'signup__form-profile-img'
              : 'signup__form-profile-img--close'
          }
        >
          <img alt="profile" id="profileImg" />
        </div>
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
