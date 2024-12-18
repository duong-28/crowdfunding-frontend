import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

import useProject from "../hooks/use-project";
import deleteProject from "../api/delete-project";
import PledgeForm from "../components/PledgeForm"; 
import UpdateProjectForm from "../components/UpdateProjectForm";
import useProjectPledges from "../hooks/use-project-pledges";
import PledgeList from "../components/PledgeList";

function ProjectPage() {
    // Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass it to our useProject hook.
    const { id } = useParams();
    const [deleteError, setDeleteError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
   // useProject returns three pieces of info, so we need to grab them all here
    const { project, isLoading, error } = useProject(id);   
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { pledges, isLoading: pledgesLoading, error: pledgesError } = useProjectPledges(id);
    
   if (isLoading) {
    return (<p>Accio project!</p>)
   }

   if (error) {
    return (<p>{error.message}</p>)
   }
  //  debugger; => This helps freeze the code at this point and we can check the value of project

   const handleDelete = async () => {
    setDeleteError("") //reset errors 
    setSuccessMessage(""); //reset success message
    try {
      const token = window.localStorage.getItem("token"); //retrieve the user's token
      if (!token) {
        setDeleteError("Sorry! Looks like you're not authorised to delete this project!")
        return;
      }

    await deleteProject(id, token) 

    setSuccessMessage("Project deleted successfully"); //handle success 
    navigate("/")
  } catch (err) {
    setDeleteError(`Failed to delete the project: ${err.message}`); //handle errors
  }
};

    return (
        <div>
            <h2>{project.title}</h2>
            <h3>Created at: {project.date_created}</h3>
            <h3>{`Status: ${project.is_open ? 'Open': 'Closed'}`}</h3>
            
            {pledgesLoading ? (
                <p>Loading pledges...</p>
            ) : pledgesError ? (
                <p>{pledgesError}</p>
            ) : (
                <PledgeList pledges={pledges} />
            )}

            <PledgeForm projectId={id} />
            {auth.token ? <UpdateProjectForm project={project} /> : null}
            <button onClick={handleDelete}>Delete</button>
            {deleteError && <p>{deleteError}</p>}
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
  }
  
  export default ProjectPage