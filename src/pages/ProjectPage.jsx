import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";

import useProject from "../hooks/use-project";
import deleteProject from "../api/delete-project";
import PledgeForm from "../components/PledgeForm"; 
import UpdateProjectForm from "../components/UpdateProjectForm";
import useProjectPledges from "../hooks/use-project-pledges";
import PledgeList from "../components/PledgeList";
import "./ProjectPage.css";

function ProjectPage() {
    const { id } = useParams();
    const [deleteError, setDeleteError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { project, isLoading, error } = useProject(id);   
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { pledges, isLoading: pledgesLoading, error: pledgesError } = useProjectPledges(id);
    
    if (isLoading) {
        return (<p>Loading project details...</p>);
    }

    if (error) {
        return (<p>{error.message}</p>);
    }

    const handleDelete = async () => {
        setDeleteError("");
        setSuccessMessage("");
        try {
            const token = window.localStorage.getItem("token");
            if (!token) {
                setDeleteError("Sorry! Looks like you're not authorised to delete this project!")
                return;
            }

            await deleteProject(id, token);
            setSuccessMessage("Project deleted successfully");
            navigate("/");
        } catch (err) {
            setDeleteError(`Failed to delete the project: ${err.message}`);
        }
    };

    return (
        <div className="project-page">
            <div className="project-header">
                <div className="project-image">
                    <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                    <h1 className="project-title">{project.title}</h1>
                    <div className="project-meta">
                        <span>Created at: {new Date(project.date_created).toLocaleDateString()}</span>
                        <span className={`project-status ${project.is_open ? 'open' : 'closed'}`}>
                            Status: {project.is_open ? 'Open' : 'Closed'}
                        </span>
                    </div>
                    <div className="project-description">
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>

            {pledgesLoading ? (
                <p>Loading pledges...</p>
            ) : pledgesError ? (
                <p>{pledgesError}</p>
            ) : (
                <PledgeList pledges={pledges} />
            )}

            <PledgeForm projectId={id} />

            {auth.token && (
                <div className="admin-actions">
                    <UpdateProjectForm project={project} />
                    <button onClick={handleDelete} className="delete-button">Delete Project</button>
                </div>
            )}
            
            {deleteError && <div className="error">{deleteError}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    );
}

export default ProjectPage;