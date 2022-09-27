import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'

const SearchBar = () => {
  const [datas, setDatas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)

  const token = localStorage.getItem('token')

  const handleSearchTerm = (e) => {
    let value = e.target.value
    if (value.length > 2) {
      setSearchTerm(value)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  useEffect(() => {
    fetch('http://localhost:8000/api/user/', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((datas) => setDatas(datas.users))
  }, [token])

  return (
    <>
      <div className="search">
        <Link to="/">
          <AiOutlineArrowLeft className="search__back" />
        </Link>
        <input
          type="text"
          name="searchBar"
          placeholder="Rechercher"
          onChange={handleSearchTerm}
        />
      </div>
      <div
        className={
          showResults === true ? 'search__results' : 'search__results close'
        }
      >
        {datas
          .filter((value) => {
            return (
              value.userSurname
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              value.userName.toLowerCase().includes(searchTerm.toLowerCase())
            )
          })
          .map((value) => {
            return (
              <div className="search__result" key={value._id}>
                <Link
                  to={`/profile/${value._id}`}
                  className="search__results-link"
                >
                  {value.userName + ' ' + value.userSurname}
                </Link>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default SearchBar
