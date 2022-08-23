import React, { useState, useEffect } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import Popup from 'reactjs-popup'
import deletePost from '../../services/post/deletePost'
import { Link } from 'react-router-dom'
import Like from './Like'
import Comment from './Comment'

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
            const handleDelete = () => {
              try {
                deletePost(post)
              } catch (error) {
                console.log(error)
              }
            }

            return (
              <div key={post._id} className="publication">
                <div className="publication__infos">
                  <div className="publication__infos-static">
                    <div className="publication__infos-img">
                      <img src={post.profilePhotoUrl} alt="profile" />
                    </div>
                    <div className="publication__infos-text">
                      <h2>{post.userSurname + ' ' + post.userName}</h2>
                      <p> {post.Date}</p>
                      <p>{post.modificationDate}</p>
                    </div>
                  </div>
                  <Popup
                    trigger={
                      <div className="publication__infos-edit">
                        <AiOutlineEdit className="publication__infos-edit-icon" />
                      </div>
                    }
                    position="left"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={false}
                  >
                    <div className="publication__infos-edit-popup">
                      <Link
                        to={`/${post._id}`}
                        className="publication__infos-edit-popup-update"
                      >
                        Modifier
                      </Link>
                      <button
                        className="publication__infos-edit-popup-delete"
                        onClick={handleDelete}
                      >
                        Supprimer
                      </button>
                    </div>
                  </Popup>
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
                  <Like postInfos={post} />
                  <Comment />
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
