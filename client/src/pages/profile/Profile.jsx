import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import UserPublication from '../../components/Posts/UserPublication'
import Publish from '../../components/Posts/Publish'
import logo from '../../assets/icon-left-font.svg'
import user from '../../assets/user.png'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [localId, setLocalId] = useState()
  const [reload, setReload] = useState(0)
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })
  const userId = window.location.href.split('/profile/')[1]
  const token = localStorage.getItem('token')

  useEffect(() => {
    const userId = window.location.href.split('/profile/')[1]
    fetch('http://localhost:8000/api/user/' + userId, {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data.data)
        setLocalId(data.userId)
      })
  }, [token])

  const identity = data.userSurname + ' ' + data.userName

  return (
    <>
      <Header userId={localId} />
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
          {localId === userId ? (
            <Publish
              data={data}
              userId={userId}
              reload={reload}
              setReload={setReload}
            />
          ) : null}
          <UserPublication
            user={data}
            userId={localId}
            profileReload={reload}
          />
        </section>
      </main>
    </>
  )
}

export default Profile
