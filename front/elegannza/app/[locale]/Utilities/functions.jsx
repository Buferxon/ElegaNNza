

const datapostputdelget = async (url, data, method) => {

    // const router = useRouter()
 
        const Token = localStorage.getItem("JWT");      
    
    let result  = ''
    if(method === 'GET'){
        result = await fetch(`https://elegannza.onrender.com/${url}`,
            {
                method: method,
                headers: {
                    'access-control-allow-origin':"*",
                    "Content-Type": "application/json",
                    'authorization': Token,
                                    },
            }
        )
    }else{
        result = await fetch(`https://elegannza.onrender.com/${url}`,
            {
                method: method,
                headers: {
                    'access-control-allow-origin':"*",
                    "Content-Type": "application/json",
                    'authorization': Token, 
                },
                 body:JSON.stringify(data),
            }
        )
    }
    
    const dataResult = await result.json()


    console.log('dataResult  ', dataResult);

    if(dataResult?.error === "Error en la autenticacion"){
        localStorage.removeItem("JWT");
        Alertas('Información',dataResult?.error,2000);
        router.push('/');
    }
    
    return dataResult
}

export {datapostputdelget}