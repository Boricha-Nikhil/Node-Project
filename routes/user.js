const express = require('express');

//controller
const userController = require("../controllers/user");

//Auth Check
const isAuth = require("../middelware/isAuth")
//validator
const  { userRegister } = require("../middelware/validation") 

//Router
const router = express.Router();

router.post('/',userRegister,userController.register);
router.post('/signIn',userRegister,userController.login);

module.exports = router 