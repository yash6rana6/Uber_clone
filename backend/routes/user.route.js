const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require('../Middleware/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullName.firstName').isLength({min:3}).withMessage("first name must be 3 character long"),
    body('fullName.lastName').isLength({min:3}).withMessage("last name must be 3 character long"),
    body('password').isLength({min:6}).withMessage("Password must be 6 charachter long"),
]);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage("Password must be 6 charachter long"),
]);

router.get('/profile', authMiddleware.authUser ,userController.getUserProfile);