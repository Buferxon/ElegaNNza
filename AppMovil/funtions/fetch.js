//const url_base = 'https://elegannza.onrender.com';
const url_base = 'http:/localhost:8080';
async function dataJson(url,method, body) {
    try {
        const ruta = url_base + url;
        const response = await fetch(ruta, {
            method: method,
            body: JSON.stringify(body),
        });
        console.log(ruta);
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return { success: false, error: error.message };
    }
}

module.exports = {
    dataJson,
}