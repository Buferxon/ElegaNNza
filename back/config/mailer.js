const Nodemailer = require("nodemailer");
require("dotenv").config();

const transport = Nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: "robinsonbuenaventuraf@gmail.com",
		pass: process.env.PASS_EMAIL,
	},
});

transport.verify().then(() => {
	console.log("Ready for send emails");
});

async function sendSaleEmail(sale) {
	console.log(sale);
	const { name_user, name, last_name, total, products, code } = sale;

	// Generar el HTML para la tabla de productos
	const productRows = products
		.map(
			(product) => `
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.code}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.name}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.price}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.amounth}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${product.subtotal}</td>
                </tr>
            `
		)
		.join("");

	const htmlContent = `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <h1 style="color: #4CAF50;">Detalles de tu compra ${code}</h1>
            <p><strong>Nombre de Usuario:</strong> ${name_user}</p>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Apellido:</strong> ${last_name}</p>
            <p><strong>Total:</strong> ${total}</p>
            <table style="border-collapse: collapse; width: 100%; margin-top: 20px;">
                <thead>
                    <tr style="background-color: #f2f2f2;">
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Código</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Nombre</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Precio</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Cantidad</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${productRows}
                </tbody>
            </table>
        </div>
    `;

	console.log(name_user);
	const mailOptions = {
		from: '"EleganNza" <robinsonbuenaventuraf@gmail.com>', // Dirección del remitente
		to: name_user, // Dirección del destinatario
		subject: "Detalles de tu venta", // Asunto del correo
		html: htmlContent, // Contenido HTML del correo
	};

	try {
		const info = await transport.sendMail(mailOptions);
		console.log("Correo enviado:", info.response);
	} catch (error) {
		console.log("Error al enviar el correo:", error);
	}
}

module.exports = { sendSaleEmail };
