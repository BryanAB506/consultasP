import { postRegister } from "../../services/postRegister.js";
import { getRegister } from "../../services/getRegister.js";

// Seleccionar elementos del DOM
const btn = document.querySelector('#boton');
const formulario = document.querySelector('#formulario');
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
    window.location.href = 'index.html'; 
  }, 1000); 
};

const checkIfExists = async (id, email) => {
  try {
    const response = await getRegister();
    if (response && response.length > 0) {
      const exists = response.some(user => user.id === id || user.email === email);
      return exists;
    }
    return false;
  } catch (error) {
    console.error('Error checking user existence:', error);
    showError('Error al verificar la existencia del usuario. Inténtalo de nuevo.');
    return false;
  }
};

const validateForm = async () => {
  const id = document.getElementById('id').value.trim();
  const name = document.getElementById('name').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  if (id === '') {
    showError('Cedula sin llenar');
    isValid = false;
  } else if (!/^\d+$/.test(id)) {
    showError('Cedula solo números');
    isValid = false;
  }

  if (name === '') {
    showError('Nombre sin llenar');
    isValid = false;
  }

  if (lastName === '') {
    showError('Apellido sin llenar');
    isValid = false;
  }

  if (email === '') {
    showError('Email sin llenar');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    showError('Email no válido');
    isValid = false;
  } else if (await checkIfExists(id, email)) {
    showError('ID o Email ya registrados');
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

btn.addEventListener('click', async (event) => {
  event.preventDefault();

  if (await validateForm()) {
    const id = document.getElementById('id').value.trim();
    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      await postRegister(name, lastName, id, email, password);
      showSuccess('Registro exitoso');
      formulario.reset(); 
    } catch (error) {
      showError('Error al registrar usuario');
    }
  }
});

spanClose.addEventListener('click', hideError);

window.addEventListener('click', (event) => {
  if (event.target === errorModal) {
    hideError();
  }
});

document.getElementById('id').addEventListener('input', (event) => {
  event.target.value = event.target.value.replace(/\D/g, '');
});

