import { useState } from 'react';
import updateUser from '../api/update-user';

function EditUserModal({ user, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    is_superuser: user.is_superuser,
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = window.localStorage.getItem("token");
      const updateData = {
        username: formData.username,
        email: formData.email,
        is_superuser: formData.is_superuser,
        ...(formData.password && { password: formData.password })
      };
      
      await updateUser(user.id, updateData, token);
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit User</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password (Optional)</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                id="is_superuser"
                checked={formData.is_superuser}
                onChange={handleChange}
              />
              Admin Status
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="submit" className="action-button update-button">
              Save Changes
            </button>
            <button 
              type="button" 
              className="action-button cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal; 