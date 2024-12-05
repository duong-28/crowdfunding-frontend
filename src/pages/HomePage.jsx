import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();

    if (isLoading) {
        return (<p>Accio projects...</p>)
    }

    if (error) {
        return (<p>{error.message}</p>)
    }

    return (
        <div id="project-list">
            {projects.map((project, key) => {
                return <ProjectCard key={key} projectData={project} />;
            })}
        </div>
    )
  }
  
  export default HomePage;