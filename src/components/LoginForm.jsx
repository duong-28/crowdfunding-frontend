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
    event.preventDefault();
    setError("") //this clears up any previous error from post login?
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
  // const handleSubmit = (event) => { 
  //   event.preventDefault();
  //   if (credentials.username && credentials.password) {
  //     postLogin(
  //       credentials.username,
  //       credentials.password
  //     ).then((response) => {
  //       window.localStorage.setItem("token", response.token);
  //     });
  //   }
  // };

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