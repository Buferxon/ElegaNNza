const conexionDB = require("../security/conexion");
const CryptoJS = require("crypto-js");
const Joi = require("joi");
require("dotenv").config();

const userSchema = Joi.object({
	name: Joi.string().required(),
	last_name: Joi.string().required(),
	user_name: Joi.string().required(),
	password: Joi.string().required(),
	user_type: Joi.number().required(),
	status: Joi.number().required(),
	registration_date: Joi.date().required(),
	identification_type: Joi.string().required(),
	identification_number: Joi.number().required(),
	phone: Joi.number().required(),
	address: Joi.string().required(),
});

async function getUsers(req, res) {
	try {
		const collectionUser = await conexionDB.collection("user");
		const users = await collectionUser.find({}).toArray();
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Internal Server Error",
		});
	}
}


async function insertUsers(req, res) {
	try {
		const users = req.body;

		// Verificar que la entrada es un array
		if (!Array.isArray(users)) {
			return res.status(400).json({ error: "La entrada debe ser un array" });
		}

		const collectionUser = await conexionDB.collection("user");

		// Validar cada usuario
		const validUsers = await Promise.all(
			users.map(async (user) => {
				const validation = userSchema.validate(user, { abortEarly: false });

				if (validation.error) {
					throw validation.error;
				}

				
				const existingUser = await collectionUser.findOne({
					$or: [
						{ user_name: user.user_name },
						{ identification_number: user.identification_number },
					],
				});

				if (existingUser) {
					throw new Error(
						`Usuario con el nombre de usuario '${user.user_name}' o identificación '${user.identification_number}' ya existe`
					);
				}

				// Hashear la contraseña
				const hashedPassword = CryptoJS.SHA256(
					user.password,
					process.env.CODE_SECRET_DATA
				).toString();

				return {
					...user,
					password_hash: hashedPassword,
				};
			})
		);

		
		await collectionUser.insertMany(validUsers);

		res.status(200).json({
			message: "Usuarios insertados exitosamente",
			insertedCount: validUsers.length,
		});
	} catch (error) {
		console.log("Error insertando usuarios:", error);

		if (error.isJoi) {
			return res.status(400).json({
				error: "Error en la validación de datos",
				details: error.details.map((e) => e.message),
			});
		} else if (error.message.includes("nombre de usuario")) {
			// Si el nombre de usuario ya está en uso, devolver un error 400
			return res.status(400).json({
				error: error.message,
			});
		}

		res.status(500).json({
			error: "Error interno del servidor",
		});
	}
}

module.exports = {
	getUsers,
	insertUsers,
};
