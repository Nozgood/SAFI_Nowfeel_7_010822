const updateUser = (data) => {
  const userId = localStorage.getItem('userId')
  fetch('http://localhost:8000/api/user/' + userId, {
    method: 'PUT',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export default updateUser
