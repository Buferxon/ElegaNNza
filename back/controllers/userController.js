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

const userSchemaUpdate = Joi.object({
	name: Joi.string().optional(),
	last_name: Joi.string().optional(),
	user_name: Joi.string().optional(),
	password: Joi.string().optional(),
	user_type: Joi.number().optional(),
	status: Joi.number().optional(),
	registration_date: Joi.date().optional(),
	identification_type: Joi.string().optional(),
	identification_number: Joi.number().optional(),
	phone: Joi.number().optional(),
	address: Joi.string().optional(),
});

async function getUsers(req, res) {
	try {
		const {
			user_type,
			name,
			last_name,
			user_name,
			status,
			identification_type,
			identification_number,
			phone,
			address,
		} = req.query;

		let query = {};

		if (name !== undefined) {
			query.name = name;
		}
		if (user_type !== undefined) {
			query.user_type = parseInt(user_type);
		}
		if (last_name !== undefined) {
			query.last_name = last_name;
		}
		if (user_name !== undefined) {
			query.user_name = user_name;
		}
		if (status !== undefined) {
			query.status = parseInt(status);
		}
		if (identification_type !== undefined) {
			query.identification_type = identification_type;
		}
		if (phone !== undefined) {
			query.phone = parseInt(phone);
		}
		if (address !== undefined) {
			query.address = address;
		}
		if (identification_number !== undefined) {
			query.identification_number = identification_number;
		}

		const collectionUser = await conexionDB.collection("user");

		const users = await collectionUser.find(query).toArray();

		res.status(200).json(users);
	} catch (error) {
		console.log("Error en getUsers:", error);
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
async function insertUsers(req, res) {
	try {
		const users = req.body;

		// Verificar que la entrada es un array
		if (!Array.isArray(users)) {
			return res.status(400).json({ error: "La entrada debe ser un array" });
		}

		const collectionUser = await conexionDB.collection("user");

		// Validar cada usuario y hashear la contraseña
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

				// Hashear la contraseña y eliminar el campo password
				const hashedPassword = CryptoJS.SHA256(
					user.password,
					process.env.CODE_SECRET_DATA
				).toString();

				delete user.password; // Eliminar el campo password
				user.password_hash = hashedPassword; // Agregar el campo password_hash

				return user;
			})
		);

		await collectionUser.insertMany(validUsers);

		res.status(200).json({
			message: "Usuarios insertados exitosamente",
			insertedCount: validUsers.length,
		});
	} catch (error) {
		// console.log("Error insertando usuarios:", error);

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
		if (userUpdates.password) {
			userUpdates.password_hash = CryptoJS.SHA256(
				userUpdates.password,
				process.env.CODE_SECRET_DATA
			).toString();
			delete userUpdates.password; // Eliminar la contraseña en texto plano de las actualizaciones
		} else {
			delete userUpdates.password_hash; // Asegurarse de que no se sobrescribe el hash de la contraseña existente
		}

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
	getUsers,
	insertUsers,
	getUserInfo,
	updateUser,
};
