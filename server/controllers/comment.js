const Comment = require('../models/Comment');

exports.postComment = (req, res, next) => {

delete req.body.postId
const comment = req.body
console.log(comment)

Post.updateOne({ _id: req.params.id}, {
    $push: {comments: comment},
})
    .then((res) => res.status(200).json({ message: 'commentaire enregistré' }))
    .catch((error)=> res.status(400).json({ error }))
};

exports.getComments = (req, res, next )=> {

};

exports.editComment = (req, res, next )=> {

};

exports.deleteComment = (req, res, next )=> {

};