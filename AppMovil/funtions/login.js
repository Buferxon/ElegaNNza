const datos = {
    user : "OV13",
    password : "1234"
}

async function log(user,password){
    try {
        if(user){
           const valUser = user.toLowerCase() === datos.user.toLowerCase() ? true: false;
           if (valUser) {
              const valPass = password === datos.password ? true : false
              if(valPass){
                  console.log('Acceso permitido')
                  return true
                }else{
                    console.log('Contraseña incorecta')
                    return 'E2'
                }
           }else{
            console.log('usuario no encontrado')
            return 'E1'
           }
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports={
 log,

}