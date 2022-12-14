import React, { useState } from 'react'

const Publish = ({ data, userId, reload, setReload }) => {
  const userSurname = data.userSurname
  const userName = data.userName
  const profilePhotoUrl = data.profilePhotoUrl

  const form = document.getElementById('form')
  const imgDisplay = document.getElementById('imgDisplay')

  const formData = new FormData()

  const date = new Date()
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

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

  // STATES
  const [postInfos, setPostInfos] = useState({
    profilePhotoUrl: profilePhotoUrl,
    userId: userId,
    userSurname: userSurname,
    userName: userName,
    Date: '',
    content: '',
    imgUrl: '',
  })

  const [loadImg, setLoadImg] = useState(false)

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
        imgDisplay.setAttribute('src', event.target.result)
        setLoadImg(true)
      }
      fileReader.readAsDataURL(imgChange[0])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    postInfos.Date = realDate
    formData.append('profilePhotoUrl', profilePhotoUrl)
    formData.append('userSurname', userSurname)
    formData.append('userName', userName)
    formData.append('userId', userId)
    formData.append('Date', realDate)
    formData.append('modificationDate', '')
    formData.append('content', postInfos.content)
    formData.append('photo', postInfos.imgUrl)

    try {
      fetch('http://localhost:8000/api/post/newPost', {
        method: 'POST',
        body: formData,
      })
        .then(() => {
          setReload(reload + 1)
          setLoadImg(false)
          form.reset()
        })
        .catch((err) => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className="publish">
        <form
          className="publish__form"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
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
              onChange={handleChange}
              autoComplete="off"
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
              value="Publier"
              className="publish__form-buttons-submit"
            />
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
      </section>
    </>
  )
}

export default Publish
