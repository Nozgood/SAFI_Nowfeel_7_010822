import React from 'react'
import Nav from './Nav'

const Header = (userId) => {
  console.log(userId)
  return (
    <header>
      <Nav userId={userId} />
    </header>
  )
}

export default Header
