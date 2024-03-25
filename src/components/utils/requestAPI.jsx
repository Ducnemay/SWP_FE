import axios from 'axios';

const api = axios.create({
    // sever
    //baseURL: 'https://bcsswp.azurewebsites.net',
    // local
    baseURL: 'https://localhost:7116',
});

const authen = localStorage.getItem('Authen');

// Request interceptor
if (authen != null) {
    api.interceptors.request.use(
        function (config) {
            config.headers.Authorization = ` Bearer ${localStorage.getItem('Authen')}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
}

// Response interceptor
api.interceptors.response.use(
    function (response) {
        if (response.data && response.data.data) {
            response.data = response.data.data;
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default api;
