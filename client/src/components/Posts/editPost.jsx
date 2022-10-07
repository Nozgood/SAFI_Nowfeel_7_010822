import React, { useState, useEffect } from 'react'
import editPost from '../../services/post/editPost'

const EditPost = ({ postId }) => {
  const [postInfos, setPostInfos] = useState({})

  useEffect(() => {
    // const postId = window.location.href.split(':3000/')[1]

    fetch('http://localhost:8000/api/post/' + postId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPostInfos(data.post[0])
      })
      .catch((error) => console.log(error))
  }, [postId])

  const formData = new FormData()
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setPostInfos({
      ...postInfos,
      [name]: value,
    })
  }

  const handleImg = () => {
    const imgChange = document.getElementById('img').files

    setPostInfos({
      ...postInfos,
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

  const handleSubmit = (event) => {
    console.log('hello')
    event.preventDefault()
    postInfos.modificationDate = realDate
    formData.append('modificationDate', realDate)
    formData.append('content', postInfos.content)
    formData.append('photo', postInfos.imgUrl)

    try {
      editPost(formData, postId)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <main className="edit">
        <section className="publish edit">
          <form
            className="publish__form"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="publish__form-text">
              <img
                alt="profil"
                className="publish__form-text-img"
                src={postInfos.profilePhotoUrl}
              />
              <input
                type="text"
                name="content"
                placeholder={postInfos.content}
                id="text"
                className="publish__form-text-input"
                onChange={handleChange}
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
              <input
                type="submit"
                value="Modifier"
                className="publish__form-buttons-submit"
              />
            </div>
            <div>
              {postInfos.imgUrl ? (
                <img
                  alt="ok"
                  id="imgDisplay"
                  src={postInfos.imgUrl}
                  className="publish__form-input-img"
                  onChange={handleImg}
                />
              ) : null}
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default EditPost
