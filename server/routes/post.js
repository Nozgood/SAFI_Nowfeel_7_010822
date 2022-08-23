const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/newPost',multer.single('photo'), postCtrl.newPost);
router.get('/allposts',postCtrl.allPosts);

// here we use USER ID
router.get('/allposts/:userId', postCtrl.postsByUserId);

// here we use POST ID
router.get('/:id', postCtrl.postById);
router.put('/updatePost/:id', multer.single('photo'), postCtrl.updatePost);
router.delete('/delete/:id', postCtrl.deletePost);

// COMMENTS AND LIKE SYSTEM (with postId)
router.post('/setLike/:id', postCtrl.setLike);
router.post('/setComment/:id', postCtrl.setComment);

module.exports = router;

