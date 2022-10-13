const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');

// COMMENT SYSTEM (WITH POSTID)
router.post('/:id', commentCtrl.postComment);

// all comments on a post 
router.get('/:id', commentCtrl.getComments);
router.put('/:id', commentCtrl.editComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;