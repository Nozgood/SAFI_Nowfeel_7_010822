import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SearchBar = () => {
  const [datas, setDatas] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState(false)

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
    fetch('http://localhost:8000/api/user/')
      .then((res) => {
        return res.json()
      })
      .then((datas) => setDatas(datas))
  }, [])

  return (
    <>
      <div className="search">
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
              <div className="search__result">
                <Link
                  to={`/${value._id}`}
                  className="search__results-link"
                  key={value._id}
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
