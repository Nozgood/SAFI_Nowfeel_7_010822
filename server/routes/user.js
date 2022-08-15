const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.oneUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id',multer, userCtrl.updateUser);

module.exports = router;