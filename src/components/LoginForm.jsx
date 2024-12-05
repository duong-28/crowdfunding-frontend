import { useState } from "react";
import postLogin from "../api/post-login.js";

function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  

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
    if (credentials.username && credentials.password) {
      try { 
        const response = await postLogin(credentials.username, credentials.password);
        window.localStorage.setItem("token", response.token);
      } catch (err) {
        // when i got an error from my api now I can tell the user
        setError("Ooopsie... Your Username or Password does not match. Please try again");
      }
     } else {
      setError("Please fill out both fields.");
     }
  };
  
    return (
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type = "text"
            id = "username"
            placeholder="Enter username"
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type = "password"
            id = "password"
            placeholder="Password"
            onChange={handleChange} 
          />
        </div>
        {error && <p style={{color: "red"}}>{error}</p>}
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    );
  }
  
  export default LoginForm;