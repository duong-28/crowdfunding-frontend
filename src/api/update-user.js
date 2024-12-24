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

        const data = await response.json();

        if (!response.ok) {
            throw {
                message: "Failed to update user",
                response: { status: response.status, data }
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export default updateUser;

//fn +F2 to replace names of variables everywhere in the file 
