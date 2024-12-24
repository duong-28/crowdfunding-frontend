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
    const [refreshPledges, setRefreshPledges] = useState(0);
    const { pledges, isLoading: pledgesLoading, error: pledgesError } = useProjectPledges(id, refreshPledges);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    
    if (isLoading) {
        return (<p>Loading project details...</p>);
    }

    if (error) {
        return (<p>{error.message}</p>);
    }

    const handleDelete = async () => {
        // Add confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete this project? This action cannot be undone.");
        
        if (!isConfirmed) {
            return; // If user clicks Cancel, do nothing
        }

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

    // Calculate funding progress
    const totalPledged = pledges?.reduce((sum, pledge) => sum + pledge.amount, 0) || 0;
    const progressPercentage = (totalPledged / project.goal) * 100;

    // Handler for successful pledge creation
    const handlePledgeSuccess = () => {
        setRefreshPledges(prev => prev + 1);
    };

    return (
        <div className="project-page">
            <div className="project-header">
                <div className="project-image">
                    <img src={project.image} alt={project.title} />
                </div>
                <div className="project-info">
                    <h1 className="project-title">{project.title}</h1>
                    <div className="project-meta-container">
                        <div className="project-meta">
                            <span>Created at: {new Date(project.date_created).toLocaleDateString()}</span>
                            <span>
                                Status: <span className={`project-status ${project.is_open ? 'open' : 'closed'}`}>
                                    {project.is_open ? 'Open' : 'Closed'}
                                </span>
                            </span>
                        </div>
                        <div className="funding-progress">
                            <div className="funding-numbers">
                                <span className="amount-pledged">${totalPledged}</span>
                                <span className="goal-text">pledged of ${project.goal} goal</span>
                            </div>
                            <div className="progress-bar">
                                <div 
                                    className="progress-fill" 
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                />
                            </div>
                            <span className="progress-text">{progressPercentage.toFixed(1)}% funded</span>
                        </div>
                    </div>
                    <div className="project-description">
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>

            {auth.token && (
                <div className="admin-actions">
                    <button 
                        className="admin-button"
                        onClick={() => setShowUpdateForm(!showUpdateForm)}
                    >
                        Update Project
                    </button>
                    <div className={`update-form ${showUpdateForm ? 'visible' : ''}`}>
                        <UpdateProjectForm project={project} />
                    </div>
                    <button 
                        className="admin-button delete"
                        onClick={handleDelete}
                    >
                        Delete Project
                    </button>
                </div>
            )}

            {pledgesLoading ? (
                <p>Loading pledges...</p>
            ) : pledgesError ? (
                <p>{pledgesError}</p>
            ) : (
                <PledgeList pledges={pledges} />
            )}

            <PledgeForm 
                projectId={id} 
                onPledgeSuccess={handlePledgeSuccess}
            />
            
            {deleteError && <div className="error">{deleteError}</div>}
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    );
}

export default ProjectPage;