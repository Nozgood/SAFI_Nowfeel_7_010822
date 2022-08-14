import React, { useState, useEffect } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import logo from '../../assets/icon-left-font.svg'
import user from '../../assets/user.png'

const Update = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    fetch('http://localhost:8000/api/user/' + userId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  const handleCover = () => {
    const coverChange = document.getElementById('cover').files

    if (coverChange.length > 0) {
      const fileReader = new FileReader()

      fileReader.onload = function (event) {
        document.getElementById('ok').setAttribute('src', event.target.result)
      }
      fileReader.readAsDataURL(coverChange[0])
    }
  }

  const handleProfile = () => {
    const profileChange = document.getElementById('profile').files

    if (profileChange.length > 0) {
      const test = new FileReader()

      test.onload = function (event) {
        document.getElementById('okk').setAttribute('src', event.target.result)
      }
      test.readAsDataURL(profileChange[0])
    }
  }

  return (
    <>
      <Header />
      <main className="update">
        <Link to="/profile">
          <AiOutlineArrowLeft className="update__arrow" />
        </Link>
        <div className="update__cover">
          {data.coverPhotoUrl !== '' ? (
            <img src={data.coverPhotoUrl} alt="cover" />
          ) : (
            <img src={logo} alt="cover" />
          )}
        </div>
        <div className="update__photo">
          {data.profilePhotoUrl !== '' ? (
            <img src={data.profilePhotoUrl} alt="profile" />
          ) : (
            <img src={user} alt="cover" />
          )}
        </div>
        <form className="update__form">
          <div className="update__form-files">
            {/* GESTION PHOTO DE COUVERTURE */}
            <div className="update__form-cover">
              <input
                type="file"
                name="coverPhotoUrl"
                className="update__form-cover-input"
                id="cover"
                accept="image/*"
                onChange={handleCover}
              />
              <div className="update__form-cover-button">
                Modifier la photo de couverture
              </div>
            </div>
            <div>
              <img id="ok" alt="ok" className="update__form-cover-img" />
            </div>
            {/* GESTION PHOTO DE PROFIL */}
            <div className="update__form-profile">
              <input
                type="file"
                name="profilePhotoUrl"
                className="update__form-profile-input"
                id="profile"
                accept="image/*"
                onChange={handleProfile}
              />
              <div className="update__form-profile-button">
                Modifier la photo de profil
              </div>
            </div>
            <div>
              <img alt="profile" id="okk" />
            </div>
          </div>
          <input
            type="text"
            name="userSurname"
            placeholder="Prénom..."
            className="update__form-surname"
            onChange={handleChange}
          />
          <input
            type="text"
            name="userName"
            placeholder="Nom..."
            className="update__form-name"
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Mettre à jour"
            className="update__form-submit"
          />
        </form>
      </main>
    </>
  )
}

export default Update
