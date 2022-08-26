const deleteUser = (userInfos) => {
  const userId = localStorage.getItem('userId')
  fetch('http://localhost:8000/api/user/' + userId, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfos),
  })
    .then(() => {
      localStorage.clear()
      window.location.reload()
    })
    .catch((error) => console.log(error))
}

export default deleteUser
