import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postUser from "../api/post-user.js";
import { useAuth } from "../hooks/use-auth.js";

import "./SignUpForm.css";

function SignUpForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "", 
    first_name: "",
    last_name: "",
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
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          placeholder="Enter username"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="submit-button">Sign Up</button>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
}

export default SignUpForm;