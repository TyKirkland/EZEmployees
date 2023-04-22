const express = require('express');
const router = express.Router();

const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

router.get('', (req, res) => {
    res.render('users/intro');
})

router.get('/login', (req, res) => {
    res.render('users/login');
})

router.get('/signup', (req, res) => {
    res.render('users/signup');
})

router.post('/signup', async (req, res, next) => {
    try{
        const newUser = req.body;
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(newUser.password, salt);
        newUser.password = hash;
        await Users.create(newUser);
        res.redirect('/schedules');
    }
    catch(err){
        res.redirect('/signup');
        next();
    }
})

router.post('/login', async (req, res, next) => {
    try{
        let user;
        const loggedInUser = req.body;
        const userExists = await Users.exists({email: loggedInUser.email});
        if(userExists){
            user = await Users.findOne({email: loggedInUser.email});
        }
        else{
            res.redirect('/login');
        }
        const match = await bcrypt.compare(loggedInUser.password, user.password);
        req.session.currentUser = {
            id: '',
            username: ''
        };
        if(match){
            req.session.currentUser = {
                id: user._id,
                username: user.username
            };
            // this currently runs too fast so it sometimes loads without the appropriate currentUser so you have to reload the page
            res.redirect('/schedules');
        }
        else{
            res.redirect('/login');
        }
    }
    catch(err){
        console.log(err);
        next();
    }
})

module.exports = router;