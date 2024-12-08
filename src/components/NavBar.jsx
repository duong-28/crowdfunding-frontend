import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        {/* Put them in a list */}
        <Link to="/">Home</Link>
        <Link to="/login">Log In</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/create-project">Create Project</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;