async function updateUser(userId, userData, token) {
    const url  = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
    
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const fallbackError = `Failed to update user ${userData.name}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default updateUser;

//fn +F2 to replace names of variables everywhere in the file 
