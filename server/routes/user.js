const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.oneUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', userCtrl.updateUser);

module.exports = router;