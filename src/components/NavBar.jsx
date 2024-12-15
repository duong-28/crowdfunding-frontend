import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

import "../components/NavBar.css";

function NavBar() {
    const { auth, setAuth } = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token")
        setAuth({ token: null, userId: null });
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
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/projects" className="nav-item">Projects</Link>
                    <Link to="/about" className="nav-item">About</Link>
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