// import DeleteUserButton from "../components/deleteUserButton.jsx";
// import UpdateUserForm from "../components/UpdateUserForm";
// import { useAuth } from "../hooks/use-auth.js";
// import useUser from "../hooks/use-user.js";

// function UserPage() {
//   const { auth } = useAuth();
//   const { user, isLoading, error } = useUser();
//   // debugger;
//   if (isLoading) {
//     return (<p>Accio project!</p>)
//    }

//    if (error) {
//     return (<p>{error.message}</p>)
//    }

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <UpdateUserForm user={user}/>
//       <DeleteUserButton userId={auth.userId} token={auth.token}/>
//     </div>
//   );
// }

// export default UserPage;


import React, { useState, useEffect } from 'react';
import { useAuth } from "../hooks/use-auth.js";
import useUser from "../hooks/use-user.js";
import UpdateUserForm from "../components/UpdateUserForm";
import DeleteUserButton from "../components/deleteUserButton";
import getUsers from "../api/get-users";
import UserList from "../components/UserList";

function UserPage() {
  const { auth } = useAuth();
  const { user, isLoading, error } = useUser();
  const [users, setUsers] = useState([]);
  const [adminError, setAdminError] = useState(null);

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
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Admin: {user.is_superuser ? 'Yes' : 'No'}</p>
      <UpdateUserForm user={user} />
      <DeleteUserButton userId={auth.userId} token={auth.token} />
      {user.is_superuser && (
        <div>
          <h3>Admin Panel</h3>
          {adminError && <p>{adminError}</p>}
          <UserList users={users} token={auth.token} />
        </div>
      )}
    </div>
  );
}

export default UserPage;