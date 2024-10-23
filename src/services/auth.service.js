import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_AUTH_API}`;

const login = async (username, password) => {
    return await axios.post(`${API_URL}/signin`, { username, password });
};

export default {
    login,
};
