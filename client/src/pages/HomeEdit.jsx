import React, { useState, useEffect } from 'react'
import EditPost from '../components/Posts/editPost'
import Publication from '../components/Posts/Publication'

const HomeEdit = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  const [loaded, setLoaded] = useState(false)
  const [userId, setUserId] = useState()
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:8000/api/user/getOne', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data.data)
        setLoaded(true)
        setUserId(data.userId)
      })
  }, [])

  return (
    <>
      <EditPost />
      <Publication data={data} homeReload={reload} setReload={setReload} />
    </>
  )
}

export default HomeEdit
