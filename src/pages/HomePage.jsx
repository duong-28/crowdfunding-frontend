import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { projects, isLoading, error } = useProjects();

    if (isLoading) {
        return (
            <div className="loading-container">
                <p className="loading-text">Accio Projects!</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-text">{error.message}</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>Discover Amazing Projects</h1>
                <p className="subtitle">Explore and connect with creative minds</p>
            </div>
            <div className="projects-wrapper">
                <div id="project-list">
                    {projects.map((project, key) => {
                        return <ProjectCard key={key} projectData={project} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default HomePage;