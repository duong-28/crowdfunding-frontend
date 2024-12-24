import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postUser from "../api/post-user.js";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

import "./SignUpForm.css";

function SignUpForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });

  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");
  const [ successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await postUser(
        credentials.username,
        credentials.password,
        credentials.email,
      );

      // Logs the user in after creating an account
      const loginResponse = await postLogin(credentials.username, credentials.password);
      
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("userId", response.user_id);
      setAuth({ token: loginResponse.token, userId: loginResponse.user_id });
     
      setSuccessMessage("Account created successfully!");
      navigate("/");
    } catch (err) {
      // Extract and display specific error messages from the backend
      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.username) {
          setError(`Username error: ${errorData.username[0]}`);
        } else if (errorData.email) {
          setError(`Email error: ${errorData.email[0]}`);
        } else if (errorData.password) {
          setError(`Password error: ${errorData.password[0]}`);
        } else {
          setError("An error occurred during sign up.");
        }
      } else {
        setError("An error occurred during sign up.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <img src="/photos/Logo.png" alt="Logo" className="auth-logo" />
        <h1 className="auth-title">Join Atletico</h1>
        <p className="auth-subtitle">Start making a difference in youth soccer</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="What should we call you?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Create a password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
            <span className="helper-text">
              Passwords need to have at least 8 characters.
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <Link to="/login" className="auth-link">
          Already have an account? <span>Log in</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;