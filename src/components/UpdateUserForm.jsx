import { useState } from 'react';
import updateUser from '../api/update-user.js';

function UpdateUserForm(props) {
    const { user } = props;
    const [formData, setFormData] = useState({
        // username: "",
        // email: "",
        // password: "", 
        username: user.username,
        email: user.email,
        password: '', 
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
            // [id]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccessMessage("");

        try {
            const token = window.localStorage.getItem("token");
            if (!token) {
                setError("You must be logged in to update your details");
                return;
            }

            await updateUser(user.id, formData, token);
            setSuccessMessage(`User details updated successfully: ${formData.username}`);
        } catch (err) {
            setError(`Failed to update user: ${err.message}`);
        }
    }; 

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">User Name:</label>
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor='password'>User password:</label>
                <input
                    type='password'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            {/* <div>
                <label htmlFor='password'>Confirm password:</label>
                <input
                    type='text'
                    id='password'
                    value={formData.password}
                    onChange={handleChange}
                />
            </div> */}
            <button type='submit'>Update User Details</button>
            {error && <div className='error'>{error}</div>}
            {successMessage && <div className='success'>{successMessage}</div>}
        </form>
    );
}

export default UpdateUserForm;