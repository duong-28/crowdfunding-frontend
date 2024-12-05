import { useNavigate, useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import deleteProject from "../api/delete-project";
import { useState } from "react";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    const [deleteError, setDeleteError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
   // useProject returns three pieces of info, so we need to grab them all here
   const { project, isLoading, error } = useProject(id);   
    const navigate = useNavigate();

   if (isLoading) {
    return (<p>Accio project...</p>)
   }

   if (error) {
    return (<p>{error.message}</p>)
   }


   const handleDelete = async () => {
    // event.preventDefault();

    setDeleteError("") //reset errors 
    setSuccessMessage(""); //reset success message
    try {
      const token = window.localStorage.getItem("token"); //retrieve the user's token
      if (!token) {
        setDeleteError("User is not authorised to delete this project")
        return;
      }

    await deleteProject(id, token) 

    setSuccessMessage("Project delete successfully"); //handle success 
    navigate("/")
  } catch (err) {
    setDeleteError(`Failed to delete the project: ${err.message}`); //handle errors
  }
};

    return (
        <div>
            <h2>{project.title}</h2>
            <h3>Created at: {project.date_created}</h3>
            <h3>{`Status: ${project.is_open}`}</h3>
            <h3>Pledges:</h3>
            <ul>   
                {project.pledges.map((pledgeData,key) => {
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );
                })}
            </ul>
            <button onClick={handleDelete}>Delete</button>
            {deleteError && <p style={{color: "red"}}>{deleteError}</p>}
            {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
        </div>
    );
  }
  
  export default ProjectPage