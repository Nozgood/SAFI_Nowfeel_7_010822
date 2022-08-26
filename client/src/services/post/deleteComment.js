const deleteComment = (comment) => {
  const commentId = comment._id
  fetch('http://localhost:8000/api/comment/' + commentId, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then(() => window.location.reload())
    .catch((error) => console.log(error))
}

export default deleteComment
