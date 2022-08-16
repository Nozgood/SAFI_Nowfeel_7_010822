const axios = require('axios')

const newUser = (userInfos) => {
  axios({
    method: 'post',
    url: 'http://localhost:8000/api/user/signup',
    data: userInfos,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export default newUser
