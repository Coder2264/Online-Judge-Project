import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true // Needed to send cookies
});

const refreshAccessToken= async()=>{
    try{
        const res = await axiosInstance.post('/users/refresh-token');
        console.log(res);
    }
    catch{
        console.log("Error in refreshing token");
    }
}

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest.url === '/users/refresh-token') {
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessToken();
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
