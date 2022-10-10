const publishEdit = (postInfos, id) => {
  fetch('http://localhost:8000/api/post/updatePost/' + id, {
    method: 'put',
    body: postInfos,
  })
    .then(() => (window.location.href = 'http://localhost:3000'))
    .catch((error) => console.log(error))
}

export default publishEdit
