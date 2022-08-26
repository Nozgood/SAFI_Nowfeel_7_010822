import React, { useState, useEffect } from 'react'
import Post from './Post'

const Publication = ({ data }) => {
  const [posts, setPosts] = useState()
  const [loadData, setLoadData] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/api/post/allposts')
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPosts(data.posts)
        setLoadData(true)
      })
  }, [])

  return (
    <>
      <section className="all">
        {loadData === true ? (
          posts.map((post) => {
            return <Post post={post} user={data} key={post._id} />
          })
        ) : (
          <div>Loading ... </div>
        )}
      </section>
    </>
  )
}

export default Publication
