export const localLogin = async (userData) => {
    // Save userData to localStorage
    await localStorage.setItem('userData', JSON.stringify(userData));
    return {
        type: 'LOGIN',
        payload: userData
    };
};

export const localLogout = async () => {
    // Clear localStorage
    await localStorage.removeItem('userData');

    return {
        type: 'LOGOUT'
    };
};