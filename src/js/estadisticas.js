import { fetchConsultas } from "../../services/getConsultas"; 
import { getRegister } from "../../services/getRegister"; 

const tbody = document.getElementById('consulta-tbody');

// Crea una fila de tabla a partir de los datos de la consulta
const createTableRow = (consulta) => {
    if (!consulta) {
        console.error('Consulta es undefined');
        return document.createElement('tr');
    }

    const tr = document.createElement('tr');
    const horaActual = new Date().toLocaleTimeString(); // Obtiene la hora actual

    tr.innerHTML = `
        <td>${consulta.name || 'N/A'}</td>
        <td>${consulta.select || 'N/A'}</td>
        <td>${consulta.Consultas || 'N/A'}</td>
        <td>${consulta.date || 'N/A'}</td>
        <td>${horaActual}</td>
        <td>${consulta.detalleCon || 'N/A'}</td>
        <td>
            <button class="btn-aceptar" data-id="${consulta.id}">Aceptar</button>
            <button class="btn-eliminar" data-id="${consulta.id}">Eliminar</button>
        </td>
    `;

    tr.querySelector('.btn-aceptar').addEventListener('click', () => handleAceptar(consulta.id));
    tr.querySelector('.btn-eliminar').addEventListener('click', () => handleEliminar(consulta.id));

    return tr;
};

// Maneja la acción de aceptar una consulta
const handleAceptar = (id) => {
    console.log(`Aceptar consulta con ID: ${id}`);
};

// Maneja la acción de eliminar una consulta
const handleEliminar = async (id) => {
    console.log(`Eliminar consulta con ID: ${id}`);
    try {
        const response = await fetch(`http://localhost:3001/consultas/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Eliminar la fila de la tabla
            const rowToDelete = document.querySelector(`button[data-id="${id}"]`).closest('tr');
            tbody.removeChild(rowToDelete);
        } else {
            console.error('Error al eliminar la consulta');
        }
    } catch (error) {
        console.error('Error al eliminar la consulta:', error);
    }
};

// Llena la tabla con las consultas obtenidas
const populateTable = async () => {
    try {
        const consultas = await fetchConsultas();
        const usuarios = await getRegister();

        console.log('Consultas:', consultas);
        console.log('Usuarios:', usuarios);

        if (Array.isArray(consultas) && Array.isArray(usuarios)) {
            tbody.innerHTML = ''; // Limpiar contenido previo
         
        } else {
            console.error('Datos de consultas o usuarios no son arrays');
        }
    } catch (error) {
        console.error('Error al cargar consultas o usuarios:', error);
    }
};

document.addEventListener('DOMContentLoaded', populateTable);



