const express = require("express");
const routerSale = express.Router();
const {
	cookieJwtAuthSpecific,
	cookieJwtAuthGeneral,
	setDefaultUserType,
} = require("../security/AuthMiddleware");

const saleController = require("../controllers/saleController");

routerSale.post("/newSale", saleController.createSale);
routerSale.get("/", cookieJwtAuthSpecific("web"), saleController.getSales);

module.exports = routerSale;
