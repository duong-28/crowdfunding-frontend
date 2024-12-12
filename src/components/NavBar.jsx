import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token")
    setAuth({ token: null, userId: null }); 
  };
  
  console.log(auth);

  // debugger;

  return (
    <div>
      <nav>
        {/* Put them in a list */}
        <Link to="/">Home</Link>
        {/* <Link to="/login">Log In</Link> */}
        {auth.token? (<Link to="/" onClick={handleLogout}>Log Out</Link>) : (<Link to="/login">Log In</Link>)}
        {auth.userId? <Link to="/user-page">User Dashboard</Link> : null}
        <Link to="/signup">Sign Up</Link>
        <Link to="/create-project">Create Project</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;