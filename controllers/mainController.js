const Blog = require('../models/blogSchema.js');
const User = require('../models/userSchema.js');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const index = (req, res) => {
    res.locals.user = req.session.user;
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'main page', blog: result });
    })
    .catch((err) => console.log(err));
}

const login = (req, res) => {
    if(req.session.user) {
        res.redirect('/')
    } else {
        res.render('login', { title: 'Login', csrf: req.csrfToken() });
    }
}

const postLogin = (req, res) => {
    User.findOne({username: req.body.username})
    .then(user => {
        if(!user) {
            res.status(403).json({ response: 'User not found' });
        } else {
            bcrypt.compare(req.body.pass, user.pass)
            .then(match => {
                if(match) {

                    if(user.admin === true) {
                        req.session.user = user.username      
                        req.session.isAdmin = user.admin
                    } else {
                            req.session.user = user.username;
                        }

                            
                    req.session.save(err => {
                        if(err) {
                            console.log(err);
                            res.end();
                        }
                        res.status(200).redirect('/');
                    })
                } else {
                    res.status(403).json({ response: 'Wrong password' });
                }
            })
        }
    })
}

const register = (req, res) => {
    if(req.session.user) {
        res.redirect('/')
    } else {
        res.render('register', { title: 'Register' });
    }
}

const postRegister = (req, res) => {
    
User.findOne({username: req.body.username})
    .then(exists => {
        if(exists) {
            res.status(422).json({ response: 'Username taken' })
        } else {
            bcrypt
            .hash(req.body.pass, 12)
            .then(hashed => {
                const newUser = new User({
                    username: req.body.username,
                    pass: hashed
                });
                newUser.save()
                .then(done => { 
                    req.session.user = newUser.username
                    res.redirect('/');
                })
                .catch(err => { console.log(err) })
            })
            .catch(err => { console.log(err) })
        }
    })
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

}

// admin 

const adminUsers = (req, res) => {
    if(req.session.isAdmin) {
        User.find()
        .then(user => {
            res.render('adminUsers', { title: 'Manage users', user })
        })
    } else {
        res.redirect('/')
    }
}

const postAdminUsers = (req, res) => {
    if(req.session.isAdmin) {
        User.findOne({ username: req.body.username })
        .then(user => {
            let action;
            
            if(user.isSuspended === true) {
                action = false;
            } else {
                action = true;
            }

            user.updateOne({ isSuspended: action })
            .then(done => {
                res.status(200).redirect('/admin/users')
            })
        })
        .catch(err => console.log(err))
    }
}

module.exports = { 
    index,
    login,
    postLogin,
    register,
    postRegister,
    logout,
    adminUsers,
    postAdminUsers
} 