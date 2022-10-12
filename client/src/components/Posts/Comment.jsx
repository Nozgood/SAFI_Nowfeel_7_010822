import React, { useState } from 'react'
import { FiSend } from 'react-icons/fi'

const Comment = ({ user, post, postReload, setPostReload }) => {
  const date = new Date()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  const input = document.getElementById(`${post._id}`)

  const realDate =
    'le' +
    ' ' +
    date.toLocaleDateString('fr-FR') +
    ' ' +
    'à' +
    ' ' +
    date.getHours() +
    ':' +
    minutes

  const [comment, setComment] = useState({
    profilePhotoUrl: user.profilePhotoUrl,
    userSurname: user.userSurname,
    userName: user.userName,
    Date: realDate,
    content: '',
    postId: post._id,
    userId: user._id,
  })

  const handleComment = (e) => {
    setComment({
      ...comment,
      content: e.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setComment({
      ...comment,
      profilePhotoUrl: user.profilePhotoUrl,
      userSurname: user.userSurname,
      userName: user.userName,
      userId: user._id,
    })

    try {
      fetch('http://localhost:8000/api/comment/' + post._id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      })
        .then(() => {
          input.value = ''
          setPostReload(postReload + 1)
        })
        .catch((error) => console.log(error))
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
        <form
          className="comment__form"
          onSubmit={handleSubmit}
          id="commentForm"
        >
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
