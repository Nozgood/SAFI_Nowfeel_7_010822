const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const Post = require('../models/Post')

// SIGNUP FUNCTION
exports.signup = (req, res, next )=> {
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
        _id: req.auth.userId
    })
        .then((data)=> res.status(200).json({data: data, userId: req.auth.userId}))
        .catch((error) => res.status(400).json({ error }))
});

// PUT USER INFOS FUNCTION
exports.updateUser = ((req, res, next) => {
    let userInfos = {};

    switch(req.body.whichPhotos) {
        case 'all' : 
        userInfos =  {
            coverPhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
            profilePhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[1].filename}`,
            userSurname: req.body.userSurname,
            userName: req.body.userName,
        }
        break;
        case 'cover' :         
        userInfos =  {
            coverPhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
            userSurname: req.body.userSurname,
            userName: req.body.userName,
        }
        break;
        case 'profile' : 
        userInfos =  {
            profilePhotoUrl: `${req.protocol}://${req.get('host')}/images/${req.files[0].filename}`,
            userSurname: req.body.userSurname,
            userName: req.body.userName,
        }
        break;
        case 'none' :         
        userInfos =  {
            userSurname: req.body.userSurname,
            userName: req.body.userName,
        }
        break;
    }

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
        .then(users => res.status(200).json({users: users, userId: req.auth.userId}))
        .catch(error => res.status(400).json({ error }));
};

// DELETE AN USER 
exports.deleteUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if(user === null) {
                res.status(401).json({message: 'email / mot de passe incorrect' })
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((valid) => {
                        if(!valid) {
                            res.status(401).json({message: 'email / mot de passe incorrect' })
                        } else {
                            Post.deleteMany({ userId: req.params.id })
                                .then(() => {
                                    User.findOne({ _id: req.params.id, email: req.body.email }) 
                                        .then((user) => {
                                            const profilePhotoName = user.profilePhotoUrl.split('/images/')[1];
                                            const coverPhotoName = user.coverPhotoUrl.split('/images/')[1];
                                            fs.unlink(`images/${profilePhotoName}`, () => {
                                                fs.unlink(`images/${coverPhotoName}`, ()=> {
                                                    User.deleteOne({ _id: req.params.id})
                                                        .then(()=> res.status(200).json({message: 'user supprimé'}))
                                                        .catch((error) => res.status(500).json({ error }))
                                                })
                                            })
                                         })
                                        .catch((error) => res.status(400).json({ error }))
                                })
                                .catch((error) => res.status(500).json({ error }))
                        }
                    })
                    .catch((err)=> res.status(500).json({ err }));
            }
        })
        .catch((error)=> res.status(400).json({error }))
};

exports.userById = ((req, res, next) => {
    User.findOne({
        _id: req.params.id
    })
        .then((data)=> res.status(200).json({data: data, userId: req.auth.userId}))
        .catch((error) => res.status(400).json({ error }))
});