import React, { useState } from 'react'
import sendLike from '../../services/post/like'
import { BsHeartFill, BsHeart } from 'react-icons/bs'

const Like = ({ postInfos, userId }) => {
  let likes = parseInt(postInfos.likes)

  // STATE TO SET LIKE AND KNOW WHAT TO SEND TO DB
  const [like, setLike] = useState(0)
  // DISPLAY ALL LIKES ON A POST DYNAMICALLY
  const [allLikes, setAllLikes] = useState(likes)
  // STATE TO KNOW IF THE USER ALREADY LIKED WHEN PAGE IS RELOADED
  const [userIndex, setUserIndex] = useState(
    postInfos.userLikes.indexOf(userId)
  )

  console.log(userIndex)

  let dynamicLikes = allLikes

  const handleLike = () => {
    if (like === 1) {
      setLike(0)
      setUserIndex(-1)

      setAllLikes(dynamicLikes - 1)
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
      setAllLikes(dynamicLikes + 1)

      const likeInfos = {
        _id: postInfos._id,
        userId: userId,
        like: 1,
      }

      try {
        sendLike(likeInfos)
      } catch (err) {
        console.log(err)
      }
    } else if (like === 0 && userIndex !== -1) {
      setUserIndex(-1)
      setAllLikes(dynamicLikes - 1)

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
