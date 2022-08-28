import React from 'react'
import Nav from './Nav'

const Header = (userId) => {
  return (
    <header>
      <Nav userId={userId} />
    </header>
  )
}

export default Header
