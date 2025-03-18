export const getUserDetails = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const clearAuthData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
};
