const jwt = require("jsonwebtoken");

async function generateNewToken(token){
    let newToken = token;

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) {
            console.error("Error al verificar el token:", err);
        } else {
            if((Date.now() - decoded.exp * 1000) < 900000 && (Date.now() - decoded.exp * 1000) > 60000){
                const user = decoded;
                newToken = jwt.sign(
                    {
                        user_name: user.user_name,
                        name_role: user.name_role,
                    },
                    process.env.SECRET_TOKEN,
                    {
                        expiresIn: "1h",
                    }
                )
            }
        }
    });

    return newToken;
}

module.exports = {
    generateNewToken
}