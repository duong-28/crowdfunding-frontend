async function postPledge(supporter, amount, comment, anonymous, project, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const safeComment = comment?.trim() || "No comment provided";
    
    const projectId = typeof project === 'object' 
      ? Number(project.id) 
      : Number(project);

    const safeAmount = Number(amount);

    const requestData = {
      supporter: anonymous ? null : supporter,
      amount: safeAmount,
      comment: safeComment,
      anonymous: true,
      project: projectId,
    };
    
    console.log('Making pledge request:', {
      url,
      method: 'POST',
      headers,
      body: requestData
    });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestData),
    });
  
    if (!response.ok) {
      const fallbackError = `Error making pledge`;
      try {
        const responseText = await response.text();
        console.error("Raw server response:", responseText);
        
        try {
          const data = JSON.parse(responseText);
          console.error("Parsed error response:", data);
          const errorMessage = data?.detail || 
            Object.entries(data)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ') || 
            fallbackError;
          throw new Error(errorMessage);
        } catch (e) {
          console.error("Server returned non-JSON response:", responseText);
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
      } catch (e) {
        console.error("Error handling response:", e);
        throw e;
      }
    }

    return await response.json();
  }
  
  export default postPledge;