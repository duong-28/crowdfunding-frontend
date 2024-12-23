async function updateUser(userId, userData, token) {
    const url  = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const data = await response.json();
            throw {
                message: "Failed to update user",
                response: { data }
            };
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export default updateUser;

//fn +F2 to replace names of variables everywhere in the file 
