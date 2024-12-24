async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw {
                message: "Login failed",
                response: { status: response.status, data }
            };
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

export default postLogin;