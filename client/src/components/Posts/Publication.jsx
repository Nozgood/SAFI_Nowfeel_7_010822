import React, { useState, useEffect } from 'react'
import Post from './Post'

const Publication = ({ data }) => {
  const [posts, setPosts] = useState()
  const [loadData, setLoadData] = useState(false)
  const [userId, setUserId] = useState()

  const token = localStorage.getItem('token')

  useEffect(() => {
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
        setLoadData(true)
      })
  }, [])

  return (
    <>
      <section className="all">
        {loadData === true ? (
          posts.map((post) => {
            return (
              <Post post={post} user={data} userId={userId} key={post._id} />
            )
          })
        ) : (
          <div>Loading ... </div>
        )}
      </section>
    </>
  )
}

export default Publication
