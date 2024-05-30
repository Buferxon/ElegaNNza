const express = require("express");
const routerUser = express.Router();
const {
	cookieJwtAuthSpecific,
	cookieJwtAuthGeneral,
	setDefaultUserType,
} = require("../security/AuthMiddleware");

const userController = require("../controllers/userController");

routerUser.get("/", userController.getUsers);

routerUser.get("/info", cookieJwtAuthGeneral, userController.getUserInfo);

routerUser.post(
	"/insert",
	cookieJwtAuthSpecific("web"),
	userController.insertUsers
);

routerUser.post(
	"/registerMovil",
	setDefaultUserType,
	userController.insertUsers
);



routerUser.put(
	"/updateUser",
	cookieJwtAuthSpecific("web"),
	userController.updateUser
);
module.exports = routerUser;
