const express = require("express");
const routerUser = express.Router();
const {
	cookieJwtAuthSpecific,
	cookieJwtAuthGeneral,
	setDefaultUserType,
} = require("../security/AuthMiddleware");

const userController = require("../controllers/userController");

routerUser.get("/", cookieJwtAuthSpecific("web"), userController.getUsers);

routerUser.post(
	"/insertWeb",
	cookieJwtAuthSpecific("web"),
	userController.insertUsers
);

routerUser.post(
	"/registerMovil",
	setDefaultUserType,
	userController.insertUsers
);

module.exports = routerUser;
