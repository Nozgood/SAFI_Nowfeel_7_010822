const newPost = (data) => {
  fetch('http://localhost:8000/api/post/newPost', {
    method: 'POST',
    body: data,
  })
    .then(() => window.location.reload())
    .catch((err) => console.log(err))
}

export default newPost
