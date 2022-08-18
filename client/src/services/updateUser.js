// TO FETCH PUT ROUTE ON USER
const updateUser = (data) => {
  const userId = localStorage.getItem('userId')
  fetch('http://localhost:8000/api/user/' + userId, {
    method: 'PUT',
    body: data,
  })
    .then(() => console.log('hello'))
    .catch((err) => console.log(err))
}

export default updateUser
