const express = require('express');
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.post('/newPost',multer.single('photo'), postCtrl.newPost);
router.get('/allposts', auth, postCtrl.allPosts);

// here we use USER ID
router.get('/allposts/:userId', auth, postCtrl.postsByUserId);

// here we use POST ID
router.get('/:id', auth, postCtrl.postById);
router.put('/updatePost/:id', auth, multer.single('photo'), postCtrl.updatePost);
router.delete('/delete/:id', auth, postCtrl.deletePost);

// LIKE SYSTEM (with postId)
router.post('/setLike/:id', postCtrl.setLike);

module.exports = router;

