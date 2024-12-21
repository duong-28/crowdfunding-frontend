async function deleteUser(userId, token) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`; 
    
    const response = await fetch(url, { 
      method: "DELETE", 
      headers: {"Authorization": `Token ${token}`, //use the token to authenticate user 
      },
     });
  
    if (!response.ok) {
      const fallbackError = `Error delete project with id ${userId}`;
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return true;
  }
  
  export default deleteUser;