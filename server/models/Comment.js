const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    profilePhotoUrl: { type: String },
    userSurname: { type: String },
    userName: { type: String },
    Date: { type: String },
    modificationDate: { type: String, default: '' },
    content: { type: String },
    postId: { type: String },
    userId: { type: String },
})

module.exports = mongoose.model('comment', commentSchema);