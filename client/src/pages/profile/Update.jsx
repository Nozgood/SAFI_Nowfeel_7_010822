import React, { useState, useEffect } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import updateUser from '../../services/user/updateUser'
import Header from '../../components/Header/Header'
import DeleteUser from '../../components/Profile/DeleteUser'

const Update = () => {
  const token = localStorage.getItem('token')
  const [userId, setUserId] = useState()

  // INITIATE FORMDATA TO FETCH (MULTER)
  const formData = new FormData()

  // STATE TO GET OLD INFOS
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  // GET THE OLD INFOS
  useEffect(() => {
    fetch('http://localhost:8000/api/user/getOne', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData({
          userSurname: data.data.userSurname,
          userName: data.data.userName,
          profilePhotoUrl: '',
          coverPhotoUrl: '',
        })
        setUserId(data.userId)
      })
  }, [token])

  // STATE TO DISPLAY COVER / PROFILE PHOTO WHEN CHOOSED
  const [loadCover, setLoadCover] = useState(false)
  const [loadProfile, setLoadProfile] = useState(false)
  const [regex, setRegex] = useState({
    userSurname: '',
    userName: '',
  })

  // REGEX MANAGEMENT
  const regName = /^[a-zA-Zéèêëàâæáäîïôœöùûü]+$/

  const handleRegex = (regexName, value, name) => {
    const testReg = regexName.test(value)

    setRegex({
      ...regex,
      [name]: testReg,
    })
    setData({
      ...data,
      [name]: value,
    })
  }

  // UPDATE NAME / USERNAME INFOS
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'userSurname' || 'userName') {
      handleRegex(regName, value, name)
    }
  }

  // DISPLAY THE NEW COVER PHOTO AND UPDATE STATE
  const handleCover = () => {
    const coverChange = document.getElementById('cover').files
    setData({
      ...data,
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
    setData({
      ...data,
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

  // SEND TO THE DB
  const handleSubmit = (event) => {
    event.preventDefault()

    if (regex.userSurname === false || regex.userName === false) {
      alert('Les informations saisies ne sont pas correctes')
    } else {
      formData.append('userSurname', data.userSurname)
      formData.append('userName', data.userName)
      formData.append('photos', data.coverPhotoUrl)
      formData.append('photos', data.profilePhotoUrl)

      if (data.coverPhotoUrl !== '' && data.profilePhotoUrl !== '') {
        formData.append('whichPhotos', 'all')
      } else if (data.coverPhotoUrl !== '' && data.profilePhotoUrl === '') {
        formData.append('whichPhotos', 'cover')
      } else if (data.coverPhotoUrl === '' && data.profilePhotoUrl !== '') {
        formData.append('whichPhotos', 'profile')
      } else if (data.coverPhotoUrl === '' && data.profilePhotoUrl === '') {
        formData.append('whichPhotos', 'none')
      }

      try {
        updateUser(formData)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <>
      <Header />
      <main className="update">
        <Link to={`/profile/${userId}`}>
          <AiOutlineArrowLeft className="update__arrow" />
        </Link>
        <form
          className="update__form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          id="form"
        >
          {/* GESTION PHOTO DE COUVERTURE */}
          <div className="update__form-cover">
            <input
              type="file"
              name="photos"
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
              name="photos"
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
            placeholder={data.userSurname}
            className="update__form-surname"
            onChange={handleChange}
          />
          <input
            type="text"
            name="userName"
            placeholder={data.userName}
            className="update__form-name"
            onChange={handleChange}
          />
          <input
            type="submit"
            value="Mettre à jour"
            className="update__form-submit"
          />
        </form>
        <DeleteUser />
      </main>
    </>
  )
}

export default Update
