async function postPledge(supporter, amount, comment, anonymous, project, token) {
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Token ${token}`, //use the token to authenticate user 
    //   },
    //   body: JSON.stringify({ 
    //     "supporter": supporter,
    //     "amount": amount,
    //     "comment": comment,
    //     "anonymous": anonymous,
    //     "project": project,
    //   }), //this sends the project data in the body
    // });

    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        supporter: token ? supporter : null,
        amount,
        comment,
        anonymous,
        project,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error making pledge`;
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }

    return await response.json();
  }

  //     const fallbackError = `Error creating pledge`;
  
  //     const data = await response.json().catch(() => {
  //       throw new Error(fallbackError);
  //     });
  
  //     const errorMessage = data?.detail ?? fallbackError;
  //     throw new Error(errorMessage);
  //   }
  
  //   return await response.json();
  // }
  
  export default postPledge;