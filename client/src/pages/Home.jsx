import React, { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Publish from '../components/Posts/Publish'
import Publication from '../components/Posts/Publication'

const Home = () => {
  const [data, setData] = useState({
    userSurname: '',
    userName: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  })

  const [loaded, setLoaded] = useState(false)
  const [userId, setUserId] = useState()

  const token = localStorage.getItem('token')

  useEffect(() => {
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
        console.log(data)
        setData(data.data)
        setLoaded(true)
        setUserId(data.userId)
      })
  }, [token])

  return (
    <>
      <Header userId={userId} />
      {loaded ? (
        <main className="home">
          <Publish data={data} userId={userId} />
          <Publication data={data} />
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Home
