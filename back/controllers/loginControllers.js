const conexionDB = require("../security/conexion");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

async function logIn(req, res) {
	try {
		const { user_name=null, password=null } = req.body;



		const collection = conexionDB.collection("user");

		const hashedPassword = CryptoJS.SHA256(
			password,
			process.env.CODE_SECRET_DATA
		).toString();

		// console.log(hashedPassword);

		const resultado = await collection.findOne({
			user_name: user_name,
			password: hashedPassword,
		});

		// console.log(resultado,"asdasdasdasd")

		

		if (resultado != null) {


			const token = jwt.sign(
				{
					user_name: resultado.user_name,
					name_role: resultado.name,
				},
				process.env.SECRET_TOKEN,
				{
					expiresIn: "1h",
				}
			);

			res.set("Access-Control-Expose-Headers", "Authorization");
			res.setHeader("authorization", token);
			res
				.status(200)
				.json({ name: resultado.name, last_name: resultado.last_name });
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
