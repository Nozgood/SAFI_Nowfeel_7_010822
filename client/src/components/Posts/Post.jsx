import React, { useState, useEffect } from 'react'
import Like from './Like'
import Comment from './Comment'
import Popup from 'reactjs-popup'
import { AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import deletePost from '../../services/post/deletePost'
import deleteComment from '../../services/post/deleteComment'

const Post = ({ user, post }) => {
  const [comments, setComments] = useState([])

  const userId = localStorage.getItem('userId')
  const isAdmin = localStorage.getItem('isAdmin')

  useEffect(() => {
    const postId = post._id
    fetch('http://localhost:8000/api/comment/' + postId)
      .then((res) => res.json())
      .then((data) => setComments(data.comments))
      .catch((error) => console.log(error))
  }, [post._id])

  const handleDelete = () => {
    try {
      deletePost(post)
    } catch (error) {
      console.log(error)
    }
  }

  const focusComment = () => {
    document.getElementById(post._id).focus()
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
        {post.userId === userId || isAdmin === 'true' ? (
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
        ) : null}
      </div>
      <div className="publication__content">
        <div className="publication__content-text">{post.content}</div>
        <div className="publication__content-img">
          {post.imgUrl ? <img src={post.imgUrl} alt="contenu visuel" /> : null}
        </div>
      </div>
      <div className="publication__assets">
        <Like postInfos={post} />
        <div className="publication__assets-comment">
          <button onClick={focusComment}>Commenter</button>
        </div>
      </div>
      <div className="publication__comments">
        {comments.map((comment) => {
          const handleDeleteComment = () => {
            try {
              deleteComment(comment)
            } catch (error) {
              console.log(error)
            }
          }
          return (
            <div className="publication__comment" key={comment._id}>
              <div className="publication__comment-header">
                <div className="publication__comment-header-info">
                  <div className="publication__comment-header-info-img">
                    <img src={comment.profilePhotoUrl} alt="profile" />
                  </div>
                  <div className="publication__comment-header-info-text">
                    <p className="publication__comment-header-info-text-name">
                      {comment.userSurname + ' ' + comment.userName}
                    </p>
                    <p className="publication__comment-header-info-text-date">
                      {comment.Date}{' '}
                    </p>
                  </div>
                </div>
                <div className="publication__comment-header--update">
                  {post.userId === userId || isAdmin === true ? (
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
                        <button
                          className="publication__infos-edit-popup-delete"
                          onClick={handleDeleteComment}
                        >
                          Supprimer
                        </button>
                      </div>
                    </Popup>
                  ) : null}
                </div>
              </div>
              <div className="publication__comment-content">
                <p>{comment.content}</p>
              </div>
            </div>
          )
        })}
        <Comment post={post} user={user} />
      </div>
    </div>
  )
}

export default Post
