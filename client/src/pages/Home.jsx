import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Publish from '../components/Posts/Publish'
import Publication from '../components/Posts/Publication'
import PublishEdit from '../components/Posts/PublishEdit'

const Home = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  const [loaded, setLoaded] = useState(false)
  const [userId, setUserId] = useState()
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
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
        setData(data.data)
        setLoaded(true)
        setUserId(data.userId)
      })
  }, [])

  const [editPost, setEditPost] = useState({
    toEdit: false,
    postId: '',
  })

  return (
    <>
      <Header userId={userId} />
      {loaded ? (
        <main className="home">
          {editPost.toEdit ? (
            <PublishEdit editPost={editPost} data={data} userId={userId} />
          ) : (
            <Publish
              data={data}
              userId={userId}
              reload={reload}
              setReload={setReload}
            />
          )}
          <Publication
            data={data}
            homeReload={reload}
            setReload={setReload}
            setEditPost={setEditPost}
          />
        </main>
      ) : (
        <div className="home__loading">Loading...</div>
      )}
    </>
  )
}

export default Home
