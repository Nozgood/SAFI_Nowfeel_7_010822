const axios = require('axios')

const newUser = (userInfos) => {
  axios({
    method: 'post',
    url: 'http://localhost:8000/api/user/signup',
    data: userInfos,
  })
    .then(() => (window.location.href = 'http://localhost:3000'))
    .catch((err) => console.log(err))
}

export default newUser
