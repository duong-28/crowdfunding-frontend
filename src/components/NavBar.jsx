import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <link to="/Login">Log In</link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;