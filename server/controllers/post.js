const Post = require('../models/Post');
const fs = require('fs');

// CREATE A POST
exports.newPost = (req, res, next) => {
    const postInfos = req.file ? 
        new Post({
            ...req.body,
            imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        })
    : new Post({
        ...req.body,
    })
    postInfos.save()
        .then(()=> res.status(200).json({ message: 'post enregistré !'}))
        .catch((error)=> res.status(400).json({ error }));
};

// GEL ALL POSTS
exports.allPosts = (req, res, next) => {
    Post.find()
        .then((posts)=> res.status(200).json({ posts }))
        .catch((error)=> res.status(400).json({ error }));
};
// GET POST(S) BY USERID
exports.postsByUserId = (req, res, next) => {
    Post.find({
        userId: req.params.userId,
    })
    .then((posts) => res.status(200).json({posts}))
    .catch((error) => res.status(500).json({ error }))
};

// GET SINGLE POST BY POST ID
exports.postById = (req,res, next) => {
    Post.find({
        _id: req.params.id
    })
    .then((post)=> res.status(200).json({ post }))
    .catch((error) => res.status(400).json({ error }))
};

// UPDATE A POST
exports.updatePost = (req, res, next) => {
    const editPost = req.file ? {
        ...req.body, 
        imgUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    } : {
        ...req.body,
    }
    Post.updateOne({
        _id: req.params.id
    }, {
        ...editPost, _id: req.params.id
    })
        .then(() => res.status(200).json({ message : 'post modifié !'}))
        .catch((error) => res.status(400).json({ error }))
};
// DELETE A POST
exports.deletePost = (req, res, next) => {
    Post.findOne({
        _id: req.params.id
    })
    .then((post)=> {
        if (post.imgUrl) {
            const filename = post.imgUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, ()=> {
            Post.deleteOne({ _id: req.params.id})
            .then(()=> res.status(200).json({ message: 'post supprimé' }))
            .catch((error)=> res.status(500).json({ error }))
        });
        } else {
            Post.deleteOne({ _id: req.params.id})
                .then(()=> res.status(200).json({ message: 'post supprimé' }))
                .catch((error)=> res.status(500).json({ error }))
        }
    })
    .catch((error)=> res.status(500).json({ error }))
};

// LIKES SYSTEM 
exports.setLike = (req, res, next) => {
    const like = req.body.like
    const userId = req.body.userId
    like === 1 ? 
        Post.updateOne({_id: req.params.id}, {
            $inc: {likes: like },
            $push: {userLikes: userId},
        })
        .then(()=> res.status(200).json({ message : 'like enregistré '}))
        .catch((error) => res.status(400).json({ error }))
    : 
    Post.updateOne({_id: req.params.id}, {
            $inc: {likes: -1 },
            $pull: {userLikes: userId},
        })
        .then(()=> res.status(200).json({ message : 'like enregistré '}))
        .catch((error) => res.status(400).json({ error }))
};

// COMMENTS SYSTEM
exports.setComment = (req, res, next) => {

};