const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png',
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

const upload = multer({ storage: storage });

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.oneUser);
router.post('/signup', upload.array('photos', 2), userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id', upload.array('photos', 2),userCtrl.updateUser);

module.exports = router;