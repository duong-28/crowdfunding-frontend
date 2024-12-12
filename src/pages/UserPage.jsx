import UpdateUserForm from "../components/UpdateUserForm";
import { useAuth } from "../hooks/use-auth.js";
import useUser from "../hooks/use-user.js";

function UserPage() {
  const { auth } = useAuth();
  const { user, isLoading, error } = useUser();
  // debugger;
  if (isLoading) {
    return (<p>Accio project!</p>)
   }

   if (error) {
    return (<p>{error.message}</p>)
   }

  return (
    <div>
      <UpdateUserForm user={user}/>
    </div>
  );
}

export default UserPage;