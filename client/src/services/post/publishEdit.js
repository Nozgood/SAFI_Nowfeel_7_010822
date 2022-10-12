const publishEdit = (postInfos, id) => {
  const token = localStorage.getItem('token')
  fetch('http://localhost:8000/api/post/updatePost/' + id, {
    method: 'put',
    headers: {
      authorization: 'Bearer ' + token,
    },
    body: postInfos,
  })
    .then(() => (window.location.href = 'http://localhost:3000'))
    .catch((error) => console.log(error))
}

export default publishEdit
