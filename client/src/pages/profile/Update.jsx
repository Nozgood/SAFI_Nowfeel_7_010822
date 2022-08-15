import React, { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import updateUser from '../../services/updateUser'
import Header from '../../components/Header/Header'

const Update = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  const [loadCover, setLoadCover] = useState(false)
  const [loadProfile, setLoadProfile] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }
  // DISPLAY THE NEW COVER PHOTO
  const handleCover = (e) => {
    const coverChange = document.getElementById('cover').files

    if (coverChange.length > 0) {
      const fileReader = new FileReader()

      fileReader.onload = function (event) {
        document
          .getElementById('coverImg')
          .setAttribute('src', event.target.result)
        setLoadCover(true)
        setData({
          ...data,
          coverPhotoUrl: coverChange[0].name,
        })
      }
      fileReader.readAsDataURL(coverChange[0])
    }
  }

  // DISPLAY THE NEW PROFILE PHOTO
  const handleProfile = () => {
    const profileChange = document.getElementById('profile').files
    setData({
      ...data,
      profilePhotoUrl: profileChange[0].name,
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

  // UPDATE THE INFOS TO THE DB
  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      updateUser(data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Header />
      <main className="update">
        <Link to="/profile">
          <AiOutlineArrowLeft className="update__arrow" />
        </Link>
        <form
          className="update__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
          <div
            className={
              loadCover === true
                ? 'update__form-cover-img'
                : 'update__form-cover-img--close'
            }
          >
            <img id="coverImg" alt="ok" />
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
          <div
            className={
              loadProfile === true
                ? 'update__form-profile-img'
                : 'update__form-profile-img--close'
            }
          >
            <img alt="profile" id="profileImg" />
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
