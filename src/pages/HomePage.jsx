import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useProjects from "../hooks/use-projects";
import ProjectCard from "../components/ProjectCard";
import "./HomePage.css";

function HomePage() {
    const { auth } = useAuth();
    const navigate = useNavigate();
    const { projects, isLoading, error } = useProjects();

    const handleStartSupporting = () => {
        if (auth?.token) {
            // User is logged in, navigate to create pledge page
            navigate("/create-pledge");
        } else {
            // User is not logged in, show modal/alert
            const choice = window.confirm(
                "You need to be logged in to create a project. Would you like to Log In?"
            );
            if (choice) {
                navigate("/signup");
            }
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-ball"></div>
                <p className="loading-text">Loading Dreams in Motion...</p>
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
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>Support Youth Soccer Dreams</h1>
                    <p className="subtitle">Join Atletico in making soccer accessible to every child</p>
                    <button className="cta-button" onClick={handleStartSupporting}>Start Supporting</button>
                </div>
            </div>

            <div className="categories-section">
                <h2>Ways to Support</h2>
                <div className="category-cards">
                    <div className="category-card">
                        <div className="category-icon">🏃</div>
                        <h3>Equipment</h3>
                        <p>Provide essential gear</p>
                    </div>
                    <div className="category-card">
                        <div className="category-icon">👥</div>
                        <h3>Coaching</h3>
                        <p>Support training programs</p>
                    </div>
                    <div className="category-card">
                        <div className="category-icon">🏆</div>
                        <h3>Tournaments</h3>
                        <p>Fund competition entries</p>
                    </div>
                </div>
            </div>

            <div id="featured-projects" className="featured-projects-section">
                <h2>Featured Projects</h2>
                <div className="projects-wrapper">
                    <div id="project-list">
                        {projects.map((project, key) => {
                            return <ProjectCard key={key} projectData={project} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;