const express = require("express");
const routerProduct = express.Router();
const {
	cookieJwtAuthSpecific,
	cookieJwtAuthGeneral,
	setDefaultUserType,
} = require("../security/AuthMiddleware");

const productController = require("../controllers/productController");

routerProduct.post(
	"/insert",
	cookieJwtAuthSpecific("web"),
	productController.insertProduct
);

routerProduct.get("/", cookieJwtAuthGeneral, productController.getProducts);

module.exports = routerProduct;
