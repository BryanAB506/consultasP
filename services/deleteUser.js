
async function deleteUser(id) {
    try {
        const response = await fetch (`http://localhost:3001/consultas/${id}`, {
            method: "DELETE",
            headers: {
                'content-type': 'application/jon'
            }

        })

        if (!response.ok) {
            throw new Error('error deleting user with id ${id}');
        }


        return {message: 'user with id ${id} deleted successfully'}
    } catch (error) {
       console.error('error deleting user', error);
       throw error
        
    }
   
}

export { deleteUser };