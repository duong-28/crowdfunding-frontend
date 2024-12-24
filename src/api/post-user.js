async function postUser(username, password, email) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                message: "Failed to create user",
                response: { status: response.status, data }
            };
        }

        return data;
    } catch (error) {
        throw error;
    }
}

export default postUser;