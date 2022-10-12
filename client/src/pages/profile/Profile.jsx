import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import UserPublication from '../../components/Posts/UserPublication'
import Publish from '../../components/Posts/Publish'
import logo from '../../assets/icon-left-font.svg'
import user from '../../assets/user.png'
import { Link } from 'react-router-dom'
import PublishEdit from '../../components/Posts/PublishEdit'
const Profile = () => {
  const [localId, setLocalId] = useState()
  const [reload, setReload] = useState(0)
  const [isLoad, setIsLoad] = useState(false)
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
        setIsLoad(true)
      })
  }, [token])

  const identity = data.userSurname + ' ' + data.userName

  // EDIT POST MANAGEMENT
  const [profileEditPost, setProfileEditPost] = useState({
    toEdit: false,
    postId: '',
  })

  return (
    <>
      <Header userId={localId} />
      {isLoad === true ? (
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
              profileEditPost.toEdit === false ? (
                <Publish
                  data={data}
                  userId={userId}
                  reload={reload}
                  setReload={setReload}
                />
              ) : (
                <PublishEdit
                  data={data}
                  editPost={profileEditPost}
                  userId={userId}
                />
              )
            ) : null}
            <UserPublication
              user={data}
              userId={localId}
              profileReload={reload}
              setProfileEditPost={setProfileEditPost}
            />
          </section>
        </main>
      ) : (
        <div> Loading...</div>
      )}
    </>
  )
}

export default Profile
