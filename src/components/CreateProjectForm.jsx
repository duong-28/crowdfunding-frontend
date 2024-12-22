import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postProject from "../api/post-project";
import "./CreateProjectForm.css";

function CreateProjectForm() {
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    goal: "",
    image: "",
    is_open: true,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setError("Please log in to create a project");
        return;
      }

      await postProject(projectDetails, token);
      navigate("/");
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <img src="/photos/Logo.png" alt="Logo" className="auth-logo" />
        <h1 className="auth-title">Create Project</h1>
        <p className="auth-subtitle">Start your fundraising journey</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              value={projectDetails.title}
              onChange={handleChange}
              required
              placeholder="Enter project title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={projectDetails.description}
              onChange={handleChange}
              required
              placeholder="Describe your project"
            />
          </div>

          <div className="form-group">
            <label htmlFor="goal">Goal Amount</label>
            <div className="goal-input-container">
              <span>$</span>
              <input
                type="number"
                id="goal"
                value={projectDetails.goal}
                onChange={handleChange}
                required
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              value={projectDetails.image}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Project...' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectForm;