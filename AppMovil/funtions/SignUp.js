async function registerUser(data){
    try {
        if(data){
            console.log(data)
        }else{
            console.log("No hay datos");
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports  = {
    registerUser
};