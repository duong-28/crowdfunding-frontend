import { Link } from "react-router-dom";
import "./ProjectCard.css";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `/projects/${projectData.id}`;

  const handleImageError = (e) => {
    e.target.src = '/photos/default-project.jpg';
  };

  return (
    <div className="project-card">
      <Link to={projectLink}>
        <div className="project-card-image">
          <img 
            src={projectData.image} 
            onError={handleImageError}
            alt={projectData.title}
          />
        </div>
        <div className="project-card-content">
          <h3>{projectData.title}</h3>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;