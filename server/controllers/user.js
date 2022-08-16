const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const test = 'http://localhost:3000'
// SIGNUP FUNCTION
exports.signup = (req, res, next )=> {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                userSurname: req.body.userSurname,
                userName: req.body.userName,
                email : req.body.email,
                password: hash,
                passwordConfirm : hash,
                coverPhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
                profilePhotoUrl:  `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`,
            })
            user.save()
                .then(()=> res.status(201).json({ message : `'utilisateur crée, rendez-vous à cette adresse : ${test}`}))
                .catch((err) => res.status(400).json({ err }));
        })
        .catch((err)=> res.status(500).json({ err }));
};

// LOGIN FUNCTION

exports.login = (req, res, next) => {
    User.findOne({ email : req.body.email })
        .then((user)=> {
            if (user === null) {
                res.status(401).json({ message : 'email / mot de passe incorrect' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid)=> {
                        if (!valid) {
                            res.status(401).json({ message : 'email / mot de passe incorrect' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                isAdmin: user.isAdmin,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET', 
                                    { expiresIn: '24h' }
                                ),
                            })
                        }
                    })
                    .catch((err)=> res.status(500).json({ err }));
            }
        })
        .catch((err)=> res.status(500).json({ err }));
};

// GET ONE USER INFO FUNCTION

exports.oneUser = ((req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
        .then((data)=> res.status(200).json(data))
        .catch((error) => res.status(400).json({ error }))
});

// PUT USER INFOS FUNCTION
exports.updateUser = ((req, res, next) => {
    console.log(req.file)
    console.log(req.files)
    console.log(req.body)

    const userInfos = req.files ? {
        coverPhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
        profilePhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`,
        userSurname: req.body.userSurname,
        userName: req.body.userName,
    } : {
        ...req.body
    };

    delete userInfos._userId;

    User.findOne({
        _id: req.params.id
    })
        .then((user)=> {
            User.updateOne({
                _id: req.params.id
            },
            {
                ...userInfos,
                _id: req.params.id
            })
                .then(()=> res.status(200).json({ message : 'infos mises à jour ! '}))
                .catch((error)=> res.status((401)).json({ error }));
        })
        .catch((error)=> res.status(400).json({ error }));
});


// GET ALL USERS (for searchbar)

exports.getUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};