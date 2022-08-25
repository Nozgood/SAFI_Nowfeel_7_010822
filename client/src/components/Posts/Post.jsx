import React from 'react'
import Like from './Like'
import Comment from './Comment'
import Popup from 'reactjs-popup'
import { AiOutlineEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import deletePost from '../../services/post/deletePost'

const Post = ({ user, post }) => {
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
        <Comment post={post} user={user} />
      </div>
    </div>
  )
}

export default Post
