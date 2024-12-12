import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUser from "../api/post-user.js";
import { useAuth } from "../hooks/use-auth.js";

function SignUpForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "", 
    // first_name: "",
    // last_name: "",
  });

  const {auth, setAuth} = useAuth();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleSubmit = (event) => { 
    event.preventDefault();
    if (credentials.username && credentials.password && credentials.email && credentials.first_name && credentials.last_name) {
      postUser(
        credentials.username,
        credentials.password,
        credentials.email,
        credentials.first_name,
        credentials.last_name
      ).then((response) => {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("userId", response.user_id);
        setAuth({token: response.token, userId: response.user_id});
        setSuccessMessage("Successfully signed up!");
        navigate("/");
      }).catch((error) => {
        console.log(error, "error");
        setError("An error occurred during sign up.");
      });
    } else {
      setError("Please fill out all fields.");
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
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type = "email"
            id = "email"
            placeholder="email"
            onChange={handleChange}
            // consider validation for email if there's still time 
          />
        </div>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input 
            type = "first_name"
            id = "first_name"
            placeholder="First Name"
            onChange={handleChange} 
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input 
            type = "last_name"
            id = "last_name"
            placeholder="Last Name"
            onChange={handleChange} 
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Sign Up</button>
      </form>
    );
  }
  
  export default SignUpForm;