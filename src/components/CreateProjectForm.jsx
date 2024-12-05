import { useState } from "react";
import postProject from "../api/post-project.js";

function CreateProjectForm() {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    goal: "", 
    image: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("") //reset errors 
    setSuccessMessage(""); //reset success message
    try {
      const token = window.localStorage.getItem("token"); //retrieve the user's token
      if (!token) {
        setError("You must be logged in to create a project")
        return;
      }

    const project = await postProject(projectData, token) //calling the post project function

    setSuccessMessage(`Project created successfully: ${project.title}`); //handle success 
  } catch (err) {
    setError(`Failed to create project: ${err.message}`); //handle errors
  }
};    


    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project Title:</label>
          <input
            type = "text"
            id = "title"
            placeholder="Enter Project title"
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="description">Project Description:</label>
          <input 
            type = "text"
            id = "description"
            placeholder="Enter Project description"
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="goal">Goal:</label>
          <input 
            type = "number"
            id = "goal"
            placeholder="Enter goal amount"
            value={projectData.goal}
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input 
            type = "text"
            id = "image"
            placeholder="Enter image URL"
            value={projectData.image}
            onChange={handleChange} 
          />
        </div>
        {error && <p style={{color: "red"}}>{error}</p>}
        {successMessage && <p style={{color: "green"}}>{successMessage}</p>}
        <button type="submit">Create Project</button>
      </form>
    );
  }
  
  export default CreateProjectForm;