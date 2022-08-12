import React from 'react'
import user from '../../assets/user.png'
import { HiOutlinePhotograph } from 'react-icons/hi'

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
          <div className="publish__form-file">
            <input
              type="file"
              name="postPhoto"
              className="publish__form-file-input"
              title=""
            />
          </div>
          <div className="publish__form-submit">
            <input
              type="submit"
              value="Publier"
              className="publish__form-submit-input"
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Publish
