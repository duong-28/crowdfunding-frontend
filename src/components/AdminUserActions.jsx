import React from 'react';
import updateUser from '../api/update-user';
import deleteUser from '../api/delete-user';

function AdminUserActions({ user, token }) {
  const handleUpdate = async () => {
    const newEmail = prompt('Enter new email:', user.email);
    if (newEmail) {
      try {
        await updateUser(user.id, { email: newEmail }, token);
        alert('User updated successfully');
      } catch (err) {
        alert('Failed to update user: ' + err.message);
      }
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await deleteUser(user.id, token);
        alert('User deleted successfully');
      } catch (err) {
        alert('Failed to delete user: ' + err.message);
      }
    }
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default AdminUserActions;