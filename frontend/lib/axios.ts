import axios from 'axios';


export const axiosInstance = axios.create({
    baseURL:"https://guided-backend-9hw5.onrender.com/api",
    withCredentials:true
})
