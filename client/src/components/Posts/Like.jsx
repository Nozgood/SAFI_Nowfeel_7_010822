import React, { useState } from 'react'
import sendLike from '../../services/post/like'

const Like = ({ postInfos }) => {
  const [like, setLike] = useState(0)
  const [postIndex, setPostIndex] = useState(
    postInfos.userLikes.indexOf(postInfos.userId)
  )

  let likes = parseInt(postInfos.likes)
  const [allLikes, setAllLikes] = useState(likes)

  let test = allLikes

  const userId = localStorage.getItem('userId')

  const handleLike = () => {
    if (like === 1) {
      setLike(0)
      setPostIndex(-1)

      setAllLikes(test - 1)
      const likeInfos = {
        _id: postInfos._id,
        userId: userId,
        like: 0,
      }

      try {
        sendLike(likeInfos)
      } catch (err) {
        console.log(err)
      }
    } else if (like === 0 && postIndex === -1) {
      setLike(1)
      setPostIndex(0)
      setAllLikes(test + 1)

      const likeInfos = {
        _id: postInfos._id,
        userId: localStorage.getItem('userId'),
        like: 1,
      }

      try {
        sendLike(likeInfos)
      } catch (err) {
        console.log(err)
      }
    } else if (like === 0 && postIndex !== -1) {
      setPostIndex(-1)
      setAllLikes(test - 1)

      const likeInfos = {
        _id: postInfos._id,
        userId: userId,
        like: 0,
      }

      try {
        sendLike(likeInfos)
      } catch (err) {
        console.log(err)
      }
    }
  }

  console.log(likes)

  return (
    <div className="publication__assets-like">
      {postIndex === -1 ? (
        <button onClick={handleLike}> J'aime </button>
      ) : (
        <button onClick={handleLike}> Je n'aime plus </button>
      )}
      <p>{allLikes}</p>
    </div>
  )
}

export default Like
