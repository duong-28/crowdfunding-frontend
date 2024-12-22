import { Link } from "react-router-dom";
import "./ProjectCard.css";
import useProjectPledges from "../hooks/use-project-pledges";

function ProjectCard(props) {
  const { projectData } = props;
  const projectLink = `/projects/${projectData.id}`;
  const { pledges } = useProjectPledges(projectData.id);

  const handleImageError = (e) => {
    e.target.src = '/photos/default-project.jpg';
  };

  // Calculate progress percentage with pledges from the hook
  const progress = pledges ? 
    pledges.reduce((total, pledge) => total + Number(pledge.amount), 0) : 0;

  const progressPercentage = projectData.goal ? 
    (progress / projectData.goal) * 100 : 0;

  // Add status text based on progress
  const getStatusText = () => {
    if (!projectData.is_open) return 'Closed';
    if (progressPercentage >= 100) return 'Goal Reached!';
    return 'Active';
  };

  return (
    <div className="project-card">
      <Link to={projectLink}>
        <div className="project-card-image">
          <img 
            src={projectData.image || '/photos/default-project.jpg'} 
            onError={handleImageError}
            alt={projectData.title || 'Project Image'}
          />
        </div>
        <div className="project-card-content">
          <h3>{projectData.title || 'Untitled Project'}</h3>
          <div className="project-info">
            <div className="amounts-row">
              <p className="project-goal">Goal: ${projectData.goal || 0}</p>
              <p className="project-pledged">Raised: ${progress}</p>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <span className={`project-status ${projectData.is_open ? 'open' : 'closed'}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;