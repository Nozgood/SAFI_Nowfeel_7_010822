import React from 'react'
import user from '../../assets/user.png'

const Publish = ({ data }) => {
  return (
    <>
      <section className="publish">
        <form className="publish__form">
          <div className="publish__form-text">
            {data.profilePhotoUrl !== '' ? (
              <img src={data.profilePhotoUrl} alt="profil" />
            ) : (
              <img src={user} alt="profil" />
            )}
            <input
              type="text"
              name="postContent"
              placeholder="Quoi de neuf ?"
              id="text"
              className="publish__form-text-input"
            />
          </div>
          <div className="publish__form-buttons">
            <input
              type="file"
              name="postPhoto"
              className="publish__form-buttons-file"
            />
            <input
              type="submit"
              value="Publier"
              className="publish__form-buttons-submit"
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Publish
