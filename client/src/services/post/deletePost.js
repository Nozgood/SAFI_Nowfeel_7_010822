const deletePost = (postInfos) => {
  const postId = postInfos._id
  fetch('http://localhost:8000/api/post/delete/' + postId, {
    method: 'delete',
    body: postInfos,
  })
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}

export default deletePost
