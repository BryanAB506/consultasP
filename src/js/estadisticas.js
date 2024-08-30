import { fetchConsultas } from "../../services/getConsultas"; 

const tbody = document.getElementById('consulta-tbody');

const createTableRow = (consulta) => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${consulta.funcion}</td>
        <td>${consulta.estudiante}</td>
        <td>${consulta.fecha}</td>
        <td>${consulta.hora}</td>
        <td>${consulta.detalle}</td>
        <td>
            <button class="btn-aceptar" data-id="${consulta.id}">Aceptar</button>
            <button class="btn-eliminar" data-id="${consulta.id}">Eliminar</button>
        </td>
    `;

    tr.querySelector('.btn-aceptar').addEventListener('click', () => handleAceptar(consulta.id));
    tr.querySelector('.btn-eliminar').addEventListener('click', () => handleEliminar(consulta.id));

    return tr;
};

const handleAceptar = (id) => {
    console.log(`Aceptar consulta con ID: ${id}`);
};

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

const populateTable = async () => {
    try {
        const consultas = await fetchConsultas(); s
        consultas.forEach(consulta => {
            tbody.appendChild(createTableRow(consulta));
        });
    } catch (error) {
        console.error('Error al cargar consultas:', error);
    }
};

document.addEventListener('DOMContentLoaded', populateTable);
