const conexionDB = require("../security/conexion");
const Joi = require("joi");
require("dotenv").config();

const stockSchema = Joi.object().pattern(
	Joi.string(), // Clave de cada par talla-cantidad (e.g., 'x', 's')
	Joi.number().integer().min(0) // Valor de cada par talla-cantidad (cantidad disponible)
);

const productSchema = Joi.object({
	name: Joi.string().required(),
	code: Joi.string().required(),
	price: Joi.string().required(),
	detail: Joi.string().required(),
	status: Joi.number().required(),
	type_product: Joi.number().required(),
	registration_date: Joi.date().required(),
	stock: stockSchema.required(), // Agregando el esquema de stock como requerido
});

async function getProducts(req, res) {
	try {
		const { code, name, price, detail, status, type_product, stock } =
			req.query;

		let query = {};

		if (name !== undefined) {
			query.name = name;
		}
		if (code !== undefined) {
			query.code = parseInt(code);
		}
		if (price !== undefined) {
			query.price = parseInt(price);
		}
		if (detail !== undefined) {
			query.detail = detail;
		}
		if (status !== undefined) {
			query.status = parseInt(status);
		}

		if (stock !== undefined) {
			query.stock = stock;
		}
		if (type_product !== undefined) {
			query.type_product = parseInt(type_product);
		}

		const collectionProduct = await conexionDB.collection("products");

		const products = await collectionProduct.find(query).toArray();

		res.status(200).json(products);
	} catch (error) {
		// console.log("Error en getUsers:", error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}

async function getUserInfo(req, res) {
	try {
		const collectionUser = await conexionDB.collection("user");

		// console.log(req.user);

		user_name = req.user.user_name;
		const result = await collectionUser.findOne({
			user_name: user_name,
		});

		res.status(200).json(result);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}

//* Trae un usuarip

//* inserta varios usuarios
async function insertProduct(req, res) {
	try {
		const products = req.body;

		// Verificar que la entrada es un array
		if (!Array.isArray(products)) {
			return res.status(400).json({ error: "La entrada debe ser un array" });
		}

		const collectionProduct = await conexionDB.collection("products");

		// Validar cada usuario y hashear la contraseña
		const validProducts = await Promise.all(
			products.map(async (product) => {
				const validation = productSchema.validate(product, {
					abortEarly: false,
				});

				if (validation.error) {
					throw validation.error;
				}

				const existingProduct = await collectionProduct.findOne({
					$or: [{ code: product.code }],
				});

				if (existingProduct) {
					throw new Error(`Este producto ya existe '${product.code}'`);
				}

				// Hashear la contraseña y eliminar el campo password

				return product;
			})
		);

		console.log(validProducts);
		await collectionProduct.insertMany(validProducts);

		res.status(200).json({
			message: "Productos insertados exitosamente",
			insertedCount: validProducts.length,
		});
	} catch (error) {
		// console.log("Error insertando usuarios:", error);

		if (error.isJoi) {
			return res.status(400).json({
				error: "Error en la validación de datos",
				details: error.details.map((e) => e.message),
			});
		} else {
			console.log("asdasd", error);
		}

		res.status(500).json({
			error: "Error interno del servidor",
		});
	}
}

//* actualiza un usuario
async function updateUser(req, res) {
	try {
		const { user_name } = req.query; // Extraer user_name de los query parameters
		const userUpdates = req.body;

		if (!user_name) {
			return res
				.status(400)
				.json({ error: "El nombre de usuario es requerido" });
		}

		// Validar la entrada del usuario
		const validation = userSchemaUpdate.validate(userUpdates, {
			abortEarly: false,
		});
		if (validation.error) {
			return res.status(400).json({
				error: "Error en la validación de datos",
				details: validation.error.details.map((e) => e.message),
			});
		}

		const collectionUser = await conexionDB.collection("user");

		// Verificar si el usuario existe
		const existingUser = await collectionUser.findOne({ user_name: user_name });
		if (!existingUser) {
			return res.status(404).json({ error: "Usuario no encontrado" });
		}

		// Hashear la nueva contraseña si ha cambiado
		
		// Actualizar el usuario en la base de datos
		const updateResult = await collectionUser.updateOne(
			{ user_name: user_name },
			{ $set: userUpdates }
		);

		if (updateResult.modifiedCount === 0) {
			return res.status(500).json({ error: "Error actualizando el usuario" });
		}

		res.status(200).json({ message: "Usuario actualizado exitosamente" });
	} catch (error) {
		// console.log("Error actualizando usuario:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
}

module.exports = {
	getProducts,
	insertProduct,
};
