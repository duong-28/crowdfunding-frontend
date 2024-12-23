async function deleteUser(userId, token) {
  const url = `${import.meta.env.VITE_API_URL}/users/${userId}/`;
  
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export default deleteUser;