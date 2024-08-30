import { postRegister } from "../../services/postRegister.js";
import { getRegister } from "../../services/getRegister.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const spanClose = document.querySelector('#errorModal .close');

    const showError = (message) => {
        console.log('Mostrando error:', message); 
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    };

    const hideError = () => {
        console.log('Ocultando modal de error'); 
        errorModal.style.display = 'none';
    };

    const showSuccess = (message) => {
        alert(message);
        setTimeout(() => {
            window.location.href = 'consultasP\src\html\consultas.html'; 
        }, 1000); 
    };

    const checkIfExists = async (email) => {
        try {
            const response = await getRegister();
            if (response && response.length > 0) {
                const exists = response.some(user => user.email === email);
                return exists;
            }
            return false;
        } catch (error) {
            console.error('Error checking user existence:', error);
            showError('Error al verificar la existencia del usuario. Inténtalo de nuevo.');
            return false;
        }
    };

    const validateRegisterForm = async () => {
        const name = document.querySelector('#registerForm [name="name"]').value.trim();
        const email = document.querySelector('#registerForm [name="email"]').value.trim();
        const password = document.querySelector('#registerForm [name="password"]').value.trim();

        let isValid = true;

        if (name === '') {
            showError('Nombre sin llenar');
            isValid = false;
        }

        if (email === '') {
            showError('Email sin llenar');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showError('Email no válido');
            isValid = false;
        } else if (await checkIfExists(email)) {
            showError('Email ya registrado');
            isValid = false;
        }

        if (password === '') {
            showError('Contraseña sin llenar');
            isValid = false;
        } else if (password.length < 6) {
            showError('Contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }

        return isValid;
    };

    const validateLoginForm = async () => {
        const email = document.querySelector('#loginForm [name="email"]').value.trim();
        const password = document.querySelector('#loginForm [name="password"]').value.trim();

        let isValid = true;

        if (email === '') {
            showError('Email sin llenar');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showError('Email no válido');
            isValid = false;
        }

        if (password === '') {
            showError('Contraseña sin llenar');
            isValid = false;
        }

        return isValid;
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (await validateRegisterForm()) {
            const name = document.querySelector('#registerForm [name="name"]').value.trim();
            const email = document.querySelector('#registerForm [name="email"]').value.trim();
            const password = document.querySelector('#registerForm [name="password"]').value.trim();

            try {
                await postRegister(name, email, password);
                showSuccess('Registro exitoso');
                registerForm.reset(); 
            } catch (error) {
                showError('Error al registrar usuario');
            }
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (await validateLoginForm()) {
            const email = document.querySelector('#loginForm [name="email"]').value.trim();
            const password = document.querySelector('#loginForm [name="password"]').value.trim();

            try {
                const users = await getRegister();
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    showSuccess('Inicio de sesión exitoso');
                    loginForm.reset();
                } else {
                    showError('Credenciales incorrectas');
                }
            } catch (error) {
                showError('Error al iniciar sesión');
            }
        }
    };

    loginForm.addEventListener('submit', handleLogin);
    registerForm.addEventListener('submit', handleRegister);

    spanClose.addEventListener('click', hideError);

    window.addEventListener('click', (event) => {
        if (event.target === errorModal) {
            hideError();
        }
    });
});

