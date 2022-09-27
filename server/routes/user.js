const express = require('express');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const router = express.Router();

router.post('/signup', multer.array('photos', 2), userCtrl.signup);
router.post('/login', userCtrl.login);

// FOR THE NAVBAR
router.get('/', auth, userCtrl.getUsers);

router.get('/getOne',auth, userCtrl.oneUser);
router.get('/:id', auth, userCtrl.userById);
router.put('/:id', auth, multer.array('photos', 2),userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;