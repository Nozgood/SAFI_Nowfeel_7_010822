const Post = require('../models/Post');

// CREATE A POST
exports.newPost = (req, res, next) => {
    console.log(req.file)
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
// GET POST(S) BY ID
exports.postsById = (req, res, next) => {

};
// UPDATE A POST
exports.updatePost = (req, res, next) => {

};
// DELETE A POST
exports.deletePost = (req, res, next) => {

};