import React, { useState, useEffect } from 'react';
import { useAuth } from "../hooks/use-auth.js";
import useUser from "../hooks/use-user.js";
import UpdateUserForm from "../components/UpdateUserForm";
import DeleteUserButton from "../components/DeleteUserButton";
import getUsers from "../api/get-users";
import UserList from "../components/UserList";

import "./UserPage.css";

function UserPage() {
  const { auth } = useAuth();
  const { user, isLoading, error } = useUser();
  const [users, setUsers] = useState([]);
  const [adminError, setAdminError] = useState(null);
  const [sortBy, setSortBy] = useState('username');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers(auth.token);
        setUsers(usersData);
      } catch (err) {
        setAdminError(err.message);
      }
    };

    if (user?.is_superuser) {
      fetchUsers();
    }
  }, [auth.token, user]);

  const handleDeleteSuccess = (deletedUserId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
  };

  // Sort and filter users
  const sortedAndFilteredUsers = users
    .filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase()));

  if (isLoading) {
    return (<p>Loading user data...</p>);
  }

  if (error) {
    return (<p>{error.message}</p>);
  }

  if (!user) {
    return (<p>No user data available.</p>);
  }

  return (
    <div className="user-page-container">
      <div className="user-profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <div className="info-item">
            <span className="label">Username</span>
            <span className="value">{user.username}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span className="value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Account Type</span>
            {user.is_superuser ? (
              <span className="admin-badge">
                Admin <span className="checkmark">✓</span>
              </span>
            ) : (
              <span className="regular-user">
                Standard User <span className="info-icon" title="Contact an administrator for elevated permissions">ⓘ</span>
              </span>
            )}
          </div>
        </div>

        <div className="actions-container">
          <button 
            className="action-button update-button"
            onClick={() => setShowUpdateForm(!showUpdateForm)}
          >
            <i className="fas fa-user-edit"></i>
            Update User Profile
          </button>
          
          {showUpdateForm && (
            <div className="update-form-container">
              <h4>Update Profile Details</h4>
              <UpdateUserForm 
                user={user} 
                onClose={() => setShowUpdateForm(false)}
              />
            </div>
          )}

          <DeleteUserButton 
            userId={auth.userId} 
            token={auth.token}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>

        {user.is_superuser && (
          <div className="admin-panel">
            <div className="admin-header">
              <h3>User Management</h3>
              <div className="admin-controls">
                <div className="search-box">
                  <i className="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="username">Sort by Username</option>
                  <option value="email">Sort by Email</option>
                </select>
              </div>
            </div>
            
            <div className="users-table">
              <div className="table-header">
                <div className="col">User</div>
                <div className="col">Email</div>
                <div className="col">Status</div>
                <div className="col">Actions</div>
              </div>
              
              {sortedAndFilteredUsers.map(user => (
                <div key={user.id} className="table-row">
                  <div className="col user-info">
                    <span className="user-avatar">
                      {user.username[0].toUpperCase()}
                    </span>
                    <span className="username">{user.username}</span>
                  </div>
                  <div className="col">
                    <a href={`mailto:${user.email}`} className="email-link">
                      {user.email}
                    </a>
                  </div>
                  <div className="col">
                    {user.is_superuser ? (
                      <span className="admin-badge">Admin</span>
                    ) : (
                      <span className="user-badge">User</span>
                    )}
                  </div>
                  <div className="col actions">
                    <button 
                      className="admin-action-btn edit"
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="admin-action-btn delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;