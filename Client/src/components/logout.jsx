import React from 'react';
import { useHistory } from 'react-router-dom';


const LogoutButton = () => {
    const history = useHistory();

    const handleLogout = () => {
        // Perform logout actions here, such as clearing tokens, session data, etc.
        // For example, if using localStorage to store tokens:
        localStorage.removeItem('accessToken'); // Remove access token from localStorage

        // Redirect to the login page or any other desired page after logout
        history.push('/login'); // Assuming '/login' is your login page route
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
