import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import EditPost from '../components/Posts/editPost'
const Test = () => {
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
      <div>
        <Popup
          trigger={
            <button className="publication__infos-edit-popup-update">
              Modifier
            </button>
          }
          modal
          nested
        >
          <EditPost post={posts} />
        </Popup>
      </div>
    </>
  )
}

export default Test
