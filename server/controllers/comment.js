const Comment = require('../models/Comment');

exports.postComment = (req, res, next) => {
    const newComment = new Comment({
        ...req.body,
    })
    newComment.save()
    .then(() => res.status(200).json({ message: 'commentaire enregistré '}))
    .catch((error)=> res.status(400).json({ error }));
};

exports.getComments = (req, res, next )=> {
    Comment.find({
        postId: req.params.id
    })
    .then((comments) => res.status(200).json({ comments }))
    .catch((error) => res.status(400).json({ error }))
};

exports.editComment = (req, res, next )=> {

};

exports.deleteComment = (req, res, next )=> {
    Comment.deleteOne({
        _id: req.params.id,
    })
    .then(()=> res.status(200).json({ message: 'commentaire supprimé'}))
    .catch((error) => res.status(400).json({ error }))
};