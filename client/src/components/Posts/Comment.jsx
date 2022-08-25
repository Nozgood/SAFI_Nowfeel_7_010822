import React, { useState, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import sendComment from '../../services/post/comment'

const Comment = ({ post, user }) => {
  const date = new Date()
  const realDate =
    'le' +
    ' ' +
    date.toLocaleDateString('fr-FR') +
    ' ' +
    'à' +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes()

  const [comment, setComment] = useState({
    profilePhotoUrl: user.profilePhotoUrl,
    userSurname: user.userSurname,
    userName: user.userName,
    Date: realDate,
    content: '',
    postId: post._id,
  })

  const handleComment = (e) => {
    setComment({
      ...comment,
      content: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      sendComment(comment)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="comment">
        <div className="comment__user">
          <div className="comment__user-img">
            <img src={user.profilePhotoUrl} alt="user profile" />
          </div>
        </div>
        <form className="comment__form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="content"
            placeholder="Laissez un commentaire..."
            id={post._id}
            className="comment__form-text"
            autoComplete="off"
            onChange={handleComment}
          />
          <div className="comment__form-submit">
            <input
              type="submit"
              value="ok"
              className="comment__form-submit-input"
            />
            <FiSend className="comment__form-submit-icon" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Comment
