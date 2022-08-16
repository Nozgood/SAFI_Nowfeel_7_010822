const updateUser = (data) => {
  const userId = localStorage.getItem('userId')
  fetch('http://localhost:8000/api/user/' + userId, {
    method: 'PUT',
    body: data,
  })
    .then(() => (window.location.href = 'http://localhost:3000/profile'))
    .catch((err) => console.log(err))
}

export default updateUser
