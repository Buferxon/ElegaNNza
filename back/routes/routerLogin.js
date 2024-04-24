const express = require("express");
const routerLogin = express.Router();
const loginControllers= require('../controllers/loginControllers')



routerLogin.get("/", loginControllers.logIn);


module.exports = routerLogin;