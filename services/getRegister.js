export async function getRegister() {
    try {
        const response = await fetch("http://localhost:3001/user");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}
