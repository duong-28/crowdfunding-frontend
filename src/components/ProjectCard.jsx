import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `/project/${projectData.id}`;

  // Add error handling for image loading
  const handleImageError = (e) => {
    e.target.src = '/photos/default-project.jpg'; // Add a default image as fallback
  };

  return (
    <div>
      <Link to={projectLink}>
        <img 
          src={projectData.image} 
          onError={handleImageError}
          alt={projectData.title}
        />
        <h3>{projectData.title}</h3>
      </Link>
    </div>
  );
}

export default ProjectCard;