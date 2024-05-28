const express = require("express");
const routerLogin = express.Router();
const loginControllers= require('../controllers/loginController')




    routerLogin.post("/", loginControllers.logIn);
    



module.exports = routerLogin;