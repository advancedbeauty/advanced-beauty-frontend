import axios from 'axios';

const axiosApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is due to an expired token (assuming server sends 401 for expired tokens)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call the refresh token endpoint
                const response = await axios.post('http://localhost:3000/api/v1/auth/refresh', {}, { withCredentials: true });
                console.log(response)

                // Retry the original request
                return axiosApi(originalRequest);
            } catch (refreshError) {
                // If refresh token is also invalid, redirect to login
                // window.location.href = '/auth';
                // return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosApi;
