const jwt = require("jsonwebtoken");
const { generateNewToken } = require("./extendTokenSession.js");
require("dotenv").config();

const cookieJwtAuthSpecific = (expectedAppType) => {
	return async (req, res, next) => {
		const token = req.headers.authorization;

		try {
			if (!token) {
				return res.status(401).json({ error: "Not logged in" });
			}

			jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
				if (err) {
					return res.status(403).json({ error: "Token no válido" });
				}

				if (decoded.user_type !== expectedAppType) {
					return res
						.status(403)
						.json({ error: "Acceso denegado para este tipo de aplicación" });
				}

				req.user = decoded;
				next();
			});
		} catch (err) {
			return res.status(500).json({ error: "Error interno del servidor" });
		}
	};
};

const cookieJwtAuthGeneral = async (req, res, next) => {
	const token = req.headers.authorization;

	try {
		if (!token) {
			return res.status(401).json({ error: "Not logged in" });
		}

		jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
			if (err) {
				return res.status(403).json({ error: "Token no válido" });
			}

			req.user = decoded;
			next();
		});
	} catch (err) {
		return res.status(500).json({ error: "Error interno del servidor" });
	}
};

function setDefaultUserType(req, res, next) {
	if (req.path === "/registerMovil") {
		if (Array.isArray(req.body)) {
			// Recorre cada objeto en el array y establece user_type a 0
			req.body.forEach((user) => {
				user.user_type = 0; // Sobrescribir el valor de user_type a 0
			});
		} else {
			// Si req.body no es un array, establece user_type a 0 de todas formas
			req.body.user_type = 0;
		}
	}
	next(); // Continuar al siguiente middleware o controlador
}

module.exports = {
	cookieJwtAuthSpecific,
	cookieJwtAuthGeneral,
	setDefaultUserType,
};
