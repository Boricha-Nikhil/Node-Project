const { validationResult } = require('express-validator');
const bcryptd = require('bcryptjs');
const jwt = require('jsonwebtoken')
const UserModel = require('../model/user')

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return _RESP.errorResponse(res, 400, "Validation Error", errors.array())
        }
        const user = await UserModel.findOne({ email })
        if (user) throw new Error("Email already registered")

        const hashedPassword = await bcryptd.hash(password, 10);
        const result = UserModel({ password: hashedPassword, email, }).save()
        if (result) {
            _RESP.successResponse(res, 200, "User Register Successfullt", result)
        }
    }
    catch (error) {
        next(error)
    }

}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const errors = validationResult(req);
        if (!errors.isEmpty()) { return _RESP.errorResponse(res, 400, "Validation Error", errors.array()) }

        const user = await UserModel.findOne({ email })
        if (!user) { return _RESP.errorResponse(res, 400, "User Not Found") }

        const cmppass = await bcryptd.compare(password, user.password)        
        if (!cmppass) { return _RESP.errorResponse(res, 400, "Wrong Password") }
        
        let token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);
    
        return _RESP.errorResponse(res, 201, "User Login Success",{email:user.email,token})
    }
    catch (err) {
        next(err)
    }
}