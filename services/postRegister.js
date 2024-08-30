export const postRegister = async (name, email, password) => {
    try {
        const response = await fetch('http://localhost:3001/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        if (!response.ok) throw new Error('Error en el registro');
    } catch (error) {
        console.error('Error en postRegister:', error);
        throw error;
    }
}
  