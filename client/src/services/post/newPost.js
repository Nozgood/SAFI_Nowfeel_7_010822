const newPost = (infos) => {
  fetch('http://localhost:8000/api/post/newPost', {
    method: 'POST',
    body: infos,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
}

export default newPost
