import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
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
    (error) => {
        return Promise.reject(error);
    }
);

// Handle API responses
api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {

        console.error('API ERROR:', error);

        if (error.response) {

            console.error(
                'Status:',
                error.response.status
            );

            console.error(
                'Response:',
                error.response.data
            );

            error.message =
                error.response.data?.message ||
                `Server error: ${error.response.status}`;

            // Only redirect when protected APIs return 401
            if (
                error.response.status === 401 &&
                !error.config.url.includes('/auth/')
            ) {
                localStorage.clear();
                window.location.href = '/login';
            }

        } else if (error.request) {

            error.message =
                'Cannot connect to the backend. Please make sure Spring Boot is running on port 8080.';

        } else {

            error.message =
                error.message || 'Request failed';
        }

        return Promise.reject(error);
    }
);

export default api;