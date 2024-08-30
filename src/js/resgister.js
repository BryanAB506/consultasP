import { postRegister } from "../../services/postRegister.js";
import { getRegister } from "../../services/getRegister.js";

// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const btn = document.querySelector('.flip-card__back .flip-card__btn');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const spanClose = document.querySelector('#errorModal .close');

    // Función para mostrar el moda de error
    const showError = (message) => {
        console.log('Mostrando error:', message); 
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    };

    // Función para ocultar el modal de error
    const hideError = () => {
        console.log('Ocultando modal de error'); 
        errorModal.style.display = 'none';
    };

    // Función para mostrar mensaje de éxito
    const showSuccess = (message) => {
        alert(message);
        setTimeout(() => {
            window.location.href = 'javascrip-proyecto3/index.html'; 
        }, 1000); 
    };

    // Función para verificar si el ID o email ya existen
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

    // Función para validar el formulario
    const validateForm = async () => {
        const name = document.querySelector('.flip-card__back [placeholder="Name"]').value.trim();
        const email = document.querySelector('.flip-card__back [placeholder="Email"]').value.trim();
        const password = document.querySelector('.flip-card__back [placeholder="Password"]').value.trim();

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

    // Manejo del clic en el botón de confirmación del registro
    btn.addEventListener('click', async (event) => {
        event.preventDefault();

        if (await validateForm()) {
            const name = document.querySelector('.flip-card__back [placeholder="Name"]').value.trim();
            const email = document.querySelector('.flip-card__back [placeholder="Email"]').value.trim();
            const password = document.querySelector('.flip-card__back [placeholder="Password"]').value.trim();

            try {
                await postRegister(name, email, password);
                showSuccess('Registro exitoso');
                document.querySelector('.flip-card__back form').reset(); 
            } catch (error) {
                showError('Error al registrar usuario');
            }
        }
    });

    // Manejo del clic en el botón de cerrar del modal
    spanClose.addEventListener('click', hideError);

    // Manejo del clic fuera del modal para cerrarlo
    window.addEventListener('click', (event) => {
        if (event.target === errorModal) {
            hideError();
        }
    });
});




// funcionalidad del login 




import { getRegister } from "../../services/getRegister.js";

// Espera a que el DOM este cargado
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM
    const loginBtn = document.querySelector('.flip-card__front .flip-card__btn');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const spanClose = document.querySelector('#errorModal .close');

    // Función que mostrar el modal de error
    const showError = (message) => {
        console.log('Mostrando error:', message);
        errorMessage.textContent = message;
        errorModal.style.display = 'block';
    };

    // Función que ocultar el modal de error
    const hideError = () => {
        console.log('Ocultando modal de error');
        errorModal.style.display = 'none';
    };

    // Función para mostrar mensaje de éxito
    const showSuccess = (message) => {
        alert(message);
        setTimeout(() => {
            window.location.href = 'consultasP/src/html/consultas.html'; 
        }, 1000);
    };

    // Función para validar el formulario de inicio de sesión
    const validateLoginForm = () => {
        const email = document.querySelector('.flip-card__front [placeholder="Email"]').value.trim();
        const password = document.querySelector('.flip-card__front [placeholder="Password"]').value.trim();

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
        } else if (password.length < 6) {
            showError('Contraseña debe tener al menos 6 caracteres');
            isValid = false;
        }

        return isValid;
    };

    // Manejo del clic en el botón de inicio de sesión
    loginBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        if (validateLoginForm()) {
            const email = document.querySelector('.flip-card__front [placeholder="Email"]').value.trim();
            const password = document.querySelector('.flip-card__front [placeholder="Password"]').value.trim();

            try {
                const response = await getRegister();
                const user = response.find(user => user.email === email && user.password === password);

                if (user) {
                    showSuccess('Inicio de sesión exitoso');
                } else {
                    showError('Email o contraseña incorrectos');
                }
            } catch (error) {
                showError('Error al iniciar sesión');
            }
        }
    });

    // Manejo del clic en el botón de cerrar del modal
    spanClose.addEventListener('click', hideError);

    // Manejo del clic fuera del modal para cerrarlo
    window.addEventListener('click', (event) => {
        if (event.target === errorModal) {
            hideError();
        }
    });
});