import React from 'react';
import deleteUser from '../api/delete-user';
import { useAuth } from '../hooks/use-auth';

function DeleteUserButton({ userId, token }) {
  const { setAuth } = useAuth();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await deleteUser(userId, token);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userId');
        setAuth({ token: null, userId: null });
        window.location.href = '/';
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete Account
    </button>
  );
}

export default DeleteUserButton;