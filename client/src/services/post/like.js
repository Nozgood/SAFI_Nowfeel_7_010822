const sendLike = (infos) => {
  const postId = infos._id
  fetch('http://localhost:8000/api/post/setLike/' + postId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(infos),
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}

export default sendLike
