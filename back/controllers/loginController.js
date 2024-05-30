const conexionDB = require("../security/conexion");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

async function logIn(req, res) {
	try {
		const { user_name = null, password = null } = req.body;

		const collectionUser = conexionDB.collection("user");

		const hashedPassword = CryptoJS.SHA256(
			password,
			process.env.CODE_SECRET_DATA
		).toString();

		// console.log(hashedPassword);

		const result = await collectionUser.findOne({
			user_name: user_name,
			password_hash: hashedPassword,
		});

		// console.log(result);

		if(result.status==0){
			return res.status(401).json({ error: "Usuario Inactivo" });
		}


		if (result != null) {
			const collectionItem = conexionDB.collection("item");
			var expiresdTime = "1h";

			const type_userasdasd = await collectionItem.findOne({
				code: 1987,
				value: result.user_type,
			});

			if (type_userasdasd.description == "web") {
				expiresdTime = "1h";
			} else if (type_userasdasd.description == "movil") {
				expiresdTime = "30d";
			}

			const token = jwt.sign(
				{
					user_name: result.user_name,
					user_type: type_userasdasd.description,
				},
				process.env.SECRET_TOKEN,
				{
					expiresIn: expiresdTime,
				}
			);

			res.set("Access-Control-Expose-Headers", "Authorization");
			res.setHeader("authorization", token);
			res.status(200).json({
				name: result.name,
				last_name: result.last_name,
				user_name: result.user_name,
				user_type: type_userasdasd.description,
				authorization: token,
			});
		} else {
			res.status(401).json({ error: "Credenciales incorrectas" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = {
	logIn,
};
