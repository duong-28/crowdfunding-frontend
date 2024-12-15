import { useState, useEffect } from "react";

import getProjects from "../api/get-projects";

export default function useProjects() {
  // Here we use the useState hook to create a state variable called projects and a function to update it called setProjects. We initialize the state variable with an empty array.
  const [projects, setProjects] = useState([]);

  // We also create a state variable called isLoading and error to keep track of the loading state and any errors that might occur.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  // We use the useEffect hook to fetch the projects from the API and update the state variables accordingly.
  // This useEffect will only run once, when the component this hook is used in is mounted.
  useEffect(() => {
    // Add artificial delay using setTimeout
    const loadProjects = async () => {
      try {
        const data = await getProjects();
        setTimeout(() => {
          setProjects(data);
          setIsLoading(false);
        }, 1000); // Changed from 2000 to 5000 for a 5-second loading screen
      } catch (error) {
        setTimeout(() => {
          setError(error);
          setIsLoading(false);
        }, 5000); // Make sure to change both timeouts to match
      }
    };

    loadProjects();
  }, []);

  // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.
  return { projects, isLoading, error };
}

