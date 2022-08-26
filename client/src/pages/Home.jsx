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

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    fetch('http://localhost:8000/api/user/' + userId)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setData(data)
        setLoaded(true)
      })
  }, [])

  return (
    <>
      <Header />
      {loaded ? (
        <main className="home">
          <Publish data={data} />
          <Publication data={data} />
        </main>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Home
