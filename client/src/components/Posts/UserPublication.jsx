import React, { useState, useEffect } from 'react'
import Post from './Post'

const UserPublication = ({
  user,
  userId,
  profileReload,
  setProfileEditPost,
}) => {
  const [posts, setPosts] = useState()
  const [loadData, setLoadData] = useState(false)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const userId = window.location.href.split('/profile/')[1]
    fetch('http://localhost:8000/api/post/allposts/' + userId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPosts(data.posts)
        setLoadData(true)
      })
  }, [profileReload, reload])

  return (
    <>
      <section className="all">
        {loadData === true ? (
          posts.map((post) => {
            return (
              <Post
                post={post}
                user={user}
                key={post._id}
                userId={userId}
                reload={reload}
                setReload={setReload}
                setEditPost={setProfileEditPost}
              />
            )
          })
        ) : (
          <div>Loading ... </div>
        )}
      </section>
    </>
  )
}

export default UserPublication
