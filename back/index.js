// Importar las dependencias
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Crear una instancia de la aplicación Express
const app = express();

// Configurar el middleware CORS para permitir solicitudes de todos los dominios
app.use(cors());

// Ruta de ejemplo
app.get("/", (req, res) => {
	res.send("¡Hola, mundo!");
});

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
	console.log(`Servidor iniciado en el puerto ${PORT}`);
});
