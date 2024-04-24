const jwt = require("jsonwebtoken");
const { generateNewToken } = require("./extendTokenSession.js");
require("dotenv").config();

const cookieJwtAuth = async (req, res, next) => {
	let token = req.headers.authorization;
	try {
		if (!token) {
			return res.status(401).json({ error: "Not logged in" });
		}
		token = await generateNewToken(token);
		jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
			if (err) {
				console.error("Error al verificar el token:", err);

				// Manejar el error de verificación del token
				return res.status(403).json({ error: "Error en la autenticacion" });
			} else {
				// Almacenar información del usuario en el objeto de solicitud
				// console.log(token);
				const user = decoded; // decoded contiene la información decodificada del token
				req.user = user;
				// console.log(user);

				res.set("Access-Control-Expose-Headers","Authorization")
				res.setHeader("authorization", token);
				next();
			}
		});
	} catch (err) {
		console.error("Error al verificar el token:", err);
		return res.status(500).json({ error: "Error interno del servidor" });
	}
};

module.exports = { cookieJwtAuth };