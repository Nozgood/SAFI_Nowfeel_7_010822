import React, { useState } from 'react'
import deleteUser from '../../services/user/deleteUser'

const DeleteUser = () => {
  // DELETE ACCOUNT SYSTEM
  const [clickDelete, setClickDelete] = useState(false)
  const [deleteInfos, setDeleteInfos] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setDeleteInfos({
      ...deleteInfos,
      [name]: value,
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    setClickDelete(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      deleteUser(deleteInfos)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="delete__form" onSubmit={handleSubmit}>
      <button
        onClick={handleDelete}
        className={
          clickDelete === true
            ? 'delete__form-button--off'
            : 'delete__form-button--on'
        }
      >
        Supprimer mon compte
      </button>
      <div
        className={
          clickDelete === true
            ? 'delete__form-fields--on'
            : 'delete__form-fields--off'
        }
      >
        <input
          type="text"
          name="email"
          placeholder="Entrez votre email..."
          className="delete__form-fields--on-email"
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type="password"
          name="password"
          placeholder="entrez votre mot de passe..."
          className="delete__form-fields--on-password"
          onChange={handleChange}
        />
        <input
          type="submit"
          value="Confirmer la suppression"
          className="delete__form-fields--on-submit"
        />
      </div>
    </form>
  )
}

export default DeleteUser
