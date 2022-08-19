const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/newPost',multer.single('photo'), postCtrl.newPost);
router.get('/allposts',postCtrl.allPosts);

// here we use USER ID
router.get('/allposts/:id', postCtrl.postsById);

// here we use POST ID
router.put('/updatePost/:id', postCtrl.updatePost);
router.delete('/delete/:id', postCtrl.deletePost);

module.exports = router;

