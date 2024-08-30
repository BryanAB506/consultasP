import { fetchConsultas } from "../../services/getConsultas"; 

const tbody = document.getElementById('consulta-tbody');

// Crea una fila a la tabla
const createTableRow = (consulta) => {
    if (!consulta) {
        console.error('Consulta es undefined');
        return document.createElement('tr');
    }

    const tr = document.createElement('tr');
    const horaActual = new Date().toLocaleTimeString(); 2

    tr.innerHTML = `
        <td>${consulta.name||'N/A'}</td>
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

//  aceptar una consulta
const handleAceptar = (id) => {
    console.log(`Aceptar consulta con ID: ${id}`);
};

// eliminar una consulta
const handleEliminar = async (id) => {
    console.log(`Eliminar consulta con ID: ${id}`);
    try {
        const response = await fetch(`http://localhost:3001/consultas/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Eliminar la fila 
            const rowToDelete = document.querySelector(`button[data-id="${id}"]`).closest('tr');
            tbody.removeChild(rowToDelete);
        } else {
            console.error('Error al eliminar la consulta');
        }
    } catch (error) {
        console.error('Error al eliminar la consulta:', error);
    }
};

// Llena la tabla 
const populateTable = async () => {
    try {
        const consultas = await fetchConsultas();

        console.log('Consultas:', consultas);

        if (Array.isArray(consultas)) {
            tbody.innerHTML = ''; 

            consultas.forEach(consulta => {
                const row = createTableRow(consulta);
                tbody.appendChild(row);
            });
        } else {
            console.error('Datos de consultas no son arrays');
        }
    } catch (error) {
        console.error('Error al cargar consultas:', error);
    }
};

document.addEventListener('DOMContentLoaded', populateTable);





