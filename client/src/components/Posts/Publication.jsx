import React, { useState, useEffect } from 'react'

const Publication = () => {
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
            return (
              <div key={post._id} className="publication">
                <div className="publication__infos">
                  <div className="publication__infos-img">
                    <img src={post.profilePhotoUrl} alt="profile" />
                  </div>
                  <div className="publication__infos-text">
                    <h2>{post.userSurname + ' ' + post.userName}</h2>
                    <p> {post.Date}</p>
                  </div>
                </div>
                <div className="publication__content">
                  <div className="publication__content-text">
                    {post.content}
                  </div>
                  <div className="publication__content-img">
                    {post.imgUrl ? (
                      <img src={post.imgUrl} alt="contenu visuel" />
                    ) : null}
                  </div>
                </div>
                <div className="publication__assets">
                  <div className="publication__assets-like">
                    <button>J'aime </button>
                  </div>
                  <div className="publication__assets-comment">
                    <button>Commenter</button>
                  </div>
                </div>
                <div className="publication__comments"></div>
              </div>
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
