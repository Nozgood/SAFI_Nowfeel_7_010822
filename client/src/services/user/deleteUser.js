const deleteUser = (userInfos) => {
  const userId = window.location.href.split('/update/')[1]
  const token = localStorage.getItem('token')
  fetch('http://localhost:8000/api/user/' + userId, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(userInfos),
  })
    .then((res) => {
      if (res.status === 200) {
        localStorage.clear()
        window.location.href = 'http://localhost:3000'
      } else {
        alert('Email / mot de passe incorrect')
      }
    })
    .catch((error) => console.log(error))
}

export default deleteUser
