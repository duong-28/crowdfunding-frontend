async function postProject(projectData, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`, //use the token to authenticate user 
      },
      body: JSON.stringify({ ...projectData, "is_open": true }), //this sends the project data in the body
    });
  
    if (!response.ok) {
      const fallbackError = `Error creating the project`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postProject;