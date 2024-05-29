const conexionDB = require("../security/conexion");
const Joi = require("joi");
require("dotenv").config();

const itemSchema = Joi.object({
	code: Joi.number().required(),
	value: Joi.number().required(),
	description: Joi.string().required(),
	status: Joi.number().required(),
});

async function getItem(req, res) {
	try {
		const { code } = req.query;

		let query = {};

		if (code !== undefined) {
			query.code = parseInt(code);
		}

		const collectionItem = await conexionDB.collection("item");

		const item = await collectionItem.find(query).toArray();

		if (item.length == 0) {
			return res
				.status(200)
				.json({ message: "No se encontraron resultados", code });
		} else {
			return res.status(200).json(item);
		}
	} catch (error) {
		// console.log("Error en getUsers:", error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}

async function insertItem(req, res) {
	try {
		const items = req.body;

		// Verificar que la entrada es un array
		if (!Array.isArray(items)) {
			return res.status(400).json({ error: "La entrada debe ser un array" });
		}

		const collectionItem = await conexionDB.collection("item");

		// Validar cada usuario y hashear la contraseña
		const validItems = await Promise.all(
			items.map(async (item) => {
				const validation = itemSchema.validate(item, {
					abortEarly: false,
				});

				if (validation.error) {
					throw validation.error;
				}

				return item;
			})
		);

		console.log(validItems);
		await collectionItem.insertMany(validItems);

		res.status(200).json({
			message: "Items insertados exitosamente",
			insertedCount: validItems.length,
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

module.exports = {
	getItem,
	insertItem,
};
