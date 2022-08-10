const login = (credentials) => {
  fetch('http://localhost:8000/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      localStorage.setItem('token', data.token, 'isAdmin', data.isAdmin)
      localStorage.setItem('isAdmin', data.isAdmin)
      localStorage.setItem('userId', data.userId)
      window.location.href = 'http://localhost:3000/profile'
    })
}

export default login
