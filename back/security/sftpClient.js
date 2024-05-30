// sftpClient.js
const Client = require("ssh2-sftp-client");
const sftp = new Client();
require("dotenv").config();

const config = {
	host: process.env.SFTP_HOST,
	port: process.env.SFTP_PORT,
	username: process.env.SFTP_USERNAME,
	password: process.env.SFTP_PASSWORD,
};

async function connect() {
	try {
		// console.log("Intentando conectar con:", config);
		await sftp.connect(config);
		// console.log("Conexión SFTP exitosa");
		return sftp;
	} catch (err) {
		console.error("Error en la conexión SFTP:", err.message);
		throw err;
	}
}
async function disconnect() {
	try {
		await sftp.end();
		console.log("Conexión SFTP cerrada");
	} catch (err) {
		console.error("Error al cerrar la conexión SFTP:", err);
	}
}

module.exports = { connect, disconnect };
