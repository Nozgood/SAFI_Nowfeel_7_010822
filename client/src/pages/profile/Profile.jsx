import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'

const Profile = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    fetch('http://localhost:8000/api/user/' + userId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <>
      <Header />
    </>
  )
}

export default Profile
