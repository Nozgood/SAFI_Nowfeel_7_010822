const editPost = (postInfos) => {
  const id = window.location.href.split(':3000/')[1]
  fetch('http://localhost:8000/api/post/updatePost/' + id, {
    method: 'put',
    body: postInfos,
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}

export default editPost
