import api from './api';

export default {
    async login(credentials) {
        const response = await api.post('/login', credentials);
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        return response.data;
    },

    async register(userInfo) {
        const response = await api.post('/register', userInfo);
        
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        
        return response.data;
    },

    async logout() {
        const response = await api.post('/logout');
        
        if(response.data.success) {
            localStorage.removeItem('token');
        }
        
        return response.data;
    },
    
    async getMe() {
        const response = await api.get('/me');
        
        return response.data;
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    }
};