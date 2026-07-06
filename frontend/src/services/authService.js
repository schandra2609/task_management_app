import API from './API.js';

export const login = async (credentials) => {
    const { data: responseBody } = await API.post('/auth/login', credentials);
    if (responseBody?.data?.token) {
        localStorage.setItem('token', responseBody.data.token);
        localStorage.setItem('user', JSON.stringify(responseBody.data.user));
    }
    return responseBody.data;
};

export const register = async (userData) => {
    const { data: responseBody } = await API.post('/auth/register', userData);
    if(responseBody?.data?.token) {
        localStorage.setItem('token', responseBody.data.token);
        localStorage.setItem('user', JSON.stringify(responseBody.data.newUser));
    }
    return responseBody.data;
};

export const getMe = async () => {
    const { data: responseBody } = await API.get('/auth/me');
    if (responseBody?.data) {
        localStorage.setItem('user', JSON.stringify(responseBody.data));
    }
    return responseBody.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};

export const getCurrentToken = () => localStorage.getItem('token');

export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};
