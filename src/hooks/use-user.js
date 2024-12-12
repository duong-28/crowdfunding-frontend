import { useState, useEffect } from "react";

import getUser from "../api/get-user";

export default function useUser() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [userId = window.localStorage.getItem("userId"), setUserId] = useState();

  if (!userId) {
    return 
  }
  useEffect(() => {
    // Here we pass the projectId to the getProject function.
    getUser(userId)
      .then((user) => {
        setUser(user);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    // This time we pass the projectId to the dependency array so that the hook will re-run if the projectId changes.
  }, [userId]);

  return { user, isLoading, error };
}
