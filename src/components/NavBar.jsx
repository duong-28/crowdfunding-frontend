import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

// import "./NavBar.css";
import "../styles/NavBar.css"; 

function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token")
        setAuth({ token: null, userId: null });
    };

    const scrollToFeatured = (e) => {
        e.preventDefault();
        const featuredSection = document.getElementById('featured-projects');
        if (featuredSection) {
            featuredSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <nav>
                <div className="nav-left">
                    <Link to="/" className="logo">
                        <img src="/photos/Logo.png" alt="Atletico Saigon Logo" className="nav-logo-img" />
                        Atletico Saigon
                    </Link>
                </div>
                <div className="nav-center">
                    <a href="#featured-projects" 
                       className="nav-item featured-projects"
                       onClick={scrollToFeatured}>
                        Featured Projects
                    </a>
                </div>
                <div className="nav-right">
                    {auth.token ? (
                        <>
                            <Link to="/create-project" className="nav-item">Create Project</Link>
                            <Link to="/" onClick={handleLogout} className="nav-item">Log Out</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item login">Log In</Link>
                            <Link to="/signup" className="nav-item signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;