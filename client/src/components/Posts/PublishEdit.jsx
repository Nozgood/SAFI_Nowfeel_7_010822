import React, { useState, useEffect } from 'react'
import publishEdit from '../../services/post/publishEdit'

const PublishEdit = ({ editPost, data, userId }) => {
  // DATE MANAGEMENT
  const date = new Date()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  const realDate =
    'Modifié le' +
    ' ' +
    date.toLocaleDateString('fr-FR') +
    ' ' +
    'à' +
    ' ' +
    date.getHours() +
    ':' +
    minutes

  const formData = new FormData()
  const [loadImg, setLoadImg] = useState(false)
  const imgDisplay = document.getElementById('imgDisplay')
  const [editPostInfos, setEditPostInfos] = useState({
    profilePhotoUrl: '',
    userId: '',
    userSurname: '',
    userName: '',
    Date: '',
    modificationDate: '',
    content: '',
    imgUrl: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (editPost.toEdit === true) {
      fetch('http://localhost:8000/api/post/' + editPost.postId, {
        headers: {
          authorization: 'Bearer ' + token,
        },
      })
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          setEditPostInfos(data.post[0])
        })
        .catch((error) => console.log(error))
    }

    if (editPostInfos.imgUrl !== '') {
      setLoadImg(true)
      imgDisplay.setAttribute('src', editPostInfos.imgUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgDisplay])

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditPostInfos({
      ...editPostInfos,
      [name]: value,
    })
  }

  const handleImg = () => {
    const imgChange = document.getElementById('img').files

    setEditPostInfos({
      ...editPostInfos,
      imgUrl: imgChange[0],
    })

    if (imgChange.length > 0) {
      const fileReader = new FileReader()

      fileReader.onload = function (event) {
        document
          .getElementById('imgDisplay')
          .setAttribute('src', event.target.result)
      }
      fileReader.readAsDataURL(imgChange[0])
    }
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()

    editPostInfos.modificationDate = realDate

    formData.append('modificationDate', editPostInfos.modificationDate)
    formData.append('content', editPostInfos.content)
    formData.append('photo', editPostInfos.imgUrl)

    try {
      publishEdit(formData, editPost.postId)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    window.location.href = 'http://localhost:3000/profile/' + userId
  }

  return (
    <>
      <section className="publish">
        <form
          className="publish__form"
          encType="multipart/form-data"
          onSubmit={handleEditSubmit}
          id="form"
        >
          <div className="publish__form-text">
            <img
              src={data.profilePhotoUrl}
              alt="profil"
              className="publish__form-text-img"
            />
            <input
              type="text"
              name="content"
              placeholder="Quoi de neuf ?"
              id="text"
              className="publish__form-text-input"
              onChange={handleEditChange}
              autoComplete="off"
              defaultValue={editPostInfos.content}
            />
          </div>
          <div className="publish__form-buttons">
            <input
              type="file"
              name="postPhoto"
              id="img"
              className="publish__form-buttons-file"
              onChange={handleImg}
            />
            {editPost.toEdit === false ? (
              <input
                type="submit"
                value="Publier"
                className="publish__form-buttons-submit"
              />
            ) : (
              <input
                type="submit"
                value="Modifier"
                className="publish__form-buttons-submit"
              />
            )}
          </div>
          <div
            className={
              loadImg === true
                ? 'publish__form-file--open'
                : 'publish__form-file--close'
            }
          >
            <img alt="ok" id="imgDisplay" />
          </div>
        </form>
        <button className="publish__edit-cancel" onClick={handleCancel}>
          Annuler les modifications
        </button>
      </section>
    </>
  )
}

export default PublishEdit
