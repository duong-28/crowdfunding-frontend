import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import postLogin from "../api/post-login.js";

import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    try {
      const response = await postLogin(
        credentials.username,
        credentials.password
      );
      window.localStorage.setItem("token", response.token);
      window.localStorage.setItem("userId", response.user_id);
      setAuth({ token: response.token, userId: response.user_id });
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <img src="/photos/Logo.png" alt="Logo" className="auth-logo" />
        <h1 className="auth-title">Welcome back</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '' : 'Log in'}
          </button>
        </form>

        <Link to="/signup" className="auth-link">
          Don't have an account? <span>Sign up</span>
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;