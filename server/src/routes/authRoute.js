const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check,body}= require('express-validator');
const db = require('../../database/mySqlModels');
const authController = require('../controllers/authController');
const bcrypt = require("bcrypt");
const isAuth = require('../middlewares/middlewares')

//validator
const checkEmail = body('email', "emailFalse").isEmail();
const checkPassword = body('password', "passwordFalse").isLength({min:6, max:30}).exists()


router.post('/loginUser', authController.login);
router.post('/registerUser' ,[ body('email', "email is not valid").isEmail(), body('password', "password is no valid").isLength({min:6, max:30})], authController.register)
router.post('/api/v1/auth/google', authController.auth2);
module.exports = router;