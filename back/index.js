// Importar las dependencias
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routerLogin= require("./routes/routerLogin");
const routerUser= require("./routes/routerUser");


// Crear una instancia de la aplicación Express
const app = express();

app.use(express.json());

app.use(cors());




app.get("/", (req, res) => {
	res.setHeader("Content-type", "text/html");
	res.send(
		'<!DOCTYPE html><html><head><title>elegaNNza</title></head><body style="background-color:#2A7AA2; color:#ffffff;text-align:center;font-size:30px"><h1>Bienvenido a ElegaNNza </h1><p>Api desarrollada en Nodejs</p></body></html>'
	);
});





app.use("/login",routerLogin)

app.use("/user",routerUser)

// Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;




app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.send("No existe este modulo especificado");
});

// Iniciar el servidor

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
