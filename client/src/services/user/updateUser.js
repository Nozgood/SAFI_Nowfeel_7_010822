// TO FETCH PUT ROUTE ON USER
const updateUser = (data) => {
  const token = localStorage.getItem('token')
  const userId = window.location.href.split('/update/')[1]

  fetch('http://localhost:8000/api/user/' + userId, {
    method: 'PUT',
    headers: {
      authorization: 'Bearer ' + token,
    },
    body: data,
  })
    .then(
      () => (window.location.href = 'http://localhost:3000/profile/' + userId)
    )
    .catch((err) => console.log(err))
}

export default updateUser
