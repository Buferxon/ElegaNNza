const conexionDB = require("../security/conexion");
const Joi = require("joi");
const { sendSaleEmail } = require("../config/mailer");

// Definir el esquema para los productos
const productSchema = Joi.object({
	code: Joi.string().required(),
	name: Joi.string().required(),
	price: Joi.number().required(),
	amounth: Joi.number().required(), // Parece que debería ser "amount"
	subtotal: Joi.number().required(),
});

// Definir el esquema para la venta
const saleSchema = Joi.object({
	code: Joi.string().optional(),
	name_user: Joi.string().required(),
	name: Joi.string().required(),
	last_name: Joi.string().required(),
	total: Joi.number().required(),
	products: Joi.array().items(productSchema).required(), // Un array de productos
	registration_date: Joi.date().optional(), // Fecha de registro opcional
});

function generateSaleCode() {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let code = "";
	for (let i = 0; i < 11; i++) {
		code += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return code;
}
//* Insertar ventas

async function createSale(req, res) {
	try {
		const sales = req.body;

		// Verificar que la entrada es un array
		if (!Array.isArray(sales)) {
			return res.status(400).json({ error: "La entrada debe ser un array" });
		}

		const collectionSales = await conexionDB.collection("sales");

		// Validar cada venta, generar código y establecer la fecha de registro si no está presente
		const validSales = await Promise.all(
			sales.map(async (sale) => {
				const validation = saleSchema.validate(sale, { abortEarly: false });

				if (validation.error) {
					throw validation.error;
				}

				if (!sale.registration_date) {
					sale.registration_date = new Date();
				}

				// Generar y asignar un código único
				sale.code = generateSaleCode();

				const existingSale = await collectionSales.findOne({
					$or: [{ code: sale.code }],
				});

				if (existingSale) {
					sale.code = generateSaleCode();
				}
				return sale;
			})
		);

		await collectionSales.insertMany(validSales);

		// Enviar correo electrónico con los detalles de cada venta
		for (const sale of validSales) {
			await sendSaleEmail(sale);
		}

		res.status(200).json({
			message: "Venta realizada exitosamente",
			insertedCount: validSales.length,
		});
	} catch (error) {
		if (error.isJoi) {
			return res.status(400).json({
				error: "Error en la validación de datos",
				details: error.details.map((e) => e.message),
			});
		} else {
			console.log("Error insertando venta:", error);
		}

		res.status(500).json({
			error: "Error interno del servidor",
		});
	}
}

async function getSales(req, res) {
	try {
		const { code, name_user, total } = req.query;

		let query = {};

		if (name_user !== undefined) {
			query.name_user = name_user;
		}
		if (code !== undefined) {
			query.code = code;
		}
		if (total !== undefined) {
			query.total = parseInt(total);
		}

		const collectionSales = await conexionDB.collection("sales");

		const sales = await collectionSales.find(query).toArray();

		res.status(200).json(sales);
	} catch (error) {
		// console.log("Error en getUsers:", error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}
module.exports = {
	createSale,
	getSales,
};
