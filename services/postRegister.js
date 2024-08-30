async function postRegister(name,lastName,id,email,password) {
    try {
     
        const userData = { 
            name,
            lastName,
            id,
            email,
            password

        
        };

        const response = await fetch("http://localhost:3001/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

     
        const dato = await response.json();
        console.log("datos almacenados");
        return dato;

        
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}

export{postRegister}

  