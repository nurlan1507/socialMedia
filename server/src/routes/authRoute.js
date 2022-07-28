const express = require('express');
const router = express.Router();
const {check,body}= require('express-validator');

const authController = require('../controllers/authController');


//validator
const checkEmail = body('email', "email is not valid").isEmail();
const checkPassword = body('password', "password is no valid").isLength({min:6, max:30}).exists()


router.post('/register',[ body('email', "email is not valid").isEmail(), body('password', "password is no valid").isLength({min:6, max:30})],authController.register);
router.post('/login', authController.login);


module.exports = router;