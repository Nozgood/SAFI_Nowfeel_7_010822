const newUser = (userInfos) => {
  fetch('http://localhost:8000/api/user/signup', {
    method: 'POST',
    body: userInfos,
  })
    .then(() => (window.location.href = 'http://localhost:3000'))
    .catch((error) => console.log(error))
}

export default newUser
