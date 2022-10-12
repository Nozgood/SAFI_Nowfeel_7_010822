import React, { useState, useEffect } from 'react'
import Post from './Post'

const Publication = ({ data, homeReload, setEditPost }) => {
  const [posts, setPosts] = useState()
  const [loadData, setLoadData] = useState(false)
  const [userId, setUserId] = useState()
  const [isAdmin, setIsAdmin] = useState()
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8000/api/post/allposts', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPosts(data.posts)
        setUserId(data.userId)
        setIsAdmin(data.isAdmin)
        setLoadData(true)
      })
  }, [reload, homeReload])

  return (
    <>
      <section className="all">
        {loadData === true ? (
          posts.length !== 0 ? (
            posts.map((post) => {
              return (
                <Post
                  post={post}
                  user={data}
                  userId={userId}
                  key={post._id}
                  setReload={setReload}
                  reload={reload}
                  setEditPost={setEditPost}
                  isAmdin={isAdmin}
                />
              )
            })
          ) : (
            <div className="publication__none">
              Aucune publication pour le moment ...
            </div>
          )
        ) : (
          <div>Loading ... </div>
        )}
      </section>
    </>
  )
}

export default Publication
