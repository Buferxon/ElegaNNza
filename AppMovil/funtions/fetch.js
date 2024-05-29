const url_base = 'https://elegannza.onrender.com/login';

async function dataJson(method, body) {
    try {
        const response = await fetch(url_base, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const statusCode = response.status;
        const text = await response.text();

        if (statusCode >= 200 && statusCode < 300) {
            try {
                const json = JSON.parse(text);
                return { success: true, data: json };
            } catch (jsonError) {
                console.error('Error al analizar JSON:', jsonError);
                console.error('Respuesta recibida:', text);
                return { success: false, error: 'Invalid JSON response' };
            }
        } else {
            console.error(`Error en la solicitud: ${statusCode}`);
            console.error('Respuesta recibida:', text);
            return { success: false, error: text };
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    dataJson,
}