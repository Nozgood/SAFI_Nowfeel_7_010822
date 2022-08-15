import React, { useState } from 'react'

const Test = () => {
  const [data, setData] = useState({
    img: '',
  })

  const handleChange = (e) => {
    setData({
      img: document.getElementById('ok').files,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(data)
    fetch('http://localhost:8000/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(data),
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="ok" id="ok" onChange={handleChange} />
        <input type="submit" value="ok" />
      </form>
    </div>
  )
}

export default Test
