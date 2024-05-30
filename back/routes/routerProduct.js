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

routerProduct.get("/", productController.getProducts);

routerProduct.put(
	"/updateProduct",
	cookieJwtAuthSpecific("web"),
	productController.updateProduct
);

module.exports = routerProduct;
