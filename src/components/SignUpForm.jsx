import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postUser from "../api/post-user.js";
import { useAuth } from "../hooks/use-auth.js";

import "../styles/AuthPages.css";

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
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("userId", response.user_id);
      setAuth({ token: response.token, userId: response.user_id });
      setSuccessMessage("Account created successfully!");
      navigate("/");
    } catch (error) {
      setError("An error occurred during sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <img src="/photos/Logo.png" alt="Logo" className="auth-logo" />
        <h1 className="auth-title">Complete your account</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <i className="fas fa-user"></i>
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
            <i className="fas fa-envelope"></i>
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
            <i className="fas fa-lock"></i>
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
            className={`auth-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '' : 'Create Account'}
          </button>
        </form>

        <Link to="/login" className="auth-link">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;