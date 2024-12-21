import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

import getUser from "../api/get-user";

function useUser() {
  const { auth } = useAuth();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [userId = window.localStorage.getItem("userId"), setUserId] = useState();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(auth.userId, auth.token);
        setUser(user);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (auth.userId && auth.token) {
      fetchUser();
    } else {
      setIsLoading(false);  //makes sure loading ends if auth data is missing
    }
  }, [auth.userId, auth.token]);

  // if (!userId) {
  //   return 
  // }
  // useEffect(() => {
  //   getUser(userId)
  //     .then((user) => {
  //       setUser(user);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setIsLoading(false);
  //     });

  //   // This time we pass the projectId to the dependency array so that the hook will re-run if the projectId changes.
  // }, [userId]);

  return { user, isLoading, error };
}

export default useUser;