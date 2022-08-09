const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP FUNCTION
exports.signup = ((req, res, next )=> {
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                userSurname: req.body.userSurname,
                userName: req.body.userName,
                email : req.body.email,
                password: hash,
                passwordConfirm : hash,
                profilePhotoUrl: '',
                coverPhotoUrl: '',
            })
            user.save()
                .then(()=> res.status(201).json({ message : 'utilisateur crée'}))
                .catch((err) => res.status(400).json({ err }));
        })
        .catch((err)=> res.status(500).json({ err }));
});

// LOGIN FUNCTION

exports.login = ((req, res, next) => {

});

// GET ONE USER INFO FUNCTION

exports.oneUser = ((req, res, next) => {

});

// PUT USER INFOS FUNCTION

exports.updateUser = ((req, res, next) => {

});