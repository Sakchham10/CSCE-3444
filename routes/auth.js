const express = require('express');
const req = require('express/lib/request');
const passport = require('passport')

const router = express.Router();
const User = require('../models/users');
const catchAsync = require("../utilties/catchAsync")
const user_controllers = require('../controllers/auth')


router.route('/register')
    .get(user_controllers.renderRegister)
    .post(catchAsync(user_controllers.register))

router.route('/login')
    .get(user_controllers.renderLogin)
    .post(passport.authenticate('local',{failureFlash: true, failureRedirect: "/login"}),user_controllers.authenticate)

router.get("/logout",user_controllers.logout)

module.exports = router;