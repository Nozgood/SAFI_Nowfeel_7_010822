import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Publication from '../../components/Publication'
import logo from '../../assets/icon-left-font.svg'
import user from '../../assets/user.png'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  const userId = localStorage.getItem('userId')

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

  const identity = data.userSurname + ' ' + data.userName

  return (
    <>
      <Header />
      <main className="profile">
        <section className="profile__section">
          <div className="profile__cover">
            {data.coverPhotoUrl !== '' ? (
              <img src={data.coverPhotoUrl} alt="couverture" />
            ) : (
              <img src={logo} alt="logo" />
            )}
          </div>
          <div className="profile__infos">
            <div className="profile__infos-content">
              <div className="profile__infos-content-img">
                {data.profilePhotoUrl !== '' ? (
                  <img src={data.profilePhotoUrl} alt="profil" />
                ) : (
                  <img src={user} alt="user" />
                )}
              </div>
              <div className="profile__infos-content-text">
                <h3>{identity}</h3>
              </div>
            </div>
            <div className="profile__infos-update">
              <Link to={`/profile/update/${userId}`}>Modifier le profil</Link>
            </div>
          </div>
        </section>
        <section className="profile__section profile__publications">
          <Publication />
        </section>
      </main>
    </>
  )
}

export default Profile
