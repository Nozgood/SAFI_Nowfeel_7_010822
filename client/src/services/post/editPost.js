const editPost = (postInfos, postId) => {
  console.log(postInfos)
  fetch('http://localhost:8000/api/post/updatePost/' + postId, {
    method: 'put',
    body: postInfos,
  })
    .then(() => console.log('hello'))
    .catch((error) => console.log(error))
}

export default editPost

// window.location.href = 'http://localhost:3000'
