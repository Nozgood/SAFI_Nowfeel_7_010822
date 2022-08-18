const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    profilePhotoUrl: { type: String },
    userId : { type: String },
    userSurname: { type: String },
    userName: { type: String },
    Date: { type: Date },
    modificationDate: { type: String },
    content: { type: String },
    imgUrl : { type: String },
    likes: { type: Number, default: 0 },
    userLikes: [],
    comments: [], 
})

module.exports = mongoose.model('post', postSchema);