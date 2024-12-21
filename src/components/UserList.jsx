import React from 'react';
import AdminUserActions from './AdminUserActions';

function UserList({ users, token }) {
  return (
    <div>
      <h4>All Users</h4>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email})
            <AdminUserActions user={user} token={token} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;