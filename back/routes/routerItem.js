const express = require("express");
const routerItem = express.Router();
const {
	cookieJwtAuthSpecific,
	cookieJwtAuthGeneral,
	setDefaultUserType,
} = require("../security/AuthMiddleware");

const itemController = require("../controllers/itemController");

routerItem.get("/", cookieJwtAuthGeneral, itemController.getItem);

routerItem.post(
	"/insert",
	cookieJwtAuthSpecific("web"),
	itemController.insertItem
);

module.exports = routerItem;
