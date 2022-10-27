const { body } = require('express-validator');

const userRegister = [
    body('email').isEmail().normalizeEmail().exists().withMessage("PLease enter valid email"),
    body("password").notEmpty().exists().withMessage('Please provide password')
]

module.exports = { userRegister }