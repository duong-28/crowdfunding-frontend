import { useState } from 'react';
import updateProject from '../api/update-project.js';

function UpdateProjectForm(props) {
    const { project } = props;
    const [formData, setFormData] = useState({
        title: project.title,
        description: project.description,
        goal: project.goal,
        image: project.image, 
        isOpen: project.isOpen, 
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        try {
            const token = window.localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to update a project");
                return;
            }

            await updateProject(project.id, formData, token);
            setSuccessMessage("Project updated successfully!");
            
            // Set a timeout to reload the page after 2 seconds
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err) {
            setError(`Failed to update project: ${err.message}`);
        }
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Project Title:</label>
                <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='goal'>Project Goal:</label>
                <input
                    type='number'
                    id='goal'
                    value={formData.goal}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='image'>Image URL:</label>
                <input
                    type='text'
                    id='image'
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>
            <div className='checkbox-wrapper'>
                <label htmlFor='isOpen'>Open for Funding:</label>
                <input
                    type='checkbox'
                    id='isOpen'
                    checked={formData.isOpen}
                    onChange={handleChange}
                />                
            </div>
            <button type='submit'>Update Project</button>
            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
        </form>
    );
}

export default UpdateProjectForm;