export const fetchConsultas = async () => {
    try {
        const response = await fetch('http://localhost:3001/consultas');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Datos en fetchConsultas:', data); // Depuración
        return data;
    } catch (error) {
        console.error('Error fetching consultas:', error);
        throw error;
    }
};

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
