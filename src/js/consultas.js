import { postConsultas } from "../../services/postConsultas";
import { GetConsultas } from "../../services/getConsultas";


const consultas = document.getElementById("Consultas")
const detalleCon = document.getElementById("detalleCon")
const select = document.getElementById("select")
const date = document.getElementById("date")
const name = document.getElementById("name")

const boton = document.getElementById("botonEnviar")
const botonCancelar = document.getElementById("bontonCanselar")

 

boton.addEventListener("click", function () {
    const consultasIN= consultas.value;
    const detalleConM= detalleCon.value;
    const selectO= select.value;
    const dateD= date.value;
    const name1= name.value;

    postConsultas(consultasIN, detalleConM, selectO, dateD, name1)

   
})
console.log(GetConsultas());


