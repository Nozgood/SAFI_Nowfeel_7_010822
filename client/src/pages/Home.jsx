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
      <main className="home">
        <Publish data={data} />
        <Publication data={data} />
      </main>
    </>
  )
}

export default Home
