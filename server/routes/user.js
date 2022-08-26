const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.oneUser);
router.post('/signup', multer.array('photos', 2), userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', multer.array('photos', 2),userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser)

module.exports = router;