async function GetConsultas(consultas) {
    try {


        const response = await fetch('http://localhost:3001/consultas/${consultas}',);

        const dato = await response.json();


        return dato
    } catch (error) {
        console.log(Error);

    }
}

let contendorGrande=document.getElementById("contendor")


let cargar=async()=>{
    let usuarios= await GetConsultas()
    usuarios.forEach(usuario => {
        let contenedor=document.createElement("div")
        let parrafo=document.createElement("p")
        parrafo.innerHTML="Nombre de la peticion"+usuario.consultas
        contendorGrande.appendChild(contenedor)
    });
}

export { GetConsultas }
