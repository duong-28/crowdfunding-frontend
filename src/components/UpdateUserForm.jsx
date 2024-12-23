import { useState } from 'react';
import updateUser from '../api/update-user.js';

function UpdateUserForm({ user, onClose }) {
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const fieldName = event.target.id.replace('update-', '');
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: event.target.value,
    }));
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9@.+\-_]+$/;
    return usernameRegex.test(username);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    
    if (!validateUsername(formData.username)) {
      setError("Username can only contain letters, numbers, and @/./+/-/_ characters (no spaces)");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = window.localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to update your details");
        return;
      }

      const updateUserData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }

      await updateUser(user.id, updateUserData, token);
      setSuccessMessage(`User details updated successfully: ${formData.username}`);
      onClose();
      window.location.reload();
    } catch (err) {
      if (err.response?.data) {
        const errorData = err.response.data;
        if (errorData.username) {
          setError(`Username error: ${errorData.username[0]}`);
        } else if (errorData.email) {
          setError(`Email error: ${errorData.email[0]}`);
        } else if (errorData.password) {
          setError(`Password error: ${errorData.password[0]}`);
        } else {
          setError(`Update failed: ${JSON.stringify(errorData)}`);
        }
      } else {
        setError(`Failed to update user: ${err.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="update-username">Username</label>
        <input
          type="text"
          id="update-username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter new username (no spaces allowed)"
        />
        <small className="helper-text">
          Only letters, numbers, and @/./+/-/_ characters allowed
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="update-email">Email</label>
        <input
          type="email"
          id="update-email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter new email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="update-password">New Password</label>
        <input
          type="password"
          id="update-password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter new password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="update-confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="update-confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <button type="submit" className="action-button update-button">
        Update Profile
      </button>
    </form>
  );
}

export default UpdateUserForm;