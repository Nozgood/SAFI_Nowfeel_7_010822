import React, { useState } from 'react'
import sendLike from '../../services/post/like'
import { BsHeartFill, BsHeart } from 'react-icons/bs'

const Like = ({ postInfos }) => {
  const userId = localStorage.getItem('userId')
  let likes = parseInt(postInfos.likes)

  const [like, setLike] = useState(0)
  const [allLikes, setAllLikes] = useState(likes)
  const [userIndex, setUserIndex] = useState(
    postInfos.userLikes.indexOf(userId)
  )

  let test = allLikes

  const handleLike = () => {
    if (like === 1) {
      setLike(0)
      setUserIndex(-1)

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
    } else if (like === 0 && userIndex === -1) {
      setLike(1)
      setUserIndex(0)
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
    } else if (like === 0 && userIndex !== -1) {
      setUserIndex(-1)
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
      <button className="publication__assets-like-all" onClick={handleLike}>
        {userIndex === -1 ? (
          <BsHeart className="publication__assets-like-all-icon" />
        ) : (
          <BsHeartFill className="publication__assets-like-all-icon" />
        )}
        <p>{allLikes}</p>
      </button>
    </div>
  )
}

export default Like
