import { GetUser } from "./getConsultas";

import { postUser } from "./postConsultas";

import { updateUsers } from "../services/updateUser";

import { deleteUser } from "../services/deleteUser";


document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');



    async function GetUser() {
        loginButton.addEventListener('click', async () => {
            const email = emailInput.value;
            const password = passwordInput.value;

            if (!email || !password) {
                showError('Por favor, ingrese ambos campos.');
                return;
            }

            try {
                const users = await GetUser();
                const user = users.find(user => user.email === email && user.password === password);

                if (user) {
                
                    window.location.href = '/javascrip-proyecto3/src/html/consultas.html'; 
                    
                } else {
                    showError('Email o contraseña incorrectos.');
                }
            } catch (error) {
                console.error('Error al verificar los datos:', error);
                showError('Hubo un error en el inicio de sesión. Inténtalo de nuevo más tarde.');
            }
        });
        try {
            const response = await fetch('http://localhost:3001/users');
            const datos = await response.json();
            return datos;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error; 
        }
    }
});

export { GetUser };