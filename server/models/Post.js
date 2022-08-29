const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    profilePhotoUrl: { type: String },
    userId : { type: String },
    userSurname: { type: String },
    userName: { type: String },
    Date: { type: String },
    modificationDate: { type: String, default: '' },
    content: { type: String },
    imgUrl : { type: String, default: '' },
    likes: { type: Number, default: 0 },
    userLikes: [], 
})

module.exports = mongoose.model('post', postSchema);