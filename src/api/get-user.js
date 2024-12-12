async function getUser(userId) {
    const url = `${import.meta.env.VITE_API_URL}/users/${userId}`; 
    // Fetch = HTTP request get/ post something 
    const response = await fetch(url, { method: "GET" });
  
    if (!response.ok) {
      const fallbackError = `Error fetching user with id ${userId}`;
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json(); //the await here is not necessary
  }
  
  export default getUser;