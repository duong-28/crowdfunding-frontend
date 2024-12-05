async function deleteProject(projectId, token) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}/`; 
    const response = await fetch(url, { method: "DELETE", 
      headers: {
        "Authorization": `Token ${token}`, //use the token to authenticate user 
      },
     });
  
    if (!response.ok) {
      const fallbackError = `Error delete project with id ${projectId}`;
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return true;
  }
  
  export default deleteProject;