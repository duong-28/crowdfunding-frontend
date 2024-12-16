import { useState } from "react";
import postLogin from "../api/post-login.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

import './LoginForm.css';

function LoginForm() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); //by default, submitting a form reloads the page. this helps the app handle the login without refreshing
    setError("") //if there was an error from a previous login attempt, this clears it before trying again
    setSuccessMessage("")

    if (credentials.username && credentials.password) {
      try { 
        const response = await postLogin(credentials.username, credentials.password);
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("userId", response.user_id);
        setAuth({token: response.token, userId: response.user_id});
        setSuccessMessage("Successfully logged in!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 1000); // Short delay to let the user see the message
      } catch (err) {
        // when i got an error from my api now I can tell the user
        setError("Invalid username or password. Please try again");
      }
     } else {
      setError("Please fill out both fields.");
     }
  };
  
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-button">Log In</button>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default LoginForm;