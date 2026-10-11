import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add JWT token when available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle API responses
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API ERROR:', error);

        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Response:', error.response.data);

            error.message =
                error.response.data?.message ||
                `Server error: ${error.response.status}`;

            if (
                error.response.status === 401 &&
                !error.config?.url?.includes('/auth/')
            ) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        } else if (error.request) {
            error.message = 'Cannot connect to the backend. Please try again.';
        }

        return Promise.reject(error);
    }
);

export default api;