async function postConsultas (Consultas,detalleCon,select,date,name ) {
    try {
        const usersDato = {
            name,
            Consultas,
            detalleCon,
            select,
            date
        }
        //post =guardar
        const response = await fetch('http://localhost:3001/consultas', {
            method: `POST`,
            headers: {
                'content-type': 'application/jon'
            },
            body : JSON.stringify(usersDato)
        });
        const dato = await response.json();
        console.log("datos almacenados");
        return dato;
    } catch (error) {
        console.log(error);  
}
 
}


export { postConsultas };