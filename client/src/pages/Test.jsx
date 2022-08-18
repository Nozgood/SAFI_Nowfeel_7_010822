import React, { useState } from 'react'

const Test = () => {
  const [data, setData] = useState({
    img: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
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
      <form
        encType="multipart/form-data"
        action="http://localhost:8000/api/test"
        method="POST"
      >
        <input type="file" name="img" id="ok" onChange={handleChange} />
        <input type="file" name="img" id="ok" onChange={handleChange} />
        <input type="submit" value="ok" />
      </form>
    </div>
  )
}

export default Test
