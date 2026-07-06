import API from './API.js';

export const login = async (credentials) => {
    const { data: responseBody } = await API.post('/auth/login', credentials);
    console.log(responseBody);
    if (responseBody?.data) {
        localStorage.setItem('token', responseBody.data);
    }
    return responseBody.data;
};

export const register = async (userData) => {
    const { data: responseBody } = await API.post('/auth/register', userData);
    console.log(responseBody);
    if(responseBody?.data?.token) {
        localStorage.setItem('token', responseBody.data.token);
    }
    return responseBody.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};

export const getCurrentToken = () => localStorage.getItem('token');
